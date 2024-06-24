/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  setupFilesAfterEnv: ['./src/__tests__/prisma-mock.ts'],
  testPathIgnorePatterns: [
    './dist',
    './node_modules',
    './src/__tests__/prisma-mock.ts',
  ],
  verbose: true,
};
