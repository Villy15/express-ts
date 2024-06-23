import { Prisma, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express-serve-static-core";

import prisma from "../prisma";
import handleError from "../utils/handle-error";
import HttpError from "../utils/http-error";

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
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (err) {
    handleError(err, next);
  }
};

// addUser
/**
 * @desc Add a new user
 * @route POST /api/users
 */
export const addUser = async (
  req: Request<{}, {}, Prisma.UserCreateInput>,
  res: Response<User>,
  next: NextFunction
) => {
  try {
    // Check if input is valid
    if (!req.body.name || !req.body.email) {
      throw new HttpError("Please provide a name and an email", 400);
    }

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    res.status(201).json(user);
  } catch (err) {
    handleError(err, next);
  }
};

// updateUser
/**
 * @desc Update a user
 * @route PUT /api/users/:id
 */
export const updateUser = async (
  req: Request<{ id: string }, {}, Prisma.UserUpdateInput>,
  res: Response<User>,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: req.body.name,
      },
    });

    res.status(200).json(user);
  } catch (err) {
    handleError(err, next);
  }
};

// deleteUser
/**
 * @desc Delete a user
 * @route DELETE /api/users/:id
 */
export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    handleError(err, next);
  }
};
