import Book from '../Product/product.model';
import { TOrder } from './order.interface';
import Order from './order.model';

const createOrderIntoDB = async (new_order: TOrder) => {
  // Find the product
  const book = await Book.findById(new_order.product);
  if (!book) {
    throw new Error('Product not found');
  }

  // Check if the quantity is sufficient
  if (book.quantity < new_order.quantity) {
    throw new Error(`Insufficient stock. Available quantity: ${book.quantity}`);
  }

  // Calculate the expected total price
  const expectedTotalPrice = book.price * new_order.quantity;

  // Check if the provided total price matches the expected price
  if (new_order.totalPrice !== expectedTotalPrice) {
    throw new Error(
      `Incorrect total price. Expected ${expectedTotalPrice}, but got ${new_order.totalPrice}`,
    );
  }

  // Decrease the quantity in the product model and update inStock if needed
  const updatedBook = await Book.findByIdAndUpdate(
    new_order.product,
    {
      $inc: { quantity: -new_order.quantity },
      $set: {
        inStock: book.quantity - new_order.quantity <= 0 ? false : book.inStock,
      },
    },
    { new: true },
  );

  // If the book update fails, throw an error
  if (!updatedBook) {
    throw new Error('Failed to update product data');
  }

  // Create the order and store it in the database
  const result = await Order.create(new_order);

  return result;
};

// calculate the total revenue from orders
const getRevenue = async () => {
  const [result] = await Order.aggregate([
    {
      // reference from books collection
      $lookup: {
        from: 'books',
        localField: 'product',
        foreignField: '_id',
        as: 'bookDetails',
      },
    },
    // breaking down bookDetails array fields
    {
      $unwind: '$bookDetails',
    },
    // adding new field name: revenue & performing multiplication with the book price with order quantity
    {
      $addFields: {
        revenue: {
          $multiply: ['$bookDetails.price', '$quantity'],
        },
      },
    },
    // grouping all together - not id wise - and all the revenue that performed via _id is counted total here
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$revenue' },
      },
    },
    // just to present the totalRevenue in output
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getRevenue,
};
