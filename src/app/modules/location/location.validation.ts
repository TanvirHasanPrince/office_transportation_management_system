import { z } from 'zod';


const createLocationZodSchema = z.object({
  body: z.object({
    locationName: z.string({
      required_error: 'Location name is required',
    }),
  }),
});



export const LocationValidation = {
  createLocationZodSchema,

};
