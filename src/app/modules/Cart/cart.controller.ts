import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { cartService } from './cart.service';

const getCart = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await cartService.getCart(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart retrieved successfully',
    data: result,
  });
});

const addToCart = catchAsync(async (req, res) => {
  const user = req.user;
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  await cartService.addToCart(user, productId, quantity);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product added to cart successfully',
  });
});

const removeFromCart = catchAsync(async (req, res) => {
  const user = req.user;
  const productId = req.params.productId;

  await cartService.removeFromCart(user, productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product removed from cart successfully',
  });
});

const updateCartQuantity = catchAsync(async (req, res) => {
  const user = req.user;
  const productId = req.params.productId;
  const quantity = req.body.quantity;

  await cartService.updateCartQuantity(user, productId, quantity);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart updated successfully',
  });
});

export const cartController = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
};
