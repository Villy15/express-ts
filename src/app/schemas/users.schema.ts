import { z } from 'zod';

export const userUpdateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

export type UserUpdateInput = z.infer<typeof userUpdateSchema>['body'];
