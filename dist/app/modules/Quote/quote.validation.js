"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteValidation = void 0;
const zod_1 = require("zod");
const createQuoteValidation = zod_1.z.object({
    body: zod_1.z.object({
        userImg: zod_1.z.string({
            required_error: 'User image is required',
        }),
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        quote: zod_1.z
            .string({
            required_error: 'Quote is required',
        })
            .min(10, {
            message: 'Quote must be at least 10 characters long',
        }),
    }),
});
exports.QuoteValidation = {
    createQuoteValidation,
};
