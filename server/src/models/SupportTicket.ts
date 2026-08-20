import mongoose, { Document, Schema } from 'mongoose';
import { SupportTicketStatus, SupportTicketPriority } from '../constants';

export interface ISupportTicketMessage {
  senderId: mongoose.Types.ObjectId;
  senderName: string;
  senderRole: string;
  message: string;
  createdAt: Date;
}

export interface ISupportTicket extends Document {
  ticketId: string;
  userId: mongoose.Types.ObjectId;
  userName: string;
  userEmail: string;
  subject: string;
  category: 'Payment Issue' | 'Reward Issue' | 'Points Issue' | 'Account Issue' | 'Benefit Issue' | 'Order Issue' | 'Other';
  priority: SupportTicketPriority;
  status: SupportTicketStatus;
  assignedTo?: mongoose.Types.ObjectId;
  assignedToName?: string;
  messages: ISupportTicketMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const SupportTicketMessageSchema = new Schema<ISupportTicketMessage>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    senderName: { type: String, required: true },
    senderRole: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const SupportTicketSchema = new Schema<ISupportTicket>(
  {
    ticketId: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    subject: { type: String, required: true },
    category: {
      type: String,
      enum: ['Payment Issue', 'Reward Issue', 'Points Issue', 'Account Issue', 'Benefit Issue', 'Order Issue', 'Other'],
      required: true,
    },
    priority: {
      type: String,
      enum: Object.values(SupportTicketPriority),
      default: SupportTicketPriority.MEDIUM,
    },
    status: {
      type: String,
      enum: Object.values(SupportTicketStatus),
      default: SupportTicketStatus.OPEN,
      index: true,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    assignedToName: { type: String },
    messages: [SupportTicketMessageSchema],
  },
  { timestamps: true }
);

export const SupportTicket = mongoose.model<ISupportTicket>('SupportTicket', SupportTicketSchema);
