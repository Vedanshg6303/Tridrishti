import React, { useState } from 'react';
import { Shield, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/formatters';

export const InsurancePage: React.FC = () => {
  const { showToast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [nomineeName, setNomineeName] = useState('');
  const [nomineeRelation, setNomineeRelation] = useState('Spouse');
  const [submitting, setSubmitting] = useState(false);

  const plans = [
    {
      name: 'Tridrishti Care Health Shield',
      partner: 'Care Health Insurance Ltd. (IRDAI Reg. 148)',
      type: 'Health',
      sumInsured: 500000,
      yearlyEst: 4999,
      features: ['Cashless at 10,000+ Hospitals', 'No room rent capping', 'Daycare procedures covered'],
    },
    {
      name: 'Tridrishti Pure Term Protection',
      partner: 'HDFC Life Insurance Co. (IRDAI Reg. 101)',
      type: 'Life',
      sumInsured: 5000000,
      yearlyEst: 3200,
      features: ['Terminal illness payout', 'Critical illness optional rider', 'Tax benefit under Sec 80C'],
    },
    {
      name: 'Accidental Security Cover',
      partner: 'ICICI Lombard General Insurance',
      type: 'Accident',
      sumInsured: 1000000,
      yearlyEst: 899,
      features: ['24x7 worldwide protection', 'Disability weekly compensation', 'Child education benefit'],
    },
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSelectedPlan(null);
      showToast('Insurance quote requested! Authorized partner representative will reach out to verify.', 'success');
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">Partner Insurance Portal</h2>
        <p className="text-xs text-slate-400">
          Underwritten and serviced directly by licensed Indian insurance partner organizations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-dark-card border border-dark-border flex flex-col justify-between space-y-6 hover:border-slate-500 transition-all"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-bold font-mono text-brand-400 uppercase tracking-wider block">
                {p.type} Protection
              </span>
              <h3 className="text-lg font-bold text-white">{p.name}</h3>
              <div className="text-xs text-slate-400">
                Sum Insured: <span className="font-bold text-white">{formatCurrency(p.sumInsured)}</span>
              </div>
              <div className="text-xs text-amber-400 font-bold">
                Est. Premium: ~{formatCurrency(p.yearlyEst)} / year
              </div>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-dark-border">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] text-slate-500 block italic">{p.partner}</span>
              <button
                onClick={() => setSelectedPlan(p)}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-600/25 transition-all"
              >
                Request Partner Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-dark-border pb-3">
              <h3 className="text-base font-bold text-white">Insurance Quote Request</h3>
              <button onClick={() => setSelectedPlan(null)} className="text-slate-400 hover:text-white text-xs">
                Cancel
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Applicant Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Nominee Name</label>
                  <input
                    type="text"
                    required
                    value={nomineeName}
                    onChange={(e) => setNomineeName(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-[11px] text-slate-300">
                Notice: Policy underwriting and quotation are executed strictly by authorized licensed insurance partners.
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/30 transition-all"
              >
                {submitting ? 'Submitting...' : 'Submit Quote Request'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
