import { Router } from 'express';
import { getPointLedger, getPointSummary } from '../controllers/pointsController';
import { authenticateJwt } from '../middleware/authJwt';

const router = Router();

router.get('/ledger', authenticateJwt, getPointLedger);
router.get('/summary', authenticateJwt, getPointSummary);

export default router;
