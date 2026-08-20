import mongoose, { Document, Schema } from 'mongoose';
import { PaymentStatus } from '../constants';

export interface IPayment extends Document {
  orderId: string;
  paymentId?: string;
  signature?: string;
  invoiceNumber?: string;
  userId: mongoose.Types.ObjectId;
  planId?: mongoose.Types.ObjectId;
  amount: number; // in INR
  currency: string;
  status: PaymentStatus;
  gateway: string;
  pointsCredited: number;
  taxBreakdown?: {
    baseAmount: number;
    gstAmount: number;
    gstRate: number;
  };
  metadata?: Record<string, any>;
  verifiedAt?: Date;
  refundReason?: string;
  refundedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    paymentId: { type: String, index: true },
    signature: { type: String },
    invoiceNumber: { type: String, unique: true, sparse: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    planId: { type: Schema.Types.ObjectId, ref: 'MembershipPlan', index: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.CREATED, index: true },
    gateway: { type: String, default: 'RAZORPAY', index: true },
    pointsCredited: { type: Number, default: 0, min: 0 },
    taxBreakdown: {
      baseAmount: { type: Number },
      gstAmount: { type: Number },
      gstRate: { type: Number, default: 18 },
    },
    metadata: { type: Schema.Types.Mixed },
    verifiedAt: { type: Date },
    refundReason: { type: String },
    refundedAt: { type: Date },
  },
  { timestamps: true }
);

// High-Performance Query Indexes
PaymentSchema.index({ userId: 1, createdAt: -1 });
PaymentSchema.index({ status: 1, createdAt: -1 });
PaymentSchema.index({ gateway: 1, paymentId: 1 });

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
