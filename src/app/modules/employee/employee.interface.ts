import { Model } from 'mongoose';

import { UserRole } from '../admin/admin.interface';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IEmployee = {
  id: string;
  password: string;
  name: UserName;
  phoneNumber: string;
  address: string;
  role: UserRole;
};

export type EmployeeModel = Model<IEmployee, Record<string, unknown>>;

export type IEmployeeFilters = {
  searchTerm?: string;
};
