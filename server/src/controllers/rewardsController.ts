import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { RewardProduct } from '../models/RewardProduct';
import { RewardRedemption } from '../models/RewardRedemption';
import { User } from '../models/User';
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

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.pincode || !shippingAddress.phone) {
      res.status(400).json({
        success: false,
        message: 'Complete shipping address including Name, Phone, and PIN code is required',
      });
      return;
    }

    let product: any;
    let userBalance = 0;

    if (mongoose.connection.readyState === 1) {
      product = await RewardProduct.findById(productId);
      const user = await User.findById(req.user._id);
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }
      userBalance = user.pointsBalance || 0;
    } else {
      product = inMemoryStore.products.find((p) => p._id === productId) || inMemoryStore.products[0];
      const memUser = inMemoryStore.users.find((u) => u._id === req.user._id);
      userBalance = memUser ? memUser.pointsBalance || 0 : 0;
    }

    if (!product) {
      res.status(404).json({ success: false, message: 'Reward product not found' });
      return;
    }

    if (userBalance < product.pointsRequired) {
      res.status(400).json({
        success: false,
        message: `Insufficient TRI Points. You need ${product.pointsRequired} TRI Coins but currently have ${userBalance} TRI Coins.`,
      });
      return;
    }

    const redemptionId = `RDM-TRI-${Date.now().toString(36).toUpperCase()}`;
    let newBalance = userBalance - product.pointsRequired;
    let redemption: any;

    if (mongoose.connection.readyState === 1) {
      // Deduct points & update user
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { pointsBalance: -product.pointsRequired, lifetimePointsUsed: product.pointsRequired },
      });

      redemption = await RewardRedemption.create({
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
      });
    } else {
      const memUser = inMemoryStore.users.find((u) => u._id === req.user._id);
      if (memUser) {
        memUser.pointsBalance = newBalance;
        memUser.lifetimePointsUsed = (memUser.lifetimePointsUsed || 0) + product.pointsRequired;
      }

      redemption = {
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

      inMemoryStore.redemptions.unshift(redemption);
    }

    res.status(201).json({
      success: true,
      message: `🎉 Success! Redeemed "${product.title}" for ${product.pointsRequired} TRI Coins. Your order is queued for fulfillment.`,
      redemption,
      newPointsBalance: newBalance,
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
