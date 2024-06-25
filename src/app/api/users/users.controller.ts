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
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         posts:
 *           type: array
 *           items:
 *            $ref: '#/components/schemas/Post'
 *     UserInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: 'johndoe@gmail.com'
 *         name:
 *           type: string
 *           example: 'John Doe'
 *     UserUpdate:
 *      type: object
 *      properties:
 *         email:
 *           type: string
 *           example: 'johndoe@gmail.com'
 *         name:
 *            type: string
 *            example: 'James Worthington'
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: Returns all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
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
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get users by id
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: users id
 *     responses:
 *       200:
 *         description: Returns users by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
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
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create a new users
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: users created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
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
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Update users by id
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: users id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: users updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
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
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Delete users by id
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: users id
 *     responses:
 *       200:
 *         description: users deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
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
 * @openapi
 * /api/users:
 *   delete:
 *     summary: Delete all users
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: users deleted
 *       500:
 *         description: Internal Server Error
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
