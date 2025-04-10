import { TQuote } from './quote.interface';
import Quote from './quote.model';

const createQuote = async (payLoad: TQuote) => {
  const quote = await Quote.create(payLoad);
  return quote;
};

const getLastQuote = async () => {
  const lastQuote = await Quote.findOne({}).sort({ createdAt: -1 });
  return lastQuote;
};

export const quoteService = {
  createQuote,
  getLastQuote,
};
