import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ILocation, ILocationFilters } from './location.interface';
import { Location } from './location.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { locationSearchableFields } from './location.constants';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const createLocation = async (location: ILocation): Promise<ILocation> => {
  const createdLocation = await Location.create(location);

  if (!createdLocation) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Location');
  }
  return createdLocation;
};

const getAllLocations = async (
  filters: ILocationFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ILocation[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: locationSearchableFields.map(field => ({
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

  const result = await Location.find(whereCondition)

    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Location.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleLocation = async (id: string): Promise<ILocation | null> => {
  const result = await Location.findById(id);
  return result;
};

const updateLocation = async (
  id: string,
  payload: Partial<ILocation>,
): Promise<ILocation | null> => {
  const isExist = await Location.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Location not found !');
  }

  const { ...locationData } = payload;
  const updatedUserData: Partial<ILocation> = { ...locationData };



  const result = await Location.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  });
  return result;
};

const deleteLocation = async (id: string): Promise<ILocation | null> => {
  const result = await Location.findByIdAndDelete(id);
  return result;
};

export const LocationService = {
  createLocation,
  getAllLocations,
  getSingleLocation,
  deleteLocation,
  updateLocation,
};
