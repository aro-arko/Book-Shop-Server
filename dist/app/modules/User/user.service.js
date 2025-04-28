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
exports.UserServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("./user.model"));
const http_status_1 = __importDefault(require("http-status"));
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.default.find();
    return result;
});
const updateUserInDB = (currentUserEmail, userEmail, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    if (currentUserEmail !== userEmail) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to update this user');
    }
    const result = yield user_model_1.default.findOneAndUpdate({ email: userEmail }, payLoad, {
        new: true,
    });
    return result;
});
const getMeFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ email: email });
    return result;
});
const getUserByIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById(userId);
    return result;
});
const getAllUserStatsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield user_model_1.default.find({ role: 'user' })).length;
    return result;
});
exports.UserServices = {
    getAllUserFromDB,
    updateUserInDB,
    getMeFromDB,
    getUserByIdFromDB,
    getAllUserStatsFromDB,
};
