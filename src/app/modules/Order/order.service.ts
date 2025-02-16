import Order from './order.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Product from '../Product/product.model';
import { orderUtils } from './order.utils';
import { JwtPayload } from 'jsonwebtoken';
import User from '../User/user.model';

const createOrder = async (
  user: JwtPayload,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string,
) => {
  if (!payload?.products?.length)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');

  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findById(item.product);
      if (
        (product && product?.quantity < item.quantity) ||
        product?.quantity == 0
      ) {
        throw new AppError(
          httpStatus.NOT_ACCEPTABLE,
          'Product is out of stock',
        );
      }
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    }),
  );

  const { email } = user;
  // console.log(email);

  const userDocument = await User.findOne({ email });
  const userId = userDocument?._id;
  // console.log(userId);

  let order = await Order.create({
    user: userId,
    products: productDetails,
    totalPrice,
  });

  const userData = await User.findById(userId);

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: userData?.name,
    customer_address: userData?.address,
    customer_email: userData?.email,
    customer_phone: userData?.phone,
    customer_city: userData?.city,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const getOrders = async () => {
  const data = await Order.find().sort({ createdAt: -1 });
  return data;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    const updatedOrder = await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
      { new: true },
    );

    if (verifiedPayment[0].bank_status == 'Success') {
      // Reduce product quantity and update inStock status
      for (const item of updatedOrder!.products) {
        const product = await Product.findById(item.product);
        if (product) {
          product.quantity -= item.quantity;
          if (product.quantity <= 0) {
            product.inStock = false;
          }
          await product.save();
        }
      }
    }
  }

  return verifiedPayment;
};

const getAllOrders = async () => {
  const orders = await Order.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
  return orders;
};

const getSingleOrder = async (orderId: string) => {
  const order = await Order.findById(orderId);
  if (!order) throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  return order;
};

export const orderService = {
  createOrder,
  getOrders,
  verifyPayment,
  getAllOrders,
  getSingleOrder,
};
