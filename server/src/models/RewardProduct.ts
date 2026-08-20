import mongoose, { Document, Schema } from 'mongoose';

export interface IRewardProduct extends Document {
  title: string;
  description: string;
  category: string; // e.g. "Electronics", "Fashion", "Books", "Lifestyle", "Education", "Healthcare"
  pointsRequired: number;
  stock: number;
  imageUrl: string;
  isActive: boolean;
  isFeatured: boolean;
  minLevelRequired: number;
  specifications?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const RewardProductSchema = new Schema<IRewardProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    pointsRequired: { type: Number, required: true, min: 1 },
    stock: { type: Number, required: true, default: 0, min: 0 },
    imageUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    minLevelRequired: { type: Number, default: 1 },
    specifications: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const RewardProduct = mongoose.model<IRewardProduct>('RewardProduct', RewardProductSchema);
