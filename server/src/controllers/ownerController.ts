import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authJwt';
import { inMemoryStore, initInMemoryStore } from '../config/memoryStore';
import { PointsEngine } from '../services/PointsEngine';
import { PointTransactionType, UserRole, KYCStatus } from '../constants';

/**
 * Master State: Single aggregated endpoint returning full platform financials,
 * user metrics, dynamic rules, claims, redemptions, catalog, announcements, and settings.
 */
export const getMasterState = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const totalUsers = inMemoryStore.users.length;
    const activeMembers = inMemoryStore.users.filter((u) => !u.isSuspended).length;
    const totalPointsCirculating = inMemoryStore.users.reduce((sum, u) => sum + (u.pointsBalance || 0), 0);
    const totalLifetimeEarned = inMemoryStore.users.reduce((sum, u) => sum + (u.lifetimePointsEarned || 0), 0);
    const totalRedeemedPoints = inMemoryStore.users.reduce((sum, u) => sum + (u.lifetimePointsUsed || 0), 0);
    
    // Real revenue based on non-admin members' ₹100 entry activations
    const entryActivationsCount = inMemoryStore.users.filter(u => u.role !== UserRole.SUPER_ADMIN).length;
    const grossRevenue = entryActivationsCount * 100;

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
        pendingClaimsCount: inMemoryStore.claims.filter((c) => c.status === 'PENDING' || c.status === 'SUBMITTED').length,
        pendingRedemptionsCount: inMemoryStore.redemptions.filter((r) => r.status === 'PENDING').length,
        unreadInquiriesCount: inMemoryStore.contactMessages.filter((m) => m.status === 'UNREAD').length,
      },
      users: inMemoryStore.users,
      rules: inMemoryStore.rules,
      plans: inMemoryStore.plans,
      products: inMemoryStore.products,
      benefits: inMemoryStore.benefits,
      impactProjects: inMemoryStore.impactProjects,
      claims: inMemoryStore.claims,
      redemptions: inMemoryStore.redemptions,
      contactMessages: inMemoryStore.contactMessages,
      auditLogs: inMemoryStore.auditLogs,
      ledger: inMemoryStore.ledger,
      announcements: inMemoryStore.announcements,
      settings: inMemoryStore.settings,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Complete suite of Developer and Owner quick actions
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

      case 'COMMUNITY_AIRDROP': {
        const { amount, reason } = payload;
        const airdropPoints = +amount || 10;
        const note = reason || `Community Celebration Airdrop by ${actorName}`;

        let creditedCount = 0;
        for (const u of inMemoryStore.users) {
          if (u.role !== UserRole.SUPER_ADMIN && !u.isSuspended) {
            await PointsEngine.creditPoints(
              u._id,
              airdropPoints,
              PointTransactionType.ADMIN_ADJUSTMENT,
              'COMMUNITY_AIRDROP',
              note,
              undefined,
              req.user?._id
            );
            creditedCount++;
          }
        }
        res.status(200).json({
          success: true,
          message: `🎉 Successfully airdropped ${airdropPoints} TRI Coins to all ${creditedCount} active members!`,
        });
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

      case 'UPSERT_PRODUCT': {
        const { product } = payload;
        const prodId = product._id || `prod_${Date.now()}`;
        const idx = inMemoryStore.products.findIndex((p) => p._id === prodId);
        const item = { ...product, _id: prodId, updatedAt: new Date().toISOString() };
        if (idx !== -1) {
          inMemoryStore.products[idx] = item;
        } else {
          inMemoryStore.products.push(item);
        }
        res.status(200).json({ success: true, message: `Product ${item.title} saved to catalog!`, product: item });
        return;
      }

      case 'DELETE_PRODUCT': {
        const idx = inMemoryStore.products.findIndex((p) => p._id === targetUserId);
        if (idx !== -1) {
          inMemoryStore.products.splice(idx, 1);
        }
        res.status(200).json({ success: true, message: 'Product removed from marketplace' });
        return;
      }

      case 'UPSERT_BENEFIT': {
        const { benefit } = payload;
        const benId = benefit._id || `ben_${Date.now()}`;
        const idx = inMemoryStore.benefits.findIndex((b) => b._id === benId);
        const item = { ...benefit, _id: benId, updatedAt: new Date().toISOString() };
        if (idx !== -1) {
          inMemoryStore.benefits[idx] = item;
        } else {
          inMemoryStore.benefits.push(item);
        }
        res.status(200).json({ success: true, message: `Welfare Benefit ${item.title} saved!`, benefit: item });
        return;
      }

      case 'DELETE_BENEFIT': {
        const idx = inMemoryStore.benefits.findIndex((b) => b._id === targetUserId);
        if (idx !== -1) {
          inMemoryStore.benefits.splice(idx, 1);
        }
        res.status(200).json({ success: true, message: 'Benefit removed from catalog' });
        return;
      }

      case 'UPSERT_IMPACT_PROJECT': {
        const { project } = payload;
        const projId = project._id || `proj_${Date.now()}`;
        const idx = inMemoryStore.impactProjects.findIndex((p) => p._id === projId);
        const item = { ...project, _id: projId, updatedAt: new Date().toISOString() };
        if (idx !== -1) {
          inMemoryStore.impactProjects[idx] = item;
        } else {
          inMemoryStore.impactProjects.push(item);
        }
        res.status(200).json({ success: true, message: `Social Impact initiative ${item.title} saved!`, project: item });
        return;
      }

      case 'SET_ANNOUNCEMENT': {
        const { title, message, type, link, isActive } = payload;
        inMemoryStore.announcements = [
          {
            _id: `ann_${Date.now()}`,
            title: title || 'System Announcement',
            message: message || '',
            type: type || 'PROMO',
            link: link || '',
            isActive: isActive !== false,
            createdAt: new Date().toISOString(),
          },
        ];
        res.status(200).json({ success: true, message: 'Live Broadcast Announcement banner updated!', announcements: inMemoryStore.announcements });
        return;
      }

      case 'UPDATE_SYSTEM_SETTINGS': {
        inMemoryStore.settings = { ...inMemoryStore.settings, ...payload };
        res.status(200).json({ success: true, message: 'System configurations updated successfully!', settings: inMemoryStore.settings });
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

      case 'RESET_DATA_TO_ZERO': {
        await initInMemoryStore();
        res.status(200).json({ success: true, message: 'All dummy platform data wiped and reset to zero state successfully!' });
        return;
      }

      case 'RESOLVE_INQUIRY': {
        const { status, reply } = payload;
        const msg = inMemoryStore.contactMessages.find((m) => m._id === targetUserId);
        if (msg) {
          msg.status = status || 'RESOLVED';
          if (reply) {
            msg.adminReply = reply;
            msg.repliedAt = new Date().toISOString();
            msg.repliedBy = actorName;
          }
        }
        res.status(200).json({ success: true, message: `Inquiry status updated to ${status || 'RESOLVED'}`, msg });
        return;
      }

      case 'DELETE_INQUIRY': {
        const idx = inMemoryStore.contactMessages.findIndex((m) => m._id === targetUserId);
        if (idx !== -1) {
          inMemoryStore.contactMessages.splice(idx, 1);
        }
        res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
        return;
      }

      case 'UPDATE_CLAIM': {
        const { status, reviewNotes, disbursementTxnRef } = payload;
        const claim = inMemoryStore.claims.find((c) => c._id === targetUserId);
        if (claim) {
          claim.status = status;
          claim.reviewNotes = reviewNotes || claim.reviewNotes;
          claim.reviewedBy = actorName;
          claim.reviewedAt = new Date().toISOString();
          if (disbursementTxnRef) {
            claim.disbursementTxnRef = disbursementTxnRef;
          }
        }
        res.status(200).json({ success: true, message: `Benefit claim updated to ${status}`, claim });
        return;
      }

      case 'UPDATE_REDEMPTION': {
        const { status, trackingNumber, courierPartner } = payload;
        const rdm = inMemoryStore.redemptions.find((r) => r._id === targetUserId);
        if (rdm) {
          rdm.status = status;
          if (trackingNumber) rdm.trackingNumber = trackingNumber;
          if (courierPartner) rdm.courierPartner = courierPartner;
          rdm.updatedAt = new Date().toISOString();

          // Auto-refund if rejected
          if (status === 'REJECTED') {
            await PointsEngine.creditPoints(
              rdm.userId,
              rdm.pointsUsed,
              PointTransactionType.ADMIN_ADJUSTMENT,
              'REDEMPTION_REFUND',
              `Points refund for rejected redemption order ${rdm._id}`,
              undefined,
              req.user?._id
            );
          }
        }
        res.status(200).json({ success: true, message: `Redemption order updated to ${status}`, redemption: rdm });
        return;
      }

      case 'SIMULATE_REFERRAL': {
        const sponsor = inMemoryStore.users.find((u) => u._id === targetUserId) || inMemoryStore.users[0];
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

/**
 * Raw Database Studio CRUD Endpoint for Developers
 */
export const executeDatabaseStudio = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { collection, operation, filter, doc } = req.body;

    const allowedCollections: Record<string, keyof typeof inMemoryStore> = {
      users: 'users',
      rules: 'rules',
      plans: 'plans',
      products: 'products',
      benefits: 'benefits',
      impactProjects: 'impactProjects',
      claims: 'claims',
      redemptions: 'redemptions',
      ledger: 'ledger',
      tickets: 'tickets',
      contactMessages: 'contactMessages',
      auditLogs: 'auditLogs',
      announcements: 'announcements',
    };

    const key = allowedCollections[collection];
    if (!key) {
      res.status(400).json({ success: false, message: `Unknown or unindexed collection: ${collection}` });
      return;
    }

    const colArray = inMemoryStore[key] as any[];

    switch (operation) {
      case 'FIND': {
        let result = colArray;
        if (filter && typeof filter === 'object') {
          result = colArray.filter((item) =>
            Object.entries(filter).every(([k, v]) => String(item[k]).toLowerCase().includes(String(v).toLowerCase()))
          );
        }
        res.status(200).json({ success: true, count: result.length, data: result });
        return;
      }

      case 'INSERT': {
        const newDoc = {
          _id: doc._id || `${collection}_${Date.now()}`,
          ...doc,
          createdAt: doc.createdAt || new Date().toISOString(),
        };
        colArray.push(newDoc);
        res.status(201).json({ success: true, message: `Inserted 1 document into ${collection}`, doc: newDoc });
        return;
      }

      case 'UPDATE': {
        const idx = colArray.findIndex((item) => item._id === doc._id);
        if (idx === -1) {
          res.status(404).json({ success: false, message: `Document with _id ${doc._id} not found in ${collection}` });
          return;
        }
        colArray[idx] = { ...colArray[idx], ...doc, updatedAt: new Date().toISOString() };
        res.status(200).json({ success: true, message: `Updated document in ${collection}`, doc: colArray[idx] });
        return;
      }

      case 'DELETE': {
        const idx = colArray.findIndex((item) => item._id === filter?._id);
        if (idx === -1) {
          res.status(404).json({ success: false, message: `Document with _id ${filter?._id} not found in ${collection}` });
          return;
        }
        const removed = colArray.splice(idx, 1)[0];
        res.status(200).json({ success: true, message: `Deleted document from ${collection}`, removed });
        return;
      }

      default:
        res.status(400).json({ success: false, message: 'Invalid database operation. Supported: FIND, INSERT, UPDATE, DELETE' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
