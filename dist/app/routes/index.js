"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/User/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const product_route_1 = require("../modules/Product/product.route");
const order_route_1 = __importDefault(require("../modules/Order/order.route"));
const cart_route_1 = __importDefault(require("../modules/Cart/cart.route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/product',
        route: product_route_1.ProductRoutes,
    },
    {
        path: '/order',
        route: order_route_1.default,
    },
    {
        path: '/cart',
        route: cart_route_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
