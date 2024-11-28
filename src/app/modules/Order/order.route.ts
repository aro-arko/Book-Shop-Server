import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

// Route for placing an order for a book
router.post('/', OrderControllers.orderABook);

// Route for retrieving the total revenue from all orders
router.get('/revenue', OrderControllers.getRevenue);

// Exporting the order-related routes
export const OrderRouters = router;
