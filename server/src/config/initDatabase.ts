import mongoose from 'mongoose';
import { User } from '../models/User';
import { NetworkNode } from '../models/NetworkNode';
import { RewardPointLedger } from '../models/RewardPointLedger';
import { MembershipPlan } from '../models/MembershipPlan';
import { Payment } from '../models/Payment';
import { RewardProduct } from '../models/RewardProduct';
import { RewardRedemption } from '../models/RewardRedemption';
import { Benefit } from '../models/Benefit';
import { BenefitClaim } from '../models/BenefitClaim';
import { EducationApplication } from '../models/EducationApplication';
import { InsuranceApplication } from '../models/InsuranceApplication';
import { ImpactProject } from '../models/ImpactProject';
import { SupportTicket } from '../models/SupportTicket';
import { ContactMessage } from '../models/ContactMessage';
import { RuleConfig } from '../models/RuleConfig';
import { AuditLog } from '../models/AuditLog';

/**
 * Initializes and synchronizes all MongoDB collections and compound indexes
 * for optimal query execution on MongoDB Atlas.
 */
export const initializeDatabaseIndexes = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 1) {
    console.log('[Database] Skipped index synchronization (Running in InMemory mode)');
    return;
  }

  try {
    console.log('[Database] Synchronizing MongoDB Atlas collections and indexes...');

    await Promise.all([
      User.syncIndexes(),
      NetworkNode.syncIndexes(),
      RewardPointLedger.syncIndexes(),
      MembershipPlan.syncIndexes(),
      Payment.syncIndexes(),
      RewardProduct.syncIndexes(),
      RewardRedemption.syncIndexes(),
      Benefit.syncIndexes(),
      BenefitClaim.syncIndexes(),
      EducationApplication.syncIndexes(),
      InsuranceApplication.syncIndexes(),
      ImpactProject.syncIndexes(),
      SupportTicket.syncIndexes(),
      ContactMessage.syncIndexes(),
      RuleConfig.syncIndexes(),
      AuditLog.syncIndexes(),
    ]);

    console.log('[Database] ✅ All 16 Collections & High-Performance Indexes Synchronized on MongoDB Atlas!');
  } catch (error: any) {
    console.error('[Database Error] Failed to sync indexes:', error.message);
  }
};
