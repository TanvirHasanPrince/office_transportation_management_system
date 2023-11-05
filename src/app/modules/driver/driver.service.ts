import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IDriver, IDriverFilters } from "./driver.interface";
import { Driver } from "./driver.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { driverSearchableFields } from "./driver.constants";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { SortOrder } from "mongoose";

const createDriver = async (driver: IDriver): Promise<IDriver> => {
  const createdDriver = await Driver.create(driver);

  if (!createdDriver) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Driver');
  }

  return createdDriver;
};


const getAllDrivers = async (
  filters: IDriverFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IDriver[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: driverSearchableFields.map(field => ({
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

  const result = await Driver.find(whereCondition)

    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Driver.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDriver = async (id: string): Promise<IDriver | null> => {
  const result = await Driver.findById(id);
  return result;
};

const updateDriver = async (
  id: string,
  payload: Partial<IDriver>,
): Promise<IDriver | null> => {
  const isExist = await Driver.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Driver not found !');
  }

  const { name, ...userData } = payload;
  const updatedUserData: Partial<IDriver> = { ...userData };

  //dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IDriver>; // `name.fisrtName`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Driver.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  });
  return result;
};

const deleteDriver = async (id: string): Promise<IDriver | null> => {
  const result = await Driver.findByIdAndDelete(id);
  return result;
};



export const DriverService = {
  createDriver,
  getAllDrivers,
  getSingleDriver,
  updateDriver,
  deleteDriver,
};
