import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ success: false, message: 'Missing, expired, or invalid JWT token' });
    return;
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
    const decoded = verifyToken(token!);
    req.user = { id: decoded.id, name: decoded.name, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Missing, expired, or invalid JWT token' });
  }
};