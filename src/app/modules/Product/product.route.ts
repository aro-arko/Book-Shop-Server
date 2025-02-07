import express from 'express';
import { ProductControllers } from './product.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { productValidationSchema } from './product.validation';

const router = express.Router();

// Route for creating a new book
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(productValidationSchema.bookSchema),
  ProductControllers.createBook,
);

// Route for retrieving all books
router.get('/', ProductControllers.getAllBooks);

// Route for retrieving a single book by its ID
router.get('/:productId', ProductControllers.getSingleBook);

// Route for updating a book by its ID
router.put(
  '/:productId',
  auth(USER_ROLE.admin),
  validateRequest(productValidationSchema.updateBookSchema),
  ProductControllers.updateABook,
);

// Route for deleting a book by its ID
router.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  ProductControllers.deleteABook,
);

// Exporting the router for use in the application
export const ProductRoutes = router;
