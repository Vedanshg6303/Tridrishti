import { Router } from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  submitKYC,
  sendOTP,
  verifyOTP,
  registerWithOTP,
  loginWithOTP,
} from '../controllers/authController';
import { authenticateJwt } from '../middleware/authJwt';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/register-otp', registerWithOTP);
router.post('/login-otp', loginWithOTP);
router.get('/me', authenticateJwt, getMe);
router.put('/profile', authenticateJwt, updateProfile);
router.post('/kyc', authenticateJwt, submitKYC);

export default router;
