import bcrypt from 'bcryptjs';
import { UserRole, KYCStatus, PointTransactionType, PointStatus, SupportTicketStatus, SupportTicketPriority } from '../constants';

export interface InMemoryState {
  users: any[];
  nodes: any[];
  plans: any[];
  products: any[];
  benefits: any[];
  impactProjects: any[];
  rules: any[];
  ledger: any[];
  tickets: any[];
  claims: any[];
  redemptions: any[];
  auditLogs: any[];
  contactMessages: any[];
  otps: any[];
  announcements: any[];
  settings: Record<string, any>;
}

export const inMemoryStore: InMemoryState = {
  users: [],
  nodes: [],
  plans: [],
  products: [],
  benefits: [],
  impactProjects: [],
  rules: [],
  ledger: [],
  tickets: [],
  claims: [],
  redemptions: [],
  auditLogs: [],
  contactMessages: [],
  otps: [],
  announcements: [],
  settings: {},
};

export const initInMemoryStore = async () => {
  const passwordHash = await bcrypt.hash('Admin@123', 10);

  // Single Master Super Admin Account
  const superAdmin = {
    _id: 'user_admin_001',
    name: 'Tridrishti Platform Admin',
    email: 'admin@tridrishti.com',
    passwordHash,
    phone: '+91 9876543210',
    role: UserRole.SUPER_ADMIN,
    referralCode: 'TRI-ADMIN-001',
    level: 5,
    levelName: 'DIAMOND',
    pointsBalance: 0,
    lifetimePointsEarned: 0,
    lifetimePointsUsed: 0,
    kycStatus: KYCStatus.VERIFIED,
    isActive: true,
    isSuspended: false,
    createdAt: new Date().toISOString(),
  };

  // Fresh zero-state users (Only the platform administrator)
  inMemoryStore.users = [superAdmin];
  inMemoryStore.nodes = [];
  inMemoryStore.ledger = [];
  inMemoryStore.claims = [];
  inMemoryStore.redemptions = [];
  inMemoryStore.tickets = [];
  inMemoryStore.contactMessages = [];
  inMemoryStore.auditLogs = [];
  inMemoryStore.otps = [];

  // Live Broadcast Announcements
  inMemoryStore.announcements = [
    {
      _id: 'ann_welcome',
      title: 'Welcome to TRIDRISHTI!',
      message: 'Earn 10 Welcome TRI Coins upon signup and share your link to unlock Level progression.',
      type: 'PROMO', // INFO | PROMO | WARNING | ALERT
      isActive: true,
      link: '/how-it-works',
      createdAt: new Date().toISOString(),
    },
  ];

  // System Configurations & Gateway Controls
  inMemoryStore.settings = {
    platformName: 'TRIDRISHTI',
    tagline: 'Community, Rewards & Welfare Ecosystem',
    supportEmail: 'support@tridrishti.com',
    supportPhone: '+91 98765 43210',
    isMaintenanceMode: false,
    maintenanceMessage: 'TRIDRISHTI is undergoing scheduled platform upgrade. We will be back online shortly.',
    razorpayKeyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_tridrishti',
    fast2smsEnabled: Boolean(process.env.FAST2SMS_API_KEY),
    twilioEnabled: Boolean(process.env.TWILIO_ACCOUNT_SID),
  };

  // Official Membership Plans Catalog
  inMemoryStore.plans = [
    {
      _id: 'plan_entry_100',
      name: 'TRIDRISHTI ENTRY ACTIVATION',
      code: 'TRI_ENTRY_100',
      price: 100,
      description: 'One-time ₹100 platform onboarding activation fee to unlock referral tools, start earning 10 TRI Coins per referral, and access community utilities.',
      triPointsReward: 10,
      features: [
        'Mandatory One-Time ₹100 Platform Activation',
        'Earn 10 Welcome TRI Coins credited instantly',
        'Generate Personal Referral Link to earn 10 Coins per referral',
        'Access to Level 1 Basic Healthcare Guidance',
        'Eligible for Welcome Goodie Pack & Community E-Book',
      ],
      goodiesIncluded: ['Tridrishti Welcome Kit Sticker', 'Community E-Handbook'],
      benefitsSummary: ['Telehealth Consultation Pass', 'Partner Insurance Assistance'],
      isActive: true,
      isFeatured: true,
      order: 1,
    },
    {
      _id: 'plan_pro_500',
      name: 'TRI PRO ADVANCED',
      code: 'TRI_PRO_500',
      price: 500,
      description: 'Accelerated membership tier with 60 TRI Coins bonus, Level 2 Fast-Track, and Priority Healthcare claims review.',
      triPointsReward: 60,
      features: [
        'Includes ₹100 Entry Activation',
        'Earn 60 Bonus TRI Coins',
        'Instant Level 2 Tier Progression',
        'Free Annual NABL Diagnostic Test Pass',
        'Higher Education Support Grant Eligibility',
      ],
      goodiesIncluded: ['Tridrishti Branded Stainless Steel Bottle', 'Welcome Pack'],
      benefitsSummary: ['Annual Full-Body Health Checkup', 'Education Grant Access'],
      isActive: true,
      isFeatured: false,
      order: 2,
    },
    {
      _id: 'plan_elite_1000',
      name: 'TRI ELITE AMBASSADOR',
      code: 'TRI_ELITE_1000',
      price: 1000,
      description: 'Highest leadership tier with 150 TRI Coins bonus, Level 3 instant unlocking, and local community drive sponsorship.',
      triPointsReward: 150,
      features: [
        'Includes All Starter & Pro Utilities',
        'Earn 150 Bonus TRI Coins',
        'Level 3 Instant Recognition',
        'VIP Concierge Helpdesk & Priority Insurance Underwriting',
        'Sponsor & Lead Local Social Welfare Drives',
      ],
      goodiesIncluded: ['Tridrishti Executive Embroidered Hoodie', 'VIP Gift Box'],
      benefitsSummary: ['Priority Medical Reimbursements', 'Comprehensive Tuition Scholarships'],
      isActive: true,
      isFeatured: false,
      order: 3,
    },
  ];

  // Official Reward Store Marketplace Catalog
  inMemoryStore.products = [
    {
      _id: 'prod_hoodie',
      title: 'Tridrishti Signature Eco-Cotton Hoodie',
      description: 'Premium heavy-blend fleece hoodie made from 100% sustainably sourced organic cotton with custom Tridrishti embroidered crest.',
      category: 'Fashion',
      pointsRequired: 400,
      stock: 100,
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600',
      isActive: true,
      isFeatured: true,
      minLevelRequired: 1,
    },
    {
      _id: 'prod_watch',
      title: 'Noise Pulse Smartwatch & Health Tracker',
      description: '1.85-inch HD Display, SpO2 & 24/7 Heart Rate Monitor, 100+ Sports Modes, IP68 Water Resistant with 7-day battery life.',
      category: 'Electronics',
      pointsRequired: 950,
      stock: 50,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
      isActive: true,
      isFeatured: true,
      minLevelRequired: 2,
    },
    {
      _id: 'prod_bottle',
      title: 'Smart Vacuum Insulated Temperature Bottle (750ml)',
      description: 'Double-walled stainless steel thermal flask with integrated touch LED temperature sensor display.',
      category: 'Lifestyle',
      pointsRequired: 250,
      stock: 200,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
      isActive: true,
      isFeatured: false,
      minLevelRequired: 1,
    },
    {
      _id: 'prod_earbuds',
      title: 'boAt Airdopes True Wireless Earbuds',
      description: 'Signature bass, ENx noise-cancellation mic, Beast mode low latency, and up to 42 hours total playtime.',
      category: 'Electronics',
      pointsRequired: 800,
      stock: 75,
      imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600',
      isActive: true,
      isFeatured: true,
      minLevelRequired: 2,
    },
    {
      _id: 'prod_backpack',
      title: 'Ergonomic Urban Laptop Backpack (30L)',
      description: 'Water-repellent ballistic nylon backpack with padded 15.6" laptop compartment and USB charging port.',
      category: 'Accessories',
      pointsRequired: 650,
      stock: 60,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
      isActive: true,
      isFeatured: false,
      minLevelRequired: 1,
    },
    {
      _id: 'prod_books',
      title: 'Best-Selling Leadership & Finance Book Set (5 Books)',
      description: 'Curated library including Atomic Habits, Psychology of Money, Deep Work, Mindset, and Start with Why.',
      category: 'Books',
      pointsRequired: 350,
      stock: 100,
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600',
      isActive: true,
      isFeatured: false,
      minLevelRequired: 1,
    },
    {
      _id: 'prod_kit',
      title: 'Comprehensive Home First-Aid & Wellness Medical Kit',
      description: 'Over 80 essential emergency medical supplies, digital thermometer, pulse oximeter, and certified emergency manual.',
      category: 'Healthcare',
      pointsRequired: 500,
      stock: 80,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600',
      isActive: true,
      isFeatured: false,
      minLevelRequired: 1,
    },
  ];

  // Welfare Benefits Catalog
  inMemoryStore.benefits = [
    {
      _id: 'ben_telehealth',
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
      _id: 'ben_checkup',
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
      _id: 'ben_education',
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
  ];

  // Social Impact Projects
  inMemoryStore.impactProjects = [
    {
      _id: 'proj_vidya',
      title: 'Project Vidya Jyoti — Rural School Learning Kits',
      description: 'Providing essential textbooks, stationery, and solar study lamps to 5,000 underprivileged children.',
      targetAmount: 500000,
      raisedAmount: 145000,
      category: 'Education',
      location: 'Varanasi, Uttar Pradesh',
      imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600',
      isActive: true,
      isFeatured: true,
    },
    {
      _id: 'proj_arogya',
      title: 'Arogya Sanjeevani — Community Health Camps',
      description: 'Free preventative health screenings, dental checkups, and prescription eyewear distribution.',
      targetAmount: 350000,
      raisedAmount: 98000,
      category: 'Healthcare',
      location: 'Jaipur, Rajasthan',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
      isActive: true,
      isFeatured: true,
    },
  ];

  // Dynamic Business Rules
  inMemoryStore.rules = [
    {
      _id: 'rule_entry_fee',
      key: 'ENTRY_FEE_AMOUNT',
      category: 'ONBOARDING_FEES',
      name: 'Mandatory First-Time Entry Fee (₹)',
      description: 'The mandatory one-time payment required for new members to activate their account and start earning referral coins.',
      value: 100,
      dataType: 'number',
    },
    {
      _id: 'rule_referral_payout',
      key: 'REFERRAL_REWARD_COINS',
      category: 'REWARD_POINTS',
      name: 'Referral Reward (TRI Coins)',
      description: 'Number of TRI Coins credited to sponsor upon a referred member completing their ₹100 entry activation.',
      value: 10,
      dataType: 'number',
    },
    {
      _id: 'rule_level_2',
      key: 'LEVEL_2_THRESHOLD',
      category: 'LEVEL_THRESHOLDS',
      name: 'Level 2 (CONNECT) Threshold',
      description: 'TRI Coins required to unlock Level 2 perks (Telehealth Pass & 5% Discount).',
      value: 50,
      dataType: 'number',
    },
    {
      _id: 'rule_level_3',
      key: 'LEVEL_3_THRESHOLD',
      category: 'LEVEL_THRESHOLDS',
      name: 'Level 3 (GROW) Threshold',
      description: 'TRI Coins required to unlock Level 3 perks (Full-Body Checkup Pass & Education Grant Eligibility).',
      value: 200,
      dataType: 'number',
    },
    {
      _id: 'rule_level_4',
      key: 'LEVEL_4_THRESHOLD',
      category: 'LEVEL_THRESHOLDS',
      name: 'Level 4 (LEAD) Threshold',
      description: 'TRI Coins required to unlock Level 4 perks (Comprehensive Tuition Scholarships & Priority Medical Claims).',
      value: 500,
      dataType: 'number',
    },
    {
      _id: 'rule_level_5',
      key: 'LEVEL_5_THRESHOLD',
      category: 'LEVEL_THRESHOLDS',
      name: 'Level 5 (DIAMOND) Threshold',
      description: 'TRI Coins required to unlock Level 5 perks (VIP Concierge & Social Impact Drive Sponsorship).',
      value: 1000,
      dataType: 'number',
    },
    {
      _id: 'rule_anti_fraud',
      key: 'ANTI_FRAUD_MAX_DAILY_REFERRALS',
      category: 'REFERRAL_LIMITS',
      name: 'Max Referrals Per 24h Window',
      description: 'Trigger suspicious velocity flag if an account registers more than this threshold in 24 hours.',
      value: 25,
      dataType: 'number',
    },
  ];

  console.log('[InMemoryStore] ✅ Clean state initialized with full catalog, rules, announcements & system controls.');
};
