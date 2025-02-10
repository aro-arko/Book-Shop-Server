import express from 'express';
import auth from '../../middlewares/auth';
import { AdminControllers } from './admin.controller';

const router = express.Router();

// block user
router.patch('/users/:email/block', auth('admin'), AdminControllers.blockUser);

export const AdminRoutes = router;
