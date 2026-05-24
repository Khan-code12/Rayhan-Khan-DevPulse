import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { sendSuccess } from '../../utils/response.js';

export class AuthController {
  static register = async (req: Request, res: Response) => {
    const data = await AuthService.signup(req.body);
    return sendSuccess(res, 201, 'User registered successfully', data);
  };

  static processLogin = async (req: Request, res: Response) => {
    const data = await AuthService.login(req.body);
    return sendSuccess(res, 200, 'Login successful', data);
  };
}