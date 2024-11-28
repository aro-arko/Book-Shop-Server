"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouters = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// Route for creating a new book
router.post('/', product_controller_1.ProductControllers.createBook);
// Route for retrieving all books
router.get('/', product_controller_1.ProductControllers.getAllBooks);
// Route for retrieving a single book by its ID
router.get('/:productId', product_controller_1.ProductControllers.getSingleBook);
// Route for updating a book by its ID
router.put('/:productId', product_controller_1.ProductControllers.updateABook);
// Route for deleting a book by its ID
router.delete('/:productId', product_controller_1.ProductControllers.deleteABook);
// Exporting the router for use in the application
exports.ProductRouters = router;
