import mongoose, { Document, Schema } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'IN_PROGRESS' | 'REPLIED' | 'ARCHIVED';
  adminReplyNote?: string;
  repliedBy?: mongoose.Types.ObjectId;
  repliedAt?: Date;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Sender name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      maxlength: [200, 'Subject cannot exceed 200 characters'],
      default: 'Website General Inquiry',
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      maxlength: [4000, 'Message cannot exceed 4000 characters'],
    },
    status: {
      type: String,
      enum: ['UNREAD', 'READ', 'IN_PROGRESS', 'REPLIED', 'ARCHIVED'],
      default: 'UNREAD',
      index: true,
    },
    adminReplyNote: {
      type: String,
      trim: true,
    },
    repliedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    repliedAt: {
      type: Date,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound Index for fast triage queries
ContactMessageSchema.index({ status: 1, createdAt: -1 });

export const ContactMessage = mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
