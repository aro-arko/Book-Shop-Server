import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { orderController } from './order.controller';

const orderRouter = Router();

orderRouter.get('/verify', auth(USER_ROLE.user), orderController.verifyPayment);

orderRouter
  .route('/')
  .post(auth(USER_ROLE.user), orderController.createOrder)
  .get(auth(USER_ROLE.user), orderController.getOrders);

orderRouter.get('/all', auth(USER_ROLE.admin), orderController.getAllOrders);

export default orderRouter;
