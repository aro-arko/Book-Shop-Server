"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const user_validation_1 = require("../User/user.validation");
const user_constant_1 = require("../User/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
// create an user('user' | 'admin')
router.post('/register', (0, validateRequest_1.default)(user_validation_1.userValidations.userValidationSchema), auth_controller_1.AuthControllers.createUser);
// log in as user or admin
router.post('/login', (0, validateRequest_1.default)(user_validation_1.userValidations.userLoginValidationSchema), auth_controller_1.AuthControllers.loginUser);
// change password
router.post('/change-password', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(auth_validation_1.AuthValidation.changePasswordValidationSchema), auth_controller_1.AuthControllers.changePassword);
// forget password
router.post('/forget-password', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.forgetPasswordValidationSchema), auth_controller_1.AuthControllers.forgetPassword);
// reset password
router.post('/reset-password', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.forgetPasswordValidationSchema), auth_controller_1.AuthControllers.resetPassword);
exports.AuthRoutes = router;
