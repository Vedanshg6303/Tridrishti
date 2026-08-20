import React from 'react';
import { Award, Sparkles, CheckCircle2, Shield, ArrowRight, Zap, Users, HeartPulse, GraduationCap, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LevelsPage: React.FC = () => {
  const levels = [
    {
      level: 1,
      name: 'STARTER',
      threshold: '0 – 49 TRI Coins (₹100 Onboarding Activation)',
      badge: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
      referralPerk: 'Earn 10 TRI Coins per referred active member',
      benefits: [
        'Personal Referral Link & Interactive Tree Visualizer',
        'Welcome Kit Goodie Voucher & E-Handbook',
        'Level 1 Basic Healthcare Guidance & Support Desk',
      ],
    },
    {
      level: 2,
      name: 'CONNECT',
      threshold: '50 – 199 TRI Coins (5+ Active Referrals)',
      badge: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      referralPerk: '1.2x Earning Multiplier on Community Activities',
      benefits: [
        '24x7 Doctor Telehealth Video Consult Pass (Zero wait queue)',
        '5% Exclusive Goodies Marketplace Discount',
        'Priority Review on Benefit Assistance Inquiries',
      ],
    },
    {
      level: 3,
      name: 'GROW',
      threshold: '200 – 499 TRI Coins (20+ Active Referrals)',
      badge: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      referralPerk: '1.5x Earning Multiplier on Community Activities',
      benefits: [
        'Free Annual Full-Body NABL Diagnostic Health Checkup Pass (60+ parameters)',
        'Higher Education Support Tuition Scholarship Eligibility',
        'Physical Merchandise Store Unlocked (Smartwatch & Earbuds Redemptions)',
      ],
    },
    {
      level: 4,
      name: 'LEAD',
      threshold: '500 – 999 TRI Coins (50+ Active Referrals)',
      badge: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      referralPerk: '2.0x Accelerated Earning Multiplier',
      benefits: [
        'Comprehensive College & Vocational Tuition Grants',
        'Priority Medical Claims & Reimbursement Assistance',
        'Dedicated Relationship Manager Support',
      ],
    },
    {
      level: 5,
      name: 'DIAMOND',
      threshold: '1,000+ TRI Coins (100+ Active Referrals)',
      badge: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
      referralPerk: '2.5x Maximum Platform Multiplier',
      benefits: [
        'VIP Executive Concierge Support Desk',
        'Sponsor & Lead Regional Social Impact Welfare Drives',
        'VIP Premium Merchandise Catalog Access & Free Home Deliveries',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>Tier Progression & Welfare Matrix</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
          Levels & Unlocked Benefits
        </h1>
        <p className="text-base text-slate-300">
          Climb the tiers by adding members (<strong className="text-amber-400">10 TRI Coins per referral</strong>). Each level automatically unlocks higher healthcare passes, diagnostics, and education grants.
        </p>
      </div>

      <div className="space-y-6">
        {levels.map((lvl) => (
          <div
            key={lvl.level}
            className="p-8 rounded-3xl bg-dark-card border border-dark-border hover:border-slate-500 transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xl"
          >
            <div className="md:col-span-4 space-y-2">
              <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold font-mono uppercase border ${lvl.badge}`}>
                LEVEL {lvl.level}
              </span>
              <h3 className="text-2xl font-bold text-white">{lvl.name}</h3>
              <p className="text-xs text-amber-400 font-mono font-bold">Requirement: {lvl.threshold}</p>
            </div>

            <div className="md:col-span-3 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Referral Rate</span>
              <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{lvl.referralPerk}</span>
              </span>
            </div>

            <div className="md:col-span-5 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Tier-Unlocked Benefits</span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {lvl.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-dark-card/40 border border-dark-border text-center text-xs text-slate-400 max-w-2xl mx-auto">
        Important: Tier levels represent platform recognition and access eligibility. Tiers do not provide guaranteed monetary income, investment dividends, or securities returns.
      </div>
    </div>
  );
};
