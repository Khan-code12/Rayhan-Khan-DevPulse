import type { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Requested resource does not exist' });
};