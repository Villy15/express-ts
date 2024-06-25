import { Request, Response } from 'express-serve-static-core';
import errorHandler from '../../app/middlewares/error.middleware';

export const mockRequest = {} as Request;

export const mockResponse = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
} as unknown as Response;

export const mockNext = jest
  .fn()
  .mockImplementation(err =>
    errorHandler(err, mockRequest, mockResponse, jest.fn())
  );
