import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { DriverService } from './driver.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createDriver = catchAsync(async (req: Request, res: Response) => {
  const result = await DriverService.createDriver(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver Created Successfully',
    data: result,
  });
});

export const DriverController = {
  createDriver,
};
