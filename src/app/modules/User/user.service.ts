import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import User from './user.model';
import httpStatus from 'http-status';

const getAllUserFromDB = async () => {
  const result = User.find();
  return result;
};

const updateUserInDB = async (
  currentUserEmail: string,
  userEmail: string,
  payLoad: IUser,
) => {
  if (currentUserEmail !== userEmail) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to update this user',
    );
  }
  const result = await User.findOneAndUpdate({ email: userEmail }, payLoad, {
    new: true,
  });
  return result;
};

const getMeFromDB = async (email: string) => {
  const result = await User.findOne({ email: email });
  return result;
};

const getUserByIdFromDB = async (userId: string) => {
  const result = await User.findById(userId);
  return result;
};

const getAllUserStatsFromDB = async () => {
  const result = (await User.find({ role: 'user' })).length;
  return result;
};

export const UserServices = {
  getAllUserFromDB,
  updateUserInDB,
  getMeFromDB,
  getUserByIdFromDB,
  getAllUserStatsFromDB,
};
