import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin, UserRole } from './admin.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';

const AdminSchema = new Schema<IAdmin, AdminModel>(
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
    role: { type: String, enum: Object.values(UserRole), required: true},
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
  },
  {
    timestamps: true,
  },
);

// Add a pre-save middleware to hash the password
AdminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // Hash the password using bcrypt before saving
    const saltRounds = Number(config.bycrypt_salt_rounds); // You can adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  }
  next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
