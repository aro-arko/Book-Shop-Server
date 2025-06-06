"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
// Middleware setup
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        'https://bookshop-frontend-six.vercel.app',
        'http://localhost:5173',
    ],
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
}));
app.use(body_parser_1.default.json());
// Route handlers
app.use('/api', routes_1.default);
// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to BookShop backend server!');
});
app.use(notFound_1.default);
app.use(globalErrorHandler_1.default);
exports.default = app;
