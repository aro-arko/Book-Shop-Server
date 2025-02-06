import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { email } = req.params;

  await AdminServices.blockUserIntoDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
  });
});

// const deleteBlog = catchAsync(async (req, res) => {
//   const { id } = req.params;

//   await AdminServices.deleteBlogFromDB(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Blog deleted successfully',
//   });
// });

export const AdminControllers = {
  blockUser,
  //   deleteBlog,
};
