import { Post } from '@prisma/client';
import { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import validateResource from '../../middlewares/validate.middleware';
import handleError from '../../utils/handle-error';
import { PostCreateInput, postCreateSchema } from './posts.schema';
import { createPost, getPost, getPosts } from './posts.services';

const router = Router();

/**
 * @openapi
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - posts
 *     responses:
 *       200:
 *         description: Returns all posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/posts', async (req, res: Response<Post[]>, next) => {
  try {
    const result = await getPosts();
    res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
});

/**
 * @openapi
 * /api/posts/{id}:
 *   get:
 *     summary: Get posts by id
 *     tags:
 *       - posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: posts id
 *     responses:
 *       200:
 *         description: Returns posts by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  '/posts/:id',
  async (req: Request<{ id: string }>, res: Response<Post>, next) => {
    try {
      const result = await getPost(Number(req.params.id));
      res.status(200).send(result);
    } catch (err) {
      handleError(err, next);
    }
  }
);

/**
 * @openapi
 * /api/posts:
 *   post:
 *     tags:
 *       - posts
 *     summary: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCreate'
 *     responses:
 *       201:
 *         description: The created post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request
 */
router.post(
  '/posts',
  validateResource(postCreateSchema),
  async (
    req: Request<{}, {}, PostCreateInput>,
    res: Response<Post>,
    next: NextFunction
  ) => {
    try {
      const result = await createPost(req.body);
      res.status(201).send(result);
    } catch (err) {
      handleError(err, next);
    }
  }
);

export default router;
