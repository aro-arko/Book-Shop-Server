"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const config_1 = __importDefault(require("../config"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../modules/User/user.model"));
const AppError_1 = __importDefault(require("../errors/AppError"));
// Authorization middleware to check user roles
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Retrieve token from headers
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
        }
        const token = authHeader;
        try {
            // Verify the token and decode it
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            const { email, role } = decoded;
            // Check if user exists
            const user = yield user_model_1.default.findOne({ email: email });
            if (!user) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!');
            }
            // Check if the user's role is authorized
            if (requiredRoles.length && !requiredRoles.includes(role)) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
            }
            // Attach user information to the request object
            req.user = decoded;
            next();
        }
        catch (error) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid or expired token!');
        }
    }));
};
exports.default = auth;
