import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Benefit } from '../../types';
import { ShieldCheck, HeartPulse, GraduationCap, Shield, LifeBuoy, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../utils/api';

export const BenefitsCenterPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [userNotes, setUserNotes] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const res = await api.get('/benefits');
        if (res.data.success) {
          setBenefits(res.data.benefits || []);
        }
      } catch (err) {
        console.error('Failed to load benefits:', err);
      }
    };
    fetchBenefits();
  }, []);

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBenefit) return;

    setSubmitting(true);
    try {
      const res = await api.post('/benefits/claim', {
        benefitId: selectedBenefit._id,
        userNotes,
        claimAmount: claimAmount ? +claimAmount : undefined,
      });

      if (res.data.success) {
        showToast('Benefit claim submitted successfully for review!', 'success');
        setSelectedBenefit(null);
        setUserNotes('');
        setClaimAmount('');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to submit benefit claim', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">Benefits Center & Claims</h2>
        <p className="text-xs text-slate-400">
          Access your tier-unlocked healthcare passes, diagnostics, education grants, and emergency assistance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((b) => {
          const isEligible = (user?.level || 1) >= b.minLevelRequired;
          return (
            <div
              key={b._id}
              className={`p-6 rounded-3xl bg-dark-card border flex flex-col justify-between space-y-4 transition-all ${
                isEligible ? 'border-dark-border hover:border-slate-500' : 'border-dark-border/50 opacity-75'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                    {b.category}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      isEligible
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-dark-bg text-slate-500 border-dark-border'
                    }`}
                  >
                    Level {b.minLevelRequired}+
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{b.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{b.description}</p>
                <div className="text-[11px] text-slate-300 bg-dark-bg/60 p-2.5 rounded-xl border border-dark-border">
                  <span className="text-slate-400 font-semibold block">Eligibility Rule:</span>
                  {b.eligibility}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={!isEligible}
                  onClick={() => setSelectedBenefit(b)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isEligible
                      ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/25'
                      : 'bg-dark-bg border border-dark-border text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isEligible ? 'Apply / Submit Claim' : `Locked (Requires Level ${b.minLevelRequired})`}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Claim Submission Modal */}
      {selectedBenefit && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-dark-border pb-3">
              <h3 className="text-base font-bold text-white">Apply for Benefit</h3>
              <button onClick={() => setSelectedBenefit(null)} className="text-slate-400 hover:text-white text-xs">
                Cancel
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-dark-bg border border-dark-border">
              <h4 className="text-xs font-bold text-white">{selectedBenefit.title}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{selectedBenefit.description}</p>
            </div>

            <form onSubmit={handleClaim} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Claim Details & Justification</label>
                <textarea
                  rows={3}
                  required
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Explain your claim requirement or patient details..."
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Estimated Claim / Assistance Amount (₹)</label>
                <input
                  type="number"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-[11px] text-slate-300">
                Claims are reviewed by the Operations team within 2-3 business days as per Platform Benefit Terms.
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/30 transition-all"
              >
                {submitting ? 'Submitting Application...' : 'Submit Claim'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
