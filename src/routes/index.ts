import { Router } from 'express';
import authRoutes from '../modules/auth/auth.route.js';
import issueRoutes from '../modules/issues/issue.route.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/issues', issueRoutes);

export default router;