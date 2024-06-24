import { Prisma, User } from '@prisma/client';
import { Request } from 'express-serve-static-core';
import { mockNext, mockRequest, mockResponse } from '../__mocks__';
import {
  addUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/users.controller';
import prisma from '../prisma';

jest.mock('../prisma.ts', () => ({
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
}));

describe('User Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const USER_JANE_DOE: User = {
    id: 2,
    name: 'Jane Doe',
    email: 'jane_doe@email.com',
    last_name: 'Doe',
  };
  const USER_JOHN_DOE: User = {
    id: 1,
    name: 'John Doe',
    email: 'john_doe@email.com',
    last_name: 'Doe',
  };

  const USERS: User[] = [USER_JOHN_DOE, USER_JANE_DOE];

  describe('GET /api/users', () => {
    const mockFindManyWithUsers = (users: User[] = []) =>
      (prisma.user.findMany as jest.Mock).mockResolvedValue(users);

    it('should return all users', async () => {
      mockFindManyWithUsers(USERS);

      await getUsers(mockRequest, mockResponse, mockNext);

      expect(prisma.user.findMany).toHaveBeenCalled();

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(USERS);
    });

    it('should return 404 if no users are found', async () => {
      mockFindManyWithUsers();

      await getUsers(mockRequest, mockResponse, mockNext);

      expect(prisma.user.findMany).toHaveBeenCalled();

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'No users found',
      });
    });
  });

  describe('GET /api/users/:id', () => {
    const mockFindUniqueWithUser = (user: User | null = null) =>
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);

    const mockRequestWithId1 = {
      params: { id: '1' },
    } as Request<{ id: string }>;

    it('should return a user by id', async () => {
      mockFindUniqueWithUser(USER_JOHN_DOE);

      await getUser(mockRequestWithId1, mockResponse, mockNext);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(USER_JOHN_DOE);
    });

    it('should return 404 if user is not found', async () => {
      mockFindUniqueWithUser();

      await getUser(mockRequestWithId1, mockResponse, mockNext);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        message: 'User not found',
      });
    });
  });

  describe('POST /api/users/', () => {
    const mockCreateUser = (user: User) =>
      (prisma.user.create as jest.Mock).mockResolvedValue(user);

    const createdUserWithId: User = {
      id: 3,
      email: 'adrian_doe@email.com',
      name: 'Adrian Doe',
      last_name: 'Doe',
    };

    const mockRequestCreateUser = {
      body: {
        email: 'adrian_doe@email.com',
        name: 'Adrian Doe',
        last_name: 'Doe',
      },
    } as Request<{}, {}, Prisma.UserCreateInput>;

    it('should return a created user with an assigned ID', async () => {
      mockCreateUser(createdUserWithId);

      await addUser(mockRequestCreateUser, mockResponse, mockNext);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: mockRequestCreateUser.body,
      });

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
    const mockUpdateUser = (user: User | null = null) =>
      (prisma.user.update as jest.Mock).mockResolvedValue(user);

    const mockRejectedUpdateUser = (error: Error) =>
      (prisma.user.update as jest.Mock).mockRejectedValue(error);

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
      mockUpdateUser(updatedUser);

      await updateUser(mockRequestUpdateUser, mockResponse, mockNext);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockRequestUpdateUser.body,
      });

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

      mockRejectedUpdateUser(
        new Prisma.PrismaClientKnownRequestError('User not found', {
          code: 'P2025',
          clientVersion: '2.19.0',
        })
      );

      await updateUser(mockMissingUser, mockResponse, mockNext);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 2 },
        data: mockMissingUser.body,
      });

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
