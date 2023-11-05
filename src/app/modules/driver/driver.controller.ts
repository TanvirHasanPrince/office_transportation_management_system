import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { DriverService } from './driver.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { driverFilterableFields } from './driver.constants';
import { paginationFields } from '../../../constants/paginationConstants';
import { IDriver } from './driver.interface';

const createDriver = catchAsync(async (req: Request, res: Response) => {
  const result = await DriverService.createDriver(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver Created Successfully',
    data: result,
  });
});


const getAllDrivers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, driverFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await DriverService.getAllDrivers(
    filters,
    paginationOptions,
  );

  sendResponse<IDriver[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Drivers retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDriver = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DriverService.getSingleDriver(id);

  sendResponse<IDriver>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver retrieved successfully',
    data: result,
  });
});

const updateDriver = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await DriverService.updateDriver(id, updatedData);

  sendResponse<IDriver>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver updated successfully',
    data: result,
  });
});

const deleteDriver = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DriverService.deleteDriver(id);

  sendResponse<IDriver>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver deleted successfully',
    data: result,
  });
});

export const DriverController = {
  createDriver,
  getAllDrivers,
  getSingleDriver,
  updateDriver,
  deleteDriver,
};



