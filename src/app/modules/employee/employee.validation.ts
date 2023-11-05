import { z } from 'zod';

const createEmployeeZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      middleName: z.string({}).optional(),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    role: z.string({
      required_error: 'Role is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
  }),
});

const updateEmployeeZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string({}).optional(),
        middleName: z.string({}).optional(),
        lastName: z.string({}).optional(),
      })
      .optional(),
    role: z.string({}).optional(),
    password: z.string({}).optional(),
    phoneNumber: z.string({}).optional(),
    address: z.string({}).optional(),
  }),
});

export const EmployeeValidation = {
  createEmployeeZodSchema,
  updateEmployeeZodSchema,
};
