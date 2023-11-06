import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ISchedule, IScheduleFilters } from './schedule.interface';
import { Schedule } from './schedule.model';
import { Driver } from '../driver/driver.model';
import { Location } from '../location/location.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { scheduleSearchableFields } from './schedule.constants';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const createSchedule = async (schedule: ISchedule): Promise<ISchedule> => {
  const { driver, location } = schedule;

  // Check if the driver exists in the database
  const existingDriver = await Driver.findById(driver);

  if (!existingDriver) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to find driver');
  }

  const existingLocation = await Location.findById(location);

  if (!existingLocation) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to find location');
  }

  const createdSchedule = await Schedule.create(schedule);

  if (!createdSchedule) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Schedule');
  }

  return createdSchedule;
};


const getAllSchedules = async (
  filters: IScheduleFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ISchedule[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: scheduleSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Schedule.find(whereCondition)
    .populate('driver')
    .populate('location')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Schedule.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};


export const ScheduleService = {
  createSchedule,
  getAllSchedules,
};
