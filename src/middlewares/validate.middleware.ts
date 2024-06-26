import { NextFunction, Request, Response } from 'express-serve-static-core';
import { AnyZodObject } from 'zod';
import handleError from '../utils/handle-error';

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err) {
      handleError(err, next);
    }
  };

export default validateResource;
