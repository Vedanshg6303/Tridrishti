import React from 'react';
import { Sparkles, Shield, HeartHandshake, Users, Globe, Target } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Vision & Values</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">About TRIDRISHTI</h1>
        <p className="text-base text-slate-300">
          "Connect. Grow. Empower." We are pioneering a modern technology platform that aligns membership access, community support, tangible rewards, and verified social impact.
        </p>
      </div>

      {/* Brand Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Authentic Community</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            We believe true empowerment begins when people connect around shared aspirations. Our network tree and referral architecture foster collaboration rather than mere monetary speculation.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Rigorous Compliance</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Tridrishti operates with total transparency. We distinctly separate product purchases, reward eligibility, referral tracking, and level progression to ensure complete alignment with Indian legal and direct-selling frameworks.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Tangible Social Impact</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            From rural children education drives to free health and diagnostic camps, our platform directs a portion of community efforts into measurable humanitarian outcomes.
          </p>
        </div>
      </div>

      {/* Leadership Statement */}
      <div className="p-8 sm:p-12 rounded-3xl bg-dark-card/50 border border-dark-border space-y-6">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Our Commitment to Transparency</h2>
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Tridrishti is designed from the ground up as a serious Indian technology company. We strictly prohibit any representation of TRI Points as securities, cryptocurrency, or guaranteed income schemes. Every reward point is an internal platform utility backed by defined business activities and redeemable for catalog products and partner benefits.
          </p>
          <p>
            Our leadership and compliance advisory team regularly audit platform rules, referral velocity, and partner integrations to maintain the highest standards of governance and consumer protection.
          </p>
        </div>
      </div>
    </div>
  );
};
