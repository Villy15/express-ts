import { Post, Prisma } from '@prisma/client';
import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';

import { createPost, getPost, getPosts } from './posts.services';

import handleError from '../../../utils/handle-error';

const router = Router();

/**
 * @desc Get all posts
 * @auth optional
 * @route {GET} /api/posts
 * @returns posts: list of posts
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
 * @desc Get a single post
 * @auth optional
 * @route {GET} /api/posts/:id
 * @returns post: single post
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
 * @desc Add a new post
 * @auth required
 * @route {POST} /api/posts
 * @returns post: new post
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
