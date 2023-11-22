import { UserRole } from '../admin/admin.interface';
import { UserName } from '../employee/employee.interface';
import { Model } from 'mongoose';

export type IVehicle = {
  brand: string;
  model: string;
  year: string;
  plateNumber: string;
  color: string;
};

export type IDriver = {
  name: UserName;
  password: string;
  role: UserRole;
  phoneNumber: string;
  nid: string;
  licenseNumber: string;
  address: string;
  vehicle: IVehicle;
};

export type DriverModel = Model<IDriver, Record<string, unknown>>;

export type IDriverFilters = {
  searchTerm?: string;
};
