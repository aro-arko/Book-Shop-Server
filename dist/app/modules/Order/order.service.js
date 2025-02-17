"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = __importDefault(require("../Product/product.model"));
const order_utils_1 = require("./order.utils");
const user_model_1 = __importDefault(require("../User/user.model"));
const createOrder = (user, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length))
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Order is not specified');
    const products = payload.products;
    let totalPrice = 0;
    const productDetails = yield Promise.all(products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_model_1.default.findById(item.product);
        if ((product && (product === null || product === void 0 ? void 0 : product.quantity) < item.quantity) ||
            (product === null || product === void 0 ? void 0 : product.quantity) == 0) {
            throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Product is out of stock');
        }
        if (product) {
            const subtotal = product ? (product.price || 0) * item.quantity : 0;
            totalPrice += subtotal;
            return item;
        }
    })));
    const { email } = user;
    // console.log(email);
    const userDocument = yield user_model_1.default.findOne({ email });
    const userId = userDocument === null || userDocument === void 0 ? void 0 : userDocument._id;
    // console.log(userId);
    let order = yield order_model_1.default.create({
        user: userId,
        products: productDetails,
        totalPrice,
    });
    const userData = yield user_model_1.default.findById(userId);
    // payment integration
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: order._id,
        currency: 'BDT',
        customer_name: userData === null || userData === void 0 ? void 0 : userData.name,
        customer_address: userData === null || userData === void 0 ? void 0 : userData.address,
        customer_email: userData === null || userData === void 0 ? void 0 : userData.email,
        customer_phone: userData === null || userData === void 0 ? void 0 : userData.phone,
        customer_city: userData === null || userData === void 0 ? void 0 : userData.city,
        client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        order = yield order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    return payment.checkout_url;
});
const getOrders = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userEmail });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const data = yield order_model_1.default.find({ user: user._id }).sort({ createdAt: -1 });
    return data;
});
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        const updatedOrder = yield order_model_1.default.findOneAndUpdate({
            'transaction.id': order_id,
        }, {
            'transaction.bank_status': verifiedPayment[0].bank_status,
            'transaction.sp_code': verifiedPayment[0].sp_code,
            'transaction.sp_message': verifiedPayment[0].sp_message,
            'transaction.transactionStatus': verifiedPayment[0].transaction_status,
            'transaction.method': verifiedPayment[0].method,
            'transaction.date_time': verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == 'Success'
                ? 'Paid'
                : verifiedPayment[0].bank_status == 'Failed'
                    ? 'Pending'
                    : verifiedPayment[0].bank_status == 'Cancel'
                        ? 'Cancelled'
                        : '',
        }, { new: true });
        if (verifiedPayment[0].bank_status == 'Success') {
            // Reduce product quantity and update inStock status
            for (const item of updatedOrder.products) {
                const product = yield product_model_1.default.findById(item.product);
                if (product) {
                    product.quantity -= item.quantity;
                    if (product.quantity <= 0) {
                        product.inStock = false;
                    }
                    yield product.save();
                }
            }
        }
    }
    return verifiedPayment;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.default.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
    return orders;
});
const getSingleOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findById(orderId);
    if (!order)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    return order;
});
exports.orderService = {
    createOrder,
    getOrders,
    verifyPayment,
    getAllOrders,
    getSingleOrder,
};
