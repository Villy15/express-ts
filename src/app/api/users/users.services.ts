import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/prisma-client';
import HttpError from '../../../utils/http-error';

export const getUsers = async () => {
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    throw new HttpError('No users found', 404);
  }

  return users;
};

export const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new HttpError('User not found', 404);
  }

  return user;
};

export const createUser = async (userData: Prisma.UserCreateInput) => {
  const { email, name, last_name } = userData;

  // Check if input is valid
  if (!name || !email) {
    throw new HttpError('Please provide a name and an email', 400);
  }

  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      last_name: last_name,
    },
  });

  return user;
};

export const updateUser = async (
  id: number,
  userData: Prisma.UserUpdateInput
) => {
  const updateData: Prisma.UserUpdateInput = {};

  // Dynamically add fields to updateData if they are provided in the request body
  if (userData.name) updateData.name = userData.name;
  if (userData.last_name) updateData.last_name = userData.last_name;

  // Check if at least one field is provided for update
  if (Object.keys(updateData).length === 0) {
    throw new HttpError(
      'Please provide at least one field to update (name, last name)',
      400
    );
  }

  const user = await prisma.user
    .update({
      where: {
        id: id,
      },
      data: userData,
    })
    .catch(err => {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new HttpError('User not found', 404);
      } else {
        throw err;
      }
    });

  return user;
};

export const deleteUser = async (id: number) => {
  const user = await prisma.user
    .delete({
      where: {
        id,
      },
    })
    .catch(err => {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new HttpError('User not found', 404);
      } else {
        throw err;
      }
    });

  return { message: 'User deleted', user };
};

export const deleteAllUsers = async () => {
  await prisma.user.deleteMany();

  return { message: 'All users deleted' };
};
