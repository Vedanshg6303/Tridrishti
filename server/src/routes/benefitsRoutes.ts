import { Router } from 'express';
import { getBenefits, submitBenefitClaim, getMyClaims } from '../controllers/benefitsController';
import { authenticateJwt } from '../middleware/authJwt';

const router = Router();

router.get('/', getBenefits);
router.post('/claim', authenticateJwt, submitBenefitClaim);
router.get('/my-claims', authenticateJwt, getMyClaims);

export default router;
