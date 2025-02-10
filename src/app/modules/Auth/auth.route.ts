import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { userValidations } from '../User/user.validation';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';
import { AuthValidation } from './auth.validation';

const router = express.Router();

// create an user('user' | 'admin')
router.post(
  '/register',
  validateRequest(userValidations.userValidationSchema),
  AuthControllers.createUser,
);

// log in as user or admin
router.post(
  '/login',
  validateRequest(userValidations.userLoginValidationSchema),
  AuthControllers.loginUser,
);

// change password
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

// forget password
router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

// reset password
router.post(
  '/reset-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

export const AuthRoutes = router;
