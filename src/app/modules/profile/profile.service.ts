/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IDriver } from '../driver/driver.interface';
import { Driver } from '../driver/driver.model';
import { IEmployee } from '../employee/employee.interface';
import { Employee } from '../employee/employee.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAdminProfile = async (user: any): Promise<IAdmin | null> => {
  const { _id } = user;
  const result = await Admin.findById(_id);
  return result;
};

const getEmployeeProfile = async (user: any): Promise<IEmployee | null> => {
  const { _id } = user;
  const result = await Employee.findById(_id);
  return result;
};

const getDriverProfile = async (user: any): Promise<IDriver | null> => {
  const { _id } = user;
  const result = await Driver.findById(_id);
  return result;
};
export const ProfileService = {
  getAdminProfile,
  getEmployeeProfile,
  getDriverProfile,
};
