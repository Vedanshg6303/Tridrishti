import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authJwt';
import { UserRole } from '../constants';

export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    // SUPER_ADMIN has access to all admin routes
    if (req.user.role === UserRole.SUPER_ADMIN) {
      next();
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Forbidden: requires one of the roles [${allowedRoles.join(', ')}]`,
      });
      return;
    }

    next();
  };
};

export const authorizeRoles = requireRole;
