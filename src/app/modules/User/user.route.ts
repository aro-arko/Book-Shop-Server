import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUser);
router.patch(
  '/:userEmail',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.updateUser,
);
router.get('/all/stats', UserControllers.getAllUserStats);
router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.getMe);
router.get('/:userId', auth(USER_ROLE.admin), UserControllers.getUserById);

export const UserRoutes = router;
