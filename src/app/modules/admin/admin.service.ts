import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createAdmin = async (admin: IAdmin) => {
  const createdAdmin = await Admin.create(admin);

  if (!createdAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
  }

  return createdAdmin;
};

export const AdminService = {
  createAdmin,
};
