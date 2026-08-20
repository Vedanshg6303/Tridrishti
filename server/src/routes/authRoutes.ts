import { Router } from 'express';
import { register, login, getMe, updateProfile, submitKYC } from '../controllers/authController';
import { authenticateJwt } from '../middleware/authJwt';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateJwt, getMe);
router.put('/profile', authenticateJwt, updateProfile);
router.post('/kyc', authenticateJwt, submitKYC);

export default router;
