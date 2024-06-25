import { NextFunction, Request, Response } from 'express-serve-static-core';

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
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export default errorHandler;
