import { Router } from 'express';
import { getMasterState, executeQuickAction, executeDatabaseStudio } from '../controllers/ownerController';
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

// Built-in Database Studio Engine (Query/Insert/Update/Delete across all collections)
router.post(
  '/database-studio',
  authenticateJwt,
  requireRole(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  executeDatabaseStudio
);

export default router;
