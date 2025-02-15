"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const router = express_1.default.Router();
// Route for creating a new book
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(product_validation_1.productValidationSchema.bookSchema), product_controller_1.ProductControllers.createBook);
// Route for retrieving all books
router.get('/', product_controller_1.ProductControllers.getAllBooks);
// Route for retrieving a single book by its ID
router.get('/:productId', product_controller_1.ProductControllers.getSingleBook);
// Route for updating a book by its ID
router.put('/:productId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(product_validation_1.productValidationSchema.updateBookSchema), product_controller_1.ProductControllers.updateABook);
// Route for deleting a book by its ID
router.delete('/:productId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), product_controller_1.ProductControllers.deleteABook);
// Exporting the router for use in the application
exports.ProductRoutes = router;
