import React from 'react';
import { ShieldCheck, HeartPulse, GraduationCap, Shield, LifeBuoy, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BenefitsPage: React.FC = () => {
  const benefits = [
    {
      title: '24x7 Telehealth Doctor Consultation Pass',
      category: 'Healthcare',
      description: 'Instant video and phone consultations with certified physicians and medical specialists.',
      levelReq: 1,
      icon: HeartPulse,
      provider: 'Delivered in partnership with accredited telehealth networks.',
    },
    {
      title: 'Annual Comprehensive Preventative Checkup',
      category: 'Healthcare',
      description: 'Complimentary home sample collection covering 60+ vital lab diagnostics (Lipid, Liver, Kidney, Sugar).',
      levelReq: 2,
      icon: ShieldCheck,
      provider: 'Conducted via NABL-certified diagnostic lab partners.',
    },
    {
      title: 'Tridrishti Higher Education Grant Support',
      category: 'Education',
      description: 'Direct institutional tuition assistance for members and their dependents pursuing accredited degree courses.',
      levelReq: 2,
      icon: GraduationCap,
      provider: 'Tridrishti Community Social Assistance Trust Fund.',
    },
    {
      title: 'Emergency Medical Contingency Assistance',
      category: 'Emergency',
      description: 'Rapid financial & logistics assistance pool for unforeseen catastrophic hospitalizations.',
      levelReq: 3,
      icon: LifeBuoy,
      provider: 'Discretionary emergency welfare fund.',
    },
    {
      title: 'Partner Insurance Policy Advisory',
      category: 'Insurance',
      description: 'Personalized assistance for health, term life, and accident protection policies with group partner discounts.',
      levelReq: 1,
      icon: Shield,
      provider: 'Facilitated by IRDAI-registered insurance brokers & underwriters.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Curated Ecosystem Services</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">Benefits Center</h1>
        <p className="text-base text-slate-300">
          Access healthcare, preventative medicine, education support grants, and partner insurance solutions structured for real life impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-dark-card border border-dark-border flex flex-col justify-between space-y-6 hover:border-slate-500 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold font-mono px-3 py-1 rounded-full bg-dark-bg border border-dark-border text-slate-300">
                    Level {b.levelReq}+
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono block">
                  {b.category}
                </span>

                <h3 className="text-lg font-bold text-white leading-snug">{b.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{b.description}</p>
              </div>

              <div className="pt-4 border-t border-dark-border space-y-3">
                <p className="text-[11px] text-slate-500 italic">{b.provider}</p>
                <Link
                  to="/login"
                  className="w-full py-2.5 rounded-xl bg-dark-bg hover:bg-brand-600 border border-dark-border hover:border-brand-500 text-center text-xs font-bold text-white transition-all block"
                >
                  Check Eligibility
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-2xl bg-dark-card/40 border border-dark-border text-center text-xs text-slate-400 max-w-2xl mx-auto">
        Insurance and healthcare solutions are executed in collaboration with licensed third-party providers. Tridrishti does not act as an insurance company or registered underwriter.
      </div>
    </div>
  );
};
