"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QuoteSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
const Quote = (0, mongoose_1.model)('Quote', QuoteSchema);
exports.default = Quote;
