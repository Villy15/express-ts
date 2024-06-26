import { Router } from 'express';
import { Request } from 'express-serve-static-core';
import handleError from '../../../utils/handle-error';
import { login, register } from './auth.services';

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     AuthLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: 'johndoe@gmail.com'
 *         password:
 *           type: string
 *           example: 'password123'
 *     AuthToken:
 *        type: object
 *        properties:
 *          token:
 *            type: string
 *            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyMzUwNjMzN30.7'
 *     AuthRegister:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          name:
 *            type: string
 */

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
  async (
    req: Request<{
      username: string;
      password: string;
    }>,
    res,
    next
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
router.post('/auth/register', async (req, res, next) => {
  try {
    const result = await register(req.body);

    res.status(201).send(result);
  } catch (err) {
    handleError(err, next);
  }
});

export default router;
