import mongoose, { Document, Schema } from 'mongoose';
import { AuditAction } from '../constants';

export interface IAuditLog extends Document {
  action: AuditAction;
  performedBy: mongoose.Types.ObjectId;
  performedByName: string;
  performedByRole: string;
  targetUserId?: mongoose.Types.ObjectId;
  targetResource: string;
  targetId?: string;
  details: string;
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    action: { type: String, enum: Object.values(AuditAction), required: true, index: true },
    performedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    performedByName: { type: String, required: true },
    performedByRole: { type: String, required: true },
    targetUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    targetResource: { type: String, required: true },
    targetId: { type: String },
    details: { type: String, required: true },
    changes: { type: Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
