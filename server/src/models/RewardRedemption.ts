import mongoose, { Document, Schema } from 'mongoose';

export interface IRewardRedemption extends Document {
  redemptionId: string;
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  productSnapshot: {
    title: string;
    category: string;
    pointsRequired: number;
    imageUrl: string;
  };
  pointsSpent: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  trackingNumber?: string;
  courierPartner?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RewardRedemptionSchema = new Schema<IRewardRedemption>(
  {
    redemptionId: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    productId: { type: Schema.Types.ObjectId, ref: 'RewardProduct', required: true },
    productSnapshot: {
      title: { type: String, required: true },
      category: { type: String, required: true },
      pointsRequired: { type: Number, required: true },
      imageUrl: { type: String, required: true },
    },
    pointsSpent: { type: Number, required: true },
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
      default: 'PENDING',
      index: true,
    },
    trackingNumber: { type: String },
    courierPartner: { type: String },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

export const RewardRedemption = mongoose.model<IRewardRedemption>('RewardRedemption', RewardRedemptionSchema);
