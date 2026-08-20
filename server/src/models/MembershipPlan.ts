import mongoose, { Document, Schema } from 'mongoose';

export interface IMembershipPlan extends Document {
  name: string;
  code: string; // e.g. "TRI_STARTER", "TRI_PRO", "TRI_ELITE"
  price: number; // in INR ₹
  description: string;
  triPointsReward: number; // Reward points credited upon eligible purchase
  features: string[];
  goodiesIncluded: string[];
  benefitsSummary: string[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const MembershipPlanSchema = new Schema<IMembershipPlan>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    triPointsReward: { type: Number, default: 0, min: 0 },
    features: [{ type: String }],
    goodiesIncluded: [{ type: String }],
    benefitsSummary: [{ type: String }],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const MembershipPlan = mongoose.model<IMembershipPlan>('MembershipPlan', MembershipPlanSchema);
