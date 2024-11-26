import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();
router.post('/', ProductControllers.createBook);
router.get('/', ProductControllers.getAllBooks);
router.get('/:productId', ProductControllers.getSingleBook);
router.put('/:productId', ProductControllers.updateABook);
router.delete('/:productId', ProductControllers.deleteABook);

export const ProductRouters = router;
