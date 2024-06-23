import { NextFunction, Request, Response } from "express-serve-static-core";
import { CreateUserBody, CreateUserQuery, User } from "../types/users.type";

/**
 * @desc Get all posts
 * @route GET /api/users
 */
export const getUsers = async (
  req: Request,
  res: Response<User[]>,
  next: NextFunction
) => {
  try {
    // Sample data
    const rows = [
      {
        id: 1,
        name: "John Doe",
        email: "adrianvill07@gmail.com",
      },
    ];

    res.status(200).json(rows);
  } catch (err) {
    if (err instanceof Error) {
      const error = new Error(err.message);
      (error as any).status = 400;
      return next(error);
    }

    // If err is not an instance of Error, return a generic error
    const error = new Error("An unknown error occurred");
    (error as any).status = 400;
    return next(error);
  }
};

// addUser
/**
 * @desc Add a new user
 * @route POST /api/users
 */
export const addUser = async (
  req: Request<{}, {}, CreateUserBody, CreateUserQuery>,
  res: Response<User>,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body);

    // if empty
    if (!name || !email || !password) {
      const error = new Error("Please provide name, email and password");
      (error as any).status = 400;
      return next(error);
    }

    // Sample data
    const row = {
      id: 1,
      name,
      email,
    };

    res.status(200).json(row);
  } catch (err) {
    if (err instanceof Error) {
      const error = new Error(err.message);
      (error as any).status = 400;
      return next(error);
    }

    // If err is not an instance of Error, return a generic error
    const error = new Error("An unknown error occurred");
    (error as any).status = 400;
    return next(error);
  }
};
