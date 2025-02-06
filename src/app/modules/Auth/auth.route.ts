import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { userValidations } from '../User/user.validation';

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

export const AuthRoutes = router;
