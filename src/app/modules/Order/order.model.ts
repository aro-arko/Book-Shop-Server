import mongoose, { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

// creating a schema for an Order based on TOrder type
const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price must be at least 0'],
      validate: {
        validator: function (value: number) {
          return Number.isInteger(value);
        },
        message: 'Total price must be an integer value',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// creating and exporting the Order model
const Order = model<TOrder>('Order', orderSchema);
export default Order;
