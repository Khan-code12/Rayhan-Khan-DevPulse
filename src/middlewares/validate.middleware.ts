import type { Request, Response, NextFunction } from 'express';

export const validateBody = (validatorFn: (body: any) => string | null) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errorMsg = validatorFn(req.body);
    if (errorMsg) {
      res.status(400).json({ success: false, message: 'Validation errors, invalid input, duplicate resource', errors: errorMsg });
      return;
    }
    next();
  };
};