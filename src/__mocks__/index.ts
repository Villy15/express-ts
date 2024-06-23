import { NextFunction, Request, Response } from 'express-serve-static-core';

export const mockRequest = {} as Request;

export const mockResponse = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
} as unknown as Response;

export const mockNext = jest.fn() as unknown as NextFunction;
