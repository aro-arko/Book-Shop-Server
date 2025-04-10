import { model, Schema } from 'mongoose';
import { TQuote } from './quote.interface';

const QuoteSchema = new Schema<TQuote>(
  {
    userImg: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Quote = model<TQuote>('Quote', QuoteSchema);
export default Quote;
