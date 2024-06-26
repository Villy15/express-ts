import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     PostCreate:
 *       type: object
 *       properties:
 *         title:
 *            type: string
 *            example: 'My first post'
 *         content:
 *            type: string
 *            example: 'This is my first post'
 *         id:
 *            type: number
 *            example: 1
 */

export const postCreateSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    content: z.string({
      required_error: 'Content is required',
    }),
    id: z.number(),
  }),
});

export type PostCreateInput = z.infer<typeof postCreateSchema>['body'];
