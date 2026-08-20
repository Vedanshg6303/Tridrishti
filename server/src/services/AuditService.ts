import mongoose from 'mongoose';
import { AuditLog } from '../models/AuditLog';
import { AuditAction } from '../constants';
import { IUser } from '../models/User';

export class AuditService {
  static async log(params: {
    action: AuditAction;
    performedBy: IUser;
    targetUserId?: mongoose.Types.ObjectId | string;
    targetResource: string;
    targetId?: string;
    details: string;
    changes?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<void> {
    try {
      const logEntry = new AuditLog({
        action: params.action,
        performedBy: params.performedBy._id,
        performedByName: params.performedBy.name,
        performedByRole: params.performedBy.role,
        targetUserId: params.targetUserId,
        targetResource: params.targetResource,
        targetId: params.targetId,
        details: params.details,
        changes: params.changes,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
        timestamp: new Date(),
      });

      await logEntry.save();
    } catch (err) {
      console.error('[Audit Log Error]', err);
    }
  }
}
