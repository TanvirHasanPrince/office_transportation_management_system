import { Schema, model } from "mongoose";
import { DriverModel, IDriver } from "./driver.interface";
import { UserRole } from "../admin/admin.interface";
import config from "../../../config";
import bcrypt from 'bcrypt';


const vehicleSchema = new Schema({
  brand: String,
  model: String,
  year: String,
  plateNumber: String,
  color: String,
});


const DriverSchema = new Schema<IDriver, DriverModel>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },

        lastName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: false,
        },
      },
      required: true,
    },
    role: { type: String, enum: Object.values(UserRole), required: true },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    nid: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
    },
    vehicle: vehicleSchema,
  },

  {
    timestamps: true,
  },
);

// Add a pre-save middleware to hash the password
DriverSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // Hash the password using bcrypt before saving
    const saltRounds = Number(config.bycrypt_salt_rounds); // You can adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  }
  next();
});

export const Driver = model<IDriver, DriverModel>('Driver', DriverSchema);
