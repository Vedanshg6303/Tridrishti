import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Benefit } from '../models/Benefit';
import { BenefitClaim } from '../models/BenefitClaim';
import { AuthenticatedRequest } from '../middleware/authJwt';
import { ClaimStatus } from '../constants';
import { inMemoryStore } from '../config/memoryStore';

export const getBenefits = async (req: Request, res: Response): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      const benefits = await Benefit.find({ isActive: true }).sort({ minLevelRequired: 1 });
      res.status(200).json({ success: true, benefits });
    } else {
      res.status(200).json({ success: true, benefits: inMemoryStore.benefits });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitBenefitClaim = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const { benefitId, userNotes, claimAmount } = req.body;
    const claimId = `CLM-TRI-${Date.now().toString(36).toUpperCase()}`;

    const claim = {
      _id: `claim_${Date.now()}`,
      claimId,
      userId: req.user._id,
      benefitId,
      benefitTitle: 'Medical & Health Checkup Assistance',
      category: 'Healthcare',
      claimAmount,
      userNotes: userNotes || 'Application submitted as per platform terms.',
      status: 'SUBMITTED',
      createdAt: new Date().toISOString(),
    };

    inMemoryStore.claims.push(claim);

    res.status(201).json({
      success: true,
      message: 'Benefit claim submitted successfully for review.',
      claim,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyClaims = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    res.status(200).json({ success: true, claims: inMemoryStore.claims });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
