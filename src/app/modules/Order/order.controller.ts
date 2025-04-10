import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderService } from './order.service';
import httpStatus from 'http-status';

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  // console.log(user);
  // console.log(req.body);
  const order = await orderService.createOrder(user, req.body, req.ip!);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order placed successfully',
    data: order,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const user = req.user.email;
  const order = await orderService.getOrders(user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order retrieved successfully',
    data: order,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order verified successfully',
    data: order,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getAllOrders();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: orders,
  });
});
const getAllOrdersStats = catchAsync(async (req, res) => {
  const orders = await orderService.getAllOrdersStats();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: orders,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const order = await orderService.getSingleOrder(req.params.orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: order,
  });
});

export const orderController = {
  createOrder,
  verifyPayment,
  getOrders,
  getAllOrders,
  getAllOrdersStats,
  getSingleOrder,
};
