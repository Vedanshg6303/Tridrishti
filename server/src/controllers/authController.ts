import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../models/User';
import { OtpToken } from '../models/OtpToken';
import { NetworkService } from '../services/NetworkService';
import { AuthenticatedRequest } from '../middleware/authJwt';
import { KYCStatus, UserRole, AuditAction } from '../constants';
import { AuditService } from '../services/AuditService';
import { EmailService } from '../services/EmailService';
import { SmsService } from '../services/SmsService';
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

/**
 * Send 6-Digit OTP to Email or Phone
 */
export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { target, type = 'SIGNUP' } = req.body;

    if (!target) {
      res.status(400).json({ success: false, message: 'Email or phone target is required' });
      return;
    }

    const cleanTarget = target.toLowerCase().trim();
    // Generate deterministic or random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    if (mongoose.connection.readyState === 1) {
      // Invalidate previous OTPs for this target
      await OtpToken.deleteMany({ target: cleanTarget, type });
      await OtpToken.create({
        target: cleanTarget,
        type,
        otp,
        expiresAt,
        isVerified: false,
        attempts: 0,
      });
    } else {
      inMemoryStore.otps = inMemoryStore.otps.filter(
        (o) => !(o.target === cleanTarget && o.type === type)
      );
      inMemoryStore.otps.push({
        _id: `otp_${Date.now()}`,
        target: cleanTarget,
        type,
        otp,
        expiresAt: expiresAt.toISOString(),
        isVerified: false,
        attempts: 0,
      });
    }

    console.log(`[AUTH OTP Engine] Generated OTP for ${cleanTarget} (${type}): ${otp}`);

    // Dispatch real email or real SMS depending on target format
    let emailDelivered = false;
    let smsDelivered = false;

    if (cleanTarget.includes('@')) {
      emailDelivered = await EmailService.sendOtpEmail(cleanTarget, otp, type);
    } else {
      smsDelivered = await SmsService.sendOtpSms(cleanTarget, otp, type);
    }

    const channelName = cleanTarget.includes('@') ? 'Email' : 'Mobile SMS';

    res.status(200).json({
      success: true,
      message: emailDelivered || smsDelivered
        ? `A 6-digit verification code has been sent via ${channelName} to ${cleanTarget}`
        : `A 6-digit verification code has been generated for ${cleanTarget}`,
      target: cleanTarget,
      type,
      channel: channelName,
      emailDelivered,
      smsDelivered,
      // For immediate ease of local testing & developer experience:
      devOtpPreview: otp,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to send OTP' });
  }
};

/**
 * Verify 6-Digit OTP
 */
export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { target, otp, type = 'SIGNUP' } = req.body;

    if (!target || !otp) {
      res.status(400).json({ success: false, message: 'Target and OTP are required' });
      return;
    }

    const cleanTarget = target.toLowerCase().trim();
    let record: any;

    if (mongoose.connection.readyState === 1) {
      record = await OtpToken.findOne({ target: cleanTarget, type }).sort({ createdAt: -1 });
    } else {
      record = inMemoryStore.otps
        .filter((o) => o.target === cleanTarget && o.type === type)
        .slice(-1)[0];
    }

    if (!record) {
      res.status(400).json({ success: false, message: 'No OTP requested for this address or expired' });
      return;
    }

    const isExpired = new Date(record.expiresAt).getTime() < Date.now();
    if (isExpired) {
      res.status(400).json({ success: false, message: 'OTP has expired. Please request a new code' });
      return;
    }

    if (record.otp !== otp.trim()) {
      if (mongoose.connection.readyState === 1) {
        await OtpToken.findByIdAndUpdate(record._id, { $inc: { attempts: 1 } });
      } else {
        record.attempts = (record.attempts || 0) + 1;
      }
      res.status(400).json({ success: false, message: 'Invalid OTP code. Please verify and try again.' });
      return;
    }

    // Mark as verified
    if (mongoose.connection.readyState === 1) {
      await OtpToken.findByIdAndUpdate(record._id, { isVerified: true });
    } else {
      record.isVerified = true;
    }

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully!',
      verifiedTarget: cleanTarget,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'OTP verification failed' });
  }
};

/**
 * Register user with verified OTP
 */
export const registerWithOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone, referralCode, otp } = req.body;

    if (!name || !email || !password || !otp) {
      res.status(400).json({ success: false, message: 'Name, email, password, and OTP are required' });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();

    // Validate OTP record
    let otpRecord: any;
    if (mongoose.connection.readyState === 1) {
      otpRecord = await OtpToken.findOne({ target: cleanEmail, type: 'SIGNUP' }).sort({ createdAt: -1 });
    } else {
      otpRecord = inMemoryStore.otps
        .filter((o) => o.target === cleanEmail && o.type === 'SIGNUP')
        .slice(-1)[0];
    }

    if (!otpRecord || otpRecord.otp !== otp.trim()) {
      res.status(400).json({ success: false, message: 'Invalid or expired OTP. Please verify again.' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    let userReferralCode = NetworkService.generateReferralCode(name);

    if (mongoose.connection.readyState === 1) {
      const existingUser = await User.findOne({ email: cleanEmail });
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
        email: cleanEmail,
        passwordHash,
        phone: phone ? phone.trim() : undefined,
        referralCode: userReferralCode,
        referredBy: referredByCode,
        referrerUserId,
        role: UserRole.USER,
        level: 1,
        levelName: 'STARTER',
        pointsBalance: 10, // Welcome 10 TRI Coins
        lifetimePointsEarned: 10,
        lifetimePointsUsed: 0,
        kycStatus: KYCStatus.NOT_SUBMITTED,
        isActive: true,
        isSuspended: false,
      });

      await newUser.save();
      await NetworkService.registerUserInTree(newUser, referredByCode);

      // Clean up used OTP
      await OtpToken.deleteMany({ target: cleanEmail });

      const tokens = generateTokens(newUser._id.toString(), newUser.role);

      res.status(201).json({
        success: true,
        message: 'Account registered and verified successfully! Welcome 10 TRI Coins credited.',
        user: newUser,
        tokens,
      });
    } else {
      const existing = inMemoryStore.users.find((u) => u.email === cleanEmail);
      if (existing) {
        res.status(400).json({ success: false, message: 'An account with this email already exists' });
        return;
      }

      const newUser = {
        _id: `user_mock_${Date.now()}`,
        name: name.trim(),
        email: cleanEmail,
        passwordHash,
        phone: phone ? phone.trim() : undefined,
        referralCode: userReferralCode,
        referredBy: referralCode ? referralCode.trim().toUpperCase() : undefined,
        role: UserRole.USER,
        level: 1,
        levelName: 'STARTER',
        pointsBalance: 10,
        lifetimePointsEarned: 10,
        lifetimePointsUsed: 0,
        kycStatus: KYCStatus.NOT_SUBMITTED,
        isActive: true,
        isSuspended: false,
        createdAt: new Date().toISOString(),
      };

      inMemoryStore.users.push(newUser);
      inMemoryStore.otps = inMemoryStore.otps.filter((o) => o.target !== cleanEmail);

      const tokens = generateTokens(newUser._id, newUser.role);

      res.status(201).json({
        success: true,
        message: 'Account registered and verified successfully! Welcome 10 TRI Coins credited.',
        user: newUser,
        tokens,
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Registration failed' });
  }
};

/**
 * Login directly with verified OTP
 */
export const loginWithOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { target, otp } = req.body;

    if (!target || !otp) {
      res.status(400).json({ success: false, message: 'Email/Phone and OTP code are required' });
      return;
    }

    const cleanTarget = target.toLowerCase().trim();

    // Verify OTP
    let otpRecord: any;
    if (mongoose.connection.readyState === 1) {
      otpRecord = await OtpToken.findOne({ target: cleanTarget, type: 'LOGIN' }).sort({ createdAt: -1 });
    } else {
      otpRecord = inMemoryStore.otps
        .filter((o) => o.target === cleanTarget && o.type === 'LOGIN')
        .slice(-1)[0];
    }

    if (!otpRecord || otpRecord.otp !== otp.trim()) {
      res.status(400).json({ success: false, message: 'Invalid or expired OTP code' });
      return;
    }

    let user: any;
    if (mongoose.connection.readyState === 1) {
      user = await User.findOne({
        $or: [{ email: cleanTarget }, { phone: cleanTarget }],
      });
    } else {
      user = inMemoryStore.users.find(
        (u) => u.email === cleanTarget || (u.phone && u.phone.includes(cleanTarget))
      );
    }

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'No registered Tridrishti account found with this email or phone. Please sign up first.',
      });
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

    // Clean up OTP
    if (mongoose.connection.readyState === 1) {
      await OtpToken.deleteMany({ target: cleanTarget });
    } else {
      inMemoryStore.otps = inMemoryStore.otps.filter((o) => o.target !== cleanTarget);
    }

    const tokens = generateTokens(user._id.toString(), user.role);

    res.status(200).json({
      success: true,
      message: 'OTP Login successful! Welcome back.',
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
    res.status(500).json({ success: false, message: error.message || 'OTP Login failed' });
  }
};

