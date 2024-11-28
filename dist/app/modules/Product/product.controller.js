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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
// creating a new book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = req.body;
        const result = yield product_service_1.ProductServices.createBookIntoDB(bookData);
        res.status(200).json({
            message: 'Book created successfully',
            success: true,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
// retrieving all books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductServices.getAllBooks();
        res.status(200).json({
            message: 'Books retrieved successfully',
            status: true,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
// retrieving a single book by its ID
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        // console.log(productId);
        const result = yield product_service_1.ProductServices.getSingleBook(productId);
        res.status(200).json({
            message: 'Book retrieved successfully',
            status: true,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
// updating a book by its ID
const updateABook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const newData = req.body;
        const result = yield product_service_1.ProductServices.updateABook(productId, newData);
        res.status(200).json({
            message: 'Book updated successfully',
            status: true,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
// deleting a book by its ID
const deleteABook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const result = yield product_service_1.ProductServices.deleteABook(productId);
        res.status(200).json({
            message: 'Book deleted successfully',
            status: true,
            data: {},
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
// Export all product-related controllers
exports.ProductControllers = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateABook,
    deleteABook,
};
