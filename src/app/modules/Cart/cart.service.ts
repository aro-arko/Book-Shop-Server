import { JwtPayload } from 'jsonwebtoken';
import User from '../User/user.model';
import CartModel from './cart.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Product from '../Product/product.model';
import { Types } from 'mongoose';

const getCart = async (user: JwtPayload) => {
  const { email } = user;
  const userDetails = await User.findOne({ email: email });

  if (!userDetails) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const cart = await CartModel.findOne({ user: userDetails._id }).populate(
    'items.product',
  );

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found');
  }

  return cart;
};

const addToCart = async (
  user: JwtPayload,
  productId: string,
  quantity: number,
) => {
  const { email } = user;
  const userDetails = await User.findOne({ email: email });

  if (!userDetails) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  if (product.quantity < quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Requested quantity exceeds available stock',
    );
  }

  let cart = await CartModel.findOne({ user: userDetails._id });

  if (!cart) {
    cart = new CartModel({
      user: userDetails._id,
      items: [],
      totalPrice: 0,
    });
  }

  const cartItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.items.push({ product: new Types.ObjectId(productId), quantity });
  }

  cart.totalPrice += product.price * quantity;

  await cart.save();
};

const removeFromCart = async (user: JwtPayload, productId: string) => {
  const { email } = user;
  const userDetails = await User.findOne({ email: email });

  if (!userDetails) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const cart = await CartModel.findOne({ user: userDetails._id });

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found');
  }

  const cartItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );
  if (cartItemIndex === -1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found in cart');
  }

  const cartItem = cart.items[cartItemIndex];
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  cart.totalPrice -= cartItem.quantity * product.price;
  cart.items.splice(cartItemIndex, 1);

  await cart.save();
};

const updateCartQuantity = async (
  user: JwtPayload,
  productId: string,
  quantity: number,
) => {
  const { email } = user;
  const userDetails = await User.findOne({ email: email });

  if (!userDetails) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const cart = await CartModel.findOne({ user: userDetails._id });

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found');
  }

  const cartItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );
  if (!cartItem) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found in cart');
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  if (product.quantity < quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Requested quantity exceeds available stock',
    );
  }

  cart.totalPrice -= cartItem.quantity * product.price;
  cartItem.quantity = quantity;
  cart.totalPrice += cartItem.quantity * product.price;

  await cart.save();
};

export const cartService = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
};
