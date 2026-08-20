import { Router } from 'express';
import {
  getAdminMetrics,
  getAdminUsers,
  toggleUserSuspension,
  verifyUserKYC,
  manualPointAdjustment,
  getRules,
  updateRule,
  getAllClaims,
  updateClaimStatus,
  getAllRedemptions,
  updateRedemptionStatus,
  getAuditLogs,
} from '../controllers/adminController';
import { authenticateJwt } from '../middleware/authJwt';
import { requireRole } from '../middleware/roleGuard';
import { UserRole } from '../constants';

const router = Router();

// Admin routes require authentication and an administrative role
router.use(authenticateJwt);
router.use(requireRole(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SUPPORT, UserRole.FINANCE, UserRole.OPERATIONS));

router.get('/metrics', getAdminMetrics);
router.get('/users', getAdminUsers);
router.put('/users/:userId/suspension', toggleUserSuspension);
router.put('/users/:userId/kyc', verifyUserKYC);

router.post('/points/adjustment', manualPointAdjustment);

router.get('/rules', getRules);
router.put('/rules/:key', updateRule);

router.get('/claims', getAllClaims);
router.put('/claims/:claimId', updateClaimStatus);

router.get('/redemptions', getAllRedemptions);
router.put('/redemptions/:redemptionId', updateRedemptionStatus);

router.get('/audit-logs', getAuditLogs);

export default router;
