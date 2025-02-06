import express from 'express';
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidationSchema } from './order.validation';

const router = express.Router();

// Route for placing an order for a book
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(orderValidationSchema.orderSchema),
  OrderControllers.orderABook,
);

// Route for retrieving the total revenue from all orders
router.get('/revenue', auth(USER_ROLE.admin), OrderControllers.getRevenue);

// Exporting the order-related routes
export const OrderRoutes = router;
