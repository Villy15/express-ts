import prisma from '../../../prisma/prisma-client';
import { LoginSchema, RegisterSchema } from '../../../schemas/auth.schema';
import HttpError from '../../../utils/http-error';

export const login = async (loginData: LoginSchema['body']) => {
  const { email, password } = loginData;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new HttpError('User not found', 404);
  }

  return { token: 'token' };
};

type registerData = {
  email: string;
  name: string;
  password: string;
};

export const register = async (registerData: RegisterSchema['body']) => {
  const { email, name, password } = registerData;

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });

  return { token: 'token' };
};
