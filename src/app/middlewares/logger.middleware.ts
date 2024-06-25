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
    DELETE: colors.red,
  };

  const color = methodColors[req.method] || colors.white;

  // Format the current time
  const currentTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Manila',
  });

  console.log(
    color(
      `[${currentTime}] ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
    )
  );

  next();
};

export default logger;
