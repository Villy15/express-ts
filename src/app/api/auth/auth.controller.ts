import { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import validateResource from '../../../middlewares/validate.middleware';
import handleError from '../../../utils/handle-error';
import {
  LoginSchema,
  RegisterSchema,
  loginSchema,
  registerSchema,
} from '../../schemas/auth.schema';
import { login, register } from './auth.services';

const router = Router();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login to the application
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLogin'
 *     responses:
 *       201:
 *         description: resource created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthToken'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post(
  '/auth/login',
  validateResource(loginSchema),
  async (
    req: Request<{}, {}, LoginSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await login(req.body);

      res.status(201).send(result);
    } catch (err) {
      handleError(err, next);
    }
  }
);

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register to the application
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRegister'
 *     responses:
 *       201:
 *         description: resource created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthToken'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post(
  '/auth/register',
  validateResource(registerSchema),
  async (
    req: Request<{}, {}, RegisterSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await register(req.body);

      res.status(201).send(result);
    } catch (err) {
      handleError(err, next);
    }
  }
);

export default router;
