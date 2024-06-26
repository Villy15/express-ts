import prisma from '../../../prisma/prisma-client';
import HttpError from '../../../utils/http-error';
import { LoginSchema, RegisterSchema } from '../../schemas/auth.schema';

export const login = async (loginData: LoginSchema) => {
  const { email, password } = loginData;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new HttpError('User not found', 404);
  }

  // check if password is correct
  if (user?.password !== password) {
    throw new HttpError('Invalid credentials', 401);
  }

  return { token: 'token', user };
};

export const register = async (registerData: RegisterSchema) => {
  const { email, name, password } = registerData;

  const user = await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });

  return { token: 'token', user };
};
