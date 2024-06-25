/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  setupFilesAfterEnv: ['./src/tests/mocks/prisma-mock.ts'],
  testPathIgnorePatterns: [
    './dist',
    './node_modules',
    './src/tests/mocks/prisma-mock.ts',
  ],
  verbose: true,
};
