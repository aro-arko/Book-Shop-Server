import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

// Route for creating a new book
router.post('/', ProductControllers.createBook);

// Route for retrieving all books
router.get('/', ProductControllers.getAllBooks);

// Route for retrieving a single book by its ID
router.get('/:productId', ProductControllers.getSingleBook);

// Route for updating a book by its ID
router.put('/:productId', ProductControllers.updateABook);

// Route for deleting a book by its ID
router.delete('/:productId', ProductControllers.deleteABook);

// Exporting the router for use in the application
export const ProductRouters = router;
