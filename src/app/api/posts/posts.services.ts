import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/prisma-client';
import HttpError from '../../../utils/http-error';

export const getPosts = async () => {
  const posts = await prisma.post.findMany();

  if (posts.length === 0) {
    throw new HttpError('No posts found', 404);
  }

  return posts;
};

export const getPost = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!post) {
    throw new HttpError('Post not found', 404);
  }

  return post;
};

export const createPost = async (postData: Prisma.PostCreateInput) => {
  // @ts-ignore
  const { title, content, email } = postData;

  const post = await prisma.post.create({
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

  return post;
};
