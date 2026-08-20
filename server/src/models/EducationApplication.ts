import mongoose, { Document, Schema } from 'mongoose';

export interface IEducationApplication extends Document {
  applicationId: string;
  userId: mongoose.Types.ObjectId;
  studentName: string;
  relation: string; // Self, Son, Daughter, Sibling, Ward
  institution: string;
  courseName: string;
  annualFee: number;
  requestedGrantAmount: number;
  approvedGrantAmount?: number;
  academicPerformance: string; // e.g. "92% in 12th Standard"
  financialBackgroundNote: string;
  status: 'SUBMITTED' | 'VERIFICATION' | 'REVIEW' | 'APPROVED' | 'DISBURSED' | 'REJECTED';
  adminNotes?: string;
  disbursementTxnId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EducationApplicationSchema = new Schema<IEducationApplication>(
  {
    applicationId: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    studentName: { type: String, required: true },
    relation: { type: String, required: true },
    institution: { type: String, required: true },
    courseName: { type: String, required: true },
    annualFee: { type: Number, required: true },
    requestedGrantAmount: { type: Number, required: true },
    approvedGrantAmount: { type: Number },
    academicPerformance: { type: String, required: true },
    financialBackgroundNote: { type: String, required: true },
    status: {
      type: String,
      enum: ['SUBMITTED', 'VERIFICATION', 'REVIEW', 'APPROVED', 'DISBURSED', 'REJECTED'],
      default: 'SUBMITTED',
      index: true,
    },
    adminNotes: { type: String },
    disbursementTxnId: { type: String },
  },
  { timestamps: true }
);

export const EducationApplication = mongoose.model<IEducationApplication>(
  'EducationApplication',
  EducationApplicationSchema
);
