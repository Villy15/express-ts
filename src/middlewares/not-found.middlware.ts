import { NextFunction, Request, Response } from 'express-serve-static-core';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Resource not found');
  (error as any).status = 404;
  next(error);
};

export default notFound;
