import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { NetworkNode } from '../models/NetworkNode';
import { MembershipPlan } from '../models/MembershipPlan';
import { RewardProduct } from '../models/RewardProduct';
import { Benefit } from '../models/Benefit';
import { ImpactProject } from '../models/ImpactProject';
import { RuleConfig } from '../models/RuleConfig';
import { RewardPointLedger } from '../models/RewardPointLedger';
import { SupportTicket } from '../models/SupportTicket';
import { UserRole, KYCStatus, PointTransactionType, PointStatus, SupportTicketStatus, SupportTicketPriority } from '../constants';

dotenv.config();

export const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tridrishti';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB for seeding...');

    // Clear previous records
    await Promise.all([
      User.deleteMany({}),
      NetworkNode.deleteMany({}),
      MembershipPlan.deleteMany({}),
      RewardProduct.deleteMany({}),
      Benefit.deleteMany({}),
      ImpactProject.deleteMany({}),
      RuleConfig.deleteMany({}),
      RewardPointLedger.deleteMany({}),
      SupportTicket.deleteMany({}),
    ]);

    const passwordHash = await bcrypt.hash('Admin@Tridrishti2026', 10);
    const userPasswordHash = await bcrypt.hash('User@123456', 10);

    // 1. Super Admin
    const superAdmin = await User.create({
      name: 'Tridrishti Platform Admin',
      email: 'admin@tridrishti.com',
      passwordHash,
      phone: '+91 9876543210',
      role: UserRole.SUPER_ADMIN,
      referralCode: 'TRI-ADMIN-001',
      level: 5,
      levelName: 'DIAMOND',
      pointsBalance: 50000,
      lifetimePointsEarned: 50000,
      lifetimePointsUsed: 0,
      kycStatus: KYCStatus.VERIFIED,
      isActive: true,
    });

    await NetworkNode.create({
      userId: superAdmin._id,
      referralCode: superAdmin.referralCode,
      depth: 0,
      ancestors: [],
      directReferralsCount: 1,
      teamSize: 7,
      qualifyingActivityPoints: 5000,
    });

    // 2. Primary Demo User: Vedansh Gupta
    const vedansh = await User.create({
      name: 'Vedansh Gupta',
      email: 'vedansh@tridrishti.com',
      passwordHash: userPasswordHash,
      phone: '+91 9988776655',
      role: UserRole.USER,
      referralCode: 'TRI-VDNSH-82K',
      referredBy: 'TRI-ADMIN-001',
      referrerUserId: superAdmin._id,
      level: 3,
      levelName: 'GROW',
      pointsBalance: 1250,
      pendingPoints: 100,
      lifetimePointsEarned: 2450,
      lifetimePointsUsed: 1200,
      kycStatus: KYCStatus.VERIFIED,
      kycDocuments: {
        panNumber: 'ABCDE1234F',
        aadhaarLast4: '8892',
        documentUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
        verifiedAt: new Date(),
      },
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      address: {
        line1: 'Flat 402, Lotus Grand Residency',
        line2: 'Sector 62',
        city: 'Noida',
        state: 'Uttar Pradesh',
        pincode: '201309',
        country: 'India',
      },
    });

    const vedanshNode = await NetworkNode.create({
      userId: vedansh._id,
      parentId: superAdmin._id,
      referralCode: vedansh.referralCode,
      depth: 1,
      ancestors: [superAdmin._id],
      directReferralsCount: 3,
      teamSize: 6,
      qualifyingActivityPoints: 2450,
    });

    // 3. Level 1 Downlines under Vedansh
    const rahul = await User.create({
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      passwordHash: userPasswordHash,
      phone: '+91 9811223344',
      role: UserRole.USER,
      referralCode: 'TRI-RAHUL-101',
      referredBy: 'TRI-VDNSH-82K',
      referrerUserId: vedansh._id,
      level: 2,
      levelName: 'CONNECT',
      pointsBalance: 650,
      lifetimePointsEarned: 950,
      lifetimePointsUsed: 300,
      kycStatus: KYCStatus.VERIFIED,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    });

    const priya = await User.create({
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      passwordHash: userPasswordHash,
      phone: '+91 9722334455',
      role: UserRole.USER,
      referralCode: 'TRI-PRIYA-202',
      referredBy: 'TRI-VDNSH-82K',
      referrerUserId: vedansh._id,
      level: 2,
      levelName: 'CONNECT',
      pointsBalance: 820,
      lifetimePointsEarned: 820,
      lifetimePointsUsed: 0,
      kycStatus: KYCStatus.PENDING,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    });

    const amit = await User.create({
      name: 'Amit Verma',
      email: 'amit.verma@example.com',
      passwordHash: userPasswordHash,
      phone: '+91 9633445566',
      role: UserRole.USER,
      referralCode: 'TRI-AMIT-303',
      referredBy: 'TRI-VDNSH-82K',
      referrerUserId: vedansh._id,
      level: 1,
      levelName: 'STARTER',
      pointsBalance: 150,
      lifetimePointsEarned: 150,
      lifetimePointsUsed: 0,
      kycStatus: KYCStatus.NOT_SUBMITTED,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    });

    const rahulNode = await NetworkNode.create({
      userId: rahul._id,
      parentId: vedansh._id,
      referralCode: rahul.referralCode,
      depth: 2,
      ancestors: [superAdmin._id, vedansh._id],
      directReferralsCount: 2,
      teamSize: 2,
    });

    const priyaNode = await NetworkNode.create({
      userId: priya._id,
      parentId: vedansh._id,
      referralCode: priya.referralCode,
      depth: 2,
      ancestors: [superAdmin._id, vedansh._id],
      directReferralsCount: 1,
      teamSize: 1,
    });

    await NetworkNode.create({
      userId: amit._id,
      parentId: vedansh._id,
      referralCode: amit.referralCode,
      depth: 2,
      ancestors: [superAdmin._id, vedansh._id],
      directReferralsCount: 0,
      teamSize: 0,
    });

    // 4. Level 2 Downlines under Rahul & Priya
    const sneha = await User.create({
      name: 'Sneha Reddy',
      email: 'sneha.reddy@example.com',
      passwordHash: userPasswordHash,
      phone: '+91 9544556677',
      role: UserRole.USER,
      referralCode: 'TRI-SNEHA-404',
      referredBy: 'TRI-RAHUL-101',
      referrerUserId: rahul._id,
      level: 1,
      levelName: 'STARTER',
      pointsBalance: 200,
      lifetimePointsEarned: 200,
      lifetimePointsUsed: 0,
      kycStatus: KYCStatus.VERIFIED,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    });

    const vikram = await User.create({
      name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      passwordHash: userPasswordHash,
      phone: '+91 9455667788',
      role: UserRole.USER,
      referralCode: 'TRI-VIKRM-505',
      referredBy: 'TRI-RAHUL-101',
      referrerUserId: rahul._id,
      level: 1,
      levelName: 'STARTER',
      pointsBalance: 100,
      lifetimePointsEarned: 100,
      lifetimePointsUsed: 0,
      kycStatus: KYCStatus.NOT_SUBMITTED,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    });

    const ananya = await User.create({
      name: 'Ananya Deshmukh',
      email: 'ananya.deshmukh@example.com',
      passwordHash: userPasswordHash,
      phone: '+91 9366778899',
      role: UserRole.USER,
      referralCode: 'TRI-ANANY-606',
      referredBy: 'TRI-PRIYA-202',
      referrerUserId: priya._id,
      level: 1,
      levelName: 'STARTER',
      pointsBalance: 100,
      lifetimePointsEarned: 100,
      lifetimePointsUsed: 0,
      kycStatus: KYCStatus.NOT_SUBMITTED,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    });

    await NetworkNode.create({
      userId: sneha._id,
      parentId: rahul._id,
      referralCode: sneha.referralCode,
      depth: 3,
      ancestors: [superAdmin._id, vedansh._id, rahul._id],
      directReferralsCount: 0,
      teamSize: 0,
    });

    await NetworkNode.create({
      userId: vikram._id,
      parentId: rahul._id,
      referralCode: vikram.referralCode,
      depth: 3,
      ancestors: [superAdmin._id, vedansh._id, rahul._id],
      directReferralsCount: 0,
      teamSize: 0,
    });

    await NetworkNode.create({
      userId: ananya._id,
      parentId: priya._id,
      referralCode: ananya.referralCode,
      depth: 3,
      ancestors: [superAdmin._id, vedansh._id, priya._id],
      directReferralsCount: 0,
      teamSize: 0,
    });

    // 5. Membership Plans
    await MembershipPlan.create([
      {
        name: 'TRI STARTER',
        code: 'TRI_STARTER',
        price: 100,
        description: 'Ideal entry membership to start earning platform reward points and unlock community utilities.',
        triPointsReward: 100,
        features: [
          'Full Community & Network Dashboard Access',
          'Earn 100 TRI Points credited upon onboarding',
          'Access to Basic Level 1 Healthcare & Guidance',
          'Shareable Referral Tools and Attribution Tracking',
          'Eligible Welcome Goodies voucher',
        ],
        goodiesIncluded: ['Welcome Goodie Kit Sticker', 'Community E-Handbook'],
        benefitsSummary: ['Telehealth Consultation Discounts', 'Partner Insurance Assistance'],
        isActive: true,
        isFeatured: false,
        order: 1,
      },
      {
        name: 'TRI PRO',
        code: 'TRI_PRO',
        price: 500,
        description: 'Comprehensive membership offering accelerated point rewards, priority claims, and education guidance.',
        triPointsReward: 600,
        features: [
          'Everything in Starter Plan',
          'Earn 600 TRI Points (Includes 100 Bonus Points)',
          'Level 2 Tier Fast-Track & Higher Multipliers',
          'Access to Education Support Grant Applications',
          'Priority Review on Benefit & Health Claims',
        ],
        goodiesIncluded: ['Tridrishti Branded Stainless Steel Bottle', 'Welcome Pack'],
        benefitsSummary: ['Education Grant Eligibility', 'Free Annual Preventative Checkup Pass'],
        isActive: true,
        isFeatured: true,
        order: 2,
      },
      {
        name: 'TRI ELITE',
        code: 'TRI_ELITE',
        price: 1000,
        description: 'Exclusive tier with maximum point allocations, executive support, and direct community project leadership.',
        triPointsReward: 1500,
        features: [
          'Everything in Starter & Pro Plans',
          'Earn 1,500 TRI Points (Includes 500 Bonus Points)',
          'Level 3 Instant Recognition & Full Benefits Suite',
          'VIP Helpdesk & Dedicated Relationship Support',
          'Lead & Sponsor Local Community Impact Initiatives',
        ],
        goodiesIncluded: ['Tridrishti Executive Branded Hoodie', 'Premium Goodie Gift Box'],
        benefitsSummary: ['Full Healthcare Reimbursement Assistance', 'Comprehensive Education Grants', 'Priority Insurance Underwriting'],
        isActive: true,
        isFeatured: false,
        order: 3,
      },
    ]);

    // 6. Reward Store Products
    await RewardProduct.create([
      {
        title: 'Tridrishti Signature Eco-Cotton Hoodie',
        description: 'Premium heavy-blend fleece hoodie made from 100% sustainably sourced organic cotton with custom Tridrishti embroidered crest.',
        category: 'Fashion',
        pointsRequired: 400,
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600',
        isActive: true,
        isFeatured: true,
        minLevelRequired: 1,
      },
      {
        title: 'Noise Pulse Smartwatch & Health Tracker',
        description: '1.85-inch HD Display, SpO2 & 24/7 Heart Rate Monitor, 100+ Sports Modes, IP68 Water Resistant with 7-day battery life.',
        category: 'Electronics',
        pointsRequired: 950,
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
        isActive: true,
        isFeatured: true,
        minLevelRequired: 2,
      },
      {
        title: 'Smart Vacuum Insulated Temperature Bottle (750ml)',
        description: 'Double-walled stainless steel thermal flask with integrated touch LED temperature sensor display.',
        category: 'Lifestyle',
        pointsRequired: 250,
        stock: 120,
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
        isActive: true,
        isFeatured: false,
        minLevelRequired: 1,
      },
      {
        title: 'boAt Airdopes True Wireless Earbuds',
        description: 'Signature bass, ENx noise-cancellation mic, Beast mode low latency, and up to 42 hours total playtime.',
        category: 'Electronics',
        pointsRequired: 800,
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600',
        isActive: true,
        isFeatured: true,
        minLevelRequired: 2,
      },
      {
        title: 'Ergonomic Urban Laptop Backpack (30L)',
        description: 'Water-repellent ballistic nylon backpack with padded 15.6" laptop compartment and USB charging port.',
        category: 'Accessories',
        pointsRequired: 650,
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
        isActive: true,
        isFeatured: false,
        minLevelRequired: 1,
      },
      {
        title: 'Best-Selling Leadership & Finance Book Set (5 Books)',
        description: 'Curated library including Atomic Habits, Psychology of Money, Deep Work, Mindset, and Start with Why.',
        category: 'Books',
        pointsRequired: 350,
        stock: 60,
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600',
        isActive: true,
        isFeatured: false,
        minLevelRequired: 1,
      },
      {
        title: 'Comprehensive Home First-Aid & Wellness Medical Kit',
        description: 'Over 80 essential emergency medical supplies, digital thermometer, pulse oximeter, and certified emergency manual.',
        category: 'Healthcare',
        pointsRequired: 500,
        stock: 45,
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600',
        isActive: true,
        isFeatured: false,
        minLevelRequired: 1,
      },
    ]);

    // 7. Benefits Catalog
    await Benefit.create([
      {
        title: '24x7 Telehealth Doctor Consultation Pass',
        category: 'Healthcare',
        description: 'Unlimited access to certified general physicians and medical specialists through partner telehealth platform.',
        eligibility: 'Open to all active members with a valid membership.',
        minLevelRequired: 1,
        documentsRequired: ['Membership ID Card', 'Valid Govt Photo ID'],
        howToClaim: ['Navigate to Healthcare tab', 'Select Doctor Specialization', 'Instant Video/Audio consult link generated'],
        isActive: true,
        isFeatured: true,
        providerInfo: 'Delivered in partnership with ISO-certified Telehealth Networks.',
      },
      {
        title: 'Annual Preventative Diagnostics & Health Checkup',
        category: 'Healthcare',
        description: 'Complimentary full-body test package covering 60+ vital parameters (Liver, Kidney, Lipid profile, CBC, Blood Sugar).',
        eligibility: 'Members holding Level 2 (CONNECT) or higher.',
        minLevelRequired: 2,
        documentsRequired: ['Identity Proof', 'Level Confirmation Badge'],
        howToClaim: ['Book slot via dashboard', 'Phlebotomist collects home sample', 'Digital lab report in 24 hours'],
        isActive: true,
        isFeatured: true,
        providerInfo: 'Partnered with NABL & CAP Accredited Diagnostic Labs across India.',
      },
      {
        title: 'Tridrishti Higher Education Grant Support',
        category: 'Education',
        description: 'Direct financial scholarship grant for eligible children and members pursuing higher secondary, collegiate, or skill certifications.',
        eligibility: 'Members at Level 2 and above with proven academic enrollment.',
        minLevelRequired: 2,
        documentsRequired: ['College Fee Receipt / Admission Letter', 'Previous Marksheet', 'Income/Declaration Certificate'],
        howToClaim: ['Submit online grant application', 'Internal committee verification', 'Direct institutional disbursement'],
        isActive: true,
        isFeatured: true,
        providerInfo: 'Tridrishti Community Social Assistance Trust Fund.',
      },
      {
        title: 'Emergency Medical Contingency Assistance',
        category: 'Emergency',
        description: 'Fast-track discretionary financial and logistics aid during catastrophic medical emergencies and hospitalization.',
        eligibility: 'Members at Level 3 (GROW) and above with verified KYC.',
        minLevelRequired: 3,
        documentsRequired: ['Hospital Admission Slip', 'Estimate Letter from Hospital', 'KYC Documents'],
        howToClaim: ['Immediate 24x7 helpdesk ticket', 'Priority desk triage in < 4 hours', 'Direct partner assistance dispatch'],
        isActive: true,
        isFeatured: false,
        providerInfo: 'Discretionary welfare pool governed by Platform Emergency Rules.',
      },
    ]);

    // 8. Social Impact Projects
    await ImpactProject.create([
      {
        title: 'Vidya Jyoti: Rural Children Book & School Kit Drive',
        category: 'Education',
        description: 'Equipping underprivileged children across government rural schools with comprehensive textbooks, notebooks, school bags, and stationery kits.',
        location: 'Varanasi, UP & Alwar, Rajasthan',
        targetBeneficiaries: 2000,
        currentBeneficiaries: 1850,
        booksDonated: 3500,
        campsConducted: 14,
        volunteersJoined: 320,
        imageUrls: [
          'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600',
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
        ],
        status: 'ACTIVE',
        partnerNGO: 'Shiksha Seva Foundation (Regd.)',
      },
      {
        title: 'Arogya Sanjeevani: Free Medical & Eye Camps',
        category: 'Healthcare',
        description: 'Organizing mobile health checkups, preventative screenings, diabetic testing, and distributing free prescription glasses and essential medicines.',
        location: 'Tribal Districts of MP & Maharashtra',
        targetBeneficiaries: 10000,
        currentBeneficiaries: 8200,
        booksDonated: 0,
        campsConducted: 28,
        volunteersJoined: 650,
        imageUrls: [
          'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600',
          'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
        ],
        status: 'ACTIVE',
        partnerNGO: 'Swasthya Kalyan Trust',
      },
      {
        title: 'Green Earth: Community Tree Plantation Mission',
        category: 'Environment',
        description: 'Planting indigenous trees and creating urban community forests with geo-tagged sapling survival tracking.',
        location: 'Delhi-NCR & Bangalore Green Belts',
        targetBeneficiaries: 5000,
        currentBeneficiaries: 4200,
        treesPlanted: 5800,
        campsConducted: 12,
        booksDonated: 0,
        volunteersJoined: 870,
        imageUrls: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600'],
        status: 'ACTIVE',
        partnerNGO: 'EcoVriksha Foundation',
      },
    ]);

    // 9. Configurable Admin Rules Engine
    await RuleConfig.create([
      {
        key: 'REWARD_POINTS_RATIO',
        category: 'REWARD_POINTS',
        name: 'Reward Points Credit Ratio',
        description: 'Multiplier of TRI Points issued per ₹1 eligible platform expenditure.',
        value: 1.0,
        dataType: 'number',
      },
      {
        key: 'LEVEL_2_THRESHOLD',
        category: 'LEVEL_THRESHOLDS',
        name: 'Level 2 (CONNECT) Threshold',
        description: 'Lifetime TRI points required to unlock Level 2.',
        value: 500,
        dataType: 'number',
      },
      {
        key: 'LEVEL_3_THRESHOLD',
        category: 'LEVEL_THRESHOLDS',
        name: 'Level 3 (GROW) Threshold',
        description: 'Lifetime TRI points required to unlock Level 3.',
        value: 2000,
        dataType: 'number',
      },
      {
        key: 'LEVEL_4_THRESHOLD',
        category: 'LEVEL_THRESHOLDS',
        name: 'Level 4 (ADVANCE) Threshold',
        description: 'Lifetime TRI points required to unlock Level 4.',
        value: 5000,
        dataType: 'number',
      },
      {
        key: 'LEVEL_5_THRESHOLD',
        category: 'LEVEL_THRESHOLDS',
        name: 'Level 5 (DIAMOND) Threshold',
        description: 'Lifetime TRI points required to unlock Level 5.',
        value: 10000,
        dataType: 'number',
      },
      {
        key: 'ANTI_FRAUD_MAX_DAILY_REFERRALS',
        category: 'REFERRAL_LIMITS',
        name: 'Max Referrals Per 24h Window',
        description: 'Trigger suspicious flag if an account registers more than this threshold in 24 hours.',
        value: 25,
        dataType: 'number',
      },
      {
        key: 'COMPLIANCE_NON_INVESTMENT_DISCLAIMER_REQUIRED',
        category: 'COMPLIANCE',
        name: 'Mandatory Non-Investment Banner',
        description: 'Require prominent compliance disclaimer on public and user dashboard portals.',
        value: true,
        dataType: 'boolean',
      },
    ]);

    // 10. Sample Ledger Entries for Vedansh
    await RewardPointLedger.create([
      {
        transactionId: 'TXN-TRI-MEMBER-001',
        userId: vedansh._id,
        type: PointTransactionType.MEMBERSHIP_PURCHASE,
        amount: 600,
        balanceAfter: 600,
        source: 'MEMBERSHIP_PURCHASE',
        description: 'Eligible points for TRI PRO Membership purchase',
        status: PointStatus.COMPLETED,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        transactionId: 'TXN-TRI-ACT-002',
        userId: vedansh._id,
        type: PointTransactionType.QUALIFYING_ACTIVITY,
        amount: 350,
        balanceAfter: 950,
        source: 'QUALIFYING_ACTIVITY',
        description: 'Participation in Social Impact Education Drive',
        status: PointStatus.COMPLETED,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      },
      {
        transactionId: 'TXN-TRI-REF-003',
        userId: vedansh._id,
        type: PointTransactionType.REFERRAL_ACTIVITY_REWARD,
        amount: 1500,
        balanceAfter: 2450,
        source: 'REFERRAL_ACTIVITY',
        description: 'Community network engagement activity bonus',
        status: PointStatus.COMPLETED,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
      {
        transactionId: 'TXN-TRI-RDM-004',
        userId: vedansh._id,
        type: PointTransactionType.REWARD_REDEMPTION,
        amount: -1200,
        balanceAfter: 1250,
        source: 'REWARD_STORE_REDEMPTION',
        description: 'Redemption for Noise Pulse Smartwatch & Hoodie',
        status: PointStatus.COMPLETED,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    ]);

    // 11. Sample Support Ticket
    await SupportTicket.create({
      ticketId: 'TCK-TRI-INIT-001',
      userId: vedansh._id,
      userName: vedansh.name,
      userEmail: vedansh.email,
      subject: 'Inquiry regarding healthcare checkup voucher redemption',
      category: 'Benefit Issue',
      priority: SupportTicketPriority.MEDIUM,
      status: SupportTicketStatus.RESOLVED,
      assignedTo: superAdmin._id,
      assignedToName: superAdmin.name,
      messages: [
        {
          senderId: vedansh._id,
          senderName: vedansh.name,
          senderRole: 'USER',
          message: 'Hello, I reached Level 2 and would like to know how long the preventative diagnostic voucher is valid.',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        {
          senderId: superAdmin._id,
          senderName: superAdmin.name,
          senderRole: 'SUPER_ADMIN',
          message: 'Hi Vedansh! The voucher is valid for 90 days from issuance. You can book directly from the Benefits dashboard.',
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        },
      ],
    });

    console.log('[Seed] Database seeded successfully with Super Admin, Demo Users, Plans, Rewards, and Rules!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('[Seed Error]', error);
  }
};

if (require.main === module) {
  seedDatabase();
}
