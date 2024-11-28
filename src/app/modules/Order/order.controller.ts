import { Request, Response } from 'express';
import { TOrder } from './order.interface';
import { OrderServices } from './order.service';

// handle the creation of an order
const orderABook = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = req.body;
    const result = await OrderServices.createOrderIntoDB(orderData);
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

// handle fetching the total revenue from orders
const getRevenue = async (req: Request, res: Response) => {
  const result = await OrderServices.getRevenue();
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
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

// Exporting the controllers for use in the routes
export const OrderControllers = {
  orderABook,
  getRevenue,
};
