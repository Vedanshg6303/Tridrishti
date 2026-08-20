import React from 'react';
import { HeartPulse, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HealthcarePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Health & Wellness Solutions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">Healthcare Assistance</h1>
        <p className="text-base text-slate-300">
          Partnered telehealth consultations, complimentary annual diagnostics, and community preventative health camps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <h3 className="text-lg font-bold text-white">24x7 Doctor On Call</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Instant video consultations with certified physicians for general medical queries, second opinions, and prescriptions.
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <h3 className="text-lg font-bold text-white">Annual Full-Body Diagnostics</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Free home collection covering 60+ parameters (Lipid profile, liver enzymes, kidney function, and blood count).
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <h3 className="text-lg font-bold text-white">Free Preventative Camps</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Local regional health screening drives with free basic medicine kits and eye care assistance.
          </p>
        </div>
      </div>
    </div>
  );
};
