import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const signupSchema = z.object({
  firstName: z.string({
    required_error: "First Name is required",
    invalid_type_error: "First Name must be a string",
  }).min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string({
    required_error: "Last Name is required",
    invalid_type_error: "Last Name must be a string",
  }).min(2, { message: 'Last name must be at least 2 characters ' }),
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).email({ message: 'Invalid email address' }),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "{Password} must be a string",
  }).min(6, { message: 'Password must be at least 6 characters long' }),
  sex: z.enum(['male', 'female'], {
    message: 'You must select your Gender',
  }),
  GOV: z.string({ required_error: 'You must enter your Government' }).min(2, { message: 'Government must be at least 2 characters' }).max(25, { message: 'GOV must be less than 25 characters long' }),
  city: z.string({ required_error: 'You must enter your Government' }).min(2, { message: 'Government must be at least 2 characters' }).max(25, { message: 'GOV must be less than 25 characters long' }),
  mobileNumber: z.string().regex(/^\d{11}$/, { message: 'Mobile number must be 11 digits' }),
  DOB: z.string().regex(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/gm, { message: 'Invalid Date of birth' }),
  files: z
    .array(z.any()) // Ensure it's an array
    .nonempty("You must upload at least one file.") // Optional: enforce at least one file
    .refine((files) => files.every(file => file?.size <= MAX_FILE_SIZE), `Max image size is 5MB.`)
    .refine(
      (files) => files.every(file => ACCEPTED_IMAGE_TYPES.includes(file?.type)),
      "Only .jpg, .jpeg, .png, and .webp formats are supported."
    ),
});