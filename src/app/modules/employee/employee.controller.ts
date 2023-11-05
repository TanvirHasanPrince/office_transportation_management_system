import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { EmployeeService } from "./employee.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { employeeFilterableFields } from "./employee.constants";
import { paginationFields } from "../../../constants/paginationConstants";
import { IEmployee } from "./employee.interface";

const createEmployee = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.createEmployee(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee Created Successfully',
    data: result,
  });
});

const getAllEmployees = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, employeeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await EmployeeService.getAllEmployees(filters, paginationOptions);

  sendResponse<IEmployee[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All employees retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleEmployee = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await EmployeeService.getSingleEmployee(id);

  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee retrieved successfully',
    data: result,
  });
});

const updateEmployee = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await EmployeeService.updateEmployee(id, updatedData);

  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee updated successfully',
    data: result,
  });
});

const deleteEmployee = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await EmployeeService.deleteEmployee(id);

  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee deleted successfully',
    data: result,
  });
});

export const EmployeeController = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
