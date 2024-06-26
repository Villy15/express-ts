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
      error: {
        message: err.message,
        stack: err.stack,
        status: err.status,
      },
    });
    res.status(err.status).send(err.message);
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
