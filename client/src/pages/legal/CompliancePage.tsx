import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export const CompliancePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2 border-b border-dark-border pb-6">
        <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">Regulatory Compliance & Transparency</span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Compliance & Legal Disclosures</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>Statutory Notice Under Indian Law</span>
        </div>
        <p>
          Tridrishti strictly disclaims any association with prize chits, money circulation schemes, multi-level Ponzi operations, or cryptocurrency initial token distributions. We adhere to the Direct Selling Guidelines and Consumer Protection (Direct Selling) Rules, 2021.
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-xs text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Business Model Architecture</h2>
          <p>
            Tridrishti maintains a clear, decoupled architectural separation between:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Membership purchase for genuine digital access and software tools</li>
            <li>Reward point eligibility governed by dynamic transparent rules</li>
            <li>Referral attribution tracking with anti-fraud safeguards</li>
            <li>Level progression based on genuine cumulative community participation</li>
            <li>Partner-provided third-party benefits (Healthcare, Diagnostics, Insurance)</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Third-Party Licensed Partners</h2>
          <p>
            All insurance-related advisories and coverage quotations are serviced directly by IRDAI-registered insurance partner companies. Tridrishti acts solely as a technological enabler and community facilitator.
          </p>
        </section>
      </div>
    </div>
  );
};
