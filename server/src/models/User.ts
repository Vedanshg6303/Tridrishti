import mongoose, { Document, Schema } from 'mongoose';
import { UserRole, KYCStatus } from '../constants';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  role: UserRole;
  referralCode: string;
  referredBy?: string; // Referral code of parent
  referrerUserId?: mongoose.Types.ObjectId;
  level: number;
  levelName: string;
  pointsBalance: number;
  pendingPoints: number;
  lifetimePointsEarned: number;
  lifetimePointsUsed: number;
  kycStatus: KYCStatus;
  kycDocuments?: {
    panNumber?: string;
    aadhaarLast4?: string;
    documentUrl?: string;
    verifiedAt?: Date;
    verificationNotes?: string;
  };
  isActive: boolean;
  isSuspended: boolean;
  suspensionReason?: string;
  avatar?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
  };
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, trim: true, index: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER, index: true },
    referralCode: { type: String, required: true, unique: true, uppercase: true, index: true },
    referredBy: { type: String, uppercase: true, index: true },
    referrerUserId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    level: { type: Number, default: 1, min: 1, index: true },
    levelName: { type: String, default: 'STARTER' },
    pointsBalance: { type: Number, default: 0, min: 0, index: true },
    pendingPoints: { type: Number, default: 0, min: 0 },
    lifetimePointsEarned: { type: Number, default: 0, min: 0 },
    lifetimePointsUsed: { type: Number, default: 0, min: 0 },
    kycStatus: { type: String, enum: Object.values(KYCStatus), default: KYCStatus.NOT_SUBMITTED, index: true },
    kycDocuments: {
      panNumber: { type: String, uppercase: true, trim: true },
      aadhaarLast4: { type: String, trim: true },
      documentUrl: { type: String },
      verifiedAt: { type: Date },
      verificationNotes: { type: String },
    },
    isActive: { type: Boolean, default: true, index: true },
    isSuspended: { type: Boolean, default: false, index: true },
    suspensionReason: { type: String },
    avatar: { type: String },
    address: {
      line1: { type: String },
      line2: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
      country: { type: String, default: 'India' },
    },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

// High-Performance Query Indexes
UserSchema.index({ role: 1, isSuspended: 1 });
UserSchema.index({ kycStatus: 1, createdAt: -1 });
UserSchema.index({ level: 1, pointsBalance: -1 });
UserSchema.index({ name: 'text', email: 'text', referralCode: 'text' });

export const User = mongoose.model<IUser>('User', UserSchema);
