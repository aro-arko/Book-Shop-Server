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
exports.OrderServices = void 0;
const product_model_1 = __importDefault(require("../Product/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrderIntoDB = (new_order) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the product
    const book = yield product_model_1.default.findById(new_order.product);
    if (!book) {
        throw new Error('Product not found');
    }
    // Check if the quantity is sufficient
    if (book.quantity < new_order.quantity) {
        throw new Error(`Insufficient stock. Available quantity: ${book.quantity}`);
    }
    // Calculate the expected total price
    const expectedTotalPrice = book.price * new_order.quantity;
    // Check if the provided total price matches the expected price
    if (new_order.totalPrice !== expectedTotalPrice) {
        throw new Error(`Incorrect total price. Expected ${expectedTotalPrice}, but got ${new_order.totalPrice}`);
    }
    // Decrease the quantity in the product model and update inStock if needed
    const updatedBook = yield product_model_1.default.findByIdAndUpdate(new_order.product, {
        $inc: { quantity: -new_order.quantity },
        $set: {
            inStock: book.quantity - new_order.quantity <= 0 ? false : book.inStock,
        },
    }, { new: true });
    // If the book update fails, throw an error
    if (!updatedBook) {
        throw new Error('Failed to update product data');
    }
    // Create the order and store it in the database
    const result = yield order_model_1.default.create(new_order);
    return result;
});
// calculate the total revenue from orders
const getRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield order_model_1.default.aggregate([
        {
            // reference from books collection
            $lookup: {
                from: 'books',
                localField: 'product',
                foreignField: '_id',
                as: 'bookDetails',
            },
        },
        // breaking down bookDetails array fields
        {
            $unwind: '$bookDetails',
        },
        // adding new field name: revenue & performing multiplication with the book price with order quantity
        {
            $addFields: {
                revenue: {
                    $multiply: ['$bookDetails.price', '$quantity'],
                },
            },
        },
        // grouping all together - not id wise - and all the revenue that performed via _id is counted total here
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$revenue' },
            },
        },
        // just to present the totalRevenue in output
        {
            $project: {
                _id: 0,
                totalRevenue: 1,
            },
        },
    ]);
    return result;
});
exports.OrderServices = {
    createOrderIntoDB,
    getRevenue,
};
