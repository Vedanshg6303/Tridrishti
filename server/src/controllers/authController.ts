import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../models/User';
import { NetworkService } from '../services/NetworkService';
import { AuthenticatedRequest } from '../middleware/authJwt';
import { KYCStatus, UserRole, AuditAction } from '../constants';
import { AuditService } from '../services/AuditService';
import { inMemoryStore } from '../config/memoryStore';

const generateTokens = (userId: string, role: string) => {
  const jwtSecret = process.env.JWT_SECRET || 'tridrishti_super_secure_jwt_secret_key_2026_production';
  const refreshSecret = process.env.JWT_REFRESH_SECRET || 'tridrishti_super_secure_refresh_key_2026_production';

  const accessToken = jwt.sign({ id: userId, role }, jwtSecret, { expiresIn: '1d' });
  const refreshToken = jwt.sign({ id: userId, role }, refreshSecret, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone, referralCode } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Name, email and password are required' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    let userReferralCode = NetworkService.generateReferralCode(name);

    if (mongoose.connection.readyState === 1) {
      const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
      if (existingUser) {
        res.status(400).json({ success: false, message: 'An account with this email already exists' });
        return;
      }

      while (await User.findOne({ referralCode: userReferralCode })) {
        userReferralCode = NetworkService.generateReferralCode(name);
      }

      let referrerUserId = undefined;
      let referredByCode = undefined;

      if (referralCode) {
        const parentUser = await User.findOne({ referralCode: referralCode.trim().toUpperCase() });
        if (parentUser) {
          referrerUserId = parentUser._id;
          referredByCode = parentUser.referralCode;
        }
      }

      const newUser = new User({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
        phone: phone ? phone.trim() : undefined,
        referralCode: userReferralCode,
        referredBy: referredByCode,
        referrerUserId,
        role: UserRole.USER,
        level: 1,
        levelName: 'STARTER',
        pointsBalance: 0,
        lifetimePointsEarned: 0,
        lifetimePointsUsed: 0,
        kycStatus: KYCStatus.NOT_SUBMITTED,
        isActive: true,
        isSuspended: false,
      });

      await newUser.save();
      await NetworkService.registerUserInTree(newUser, referredByCode);

      const tokens = generateTokens(newUser._id.toString(), newUser.role);

      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        user: newUser,
        tokens,
      });
    } else {
      // In-Memory Fallback
      const existing = inMemoryStore.users.find((u) => u.email === email.toLowerCase().trim());
      if (existing) {
        res.status(400).json({ success: false, message: 'An account with this email already exists' });
        return;
      }

      const newUser = {
        _id: `user_mock_${Date.now()}`,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
        phone: phone ? phone.trim() : undefined,
        referralCode: userReferralCode,
        referredBy: referralCode ? referralCode.trim().toUpperCase() : undefined,
        role: UserRole.USER,
        level: 1,
        levelName: 'STARTER',
        pointsBalance: 0,
        lifetimePointsEarned: 0,
        lifetimePointsUsed: 0,
        kycStatus: KYCStatus.NOT_SUBMITTED,
        isActive: true,
        isSuspended: false,
        createdAt: new Date().toISOString(),
      };

      inMemoryStore.users.push(newUser);
      const tokens = generateTokens(newUser._id, newUser.role);

      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        user: newUser,
        tokens,
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required' });
      return;
    }

    let user: any;

    if (mongoose.connection.readyState === 1) {
      user = await User.findOne({ email: email.toLowerCase().trim() });
    } else {
      user = inMemoryStore.users.find((u) => u.email === email.toLowerCase().trim());
    }

    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    if (user.isSuspended) {
      res.status(403).json({
        success: false,
        message: 'Your account is suspended. Please contact Tridrishti support.',
        suspensionReason: user.suspensionReason,
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const tokens = generateTokens(user._id.toString(), user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        referralCode: user.referralCode,
        referredBy: user.referredBy,
        level: user.level,
        levelName: user.levelName,
        pointsBalance: user.pointsBalance,
        kycStatus: user.kycStatus,
        avatar: user.avatar,
        address: user.address,
      },
      tokens,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Login failed' });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const { name, phone, avatar, address } = req.body;

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.user._id);
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }
      if (name) user.name = name.trim();
      if (phone) user.phone = phone.trim();
      if (avatar) user.avatar = avatar;
      if (address) user.address = { ...user.address, ...address };
      await user.save();
      res.status(200).json({ success: true, message: 'Profile updated successfully', user });
    } else {
      const user = inMemoryStore.users.find((u) => u._id === req.user._id);
      if (user) {
        if (name) user.name = name.trim();
        if (phone) user.phone = phone.trim();
        if (avatar) user.avatar = avatar;
        if (address) user.address = { ...user.address, ...address };
      }
      res.status(200).json({ success: true, message: 'Profile updated successfully', user });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitKYC = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const { panNumber, aadhaarLast4, documentUrl } = req.body;

    if (!panNumber || !aadhaarLast4) {
      res.status(400).json({ success: false, message: 'PAN Number and Aadhaar Last 4 Digits are required' });
      return;
    }

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.kycStatus = KYCStatus.PENDING;
        user.kycDocuments = {
          panNumber: panNumber.toUpperCase().trim(),
          aadhaarLast4: aadhaarLast4.trim(),
          documentUrl: documentUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
        };
        await user.save();
      }
    } else {
      const user = inMemoryStore.users.find((u) => u._id === req.user._id);
      if (user) {
        user.kycStatus = KYCStatus.PENDING;
        user.kycDocuments = {
          panNumber: panNumber.toUpperCase().trim(),
          aadhaarLast4: aadhaarLast4.trim(),
          documentUrl: documentUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
        };
      }
    }

    res.status(200).json({
      success: true,
      message: 'KYC documents submitted successfully for compliance verification',
      kycStatus: KYCStatus.PENDING,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
