import { Response } from 'express';
import mongoose from 'mongoose';
import { RewardPointLedger } from '../models/RewardPointLedger';
import { AuthenticatedRequest } from '../middleware/authJwt';
import { inMemoryStore } from '../config/memoryStore';

export const getPointLedger = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    if (mongoose.connection.readyState === 1) {
      const { page = 1, limit = 20, type, search } = req.query;
      const query: any = { userId: req.user._id };

      if (type) query.type = type;
      if (search) {
        query.$or = [
          { transactionId: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      const total = await RewardPointLedger.countDocuments(query);
      const transactions = await RewardPointLedger.find(query)
        .sort({ createdAt: -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit);

      res.status(200).json({
        success: true,
        transactions,
        pagination: { total, page: +page, pages: Math.ceil(total / +limit), limit: +limit },
      });
    } else {
      const userTransactions = inMemoryStore.ledger.filter((t) => t.userId === req.user._id);
      res.status(200).json({
        success: true,
        transactions: userTransactions.length > 0 ? userTransactions : inMemoryStore.ledger,
        pagination: { total: inMemoryStore.ledger.length, page: 1, pages: 1, limit: 50 },
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPointSummary = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    res.status(200).json({
      success: true,
      summary: {
        balance: req.user.pointsBalance || 1250,
        pendingPoints: req.user.pendingPoints || 100,
        lifetimeEarned: req.user.lifetimePointsEarned || 2450,
        lifetimeUsed: req.user.lifetimePointsUsed || 1200,
        level: req.user.level || 3,
        levelName: req.user.levelName || 'GROW',
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
