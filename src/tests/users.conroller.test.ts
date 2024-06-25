import { Prisma, User } from '@prisma/client';
import { Request } from 'express-serve-static-core';
import { mockNext, mockRequest, mockResponse } from './mocks/mocks';

import {
  addUser,
  getUser,
  getUsers,
  updateUser,
} from '../app/controllers/users.controller';
import prismaMock from './mocks/prisma-mock';

// Mock user object
const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@email.com',
  last_name: 'Doe',
};

describe('Users Controller', () => {
  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const users: User[] = [user];
      prismaMock.user.findMany.mockResolvedValue(users);

      await getUsers(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(users);
    });

    it('should return 404 if no users are found', async () => {
      prismaMock.user.findMany.mockResolvedValue([]);

      await getUsers(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'No users found',
      });
    });
  });

  describe('GET /api/users/:id', () => {
    const mockRequestWithId = {
      params: { id: '1' },
    } as Request<{ id: string }>;

    it('should return a user by id', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);

      await getUser(mockRequestWithId, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(user);
    });

    it('should return 404 if user is not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await getUser(mockRequestWithId, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'User not found',
      });
    });
  });

  describe('POST /api/users/', () => {
    const createdUserWithId: User = {
      id: 2,
      email: 'villy@gmail.com',
      name: 'Villy',
      last_name: 'Doe',
    };

    const mockRequestCreateUser = {
      body: {
        email: 'villy@gmail.com',
        name: 'Villy',
        last_name: 'Doe',
      },
    } as Request<{}, {}, Prisma.UserCreateInput>;

    it('should return a created user with an assigned ID', async () => {
      prismaMock.user.create.mockResolvedValue(createdUserWithId);

      await addUser(mockRequestCreateUser, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.send).toHaveBeenCalledWith(createdUserWithId);
    });

    it('should return 400 if no name and email provided', async () => {
      const mockRequestMissingFields = {
        body: {},
      } as Request<{}, {}, Prisma.UserCreateInput>;

      await addUser(mockRequestMissingFields, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'Please provide a name and an email',
      });
    });
  });

  describe('PUT /api/users/:id', () => {
    const updatedUser: User = {
      id: 1,
      email: 'adrianvill07@gmail.com',
      last_name: 'Doe',
      name: 'Adrian Villalba',
    };

    const mockRequestUpdateUser = {
      params: { id: '1' },
      body: {
        name: 'Adrian Doe',
        last_name: 'Doe',
      },
    } as Request<{ id: string }, {}, Prisma.UserUpdateInput>;

    it('should return a user with updated fields', async () => {
      prismaMock.user.update.mockResolvedValue(updatedUser);

      await updateUser(mockRequestUpdateUser, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(updatedUser);
    });

    it('should return 404 if user is not found', async () => {
      const mockMissingUser = {
        params: { id: '2' },
        body: {
          name: 'Adrian Doe',
          last_name: 'Doe',
        },
      } as Request<{ id: string }, {}, Prisma.UserUpdateInput>;

      prismaMock.user.update.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('User not found', {
          code: 'P2025',
          clientVersion: '2.19.0',
        })
      );

      await updateUser(mockMissingUser, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'User not found',
      });
    });

    it('should return 400 if no name, email, and last_name provided', async () => {
      const mockRequestMissingFields = {
        params: { id: '1' },
        body: {},
      } as Request<{ id: string }, {}, Prisma.UserUpdateInput>;

      await updateUser(mockRequestMissingFields, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message:
          'Please provide at least one field to update (name, last name)',
      });
    });
  });
});
