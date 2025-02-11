"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/Product/product.route");
const order_route_1 = require("./app/modules/Order/order.route");
const app = (0, express_1.default)();
// Middleware setup
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Route handlers
app.use('/api/products', product_route_1.ProductRouters);
app.use('/api/orders', order_route_1.OrderRouters);
// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to BookShop backend server!');
});
exports.default = app;
