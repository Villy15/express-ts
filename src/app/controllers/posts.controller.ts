import { Post, Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express-serve-static-core';

import handleError from '../..//utils/handle-error';
import prisma from '../../prisma/prisma-client';
import HttpError from '../../utils/http-error';

/**
 * @desc Get all posts
 * @route GET /api/posts
 */
export const getPosts = async (
  req: Request,
  res: Response<Post[]>,
  next: NextFunction
) => {
  try {
    const posts = await prisma.post.findMany();

    if (posts.length === 0) {
      throw new HttpError('No posts found', 404);
    }

    res.status(200).send(posts);
  } catch (err) {
    handleError(err, next);
  }
};

// Read a single post
/**
 * @desc Get a single post
 * @route GET /api/posts/:id
 */
export const getPost = async (
  req: Request<{ id: string }>,
  res: Response<Post>,
  next: NextFunction
) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!post) {
      throw new HttpError('Post not found', 404);
    }

    res.status(200).send(post);
  } catch (err) {
    handleError(err, next);
  }
};

// addUser
/**
 * @desc Add a new post
 * @route POST /api/posts
 */
export const addPost = async (
  req: Request<{}, {}, Prisma.PostCreateInput>,
  res: Response<Post>,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const { title, content, email } = req.body;

    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: {
          connect: {
            email: email,
          },
        },
      },
    });

    res.status(201).send(result);
  } catch (err) {
    handleError(err, next);
  }
};
