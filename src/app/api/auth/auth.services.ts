import prisma from '../../../prisma/prisma-client';
import HttpError from '../../../utils/http-error';

type loginData = {
  email: string;
  password: string;
};

export const login = async (loginData: loginData) => {
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

export const register = async (registerData: registerData) => {
  const { email, name, password } = registerData;
  const user = await prisma.user.create({
    data: {
      email,
      name,
      //! Fix late
      // @ts-ignore
      password,
    },
  });

  return { token: 'token' };
};
