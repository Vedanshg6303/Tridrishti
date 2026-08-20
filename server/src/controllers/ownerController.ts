import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authJwt';
import { inMemoryStore } from '../config/memoryStore';
import { PointsEngine } from '../services/PointsEngine';
import { PointTransactionType, UserRole, KYCStatus } from '../constants';

/**
 * Master State: Single aggregated endpoint returning full platform financials,
 * user metrics, dynamic rules, claims, redemptions, and contact inquiries.
 */
export const getMasterState = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const totalUsers = inMemoryStore.users.length;
    const activeMembers = inMemoryStore.users.filter((u) => !u.isSuspended).length;
    const totalPointsCirculating = inMemoryStore.users.reduce((sum, u) => sum + (u.pointsBalance || 0), 0);
    const totalLifetimeEarned = inMemoryStore.users.reduce((sum, u) => sum + (u.lifetimePointsEarned || 0), 0);
    const totalRedeemedPoints = inMemoryStore.users.reduce((sum, u) => sum + (u.lifetimePointsUsed || 0), 0);
    
    // Revenue based on ₹100 entry activations + upgrades
    const entryActivationsCount = inMemoryStore.users.length;
    const grossRevenue = entryActivationsCount * 100 + 1500;

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeMembers,
        entryActivationsCount,
        grossRevenue,
        totalPointsCirculating,
        totalLifetimeEarned,
        totalRedeemedPoints,
        pendingKycCount: inMemoryStore.users.filter((u) => u.kycStatus === 'PENDING').length,
        pendingClaimsCount: inMemoryStore.claims.filter((c) => c.status === 'SUBMITTED').length,
        pendingRedemptionsCount: inMemoryStore.redemptions.filter((r) => r.status === 'PENDING').length,
        unreadInquiriesCount: inMemoryStore.contactMessages.filter((m) => m.status === 'UNREAD').length,
      },
      users: inMemoryStore.users,
      rules: inMemoryStore.rules,
      plans: inMemoryStore.plans,
      products: inMemoryStore.products,
      claims: inMemoryStore.claims,
      redemptions: inMemoryStore.redemptions,
      contactMessages: inMemoryStore.contactMessages,
      auditLogs: inMemoryStore.auditLogs,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Quick Action: Execute fast owner/developer interventions:
 * - 'ADJUST_POINTS': Instant point credit/debit
 * - 'SET_LEVEL': Direct level promotion/demotion
 * - 'TOGGLE_SUSPEND': 1-click user freeze/unfreeze
 * - 'SET_KYC': 1-click KYC verify/reject
 * - 'UPDATE_RULE': 1-click rule value change (e.g. entry fee or referral payout)
 * - 'SIMULATE_REFERRAL': 1-click test simulation of new ₹100 user & 10 coins attribution
 */
export const executeQuickAction = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { action, targetUserId, payload } = req.body;
    const actorName = req.user?.name || 'Owner / Developer';

    switch (action) {
      case 'ADJUST_POINTS': {
        const { amount, reason } = payload;
        const result = await PointsEngine.creditPoints(
          targetUserId,
          +amount,
          PointTransactionType.ADMIN_ADJUSTMENT,
          'OWNER_QUICK_ACTION',
          reason || `Manual adjustment by ${actorName}`,
          undefined,
          req.user?._id
        );
        res.status(200).json({ success: true, message: `Adjusted points by ${amount}`, result });
        return;
      }

      case 'SET_LEVEL': {
        const { level } = payload;
        const user = inMemoryStore.users.find((u) => u._id === targetUserId);
        if (user) {
          user.level = +level;
          const names = ['', 'STARTER', 'CONNECT', 'GROW', 'LEAD', 'DIAMOND'];
          user.levelName = names[+level] || 'MEMBER';
        }
        res.status(200).json({ success: true, message: `Set user level to ${level}`, user });
        return;
      }

      case 'TOGGLE_SUSPEND': {
        const user = inMemoryStore.users.find((u) => u._id === targetUserId);
        if (user) {
          user.isSuspended = !user.isSuspended;
        }
        res.status(200).json({ success: true, message: `User suspension toggled`, user });
        return;
      }

      case 'SET_KYC': {
        const { status } = payload;
        const user = inMemoryStore.users.find((u) => u._id === targetUserId);
        if (user) {
          user.kycStatus = status as KYCStatus;
        }
        res.status(200).json({ success: true, message: `KYC updated to ${status}`, user });
        return;
      }

      case 'UPDATE_RULE': {
        const { ruleKey, value } = payload;
        const rule = inMemoryStore.rules.find((r) => r.key === ruleKey);
        if (rule) {
          rule.value = value;
        }
        res.status(200).json({ success: true, message: `Rule ${ruleKey} updated to ${value}`, rule });
        return;
      }

      case 'SIMULATE_REFERRAL': {
        const sponsor = inMemoryStore.users.find((u) => u._id === targetUserId) || inMemoryStore.users[1];
        const newUserName = payload.name || `Member_${Math.random().toString(36).substring(2, 6)}`;
        const newUserEmail = payload.email || `${newUserName.toLowerCase()}@example.com`;

        const newUser = {
          _id: `user_sim_${Date.now()}`,
          name: newUserName,
          email: newUserEmail,
          phone: '+91 9900000000',
          role: UserRole.USER,
          referralCode: `TRI-${newUserName.toUpperCase().substring(0, 5)}-${Math.floor(100 + Math.random() * 900)}`,
          referredBy: sponsor.referralCode,
          referrerUserId: sponsor._id,
          level: 1,
          levelName: 'STARTER',
          pointsBalance: 10, // 10 Welcome points
          lifetimePointsEarned: 10,
          lifetimePointsUsed: 0,
          kycStatus: KYCStatus.NOT_SUBMITTED,
          isActive: true,
          isSuspended: false,
          createdAt: new Date().toISOString(),
        };

        inMemoryStore.users.push(newUser);

        // Reward sponsor with 10 TRI Coins!
        await PointsEngine.awardReferralBonus(sponsor._id, newUser.name, `sim_order_${Date.now()}`);

        res.status(201).json({
          success: true,
          message: `Simulated ₹100 Onboarding: ${newUser.name} registered under ${sponsor.name}. 10 TRI Coins credited to sponsor!`,
          newUser,
          sponsorBalance: sponsor.pointsBalance,
        });
        return;
      }

      default:
        res.status(400).json({ success: false, message: 'Unknown quick action' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
