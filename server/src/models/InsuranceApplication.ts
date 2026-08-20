import mongoose, { Document, Schema } from 'mongoose';

export interface IInsuranceApplication extends Document {
  applicationId: string;
  userId: mongoose.Types.ObjectId;
  planName: string;
  partnerName: string;
  coverageType: 'Health' | 'Life' | 'Accident' | 'Critical Illness';
  sumInsured: number;
  premiumEstimated?: number;
  applicantDetails: {
    fullName: string;
    dob: string;
    gender: string;
    occupation: string;
    annualIncome: number;
    nomineeName: string;
    nomineeRelation: string;
  };
  medicalHistoryNotes?: string;
  status: 'SUBMITTED' | 'FORWARDED_TO_PARTNER' | 'DOCS_REQUESTED' | 'POLICY_ISSUED' | 'REJECTED';
  policyNumber?: string;
  partnerReference?: string;
  adminFeedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InsuranceApplicationSchema = new Schema<IInsuranceApplication>(
  {
    applicationId: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    planName: { type: String, required: true },
    partnerName: { type: String, required: true, default: 'Authorized IRDAI Reg. Partner' },
    coverageType: {
      type: String,
      enum: ['Health', 'Life', 'Accident', 'Critical Illness'],
      required: true,
    },
    sumInsured: { type: Number, required: true },
    premiumEstimated: { type: Number },
    applicantDetails: {
      fullName: { type: String, required: true },
      dob: { type: String, required: true },
      gender: { type: String, required: true },
      occupation: { type: String, required: true },
      annualIncome: { type: Number, required: true },
      nomineeName: { type: String, required: true },
      nomineeRelation: { type: String, required: true },
    },
    medicalHistoryNotes: { type: String },
    status: {
      type: String,
      enum: ['SUBMITTED', 'FORWARDED_TO_PARTNER', 'DOCS_REQUESTED', 'POLICY_ISSUED', 'REJECTED'],
      default: 'SUBMITTED',
      index: true,
    },
    policyNumber: { type: String },
    partnerReference: { type: String },
    adminFeedback: { type: String },
  },
  { timestamps: true }
);

export const InsuranceApplication = mongoose.model<IInsuranceApplication>(
  'InsuranceApplication',
  InsuranceApplicationSchema
);
