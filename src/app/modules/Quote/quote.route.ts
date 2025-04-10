import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { QuoteValidation } from './quote.validation';
import { QuoteController } from './quote.controller';

const router = express.Router();

router.post(
  '/create-quote',
  auth(USER_ROLE.admin),
  validateRequest(QuoteValidation.createQuoteValidation),
  QuoteController.createQuote,
);

router.get('/', QuoteController.getLastQuote);

export const QuoteRoutes = router;
