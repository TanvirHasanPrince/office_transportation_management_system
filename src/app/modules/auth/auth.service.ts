import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import { Admin } from '../admin/admin.model';
import { Employee } from '../employee/employee.model';
import { Driver } from '../driver/driver.model';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  let foundUser = null;

  const adminResult = await Admin.findOne({ phoneNumber: phoneNumber });
  const employeeResult = await Employee.findOne({
    phoneNumber: phoneNumber,
  });
  const driverResult = await Driver.findOne({ phoneNumber: phoneNumber });

  if (adminResult) {
    foundUser = adminResult;
  } else if (employeeResult) {
    foundUser = employeeResult;
  } else if (driverResult) {
    foundUser = driverResult;
  }

  if (!foundUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to find user');
  }

  const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
  }

  const { id: _id, role } = foundUser;
  const token = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    token,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
};
