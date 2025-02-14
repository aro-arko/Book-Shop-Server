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
  userId: string,
  payLoad: IUser,
) => {
  const currentUser = await User.findOne({ email: currentUserEmail });
  const currentUserId = currentUser?._id.toString();
  // console.log(currentUserId, userId);

  if (currentUserId !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to update this user',
    );
  }
  const result = User.findByIdAndUpdate(userId, payLoad, { new: true });
  return result;
};

export const UserServices = {
  getAllUserFromDB,
  updateUserInDB,
};
