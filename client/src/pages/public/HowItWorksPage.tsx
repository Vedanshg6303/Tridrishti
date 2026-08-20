import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Award, ArrowRight, CheckCircle2, UserCheck, Layers, HelpCircle } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ecosystem Guide</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">How Tridrishti Works</h1>
        <p className="text-base text-slate-300">
          A compliant, community-driven platform that separates product purchases, platform reward points (TRI Points), tier progression, and verified social benefits.
        </p>
      </div>

      {/* Step by Step Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-400 font-bold flex items-center justify-center">
            1
          </div>
          <h3 className="text-xl font-bold text-white">Join Tridrishti with Ease</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Create an account using an authorized member's referral code or join directly. Complete your profile, explore your personalized member dashboard, and obtain your own unique referral link for community building.
          </p>
          <ul className="text-xs text-slate-400 space-y-2 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant member dashboard access</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Personalized referral URL & QR tools</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold flex items-center justify-center">
            2
          </div>
          <h3 className="text-xl font-bold text-white">Explore Products & Memberships</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Choose an eligible membership package (such as TRI Starter at ₹100 or TRI Pro at ₹500). Payments are secured through compliant Indian gateways (Razorpay) with encrypted verification.
          </p>
          <ul className="text-xs text-slate-400 space-y-2 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Membership fee unlocks tools & goodies</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Explicit non-investment protection guarantee</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center">
            3
          </div>
          <h3 className="text-xl font-bold text-white">Earn TRI Platform Points</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            TRI Points are credited to your immutable point ledger for eligible transactions and community activities. Every point is tracked with a unique transaction ID and transparent source attribution.
          </p>
          <ul className="text-xs text-slate-400 space-y-2 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Immutable cryptographic point ledger</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No crypto speculation or monetary dividend promise</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center">
            4
          </div>
          <h3 className="text-xl font-bold text-white">Unlock Tier Benefits & Rewards</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Progress through Levels 1 to 5 (Starter, Connect, Grow, Advance, Diamond). Redeem points for real goodies from the reward store, or access curated healthcare vouchers and education grants.
          </p>
          <ul className="text-xs text-slate-400 space-y-2 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free doorstep shipping on redeemed merchandise</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct education grants & telehealth passes</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Compliance Callout */}
      <div className="p-6 rounded-2xl bg-brand-950/40 border border-brand-500/30 text-center text-xs text-slate-300 space-y-2">
        <p className="font-semibold text-brand-300">
          Regulatory Compliance Notice
        </p>
        <p>
          Tridrishti is operated under strict guidelines complying with Indian direct-selling and consumer protection regulations. Rewards are strictly tied to legitimate product and service utilization and are governed by the Reward Policy.
        </p>
      </div>

      <div className="text-center">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-xl shadow-brand-600/30"
        >
          <span>Get Started Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
