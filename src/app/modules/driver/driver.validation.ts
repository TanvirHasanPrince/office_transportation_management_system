import { z } from 'zod';

const NameSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required',
  }),
  middleName: z.string({}).optional(),
  lastName: z.string({
    required_error: 'Last name is required',
  }),
});

const VehicleSchema = z.object({
  brand: z.string({
    required_error: 'Brand name is required',
  }),

  model: z
    .string({
      required_error: 'Model name is required',
    })
    .min(1),
  year: z.number({ required_error: 'Manufactured year is required' }),
  plateNumber: z.string({
    required_error: 'Plate number is required',
  }),
  color: z.string({
    required_error: 'Vehicle color is required',
  }),
});

const createDriverZodSchema = z.object({
  body: z.object({
    name: NameSchema,
    role: z.enum(['employee', 'admin', 'driver']),
    password: z.string().min(6),
    phoneNumber: z.string({
      required_error: 'Phone Number required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    vehicle: VehicleSchema,
  }),
});

export const DriverValidation = {
  createDriverZodSchema,
};
