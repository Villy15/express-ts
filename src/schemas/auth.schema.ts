import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email format',
      }),
    password: z
      .string({
        message: 'Password must be at least 6 characters',
        required_error: 'Password is required',
      })
      .min(6),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email format',
      }),
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(3),
    password: z
      .string({
        message: 'Password must be at least 6 characters',
        required_error: 'Password is required',
      })
      .min(6),
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
