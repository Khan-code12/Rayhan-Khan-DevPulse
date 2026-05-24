import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { validateBody } from '../../middlewares/validate.middleware.js';
import { signupValidation, loginValidation } from './auth.validation.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router();

router.post('/signup', validateBody(signupValidation), asyncHandler(AuthController.register));
router.post('/login', validateBody(loginValidation), asyncHandler(AuthController.processLogin));

export default router;