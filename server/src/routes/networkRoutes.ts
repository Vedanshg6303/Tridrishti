import { Router } from 'express';
import { getMyNetworkTree, getReferralAnalytics } from '../controllers/networkController';
import { authenticateJwt } from '../middleware/authJwt';

const router = Router();

router.get('/tree', authenticateJwt, getMyNetworkTree);
router.get('/referrals', authenticateJwt, getReferralAnalytics);

export default router;
