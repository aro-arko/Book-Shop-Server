import { Request, Response } from 'express';
import { TBook } from './product.interface';
import { ProductServices } from './product.service';

// creating a new book
const createBook = async (req: Request, res: Response) => {
  try {
    const bookData: TBook = req.body;
    const result = await ProductServices.createBookIntoDB(bookData);
    res.status(200).json({
      message: 'Book created successfully',
      success: true,
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

// retrieving all books
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllBooks(req.query);
    res.status(200).json({
      message: 'Books retrieved successfully',
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

// retrieving a single book by its ID
const getSingleBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    // console.log(productId);
    const result = await ProductServices.getSingleBook(productId);
    res.status(200).json({
      message: 'Book retrieved successfully',
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

// updating a book by its ID
const updateABook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const newData = req.body;
    const result = await ProductServices.updateABook(productId, newData);
    res.status(200).json({
      message: 'Book updated successfully',
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

// deleting a book by its ID
const deleteABook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result = await ProductServices.deleteABook(productId);
    res.status(200).json({
      message: 'Book deleted successfully',
      status: true,
      data: {},
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

// Export all product-related controllers
export const ProductControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateABook,
  deleteABook,
};
