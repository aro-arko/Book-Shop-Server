"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        maxlength: [50, 'Author name cannot exceed 50 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
        type: Boolean,
        required: [true, 'InStock is required'],
    },
}, {
    timestamps: true,
    versionKey: false,
});
// Middleware to handle unique constraint errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
ProductSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
        next(new Error('This title is already in the list.'));
    }
    else {
        next(error);
    }
});
// Create and export the Book model
const Product = (0, mongoose_1.model)('Product', ProductSchema);
exports.default = Product;
