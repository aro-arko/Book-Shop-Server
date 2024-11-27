import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post('/', OrderControllers.orderABook);
router.get('/revenue', OrderControllers.getRevenue);

export const OrderRouters = router;
