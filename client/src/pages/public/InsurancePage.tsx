import React from 'react';
import { Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InsurancePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>Partner Protection Solutions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">Partner Insurance Products</h1>
        <p className="text-base text-slate-300">
          Explore health, term life, and accident coverage facilitated directly through IRDAI-registered insurance partner institutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono">Health Shield</span>
          <h3 className="text-xl font-bold text-white">Comprehensive Health Cover</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Coverage from ₹3 Lakhs to ₹10 Lakhs. Cashless hospitalizations across 10,000+ network hospitals in India.
          </p>
          <div className="pt-2 text-[11px] text-slate-500">
            Underwritten by Care Health Insurance Ltd.
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <span className="text-[10px] font-bold text-brand-400 uppercase font-mono">Term Protection</span>
          <h3 className="text-xl font-bold text-white">Pure Term Life Protection</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            High sum-assured life protection for family security with optional critical illness riders.
          </p>
          <div className="pt-2 text-[11px] text-slate-500">
            Underwritten by HDFC Life Insurance Co.
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <span className="text-[10px] font-bold text-purple-400 uppercase font-mono">Personal Accident</span>
          <h3 className="text-xl font-bold text-white">Accidental Security Shield</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            24x7 worldwide coverage against disability and accidental loss with family bonus protection.
          </p>
          <div className="pt-2 text-[11px] text-slate-500">
            Underwritten by ICICI Lombard General Insurance.
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-dark-card/40 border border-dark-border text-center text-xs text-slate-400 max-w-3xl mx-auto">
        Important Disclosure: Tridrishti is not an insurance company, broker, or risk underwriter. Insurance products are underwritten and issued directly by authorized IRDAI-registered insurance companies.
      </div>
    </div>
  );
};
