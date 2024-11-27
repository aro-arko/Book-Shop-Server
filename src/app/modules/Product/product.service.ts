import { TBook } from './product.interface';
import Book from './product.model';

// create and insert book data into database
const createBookIntoDB = async (new_book: TBook) => {
  const result = await Book.create(new_book);
  return result;
};

// finding all the books from our database
const getAllBooks = async () => {
  const result = await Book.find();
  if (result.length > 0) {
    return result;
  } else {
    throw new Error('Book list is empty!');
  }
};

// find individual book by their id
const getSingleBook = async (productId: string) => {
  const book = await Book.findById(productId);
  if (!book) {
    throw new Error('Book not found');
  }

  const result = await Book.findOne({
    _id: productId,
  });
  // console.log(result);
  return result;
};

// update individual book data by their respective productId
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateABook = async (productId: string, updateData: any) => {
  const book = await Book.findById(productId);
  if (!book) {
    throw new Error('Book not found!');
  }
  const result = await Book.findByIdAndUpdate(
    productId,
    { $set: updateData },
    { new: true, runValidators: true },
  );
  return result;
};

// deleting a book
const deleteABook = async (productId: string) => {
  const book = await Book.findById(productId);
  if (!book) {
    throw new Error('Book not found!');
  }
  const result = Book.findByIdAndDelete(productId, { new: true });
  return result;
};

export const ProductServices = {
  createBookIntoDB,
  getAllBooks,
  getSingleBook,
  updateABook,
  deleteABook,
};
