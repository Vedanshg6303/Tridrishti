import mongoose from 'mongoose';
import { RewardPointLedger } from '../models/RewardPointLedger';
import { User, IUser } from '../models/User';
import { PointTransactionType, PointStatus, UserRole } from '../constants';
import { AuditService } from './AuditService';
import { inMemoryStore } from '../config/memoryStore';

export interface LevelConfig {
  level: number;
  name: string;
  minPoints: number;
  referralMultiplier: number;
  perks: string[];
}

export const PLATFORM_LEVELS: LevelConfig[] = [
  {
    level: 1,
    name: 'STARTER',
    minPoints: 0,
    referralMultiplier: 1.0,
    perks: ['Community Network Access', 'Referral Link (Earn 10 TRI Coins per referral)', 'Welcome Goodie Pack'],
  },
  {
    level: 2,
    name: 'CONNECT',
    minPoints: 50,
    referralMultiplier: 1.2,
    perks: ['24x7 Doctor Telehealth Consult Pass', '5% Goodies Store Discount', 'Priority Support'],
  },
  {
    level: 3,
    name: 'GROW',
    minPoints: 200,
    referralMultiplier: 1.5,
    perks: ['Free Annual NABL Diagnostic Test Pass', 'Higher Education Grant Eligibility', 'Physical Merchandise Unlocked'],
  },
  {
    level: 4,
    name: 'LEAD',
    minPoints: 500,
    referralMultiplier: 2.0,
    perks: ['Comprehensive Tuition Scholarships', 'Priority Medical Claims Reimbursement', 'Partner Insurance Guidance'],
  },
  {
    level: 5,
    name: 'DIAMOND',
    minPoints: 1000,
    referralMultiplier: 2.5,
    perks: ['Executive Concierge Helpdesk', 'Sponsor & Lead Local Social Drives', 'VIP Maximum Store Redemptions'],
  },
];

export class PointsEngine {
  public static calculateLevel(lifetimePointsEarned: number): { level: number; name: string } {
    let currentLevel = PLATFORM_LEVELS[0];
    for (const lvl of PLATFORM_LEVELS) {
      if (lifetimePointsEarned >= lvl.minPoints) {
        currentLevel = lvl;
      }
    }
    return { level: currentLevel.level, name: currentLevel.name };
  }

  public static async creditPoints(
    userId: string | mongoose.Types.ObjectId,
    amount: number,
    type: PointTransactionType,
    source: string,
    description: string,
    referenceId?: string,
    adminId?: string
  ): Promise<{ transaction: any; newBalance: number }> {
    if (amount <= 0) {
      throw new Error('Credit amount must be positive');
    }

    const transactionId = `TXN-TRI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // 1. In-Memory Store Update
    const memUser = inMemoryStore.users.find((u) => u._id.toString() === userId.toString());
    let newBalance = 0;
    let lifetimePoints = 0;

    if (memUser) {
      memUser.pointsBalance = (memUser.pointsBalance || 0) + amount;
      memUser.lifetimePointsEarned = (memUser.lifetimePointsEarned || 0) + amount;
      newBalance = memUser.pointsBalance;
      lifetimePoints = memUser.lifetimePointsEarned;

      const levelProgression = this.calculateLevel(lifetimePoints);
      memUser.level = levelProgression.level;
      memUser.levelName = levelProgression.name;
    }

    const memTransaction = {
      _id: `tx_${Date.now()}`,
      transactionId,
      userId: userId.toString(),
      type,
      amount,
      balanceAfter: newBalance,
      source,
      description,
      status: PointStatus.COMPLETED,
      referenceId,
      adminReference: adminId,
      createdAt: new Date().toISOString(),
    };

    inMemoryStore.ledger.unshift(memTransaction);

    // 2. Database Sync if connected
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(userId);
      if (user) {
        user.pointsBalance += amount;
        user.lifetimePointsEarned += amount;
        const levelProgression = this.calculateLevel(user.lifetimePointsEarned);
        user.level = levelProgression.level;
        user.levelName = levelProgression.name;
        await user.save();

        const dbLedger = new RewardPointLedger({
          transactionId,
          userId: user._id,
          type,
          amount,
          balanceAfter: user.pointsBalance,
          source,
          description,
          status: PointStatus.COMPLETED,
          referenceId,
          adminReference: adminId,
        });
        await dbLedger.save();
      }
    }

    return { transaction: memTransaction, newBalance };
  }

  public static async debitPoints(
    userId: string | mongoose.Types.ObjectId,
    amount: number,
    type: PointTransactionType,
    source: string,
    description: string,
    referenceId?: string
  ): Promise<{ transaction: any; newBalance: number }> {
    if (amount <= 0) {
      throw new Error('Debit amount must be positive');
    }

    const transactionId = `TXN-TRI-DEBIT-${Date.now().toString(36).toUpperCase()}`;

    const memUser = inMemoryStore.users.find((u) => u._id.toString() === userId.toString());
    let newBalance = 0;

    if (memUser) {
      if ((memUser.pointsBalance || 0) < amount) {
        throw new Error('Insufficient TRI Points balance for this transaction');
      }
      memUser.pointsBalance -= amount;
      memUser.lifetimePointsUsed = (memUser.lifetimePointsUsed || 0) + amount;
      newBalance = memUser.pointsBalance;
    }

    const memTransaction = {
      _id: `tx_${Date.now()}`,
      transactionId,
      userId: userId.toString(),
      type,
      amount: -amount,
      balanceAfter: newBalance,
      source,
      description,
      status: PointStatus.COMPLETED,
      referenceId,
      createdAt: new Date().toISOString(),
    };

    inMemoryStore.ledger.unshift(memTransaction);

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(userId);
      if (user) {
        if (user.pointsBalance < amount) {
          throw new Error('Insufficient TRI Points balance');
        }
        user.pointsBalance -= amount;
        user.lifetimePointsUsed += amount;
        await user.save();

        const dbLedger = new RewardPointLedger({
          transactionId,
          userId: user._id,
          type,
          amount: -amount,
          balanceAfter: user.pointsBalance,
          source,
          description,
          status: PointStatus.COMPLETED,
          referenceId,
        });
        await dbLedger.save();
      }
    }

    return { transaction: memTransaction, newBalance };
  }

  /**
   * Automatic Referral Bonus:
   * Sponsoring a member who completes ₹100 entry credits exactly 10 TRI coins to sponsor
   */
  public static async awardReferralBonus(
    sponsorId: string | mongoose.Types.ObjectId,
    referredUserName: string,
    orderId: string
  ): Promise<void> {
    const rewardCoins = 10;
    await this.creditPoints(
      sponsorId,
      rewardCoins,
      PointTransactionType.REFERRAL_ACTIVITY_REWARD,
      'REFERRAL_ATTRIBUTION',
      `Earned 10 TRI Coins for referral of ${referredUserName} (₹100 Activation Verified)`,
      orderId
    );
  }
}
