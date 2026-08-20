import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'PAYMENT' | 'POINTS' | 'REWARD' | 'LEVEL' | 'REFERRAL' | 'CLAIM' | 'ANNOUNCEMENT' | 'SUPPORT';
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['PAYMENT', 'POINTS', 'REWARD', 'LEVEL', 'REFERRAL', 'CLAIM', 'ANNOUNCEMENT', 'SUPPORT'],
      default: 'ANNOUNCEMENT',
    },
    read: { type: Boolean, default: false },
    actionUrl: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
