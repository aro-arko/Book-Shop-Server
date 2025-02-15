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
exports.cartService = void 0;
const user_model_1 = __importDefault(require("../User/user.model"));
const cart_model_1 = __importDefault(require("./cart.model"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = __importDefault(require("../Product/product.model"));
const mongoose_1 = require("mongoose");
const getCart = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = user;
    const userDetails = yield user_model_1.default.findOne({ email: email });
    if (!userDetails) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const cart = yield cart_model_1.default.findOne({ user: userDetails._id }).populate('items.product');
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Cart not found');
    }
    return cart;
});
const addToCart = (user, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = user;
    const userDetails = yield user_model_1.default.findOne({ email: email });
    if (!userDetails) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    if (product.quantity < quantity) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Requested quantity exceeds available stock');
    }
    let cart = yield cart_model_1.default.findOne({ user: userDetails._id });
    if (!cart) {
        cart = new cart_model_1.default({
            user: userDetails._id,
            items: [],
            totalPrice: 0,
        });
    }
    const cartItem = cart.items.find((item) => item.product.toString() === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    }
    else {
        cart.items.push({ product: new mongoose_1.Types.ObjectId(productId), quantity });
    }
    cart.totalPrice += product.price * quantity;
    yield cart.save();
});
// Remove product from cart
const removeFromCart = (user, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = user;
    const userDetails = yield user_model_1.default.findOne({ email: email });
    if (!userDetails) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const cart = yield cart_model_1.default.findOne({ user: userDetails._id });
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Cart not found');
    }
    const cartItemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (cartItemIndex === -1) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found in cart');
    }
    const cartItem = cart.items[cartItemIndex];
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    cart.totalPrice -= cartItem.quantity * product.price;
    cart.items.splice(cartItemIndex, 1);
    yield cart.save();
});
const updateCartQuantity = (user, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = user;
    const userDetails = yield user_model_1.default.findOne({ email: email });
    if (!userDetails) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const cart = yield cart_model_1.default.findOne({ user: userDetails._id });
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Cart not found');
    }
    const cartItem = cart.items.find((item) => item.product.toString() === productId);
    if (!cartItem) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found in cart');
    }
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    if (product.quantity < quantity) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Requested quantity exceeds available stock');
    }
    cart.totalPrice -= cartItem.quantity * product.price;
    cartItem.quantity = quantity;
    cart.totalPrice += cartItem.quantity * product.price;
    yield cart.save();
});
exports.cartService = {
    getCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
};
