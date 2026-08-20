import mongoose, { Document, Schema } from 'mongoose';

export interface IBenefit extends Document {
  title: string;
  category: 'Healthcare' | 'Insurance' | 'Education' | 'Emergency' | 'Lifestyle' | 'Travel' | 'Social Impact' | 'General';
  description: string;
  eligibility: string;
  minLevelRequired: number;
  documentsRequired: string[];
  howToClaim: string[];
  isActive: boolean;
  isFeatured: boolean;
  providerInfo?: string; // e.g. "Provided by our authorized healthcare/insurance partners"
  createdAt: Date;
  updatedAt: Date;
}

const BenefitSchema = new Schema<IBenefit>(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['Healthcare', 'Insurance', 'Education', 'Emergency', 'Lifestyle', 'Travel', 'Social Impact', 'General'],
      required: true,
      index: true,
    },
    description: { type: String, required: true },
    eligibility: { type: String, required: true },
    minLevelRequired: { type: Number, default: 1 },
    documentsRequired: [{ type: String }],
    howToClaim: [{ type: String }],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    providerInfo: { type: String },
  },
  { timestamps: true }
);

export const Benefit = mongoose.model<IBenefit>('Benefit', BenefitSchema);
