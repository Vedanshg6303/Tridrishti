import { Response } from 'express';
import mongoose from 'mongoose';
import { NetworkService } from '../services/NetworkService';
import { NetworkNode } from '../models/NetworkNode';
import { User } from '../models/User';
import { AuthenticatedRequest } from '../middleware/authJwt';
import { inMemoryStore } from '../config/memoryStore';

export const getMyNetworkTree = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    if (mongoose.connection.readyState === 1) {
      const depth = parseInt(req.query.depth as string, 10) || 4;
      const tree = await NetworkService.getUserSubtree(req.user._id, depth);
      res.status(200).json({ success: true, tree });
    } else {
      // Return structured in-memory tree
      const mockTree = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        referralCode: req.user.referralCode,
        level: req.user.level || 3,
        levelName: req.user.levelName || 'GROW',
        points: req.user.pointsBalance || 1250,
        joinedAt: req.user.createdAt || new Date().toISOString(),
        directReferrals: 3,
        teamSize: 6,
        children: [
          {
            id: 'user_rahul_003',
            name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            referralCode: 'TRI-RAHUL-101',
            level: 2,
            levelName: 'CONNECT',
            points: 650,
            joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            directReferrals: 2,
            teamSize: 2,
            children: [
              {
                id: 'user_sneha_006',
                name: 'Sneha Reddy',
                email: 'sneha.reddy@example.com',
                referralCode: 'TRI-SNEHA-404',
                level: 1,
                levelName: 'STARTER',
                points: 200,
                joinedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                directReferrals: 0,
                teamSize: 0,
                children: [],
              },
              {
                id: 'user_vikram_007',
                name: 'Vikram Singh',
                email: 'vikram.singh@example.com',
                referralCode: 'TRI-VIKRM-505',
                level: 1,
                levelName: 'STARTER',
                points: 100,
                joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                directReferrals: 0,
                teamSize: 0,
                children: [],
              },
            ],
          },
          {
            id: 'user_priya_004',
            name: 'Priya Patel',
            email: 'priya.patel@example.com',
            referralCode: 'TRI-PRIYA-202',
            level: 2,
            levelName: 'CONNECT',
            points: 820,
            joinedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
            directReferrals: 1,
            teamSize: 1,
            children: [
              {
                id: 'user_ananya_008',
                name: 'Ananya Deshmukh',
                email: 'ananya.deshmukh@example.com',
                referralCode: 'TRI-ANANY-606',
                level: 1,
                levelName: 'STARTER',
                points: 100,
                joinedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
                directReferrals: 0,
                teamSize: 0,
                children: [],
              },
            ],
          },
          {
            id: 'user_amit_005',
            name: 'Amit Verma',
            email: 'amit.verma@example.com',
            referralCode: 'TRI-AMIT-303',
            level: 1,
            levelName: 'STARTER',
            points: 150,
            joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            directReferrals: 0,
            teamSize: 0,
            children: [],
          },
        ],
      };
      res.status(200).json({ success: true, tree: mockTree });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReferralAnalytics = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const directReferrals = inMemoryStore.users
      .filter((u) => u.referredBy === req.user.referralCode || u._id !== req.user._id)
      .slice(1, 4);

    res.status(200).json({
      success: true,
      analytics: {
        referralCode: req.user.referralCode,
        referralUrl: `https://tridrishti.com/join/${req.user.referralCode}`,
        totalReferrals: directReferrals.length,
        activeReferrals: directReferrals.length,
        pendingKyc: 1,
        verifiedKyc: 2,
        teamSize: 6,
        directReferrals,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
