import type { Request, Response, NextFunction } from 'express';
import type { IAppError } from '../interfaces/common.interface.js';

export const globalErrorHandler = (err: IAppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Unexpected server or database error';

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || message,
  });
};