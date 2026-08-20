import mongoose, { Document, Schema } from 'mongoose';

export interface IRuleConfig extends Document {
  key: string;
  category: 'REWARD_POINTS' | 'LEVEL_THRESHOLDS' | 'REFERRAL_LIMITS' | 'BENEFIT_ACCESS' | 'COMPLIANCE';
  name: string;
  description: string;
  value: any;
  dataType: 'number' | 'string' | 'boolean' | 'json';
  lastModifiedBy?: mongoose.Types.ObjectId;
  lastModifiedByName?: string;
  updatedAt: Date;
}

const RuleConfigSchema = new Schema<IRuleConfig>(
  {
    key: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      enum: ['REWARD_POINTS', 'LEVEL_THRESHOLDS', 'REFERRAL_LIMITS', 'BENEFIT_ACCESS', 'COMPLIANCE'],
      required: true,
      index: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true },
    dataType: {
      type: String,
      enum: ['number', 'string', 'boolean', 'json'],
      required: true,
    },
    lastModifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    lastModifiedByName: { type: String },
  },
  { timestamps: true }
);

export const RuleConfig = mongoose.model<IRuleConfig>('RuleConfig', RuleConfigSchema);
