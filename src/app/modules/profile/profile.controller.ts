/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { ProfileService } from './profile.service';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const role = user.role; // Assuming user object has a 'role' property

  let result;

  switch (role) {
    case 'driver':
      result = await ProfileService.getDriverProfile(user);
      break;
    case 'employee':
      result = await ProfileService.getEmployeeProfile(user);
      break;
    case 'admin':
      result = await ProfileService.getAdminProfile(user);
      break;
    default:
      result = null;
  }

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Profile not found',
      data: null,
    });
    return;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

export const ProfileController = {
  getProfile,
};
