"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const cartRouter = express_1.default.Router();
// Route to get the cart
cartRouter.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), cart_controller_1.cartController.getCart);
// Route to add an item to the cart
cartRouter.post('/add', (0, auth_1.default)(user_constant_1.USER_ROLE.user), cart_controller_1.cartController.addToCart);
// Route to remove an item from the cart
cartRouter.delete('/remove/:productId', (0, auth_1.default)(user_constant_1.USER_ROLE.user), cart_controller_1.cartController.removeFromCart);
// Route to update the quantity of an item in the cart
cartRouter.put('/update/:productId', (0, auth_1.default)(user_constant_1.USER_ROLE.user), cart_controller_1.cartController.updateCartQuantity);
exports.default = cartRouter;
