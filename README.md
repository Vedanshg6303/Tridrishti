# 👁️ TRIDRISHTI.COM — Official Full-Stack Platform Repository

> **Official Tagline**: *Connect. Grow. Empower.*  
> **Brand Symbolism**: The Divine Inner Vision Eye (Wisdom, Foresight & Community Elevation).  
> **Business Model**: ₹100 Onboarding Entry ➔ Earn 10 TRI Coins Per Referral ➔ Unlock Tier Levels & Welfare Perks.

```
                    TRIDRISHTI.COM
                          │
                          ▼
                 React / Vite Frontend
                          │
                          │ REST API / HTTPS & WebSockets
                          ▼
                 Node.js + Express
                          │
          ┌───────────────┼────────────────┐
          ▼               ▼                ▼
      MongoDB          Razorpay        File Storage
       Atlas           Payments        Documents
          │
          ▼
   All Tridrishti Data
```

---

## 📁 Repository Structure

```
TRIDRISHTI_PLATFORM_OFFICIAL/
├── client/                               # React + Vite + TypeScript Frontend
│   ├── public/logo.png                   # Official Tridrishti Logo Asset
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── CinematicEyeIntro.tsx    # Logo-matched eyelid parting & light burst animation
│   │   │   │   └── InteractiveEyeVisualizer.tsx # Cursor-tracking 3D eye mascot
│   │   │   └── layout/
│   │   │       ├── Navbar.tsx            # Navigation header with logo & auth states
│   │   │       ├── Footer.tsx            # Footer with compliance seals & quick links
│   │   │       ├── DashboardLayout.tsx   # Member portal sidebar & header
│   │   │       └── AdminLayout.tsx       # Admin CRM governance sidebar & tools
│   │   ├── pages/
│   │   │   ├── public/                   # 14 Public & marketing pages
│   │   │   ├── user/                     # 15 Member dashboard pages
│   │   │   └── admin/                    # 14 Admin CRM & Owner control pages
│   │   │       └── OwnerMasterControlPage.tsx # All-in-one Developer Mission Control
│   │   └── App.tsx                       # Full route tree configuration
│   └── tailwind.config.js                # Electric sapphire & cyan branding theme
│
├── server/                               # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts                     # MongoDB Atlas connection
│   │   │   ├── memoryStore.ts            # Zero-delay in-memory state adapter with seed data
│   │   │   └── initDatabase.ts           # Automated index synchronization
│   │   ├── models/                       # 16 Production Mongoose schemas & indexes
│   │   │   ├── User.ts
│   │   │   ├── RewardPointLedger.ts
│   │   │   ├── NetworkNode.ts
│   │   │   ├── Payment.ts
│   │   │   ├── MembershipPlan.ts
│   │   │   ├── RewardProduct.ts
│   │   │   ├── RewardRedemption.ts
│   │   │   ├── Benefit.ts
│   │   │   ├── BenefitClaim.ts
│   │   │   ├── EducationApplication.ts
│   │   │   ├── InsuranceApplication.ts
│   │   │   ├── ImpactProject.ts
│   │   │   ├── SupportTicket.ts
│   │   │   ├── ContactMessage.ts
│   │   │   ├── RuleConfig.ts
│   │   │   └── AuditLog.ts
│   │   ├── services/
│   │   │   └── PointsEngine.ts           # 10 Coins referral reward & level calculator
│   │   ├── controllers/                  # API endpoints handlers
│   │   │   └── ownerController.ts        # All-in-one owner master state & quick actions
│   │   └── server.ts                     # Express server entry point
│   └── Dockerfile                        # Production container image
│
├── README.md                             # This overview file
├── PROJECT_BLUEPRINT.md                  # Comprehensive architectural blueprint
├── BUSINESS_MODEL.md                     # Economics, referral rules & legal compliance
├── DATABASE_SCHEMA.md                    # 16 Collections data dictionary & indexes
└── SETUP_GUIDE.md                        # Local development & production deployment guide
```

---

## ⚡ Core Business & Reward Logic

1. **₹100 First-Time Entry Activation**:
   - Every member registers and activates their account with a one-time ₹100 entry fee.
   - Activates their personal referral code and credits 10 welcome TRI coins.
2. **10 TRI Coins per Referral**:
   - When user $A$ refers user $B$, upon user $B$ paying ₹100, user $A$ is credited **10 TRI Coins** (`REFERRAL_ACTIVITY_REWARD`).
3. **10-Tier Career Progression Matrix**:
   - **Level 1 (STARTER)**: 10 Members (100 pts) | Referral tools, Tree visualizer, Welcome kit.
   - **Level 2 (CONNECT)**: 50 Members (500 pts) | 24x7 Doctor Telehealth pass, 5% store discount.
   - **Level 3 (GROW)**: 100 Members (1,000 pts) | Free Annual Full-Body NABL Diagnostic pass, Goodies delivery.
   - **Level 4 (LEAD)**: 250 Members (2,500 pts) | Emergency Medical Reimbursement, Vocational training grants.
   - **Level 5 (ADVANCE)**: 500 Members (5,000 pts) | Digital Learning Device (Tablet) Scholarship, Micro-Insurance.
   - **Level 6 (EXECUTIVE)**: 1,000 Members (10,000 pts) | Laptop Grant Eligibility, Family Healthcare Protection Fund.
   - **Level 7 (DIRECTOR)**: 5,000 Members (50,000 pts) | Sponsor Regional Medical & Relief Camps, Full Tuition Grants.
   - **Level 8 (AMBASSADOR)**: 10,000 Members (100,000 pts) | National Convention Keynote Guest, Comprehensive Family Shield.
   - **Level 9 (PRESIDENTIAL)**: 50,000 Members (500,000 pts) | State-Wide Social Impact Leadership, Owner Council Seat.
   - **Level 10 (ROYAL CROWN)**: 100,000 Members (1,000,000 pts) | 👑 National Welfare Trustee, Lifetime Apex Protection.

---

## 👑 Owner / Developer Mission Control (`/owner` & `/admin/master`)
- **Gross Revenue & Coin HUD**: Track all ₹100 entries and active circulating coins.
- **⚡ 1-Click Referral Simulator**: Test ₹100 user activations and 10 coins crediting live with 1 button.
- **Master User Inspector**: 1-click coin adjustments (`+10`, `+50`, `+100`, `-50`), level override, and instant KYC verify/freeze.
- **Rules Switchboard**: Modify entry fee (₹100) and referral reward (10 coins) on the fly without server restart.
- **Unified Operations Hub**: Medical claims, merchandise fulfillment orders, and public contact inquiries in one view.

---

## 🚀 Quick Start Commands

```bash
# 1. Start Backend Server (Port 5001)
cd server
npm install
npm run dev

# 2. Start Frontend Client (Port 5173)
cd client
npm install
npm run dev
```

- **Website**: `http://localhost:5173`
- **Owner Control Station**: `http://localhost:5173/admin/master`
- **Demo Credentials**:
  - Super Admin: `admin@tridrishti.com` / `Admin@Tridrishti2026`
  - Demo Member: `vedansh@tridrishti.com` / `User@123456`
