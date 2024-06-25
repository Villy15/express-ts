import { NextFunction, Request, Response } from 'express-serve-static-core';
import log from '../utils/logger';

const logger = (req: Request, res: Response, next: NextFunction) => {
  log.info(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );

  next();
};

export default logger;
