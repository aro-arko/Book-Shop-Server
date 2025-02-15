"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
const bookSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        author: zod_1.z.string().min(1, 'Author is required'),
        price: zod_1.z.number().positive('Price must be a positive number'),
        category: zod_1.z.string().min(1, 'Category is required'),
        description: zod_1.z
            .string()
            .min(10, 'Description must be at least 10 characters long'),
        image: zod_1.z.string(),
        quantity: zod_1.z
            .number()
            .int()
            .nonnegative('Quantity must be a non-negative integer'),
        inStock: zod_1.z.boolean(),
    }),
});
// update book schema
const updateBookSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required').optional(),
        author: zod_1.z.string().min(1, 'Author is required').optional(),
        price: zod_1.z.number().positive('Price must be a positive number').optional(),
        category: zod_1.z.string().min(1, 'Category is required').optional(),
        description: zod_1.z
            .string()
            .min(10, 'Description must be at least 10 characters long')
            .optional(),
        image: zod_1.z.string().optional(),
        quantity: zod_1.z
            .number()
            .int()
            .nonnegative('Quantity must be a non-negative integer')
            .optional(),
        inStock: zod_1.z.boolean().optional(),
    }),
});
exports.productValidationSchema = { bookSchema, updateBookSchema };
