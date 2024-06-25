import { Prisma, User } from '@prisma/client';
import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';

import prisma from '../../../prisma/prisma-client';
import handleError from '../../../utils/handle-error';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from './users.services';

const router = Router();

/**
 * @desc Get all users
 * @auth optional
 * @route {GET} /api/users
 * @returns users: list of users
 */
router.get('/users', async (req, res: Response<User[]>, next) => {
  try {
    const result = await getUsers();

    res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
});

/**
 * @desc Get a single user
 * @route {GET} /api/users/:id
 * @returns user: single user object
 */
router.get(
  '/users/:id',
  async (req: Request<{ id: string }>, res: Response<User>, next) => {
    try {
      const result = await getUser(Number(req.params.id));

      res.status(200).send(result);
    } catch (err) {
      handleError(err, next);
    }
  }
);

/**
 * @desc Add a new user
 * @route {POST} /api/users
 * @returns user: newly created user object
 */
router.post(
  '/users',
  async (
    req: Request<{}, {}, Prisma.UserCreateInput>,
    res: Response<User>,
    next
  ) => {
    try {
      const result = await createUser(req.body);

      res.status(201).send(result);
    } catch (err) {
      handleError(err, next);
    }
  }
);

/**
 * @desc Update a user
 * @route {PUT} /api/users/:id
 * @returns user: updated user object
 */
router.put(
  '/users/:id',
  async (
    req: Request<{ id: string }, {}, Prisma.UserUpdateInput>,
    res: Response<User>,
    next
  ) => {
    try {
      const result = await updateUser(Number(req.params.id), req.body);

      res.status(200).send(result);
    } catch (err) {
      handleError(err, next);
    }
  }
);

/**
 * @desc Delete a user
 * @route {DELETE} /api/users/:id
 * @returns message: confirmation message
 */
router.delete('/users/:id', async (req: Request<{ id: string }>, res, next) => {
  try {
    const result = await deleteUser(Number(req.params.id));

    res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
});

/**
 * @desc Delete all users
 * @route {DELETE} /api/users
 * @returns message: confirmation message
 */
router.delete('/users', async (req, res, next) => {
  try {
    const result = await prisma.user.deleteMany();

    res.status(200).send(result);
  } catch (err) {
    handleError(err, next);
  }
});

export default router;
