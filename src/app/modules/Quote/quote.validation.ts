import { z } from 'zod';

const createQuoteValidation = z.object({
  body: z.object({
    userImg: z.string({
      required_error: 'User image is required',
    }),
    name: z.string({
      required_error: 'Name is required',
    }),
    quote: z
      .string({
        required_error: 'Quote is required',
      })
      .min(10, {
        message: 'Quote must be at least 10 characters long',
      }),
  }),
});

export const QuoteValidation = {
  createQuoteValidation,
};
