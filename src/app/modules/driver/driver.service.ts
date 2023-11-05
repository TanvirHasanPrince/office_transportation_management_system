import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IDriver } from "./driver.interface";
import { Driver } from "./driver.model";

const createDriver = async (driver: IDriver): Promise<IDriver> => {
  const createdDriver = await Driver.create(driver);

  if (!createdDriver) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Driver');
  }

  return createdDriver;
};


export const DriverService = {
  createDriver,
};
