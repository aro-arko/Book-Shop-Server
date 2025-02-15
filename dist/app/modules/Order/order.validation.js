"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const orderSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email({ message: 'Please provide a valid email address' }),
        product: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
            message: 'Invalid product ID',
        }),
        quantity: zod_1.z.number().min(1, { message: 'Quantity must be at least 1' }),
        totalPrice: zod_1.z
            .number()
            .min(0, { message: 'Total price must be at least 0' })
            .int({ message: 'Total price must be an integer value' }),
    }),
});
exports.orderValidationSchema = { orderSchema };
