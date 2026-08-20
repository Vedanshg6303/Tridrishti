import { Router } from 'express';
import { getMasterState, executeQuickAction } from '../controllers/ownerController';
import { authenticateJwt } from '../middleware/authJwt';
import { requireRole } from '../middleware/roleGuard';
import { UserRole } from '../constants';

const router = Router();

// Master state endpoint for Owner / Developer panel
router.get(
  '/master-state',
  authenticateJwt,
  requireRole(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  getMasterState
);

// 1-Click Fast Developer Interventions
router.post(
  '/quick-action',
  authenticateJwt,
  requireRole(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  executeQuickAction
);

export default router;
