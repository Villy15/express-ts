import { NextFunction, Request, Response } from "express-serve-static-core";
import { ErrorHandler } from "../types/error";

// Ignore the ts error for now
export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default errorHandler;
