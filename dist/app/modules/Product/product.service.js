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
exports.ProductServices = void 0;
const product_model_1 = __importDefault(require("./product.model"));
// create and insert book data into database
const createBookIntoDB = (new_book) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(new_book);
    return result;
});
// finding all the books from our database
const getAllBooks = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (searchTerm) {
        // If searchTerm exists
        result = yield product_model_1.default.find({
            $or: [
                // going with case insensitive
                { title: { $regex: searchTerm, $options: 'i' } },
                { author: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
            ],
        });
    }
    else {
        // Otherwise, fetch all books
        result = yield product_model_1.default.find();
    }
    if (result.length > 0) {
        return result;
    }
    else {
        throw new Error('No books found!');
    }
});
// find individual book by their id
const getSingleBook = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield product_model_1.default.findById(productId);
    if (!book) {
        throw new Error('Book not found');
    }
    const result = yield product_model_1.default.findOne({
        _id: productId,
    });
    // console.log(result);
    return result;
});
// update individual book data by their respective productId
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateABook = (productId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield product_model_1.default.findById(productId);
    if (!book) {
        throw new Error('Book not found!');
    }
    const result = yield product_model_1.default.findByIdAndUpdate(productId, { $set: updateData }, { new: true, runValidators: true });
    return result;
});
// deleting a book
const deleteABook = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield product_model_1.default.findById(productId);
    if (!book) {
        throw new Error('Book not found!');
    }
    const result = product_model_1.default.findByIdAndDelete(productId, { new: true });
    return result;
});
// Exporting all product-related services
exports.ProductServices = {
    createBookIntoDB,
    getAllBooks,
    getSingleBook,
    updateABook,
    deleteABook,
};
