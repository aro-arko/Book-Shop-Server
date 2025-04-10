import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { quoteService } from './quote.service';

const createQuote = catchAsync(async (req, res) => {
  const quote = req.body;

  const result = await quoteService.createQuote(quote);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Quote created successfully',
    data: result,
  });
});

const getLastQuote = catchAsync(async (req, res) => {
  const result = await quoteService.getLastQuote();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quote retrieved successfully',
    data: result,
  });
});

export const QuoteController = {
  createQuote,
  getLastQuote,
};
