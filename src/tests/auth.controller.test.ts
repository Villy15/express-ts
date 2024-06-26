import { User } from '@prisma/client';
import { login, register } from '../app/auth/auth.services';
import prismaMock from './mocks/prisma-mock';

// Mock user object
const user: User = {
  id: 1,
  name: 'Adrian',
  email: 'adrianvill07@gmail.com',
  password: 'password',
  last_name: 'Villalba',
};

describe('Auth Services', () => {
  describe('login', () => {
    it('should return a user by email', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);

      const result = await login({
        email: user.email,
        password: 'password',
      });

      expect(result).toEqual({
        token: expect.any(String),
        user,
      });
      expect(prismaMock.user.findUnique).toHaveBeenCalled();
    });

    it.todo('should throw an error if password is incorrect');

    it('should throw an error if user is not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        login({
          email: user.email,
          password: 'password',
        })
      ).rejects.toThrow('User not found');
    });
  });

  describe('register', () => {
    it.todo(
      'should create a new user and return a token if user does not exist'
    );

    it.skip('should throw an error if user already exists', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);

      await expect(
        register({
          name: user.name as string,
          email: user.email,
          password: 'password',
        })
      ).rejects.toThrow('User already exists');
    });
  });
});
