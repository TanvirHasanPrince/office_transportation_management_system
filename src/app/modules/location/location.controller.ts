import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { LocationService } from "./location.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ILocation } from "./location.interface";
import pick from "../../../shared/pick";
import { locationFilterableFields } from "./location.constants";
import { paginationFields } from "../../../constants/paginationConstants";

const createLocation = catchAsync(async (req: Request, res: Response) => {
  const result = await LocationService.createLocation(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Location Created Successfully',
    data: result,
  });
});

const getAllLocations = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, locationFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await LocationService.getAllLocations(
    filters,
    paginationOptions,
  );

  sendResponse<ILocation[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Locations retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleLocation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await LocationService.getSingleLocation(id);

  sendResponse<ILocation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Location retrieved successfully',
    data: result,
  });
});

const updateLocation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await LocationService.updateLocation(id, updatedData);

  sendResponse<ILocation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Location updated successfully',
    data: result,
  });
});

const deleteLocation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await LocationService.deleteLocation(id);

  sendResponse<ILocation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Location deleted successfully',
    data: result,
  });
});

export const LocationController = {
  createLocation,
  getAllLocations,
  getSingleLocation,
  deleteLocation,
  updateLocation,
};

