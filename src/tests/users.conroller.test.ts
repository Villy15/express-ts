import { Prisma, User } from '@prisma/client';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
} from '../app/api/users/users.services';
import prismaMock from './mocks/prisma-mock';

// Mock user object
const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@email.com',
  last_name: 'Doe',
};

const userInput: Prisma.UserCreateInput = {
  name: 'Jame Doe',
  email: 'jame@email.com',
  last_name: 'Doe',
};

const createdUser: User = {
  id: 1,
  name: 'Jame Doe',
  email: 'jame@email.com',
  last_name: 'Doe',
};

describe('Users Services', () => {
  describe('getUsers', () => {
    it('should return all users', async () => {
      const users: User[] = [user];

      prismaMock.user.findMany.mockResolvedValue(users);

      const result = await getUsers();

      expect(result).toEqual(users);
      expect(prismaMock.user.findMany).toHaveBeenCalled();
    });

    it('should throw an error if no users are found', async () => {
      prismaMock.user.findMany.mockResolvedValue([]);

      await expect(getUsers()).rejects.toThrow('No users found');
    });
  });

  describe('getUser', () => {
    it('should return a user by id', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);

      const result = await getUser(user.id);

      expect(result).toEqual(user);
      expect(prismaMock.user.findUnique).toHaveBeenCalled();
    });

    it('should throw an error if user is not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(getUser(user.id)).rejects.toThrow('User not found');
    });
  });

  describe('createUser', () => {
    it('should return a created user with an assigned ID', async () => {
      prismaMock.user.create.mockResolvedValue(createdUser);

      const result = await createUser(userInput);

      expect(result).toEqual(createdUser);
      expect(prismaMock.user.create).toHaveBeenCalled();
    });

    it('should throw an error if no name and email provided', async () => {
      await expect(createUser({} as Prisma.UserCreateInput)).rejects.toThrow(
        'Please provide a name and an email'
      );
    });
  });

  describe('updateUser', () => {
    it('should return a user with updated fields', async () => {
      prismaMock.user.update.mockResolvedValue(user);

      const updatedUser = await updateUser(1, {
        name: 'Adrian Doe',
        last_name: 'Doe',
      });

      expect(updatedUser).toEqual(user);
      expect(prismaMock.user.update).toHaveBeenCalled();
    });

    it('should throw an error if user is not found', async () => {
      prismaMock.user.update.mockRejectedValue(
        new PrismaClientKnownRequestError('User not found', {
          code: 'P2025',
          clientVersion: '5.15.1',
        })
      );

      await expect(
        updateUser(9999, {
          name: 'Adrian Doe',
          last_name: 'Doe',
        } as Prisma.UserUpdateInput)
      ).rejects.toThrow('User not found');
    });

    it('should throw an error if no fields are provided', async () => {
      await expect(updateUser(1, {} as Prisma.UserUpdateInput)).rejects.toThrow(
        'Please provide at least one field to update (name, last name)'
      );
    });
  });
});
