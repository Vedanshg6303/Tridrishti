import mongoose, { Document, Schema } from 'mongoose';
import { ClaimStatus } from '../constants';

export interface IBenefitClaim extends Document {
  claimId: string;
  userId: mongoose.Types.ObjectId;
  benefitId: mongoose.Types.ObjectId;
  benefitTitle: string;
  category: string;
  claimAmount?: number;
  documents: {
    name: string;
    url: string;
    uploadedAt: Date;
  }[];
  userNotes: string;
  status: ClaimStatus;
  adminReviewerId?: mongoose.Types.ObjectId;
  adminFeedback?: string;
  disbursedAmount?: number;
  disbursementReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BenefitClaimSchema = new Schema<IBenefitClaim>(
  {
    claimId: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    benefitId: { type: Schema.Types.ObjectId, ref: 'Benefit', required: true },
    benefitTitle: { type: String, required: true },
    category: { type: String, required: true },
    claimAmount: { type: Number },
    documents: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    userNotes: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(ClaimStatus),
      default: ClaimStatus.SUBMITTED,
      index: true,
    },
    adminReviewerId: { type: Schema.Types.ObjectId, ref: 'User' },
    adminFeedback: { type: String },
    disbursedAmount: { type: Number },
    disbursementReference: { type: String },
  },
  { timestamps: true }
);

export const BenefitClaim = mongoose.model<IBenefitClaim>('BenefitClaim', BenefitClaimSchema);
