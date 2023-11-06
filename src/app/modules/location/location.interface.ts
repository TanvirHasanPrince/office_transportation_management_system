import { Model } from "mongoose";


export type ILocation = {
  id: string;
  locationName: string;
};


export type LocationModel = Model<ILocation, Record<string, unknown>>;

export type ILocationFilters = {
  searchTerm?: string;
};