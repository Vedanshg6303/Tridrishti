import { Router } from 'express';
import { submitEducationApplication, getMyEducationApplications } from '../controllers/educationController';
import { authenticateJwt } from '../middleware/authJwt';

const router = Router();

router.post('/apply', authenticateJwt, submitEducationApplication);
router.get('/my-applications', authenticateJwt, getMyEducationApplications);

export default router;
