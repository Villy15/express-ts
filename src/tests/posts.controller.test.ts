import { Post } from '@prisma/client';

import { getPost, getPosts } from '../app/api/posts/posts.services';
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

describe('Post Services', () => {
  describe('getPosts', () => {
    it('should return all posts', async () => {
      const posts: Post[] = [post];

      prismaMock.post.findMany.mockResolvedValue(posts);

      const result = await getPosts();

      expect(result).toEqual(posts);
      expect(prismaMock.post.findMany).toHaveBeenCalled();
    });

    it('should throw an error if no posts are found', async () => {
      prismaMock.post.findMany.mockResolvedValue([]);

      await expect(getPosts()).rejects.toThrow('No posts found');
    });
  });

  describe('getPost', () => {
    it('should return a post by id', async () => {
      prismaMock.post.findUnique.mockResolvedValue(post);

      const result = await getPost(post.id);

      expect(result).toEqual(post);
      expect(prismaMock.post.findUnique).toHaveBeenCalled();
    });

    it('should throw an error if post is not found', async () => {
      prismaMock.post.findUnique.mockResolvedValue(null);

      await expect(getPost(post.id)).rejects.toThrow('Post not found');
    });
  });
});
