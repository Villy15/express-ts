import { NextFunction } from "express-serve-static-core";
import HttpError from "../utils/http-error";

function handleError(err: unknown, next: NextFunction) {
  let error: HttpError;

  if (err instanceof HttpError) {
    error = err;
  } else if (err instanceof Error) {
    error = new HttpError(err.message, 400);
  } else {
    error = new HttpError("An unknown error occurred", 400);
  }

  next(error);
}

export default handleError;
