import mongoose from 'mongoose';
import { User, IUser } from '../models/User';
import { NetworkNode } from '../models/NetworkNode';

export class NetworkService {
  /**
   * Generates a unique referral code for a new user
   */
  static generateReferralCode(name: string): string {
    const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase().substring(0, 5) || 'TRI';
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `TRI-${cleanName}-${randomSuffix}`;
  }

  /**
   * Registers a new user node inside the network tree
   */
  static async registerUserInTree(user: IUser, referrerCode?: string): Promise<void> {
    let parentNode = null;
    let ancestors: mongoose.Types.ObjectId[] = [];
    let depth = 0;

    if (referrerCode) {
      const trimmedCode = referrerCode.trim().toUpperCase();

      // Anti-fraud: Cannot refer oneself
      if (trimmedCode === user.referralCode) {
        throw new Error('Self-referrals are prohibited by platform anti-fraud rules');
      }

      const referrer = await User.findOne({ referralCode: trimmedCode });
      if (referrer) {
        parentNode = await NetworkNode.findOne({ userId: referrer._id });
        if (parentNode) {
          depth = parentNode.depth + 1;
          ancestors = [...parentNode.ancestors, parentNode.userId];

          // Increment direct referrals for parent
          parentNode.directReferralsCount += 1;
          await parentNode.save();

          // Increment team size for all ancestors
          await NetworkNode.updateMany(
            { userId: { $in: ancestors } },
            { $inc: { teamSize: 1 } }
          );
        }
      }
    }

    const newNode = new NetworkNode({
      userId: user._id,
      parentId: parentNode ? parentNode.userId : undefined,
      referralCode: user.referralCode,
      depth,
      ancestors,
      directReferralsCount: 0,
      teamSize: 0,
      qualifyingActivityPoints: 0,
      isActive: true,
      joinedAt: user.createdAt || new Date(),
    });

    await newNode.save();
  }

  /**
   * Fetches downline tree nodes for a user up to a specified depth
   */
  static async getUserSubtree(userId: string | mongoose.Types.ObjectId, maxDepth: number = 3) {
    const rootUser = await User.findById(userId).select('name email referralCode level levelName pointsBalance avatar createdAt');
    if (!rootUser) return null;

    const rootNode = await NetworkNode.findOne({ userId: rootUser._id });
    if (!rootNode) {
      return {
        id: rootUser._id.toString(),
        name: rootUser.name,
        email: rootUser.email,
        referralCode: rootUser.referralCode,
        level: rootUser.level,
        levelName: rootUser.levelName,
        points: rootUser.pointsBalance,
        joinedAt: rootUser.createdAt,
        directReferrals: 0,
        teamSize: 0,
        children: [],
      };
    }

    // Recursively build tree representation
    async function buildTree(currentUserId: mongoose.Types.ObjectId, currentDepth: number): Promise<any> {
      const u = await User.findById(currentUserId).select('name email referralCode level levelName pointsBalance avatar createdAt isSuspended');
      const node = await NetworkNode.findOne({ userId: currentUserId });

      if (!u) return null;

      const childrenNodes = currentDepth < maxDepth
        ? await NetworkNode.find({ parentId: currentUserId })
        : [];

      const children = [];
      for (const child of childrenNodes) {
        const childData = await buildTree(child.userId, currentDepth + 1);
        if (childData) children.push(childData);
      }

      return {
        id: u._id.toString(),
        name: u.name,
        email: u.email,
        referralCode: u.referralCode,
        level: u.level,
        levelName: u.levelName,
        points: u.pointsBalance,
        joinedAt: u.createdAt,
        directReferrals: node?.directReferralsCount || 0,
        teamSize: node?.teamSize || 0,
        isSuspended: u.isSuspended,
        children,
      };
    }

    return await buildTree(rootUser._id as mongoose.Types.ObjectId, 1);
  }
}
