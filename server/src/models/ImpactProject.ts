import mongoose, { Document, Schema } from 'mongoose';

export interface IImpactProject extends Document {
  title: string;
  category: 'Education' | 'Healthcare' | 'Environment' | 'Community Development' | 'Disaster Relief';
  description: string;
  location: string;
  targetBeneficiaries: number;
  currentBeneficiaries: number;
  booksDonated: number;
  campsConducted: number;
  treesPlanted?: number;
  volunteersJoined: number;
  imageUrls: string[];
  status: 'ACTIVE' | 'COMPLETED' | 'UPCOMING';
  partnerNGO?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ImpactProjectSchema = new Schema<IImpactProject>(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['Education', 'Healthcare', 'Environment', 'Community Development', 'Disaster Relief'],
      required: true,
      index: true,
    },
    description: { type: String, required: true },
    location: { type: String, required: true },
    targetBeneficiaries: { type: Number, default: 0 },
    currentBeneficiaries: { type: Number, default: 0 },
    booksDonated: { type: Number, default: 0 },
    campsConducted: { type: Number, default: 0 },
    treesPlanted: { type: Number, default: 0 },
    volunteersJoined: { type: Number, default: 0 },
    imageUrls: [{ type: String }],
    status: { type: String, enum: ['ACTIVE', 'COMPLETED', 'UPCOMING'], default: 'ACTIVE' },
    partnerNGO: { type: String },
  },
  { timestamps: true }
);

export const ImpactProject = mongoose.model<IImpactProject>('ImpactProject', ImpactProjectSchema);
