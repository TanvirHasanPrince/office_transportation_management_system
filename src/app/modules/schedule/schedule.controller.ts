import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ScheduleService } from "./schedule.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { scheduleFilterableFields } from "./schedule.constants";
import { paginationFields } from "../../../constants/paginationConstants";
import { ISchedule } from "./schedule.interface";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.createSchedule(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedule Created Successfully',
    data: result,
  });
});

const getAllSchedules = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, scheduleFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ScheduleService.getAllSchedules(
    filters,
    paginationOptions,
  );

  sendResponse<ISchedule[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Schedules retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ScheduleService.deleteSchedule(id);

  sendResponse<ISchedule>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedule deleted successfully',
    data: result,
  });
});

export const ScheduleController = {
  createSchedule,
  getAllSchedules,
  deleteSchedule,
};

