import { Router } from 'express';
import { getRewardProducts, redeemRewardProduct, getMyRedemptions } from '../controllers/rewardsController';
import { authenticateJwt } from '../middleware/authJwt';

const router = Router();

router.get('/products', getRewardProducts);
router.post('/redeem', authenticateJwt, redeemRewardProduct);
router.get('/my-redemptions', authenticateJwt, getMyRedemptions);

export default router;
