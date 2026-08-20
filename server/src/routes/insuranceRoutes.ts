import { Router } from 'express';
import { getInsurancePlans, submitInsuranceApplication, getMyInsuranceApplications } from '../controllers/insuranceController';
import { authenticateJwt } from '../middleware/authJwt';

const router = Router();

router.get('/plans', getInsurancePlans);
router.post('/apply', authenticateJwt, submitInsuranceApplication);
router.get('/my-applications', authenticateJwt, getMyInsuranceApplications);

export default router;
