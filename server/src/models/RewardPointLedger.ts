import mongoose, { Document, Schema } from 'mongoose';
import { PointTransactionType, PointStatus } from '../constants';

export interface IRewardPointLedger extends Document {
  transactionId: string;
  userId: mongoose.Types.ObjectId;
  type: PointTransactionType;
  amount: number; // positive for credit, negative for debit
  balanceAfter: number;
  source: string; // e.g. "PRODUCT_PURCHASE", "COMMUNITY_ACTIVITY", "REWARD_STORE_REDEMPTION"
  description: string;
  status: PointStatus;
  adminReference?: string;
  referenceId?: string; // Order ID, Claim ID, Redemption ID, etc.
  metadata?: Record<string, any>;
  createdAt: Date;
}

const RewardPointLedgerSchema = new Schema<IRewardPointLedger>(
  {
    transactionId: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: Object.values(PointTransactionType), required: true, index: true },
    amount: { type: Number, required: true },
    balanceAfter: { type: Number, required: true, min: 0 },
    source: { type: String, required: true, index: true },
    description: { type: String, required: true },
    status: { type: String, enum: Object.values(PointStatus), default: PointStatus.COMPLETED, index: true },
    adminReference: { type: String },
    referenceId: { type: String, index: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// High-Performance Query & Audit Indexes
RewardPointLedgerSchema.index({ userId: 1, createdAt: -1 });
RewardPointLedgerSchema.index({ type: 1, createdAt: -1 });
RewardPointLedgerSchema.index({ status: 1, createdAt: -1 });
RewardPointLedgerSchema.index({ description: 'text', source: 'text', transactionId: 'text' });

export const RewardPointLedger = mongoose.model<IRewardPointLedger>('RewardPointLedger', RewardPointLedgerSchema);
