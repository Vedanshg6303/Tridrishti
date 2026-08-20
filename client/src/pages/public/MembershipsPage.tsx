import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Shield, ArrowRight, Zap, Users, Gift, HeartPulse } from 'lucide-react';

export const MembershipsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>₹100 Entry & Referral Rewards</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
          Onboarding & Membership Tiers
        </h1>
        <p className="text-base text-slate-300">
          Enter with a simple <strong className="text-white">₹100 activation</strong>, invite members to earn <strong className="text-amber-400">10 TRI Coins</strong> per referral, and unlock healthcare, education, and merchandise benefits as you advance levels.
        </p>
      </div>

      {/* How ₹100 Entry & 10 Coins Work Callout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl bg-dark-card border border-brand-500/30">
        <div className="space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-400 font-display font-black text-base flex items-center justify-center">
            1
          </div>
          <h4 className="text-sm font-bold text-white">₹100 First-Time Entry</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every member activates their platform account with an initial ₹100 entry fee, unlocking their personal referral link and 10 welcome coins.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 font-display font-black text-base flex items-center justify-center">
            2
          </div>
          <h4 className="text-sm font-bold text-white">Earn 10 Coins Per Referral</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            For each new member who joins with your referral code and completes their ₹100 activation, you receive <strong className="text-amber-400">10 TRI Coins</strong> directly into your ledger.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 font-display font-black text-base flex items-center justify-center">
            3
          </div>
          <h4 className="text-sm font-bold text-white">Level Progression & Welfare</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Coins accumulate toward Level 2 (50 coins), Level 3 (200 coins), Level 4 (500 coins), unlocking 24x7 Doctor passes, diagnostics, and tuition grants.
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Starter Plan */}
        <div className="rounded-3xl p-8 bg-gradient-to-b from-brand-950/60 to-dark-card border-2 border-brand-500/60 flex flex-col justify-between space-y-6 relative shadow-2xl shadow-brand-500/20">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
            Mandatory Activation
          </div>
          <div className="space-y-4">
            <span className="text-xs font-bold font-mono text-brand-300 uppercase tracking-widest">Entry Membership</span>
            <h3 className="text-2xl font-bold text-white">ENTRY ACTIVATION</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-display font-extrabold text-white">₹100</span>
              <span className="text-xs text-slate-400">one-time payment</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Includes 10 Welcome TRI Coins</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Personal Referral Code & Attribution Link</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Earn 10 TRI Coins for every referred member</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Interactive Downline Community Tree Access</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Level 1 Basic Healthcare Guidance & Goodies Voucher</span>
              </li>
            </ul>
          </div>
          <Link
            to="/register"
            className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-center text-xs font-bold text-white shadow-lg shadow-brand-600/30 transition-all"
          >
            Activate Account (₹100)
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="rounded-3xl p-8 bg-dark-card border border-dark-border flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Growth Upgrade</span>
            <h3 className="text-2xl font-bold text-white">TRI PRO ADVANCED</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-display font-extrabold text-white">₹500</span>
              <span className="text-xs text-slate-400">one-time</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Includes 60 Bonus TRI Coins</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-200 pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Includes Full ₹100 Entry Privileges</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Level 2 Fast-Track Progression</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24x7 Doctor Telehealth Pass & 5% Store Discount</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Education Support Grant Eligibility</span>
              </li>
            </ul>
          </div>
          <Link
            to="/register"
            className="w-full py-3 rounded-xl bg-dark-bg hover:bg-dark-border border border-dark-border text-center text-xs font-bold text-white transition-colors"
          >
            Upgrade to PRO (₹500)
          </Link>
        </div>

        {/* Elite Plan */}
        <div className="rounded-3xl p-8 bg-dark-card border border-dark-border flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold font-mono text-purple-400 uppercase tracking-widest">Executive Ambassador</span>
            <h3 className="text-2xl font-bold text-white">TRI ELITE</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-display font-extrabold text-white">₹1,000</span>
              <span className="text-xs text-slate-400">one-time</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Includes 150 Bonus TRI Coins</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Includes All Starter & Pro Utilities</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tridrishti Executive Branded Hoodie</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Level 3 Recognition & VIP Priority Helpdesk</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Comprehensive Healthcare & Tuition Grants</span>
              </li>
            </ul>
          </div>
          <Link
            to="/register"
            className="w-full py-3 rounded-xl bg-dark-bg hover:bg-dark-border border border-dark-border text-center text-xs font-bold text-white transition-colors"
          >
            Upgrade to ELITE (₹1,000)
          </Link>
        </div>
      </div>
    </div>
  );
};
