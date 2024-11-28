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
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
// handle the creation of an order
const orderABook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const result = yield order_service_1.OrderServices.createOrderIntoDB(orderData);
        res.status(200).json({
            message: 'Order created successfully',
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
// handle fetching the total revenue from orders
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderServices.getRevenue();
    try {
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            // if result available unless set to 0
            data: result || {
                totalRevenue: 0,
            },
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
// Exporting the controllers for use in the routes
exports.OrderControllers = {
    orderABook,
    getRevenue,
};
