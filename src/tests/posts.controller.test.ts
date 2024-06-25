import { Post } from '@prisma/client';
import { Request } from 'express-serve-static-core';
import { mockNext, mockRequest, mockResponse } from './mocks/mocks';

import { getPost, getPosts } from '../app/controllers/posts.controller';
import prismaMock from './mocks/prisma-mock';

// Mock post object
const post: Post = {
  id: 1,
  title: 'Post 1',
  content: 'Content 1',
  authorId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  published: true,
  viewCount: 0,
};

describe('Posts Controller', () => {
  describe('GET /api/posts', () => {
    it('should return all posts', async () => {
      const posts: Post[] = [post];

      prismaMock.post.findMany.mockResolvedValue(posts);

      await getPosts(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(posts);
    });

    it('should return 404 if no posts are found', async () => {
      prismaMock.post.findMany.mockResolvedValue([]);

      await getPosts(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'No posts found',
      });
    });
  });

  describe('GET /api/posts/:id', () => {
    const mockRequestWithId = {
      params: { id: '1' },
    } as Request<{ id: string }>;

    it('should return a post by id', async () => {
      prismaMock.post.findUnique.mockResolvedValue(post);

      await getPost(mockRequestWithId, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(post);
    });

    it('should return 404 if no post is found', async () => {
      prismaMock.post.findUnique.mockResolvedValue(null);

      await getPost(mockRequestWithId, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'Post not found',
      });
    });
  });
});
