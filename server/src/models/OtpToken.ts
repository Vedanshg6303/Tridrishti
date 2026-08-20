import mongoose, { Schema, Document } from 'mongoose';

export interface IOtpToken extends Document {
  target: string; // email or phone number
  type: 'LOGIN' | 'SIGNUP' | 'RESET_PASSWORD';
  otp: string;
  expiresAt: Date;
  isVerified: boolean;
  attempts: number;
  createdAt: Date;
}

const OtpTokenSchema: Schema = new Schema(
  {
    target: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['LOGIN', 'SIGNUP', 'RESET_PASSWORD'],
      default: 'SIGNUP',
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // Automatically delete document when expiresAt arrives
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const OtpToken = mongoose.model<IOtpToken>('OtpToken', OtpTokenSchema);
