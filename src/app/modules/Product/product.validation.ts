import { z } from 'zod';

const bookSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    author: z.string().min(1, 'Author is required'),
    price: z.number().positive('Price must be a positive number'),
    category: z.string().min(1, 'Category is required'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long'),
    image: z.string(),
    quantity: z
      .number()
      .int()
      .nonnegative('Quantity must be a non-negative integer'),
    inStock: z.boolean(),
  }),
});

// update book schema
const updateBookSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    author: z.string().min(1, 'Author is required').optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    category: z.string().min(1, 'Category is required').optional(),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long')
      .optional(),
    image: z.string().optional(),
    quantity: z
      .number()
      .int()
      .nonnegative('Quantity must be a non-negative integer')
      .optional(),
    inStock: z.boolean().optional(),
  }),
});

export const productValidationSchema = { bookSchema, updateBookSchema };
