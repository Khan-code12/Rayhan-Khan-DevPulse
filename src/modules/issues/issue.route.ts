import { Router } from 'express';

import { IssueController } from './issue.controller.js';
import { validateIssueCreation, validateIssueModification } from './issue.validation.js';


import { authenticateJWT } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';
import { validateBody } from '../../middlewares/validate.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(IssueController.fetchAll));
router.get('/:id', asyncHandler(IssueController.fetchOne));


router.post('/', authenticateJWT, validateBody(validateIssueCreation), asyncHandler(IssueController.insert));
router.patch('/:id', authenticateJWT, validateBody(validateIssueModification), asyncHandler(IssueController.updateData));
router.delete('/:id', authenticateJWT, authorizeRoles('maintainer'), asyncHandler(IssueController.destroyData));

export default router;