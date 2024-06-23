import colors from 'colors';
import { NextFunction, Request, Response } from 'express-serve-static-core';

type Color = (text: string) => string;

type MethodColors = {
  [method: string]: Color;
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  const methodColors: MethodColors = {
    GET: colors.green,
    POST: colors.blue,
    PUT: colors.yellow,
    DELETE: colors.white,
  };

  const color = methodColors[req.method] || colors.white;

  console.log(
    color(
      `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
    )
  );

  next();
};

export default logger;
