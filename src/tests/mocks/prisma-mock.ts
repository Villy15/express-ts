import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';

import { PrismaClient } from '@prisma/client';
import prisma from '../../prisma/prisma-client';

jest.mock('../../prisma/prisma-client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});

export default prismaMock;
