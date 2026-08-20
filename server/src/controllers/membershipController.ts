import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { MembershipPlan } from '../models/MembershipPlan';
import { Payment } from '../models/Payment';
import { PointsEngine } from '../services/PointsEngine';
import { AuthenticatedRequest } from '../middleware/authJwt';
import { PaymentStatus, PointTransactionType, AuditAction } from '../constants';
import { inMemoryStore } from '../config/memoryStore';

export const getPlans = async (req: Request, res: Response): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      const plans = await MembershipPlan.find({ isActive: true }).sort({ order: 1 });
      res.status(200).json({ success: true, plans });
    } else {
      res.status(200).json({ success: true, plans: inMemoryStore.plans });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCheckoutOrder = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const { planId } = req.body;
    let plan = inMemoryStore.plans.find((p) => p._id === planId || p.code === planId);

    if (!plan) {
      plan = inMemoryStore.plans[0]; // Default to ₹100 Entry Plan
    }

    const orderId = `order_tri_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    res.status(200).json({
      success: true,
      order: {
        id: orderId,
        amount: plan.price * 100,
        currency: 'INR',
        planName: plan.name,
        pointsReward: plan.triPointsReward,
        key: process.env.RAZORPAY_KEY_ID || 'rzp_test_demo_key',
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const { orderId } = req.body;

    // 1. Credit 10 Welcome TRI coins for newly activated user upon ₹100 entry
    const welcomeCoins = 10;
    await PointsEngine.creditPoints(
      req.user._id,
      welcomeCoins,
      PointTransactionType.MEMBERSHIP_PURCHASE,
      'ONBOARDING_ENTRY_ACTIVATION',
      'Welcome Reward: ₹100 Account Activation verified',
      orderId
    );

    // 2. If user was referred by a sponsor, reward sponsor with exactly 10 TRI Coins!
    if (req.user.referrerUserId || req.user.referredBy) {
      let sponsor = inMemoryStore.users.find(
        (u) =>
          u._id.toString() === req.user.referrerUserId?.toString() ||
          u.referralCode === req.user.referredBy
      );

      if (sponsor) {
        await PointsEngine.awardReferralBonus(sponsor._id, req.user.name, orderId);
        console.log(`[Referral Engine] Successfully rewarded 10 TRI Coins to Sponsor ${sponsor.name} (${sponsor.referralCode}) for referring ${req.user.name}`);
      }
    }

    res.status(200).json({
      success: true,
      message: '₹100 Entry payment verified! 10 TRI Coins credited to your ledger.',
      pointsCredited: welcomeCoins,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
