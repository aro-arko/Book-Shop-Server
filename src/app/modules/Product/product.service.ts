import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchAbleFields } from './product.constant';
import { TProduct } from './product.interface';
import Product from './product.model';

// create and insert book data into database
const createBookIntoDB = async (new_book: TProduct) => {
  const result = await Product.create(new_book);
  return result;
};

// finding all the books from our database
const getAllBooks = async (query: Record<string, unknown>) => {
  // let result;
  const productsQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productsQuery.modelQuery;
  return result;
};

// find individual book by their id
const getSingleBook = async (productId: string) => {
  const book = await Product.findById(productId);
  if (!book) {
    throw new Error('Book not found');
  }

  const result = await Product.findOne({
    _id: productId,
  });
  // console.log(result);
  return result;
};

// update individual book data by their respective productId
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateABook = async (productId: string, updateData: any) => {
  const book = await Product.findById(productId);
  if (!book) {
    throw new Error('Book not found!');
  }
  const result = await Product.findByIdAndUpdate(
    productId,
    { $set: updateData },
    { new: true, runValidators: true },
  );
  return result;
};

// deleting a book
const deleteABook = async (productId: string) => {
  const book = await Product.findById(productId);
  if (!book) {
    throw new Error('Book not found!');
  }
  const result = Product.findByIdAndDelete(productId, { new: true });
  return result;
};

// Exporting all product-related services
export const ProductServices = {
  createBookIntoDB,
  getAllBooks,
  getSingleBook,
  updateABook,
  deleteABook,
};
