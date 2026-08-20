import { Router } from 'express';
import {
  createTicket,
  getMyTickets,
  addMessageToTicket,
  submitContactMessage,
  getContactMessages,
  updateContactMessageStatus,
} from '../controllers/supportController';
import { authenticateJwt } from '../middleware/authJwt';
import { authorizeRoles } from '../middleware/roleGuard';
import { UserRole } from '../constants';

const router = Router();

// Public contact message submission
router.post('/contact', submitContactMessage);

// Authenticated ticket endpoints
router.post('/tickets', authenticateJwt, createTicket);
router.get('/my-tickets', authenticateJwt, getMyTickets);
router.post('/tickets/:ticketId/messages', authenticateJwt, addMessageToTicket);

// Admin contact messages inbox
router.get(
  '/contact-messages',
  authenticateJwt,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SUPPORT),
  getContactMessages
);

router.put(
  '/contact-messages/:id',
  authenticateJwt,
  authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SUPPORT),
  updateContactMessageStatus
);

export default router;
