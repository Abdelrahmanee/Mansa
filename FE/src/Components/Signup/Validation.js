import { z } from 'zod';


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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
  mobileNumber: z.string().regex(/^\d{11}$/, { message: 'Mobile number must be 11 digits' }),
  profilePicture: z
  .any()
  .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  )
});