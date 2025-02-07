import express from 'express';
import { cartController } from './cart.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const cartRouter = express.Router();

// Route to get the cart
cartRouter.get('/', auth(USER_ROLE.user), cartController.getCart);

// Route to add an item to the cart
cartRouter.post('/add', auth(USER_ROLE.user), cartController.addToCart);

// Route to remove an item from the cart
cartRouter.delete(
  '/remove/:productId',
  auth(USER_ROLE.user),
  cartController.removeFromCart,
);

// Route to update the quantity of an item in the cart
cartRouter.put(
  '/update/:productId',
  auth(USER_ROLE.user),
  cartController.updateCartQuantity,
);

export default cartRouter;
