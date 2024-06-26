import { NextFunction, Request, Response } from 'express-serve-static-core';
import log from '../utils/logger';

interface ErrorHandler extends Error {
  status?: number;
}

const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.status) {
    log.error({
      err: {
        message: err.message,
        status: err.status,
        stack: err.stack,
      },
    });
    res.status(err.status).send({ error: err.message });
  } else {
    log.error({
      err: {
        message: err.message,
        status: 500,
        stack: err.stack,
      },
    });
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

export default errorHandler;
