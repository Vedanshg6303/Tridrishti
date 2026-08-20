import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User, IUser } from '../models/User';
import { inMemoryStore } from '../config/memoryStore';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateJwt = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ success: false, message: 'Authorization token required' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'tridrishti_super_secure_jwt_secret_key_2026_production';
    const decoded = jwt.verify(token, secret) as { id: string; role: string };

    let user: any;
    if (mongoose.connection.readyState === 1) {
      user = await User.findById(decoded.id).select('-passwordHash');
    } else {
      user = inMemoryStore.users.find((u) => u._id === decoded.id || u.id === decoded.id);
    }

    if (!user) {
      res.status(401).json({ success: false, message: 'User belonging to this token no longer exists' });
      return;
    }

    if (user.isSuspended) {
      res.status(403).json({
        success: false,
        message: 'Your account is suspended. Please contact Tridrishti support.',
        suspensionReason: user.suspensionReason,
      });
      return;
    }

    req.user = user;
    next();
  } catch (error: any) {
    res.status(401).json({ success: false, message: 'Invalid or expired token', error: error.message });
  }
};
