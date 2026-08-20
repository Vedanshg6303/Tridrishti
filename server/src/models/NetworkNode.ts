import mongoose, { Document, Schema } from 'mongoose';

export interface INetworkNode extends Document {
  userId: mongoose.Types.ObjectId;
  parentId?: mongoose.Types.ObjectId;
  referralCode: string;
  depth: number;
  ancestors: mongoose.Types.ObjectId[];
  directReferralsCount: number;
  teamSize: number;
  qualifyingActivityPoints: number;
  isActive: boolean;
  joinedAt: Date;
  updatedAt: Date;
}

const NetworkNodeSchema = new Schema<INetworkNode>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    referralCode: { type: String, required: true, uppercase: true, index: true },
    depth: { type: Number, default: 0 },
    ancestors: [{ type: Schema.Types.ObjectId, ref: 'User', index: true }],
    directReferralsCount: { type: Number, default: 0 },
    teamSize: { type: Number, default: 0 },
    qualifyingActivityPoints: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const NetworkNode = mongoose.model<INetworkNode>('NetworkNode', NetworkNodeSchema);
