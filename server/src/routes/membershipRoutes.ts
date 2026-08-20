import { Router } from 'express';
import { getPlans, createCheckoutOrder, verifyPayment } from '../controllers/membershipController';
import { authenticateJwt } from '../middleware/authJwt';

const router = Router();

router.get('/plans', getPlans);
router.post('/checkout', authenticateJwt, createCheckoutOrder);
router.post('/verify-payment', authenticateJwt, verifyPayment);

export default router;
