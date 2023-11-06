import { Schema, model } from "mongoose";
import { ILocation, LocationModel } from "./location.interface";

const LocationSchema = new Schema<ILocation, LocationModel>(
  {
    locationName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


export const Location = model<ILocation, LocationModel>('Location', LocationSchema);
