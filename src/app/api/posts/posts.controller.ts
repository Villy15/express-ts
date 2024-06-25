import { Post, Prisma } from '@prisma/client';
import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import handleError from '../../../utils/handle-error';
import { createPost, getPost, getPosts } from './posts.services';

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         published:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         viewCount:
 *           type: integer
 *         authorId:
 *           type: integer
 *
 *
 */

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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               email:
 *                type: string
 *             required:
 *               - title
 *               - content
 *               - email
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
  async (
    req: Request<{}, {}, Prisma.PostCreateInput>,
    res: Response<Post>,
    next
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
