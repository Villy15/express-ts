import { mockNext, mockRequest, mockResponse } from '../__mocks__';
import { getUsers } from '../controllers/users.controller';
import prisma from '../prisma';

jest.mock('../prisma.ts', () => ({
  user: {
    findMany: jest.fn(),
  },
}));

describe('getUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array of users', async () => {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];
    (prisma.user.findMany as jest.Mock).mockResolvedValue(users);

    await getUsers(mockRequest, mockResponse, mockNext);

    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(users);
  });
});
