"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartItemSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
});
const cartSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    timestamps: true,
    versionKey: false,
});
const Cart = (0, mongoose_1.model)('Cart', cartSchema);
exports.default = Cart;
