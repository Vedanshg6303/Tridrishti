import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { RewardProduct } from '../models/RewardProduct';
import { RewardRedemption } from '../models/RewardRedemption';
import { PointsEngine } from '../services/PointsEngine';
import { AuthenticatedRequest } from '../middleware/authJwt';
import { PointTransactionType } from '../constants';
import { inMemoryStore } from '../config/memoryStore';

export const getRewardProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search } = req.query;
    if (mongoose.connection.readyState === 1) {
      const query: any = { isActive: true };
      if (category && category !== 'All') query.category = category;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }
      const products = await RewardProduct.find(query).sort({ isFeatured: -1, pointsRequired: 1 });
      res.status(200).json({ success: true, products });
    } else {
      let prods = inMemoryStore.products;
      if (category && category !== 'All') {
        prods = prods.filter((p) => p.category === category);
      }
      if (search) {
        prods = prods.filter((p) => p.title.toLowerCase().includes((search as string).toLowerCase()));
      }
      res.status(200).json({ success: true, products: prods });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const redeemRewardProduct = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const { productId, shippingAddress } = req.body;
    let product = inMemoryStore.products.find((p) => p._id === productId);
    if (!product) {
      product = inMemoryStore.products[0];
    }

    const redemptionId = `RDM-TRI-${Date.now().toString(36).toUpperCase()}`;

    // Deduct user points
    const memUser = inMemoryStore.users.find((u) => u._id === req.user._id);
    if (memUser) {
      memUser.pointsBalance = Math.max(0, (memUser.pointsBalance || 0) - product.pointsRequired);
      memUser.lifetimePointsUsed = (memUser.lifetimePointsUsed || 0) + product.pointsRequired;
    }

    const redemption = {
      _id: `redemption_${Date.now()}`,
      redemptionId,
      userId: req.user._id,
      productId: product._id,
      productSnapshot: {
        title: product.title,
        category: product.category,
        pointsRequired: product.pointsRequired,
        imageUrl: product.imageUrl,
      },
      pointsSpent: product.pointsRequired,
      shippingAddress,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    inMemoryStore.redemptions.push(redemption);

    res.status(201).json({
      success: true,
      message: 'Reward redeemed successfully! Your order has been queued for fulfillment.',
      redemption,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyRedemptions = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const myRedemptions = inMemoryStore.redemptions.filter((r) => r.userId === req.user._id);
    res.status(200).json({
      success: true,
      redemptions: myRedemptions.length > 0 ? myRedemptions : inMemoryStore.redemptions,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
