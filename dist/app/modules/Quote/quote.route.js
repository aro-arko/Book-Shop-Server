"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const quote_validation_1 = require("./quote.validation");
const quote_controller_1 = require("./quote.controller");
const router = express_1.default.Router();
router.post('/create-quote', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(quote_validation_1.QuoteValidation.createQuoteValidation), quote_controller_1.QuoteController.createQuote);
router.get('/', quote_controller_1.QuoteController.getLastQuote);
exports.QuoteRoutes = router;
