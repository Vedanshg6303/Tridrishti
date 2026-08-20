import { Router } from 'express';
import { getMyNotifications, markAsRead, markAllAsRead } from '../controllers/notificationController';
import { authenticateJwt } from '../middleware/authJwt';

const router = Router();

router.get('/', authenticateJwt, getMyNotifications);
router.put('/:id/read', authenticateJwt, markAsRead);
router.put('/read-all', authenticateJwt, markAllAsRead);

export default router;
