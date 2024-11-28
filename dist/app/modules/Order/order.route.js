"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouters = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
// Route for placing an order for a book
router.post('/', order_controller_1.OrderControllers.orderABook);
// Route for retrieving the total revenue from all orders
router.get('/revenue', order_controller_1.OrderControllers.getRevenue);
// Exporting the order-related routes
exports.OrderRouters = router;
