export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'SUPPORT' | 'FINANCE' | 'OPERATIONS' | 'USER';

export type KYCStatus = 'NOT_SUBMITTED' | 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  referralCode: string;
  referredBy?: string;
  level: number;
  levelName: string;
  pointsBalance: number;
  pendingPoints?: number;
  lifetimePointsEarned: number;
  lifetimePointsUsed: number;
  kycStatus: KYCStatus;
  kycDocuments?: {
    panNumber?: string;
    aadhaarLast4?: string;
    documentUrl?: string;
    verifiedAt?: string;
  };
  isActive: boolean;
  isSuspended: boolean;
  suspensionReason?: string;
  avatar?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
  };
  createdAt: string;
}

export interface MembershipPlan {
  _id: string;
  name: string;
  code: string;
  price: number;
  description: string;
  triPointsReward: number;
  features: string[];
  goodiesIncluded: string[];
  benefitsSummary: string[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
}

export interface PointTransaction {
  _id: string;
  transactionId: string;
  userId: string;
  type: string;
  amount: number;
  balanceAfter: number;
  source: string;
  description: string;
  status: 'COMPLETED' | 'PENDING' | 'REVERSED' | 'EXPIRED';
  adminReference?: string;
  referenceId?: string;
  createdAt: string;
}

export interface NetworkTreeNode {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  level: number;
  levelName: string;
  points: number;
  joinedAt: string;
  directReferrals: number;
  teamSize: number;
  isSuspended?: boolean;
  children?: NetworkTreeNode[];
}

export interface RewardProduct {
  _id: string;
  title: string;
  description: string;
  category: string;
  pointsRequired: number;
  stock: number;
  imageUrl: string;
  isActive: boolean;
  isFeatured: boolean;
  minLevelRequired: number;
}

export interface RewardRedemption {
  _id: string;
  redemptionId: string;
  productId: string;
  productSnapshot: {
    title: string;
    category: string;
    pointsRequired: number;
    imageUrl: string;
  };
  pointsSpent: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  trackingNumber?: string;
  courierPartner?: string;
  createdAt: string;
}

export interface Benefit {
  _id: string;
  title: string;
  category: string;
  description: string;
  eligibility: string;
  minLevelRequired: number;
  documentsRequired: string[];
  howToClaim: string[];
  isActive: boolean;
  isFeatured: boolean;
  providerInfo?: string;
}

export interface BenefitClaim {
  _id: string;
  claimId: string;
  benefitId: string;
  benefitTitle: string;
  category: string;
  claimAmount?: number;
  documents: { name: string; url: string; uploadedAt: string }[];
  userNotes: string;
  status: 'SUBMITTED' | 'UNDER_VERIFICATION' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'DISBURSED' | 'CLOSED';
  adminFeedback?: string;
  disbursedAmount?: number;
  createdAt: string;
}

export interface ImpactProject {
  _id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  targetBeneficiaries: number;
  currentBeneficiaries: number;
  booksDonated: number;
  campsConducted: number;
  treesPlanted?: number;
  volunteersJoined: number;
  imageUrls: string[];
  status: 'ACTIVE' | 'COMPLETED' | 'UPCOMING';
  partnerNGO?: string;
}

export interface SupportTicket {
  _id: string;
  ticketId: string;
  subject: string;
  category: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'WAITING' | 'RESOLVED' | 'CLOSED';
  messages: {
    senderId: string;
    senderName: string;
    senderRole: string;
    message: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface RuleConfig {
  _id: string;
  key: string;
  category: string;
  name: string;
  description: string;
  value: any;
  dataType: 'number' | 'string' | 'boolean' | 'json';
  lastModifiedByName?: string;
  updatedAt: string;
}

export interface AuditLog {
  _id: string;
  action: string;
  performedByName: string;
  performedByRole: string;
  targetResource: string;
  targetId?: string;
  details: string;
  changes?: Record<string, any>;
  timestamp: string;
}
