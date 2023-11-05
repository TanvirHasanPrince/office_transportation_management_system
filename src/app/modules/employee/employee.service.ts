import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IEmployee, IEmployeeFilters } from "./employee.interface";
import { Employee } from "./employee.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { employeeSearchableFields } from "./employee.constants";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { SortOrder } from "mongoose";

const createEmployee = async (employee: IEmployee): Promise<IEmployee> => {
  const createdEmployee = await Employee.create(employee);

  if (!createdEmployee) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create employee');
  }

  return createdEmployee;
};

const getAllEmployees = async (
  filters: IEmployeeFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IEmployee[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: employeeSearchableFields.map(field => ({
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

  const result = await Employee
    .find(whereCondition)

    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Employee.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleEmployee = async (id: string): Promise<IEmployee | null> => {
  const result = await Employee.findById(id);
  return result;
};

const updateEmployee = async (
  id: string,
  payload: Partial<IEmployee>,
): Promise<IEmployee | null> => {
  const isExist = await Employee.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found !');
  }

  const { name, ...userData } = payload;
  const updatedUserData: Partial<IEmployee> = { ...userData };

  //dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IEmployee>; // `name.fisrtName`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Employee.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  });
  return result;
};

const deleteEmployee = async (id: string): Promise<IEmployee | null> => {
  const result = await Employee.findByIdAndDelete(id);
  return result;
};

export const EmployeeService = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
