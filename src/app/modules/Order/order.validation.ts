import mongoose from 'mongoose';
import { z } from 'zod';

const orderSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({ message: 'Please provide a valid email address' }),
    product: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid product ID',
    }),
    quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
    totalPrice: z
      .number()
      .min(0, { message: 'Total price must be at least 0' })
      .int({ message: 'Total price must be an integer value' }),
  }),
});

export const orderValidationSchema = { orderSchema };
