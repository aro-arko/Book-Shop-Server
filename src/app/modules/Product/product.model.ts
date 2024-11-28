import { Schema, model } from 'mongoose';
import { TBook } from './product.interface';

// creating bookSchema based on TBook Type
const bookSchema = new Schema<TBook>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
      maxlength: [50, 'Author name cannot exceed 50 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'InStock is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Middleware to handle unique constraint errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
bookSchema.post('save', function (error: any, doc: any, next: any) {
  if (error.code === 11000) {
    next(new Error('This title is already in the list.'));
  } else {
    next(error);
  }
});

// create and export the Book model
const Book = model<TBook>('Books', bookSchema);

export default Book;
