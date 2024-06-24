import { Prisma, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express-serve-static-core';

import prisma from '../prisma';
import handleError from '../utils/handle-error';
import HttpError from '../utils/http-error';

/**
 * @desc Get all posts
 * @route GET /api/users
 */
export const getUsers = async (
  req: Request,
  res: Response<User[]>,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      throw new HttpError('No users found', 404);
    }

    res.status(200).send(users);
  } catch (err) {
    handleError(err, next);
  }
};

// Read a single user
/**
 * @desc Get a single user
 * @route GET /api/users/:id
 */
export const getUser = async (
  req: Request<{ id: string }>,
  res: Response<User>,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!user) {
      throw new HttpError('User not found', 404);
    }

    res.status(200).send(user);
  } catch (err) {
    handleError(err, next);
  }
};

// addUser
/**
 * @desc Add a new user
 * @route POST /api/users
 */
export const addUser = async (
  req: Request<{}, {}, Prisma.UserCreateInput>,
  res: Response<User>,
  next: NextFunction
) => {
  try {
    // Check if input is valid
    if (!req.body.name || !req.body.email) {
      throw new HttpError('Please provide a name and an email', 400);
    }

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        last_name: req.body.last_name,
      },
    });

    res.status(201).send(user);
  } catch (err) {
    handleError(err, next);
  }
};

// updateUser
/**
 * @desc Update a user
 * @route PUT /api/users/:id
 */
export const updateUser = async (
  req: Request<{ id: string }, {}, Prisma.UserUpdateInput>,
  res: Response<User>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData: Prisma.UserUpdateInput = {};

    // Dynamically add fields to updateData if they are provided in the request body
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.last_name) updateData.last_name = req.body.last_name;

    // Check if at least one field is provided for update
    if (Object.keys(updateData).length === 0) {
      throw new HttpError(
        'Please provide at least one field to update (name, last name)',
        400
      );
    }

    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: updateData,
    });

    res.status(200).send(user);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2025'
    ) {
      handleError(new HttpError('User not found', 404), next);
    } else {
      handleError(err, next);
    }
  }
};

// deleteUser
/**
 * @desc Delete a user
 * @route DELETE /api/users/:id
 */
export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).send({ message: 'User deleted' });
  } catch (err) {
    handleError(err, next);
  }
};

// Delete all users
/**
 * @desc Delete all users
 * @route DELETE /api/users
 */
export const deleteAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.user.deleteMany();

    res.status(200).send({ message: 'All users deleted' });
  } catch (err) {
    handleError(err, next);
  }
};
