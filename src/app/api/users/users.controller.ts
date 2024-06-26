import { User } from '@prisma/client';
import { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';

import validateResource from '../../../middlewares/validate.middleware';
import prisma from '../../../prisma/prisma-client';
import handleError from '../../../utils/handle-error';
import { UserUpdateInput, userUpdateSchema } from '../../schemas/users.schema';
import { deleteUser, getUser, getUsers, updateUser } from './users.services';

const router = Router();

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
  validateResource(userUpdateSchema),
  async (
    req: Request<{ id: string }, {}, UserUpdateInput>,
    res: Response<User>,
    next: NextFunction
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
