import { z } from "zod";

export const validationSchema = z.object({
  id: z.string(),
  firstName: z.string({
    required_error: "First Name is required",
    invalid_type_error: "First Name must be a string",
  }).min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string({
    required_error: "Last Name is required",
    invalid_type_error: "Last Name must be a string",
  }).min(2, { message: 'Last name must be at least 2 characters ' }),
  GOV: z.string({ required_error: 'You must enter your Government' }).min(2, { message: 'Government must be at least 2 characters' }).max(25, { message: 'GOV must be less than 25 characters long' }),
  city: z.string({ required_error: 'You must enter your Government' }).min(2, { message: 'Government must be at least 2 characters' }).max(25, { message: 'GOV must be less than 25 characters long' }),
  mobileNumber: z.string().regex(/^\d{11}$/, { message: 'Mobile number must be 11 digits' }),
  DOB: z.string().regex(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/gm, { message: 'Invalid Date of birth' }),
});
