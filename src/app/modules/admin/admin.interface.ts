import { Model } from 'mongoose';
/* eslint-disable no-unused-vars */

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export enum UserRole {
  Admin = "admin",
  Employee = "employee",
  Driver = 'driver'
}

export type IAdmin = {
  id: string;
  password: string;
  name: UserName;
  phoneNumber: string;
  address: string;
  role: UserRole;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
};
