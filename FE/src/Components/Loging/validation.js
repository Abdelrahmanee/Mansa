import { z } from 'zod';


export const loginSchema = z.object({
  identifier: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).email({ message: 'Invalid email address' }),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "{Password} must be a string",
  }).min(6, { message: 'Password must be at least 6 characters long' }),
});