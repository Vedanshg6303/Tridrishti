import React, { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import { BenefitClaim } from '../../types';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { ShieldCheck, CheckCircle2, XCircle, DollarSign, Clock, FileText } from 'lucide-react';
import api from '../../utils/api';

export const AdminClaimsPage: React.FC = () => {
  const { showToast } = useToast();
  const [claims, setClaims] = useState<BenefitClaim[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<BenefitClaim | null>(null);
  const [feedback, setFeedback] = useState('');
  const [disbursedAmount, setDisbursedAmount] = useState('');
  const [disbursementRef, setDisbursementRef] = useState('');
  const [processing, setProcessing] = useState(false);

  const fetchClaims = async () => {
    try {
      const res = await api.get('/admin/claims');
      if (res.data.success) {
        setClaims(res.data.claims || []);
      }
    } catch (err) {
      console.error('Failed to load claims:', err);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleUpdateStatus = async (status: string) => {
    if (!selectedClaim) return;
    setProcessing(true);
    try {
      const res = await api.put(`/admin/claims/${selectedClaim.claimId}`, {
        status,
        adminFeedback: feedback || undefined,
        disbursedAmount: disbursedAmount ? +disbursedAmount : undefined,
        disbursementReference: disbursementRef || undefined,
      });
      if (res.data.success) {
        showToast(`Claim ${selectedClaim.claimId} status updated to ${status}`, 'success');
        setSelectedClaim(null);
        setFeedback('');
        setDisbursedAmount('');
        setDisbursementRef('');
        fetchClaims();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to update claim', 'error');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">Benefit Claims Triage Desk</h2>
        <p className="text-xs text-slate-400">
          Review, approve, or disburse healthcare passes, education grants, and emergency medical assistance
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-dark-border text-slate-400 uppercase text-[10px] font-semibold">
                <th className="pb-3">Claim ID</th>
                <th className="pb-3">Member</th>
                <th className="pb-3">Benefit Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Claim Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {claims.length > 0 ? (
                claims.map((claim) => (
                  <tr key={claim._id} className="hover:bg-dark-bg/50 transition-colors">
                    <td className="py-3.5 font-mono text-purple-400 font-bold">{claim.claimId}</td>
                    <td className="py-3.5 font-semibold text-white">
                      {(claim as any).userId?.name || 'Member'}
                    </td>
                    <td className="py-3.5 text-slate-200">{claim.benefitTitle}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-dark-bg border border-dark-border text-slate-300 text-[10px] font-mono">
                        {claim.category}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono text-white font-semibold">
                      {claim.claimAmount ? formatCurrency(claim.claimAmount) : 'N/A'}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full ${
                          claim.status === 'APPROVED' || claim.status === 'DISBURSED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : claim.status === 'REJECTED'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {claim.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => setSelectedClaim(claim)}
                        className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-lg"
                      >
                        Triage Claim
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No benefit claims currently in queue.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Claim Triage Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-dark-border pb-3">
              <h3 className="text-base font-bold text-white">Triage Claim: {selectedClaim.claimId}</h3>
              <button onClick={() => setSelectedClaim(null)} className="text-slate-400 hover:text-white text-xs">
                Cancel
              </button>
            </div>

            <div className="space-y-2 text-xs bg-dark-bg p-3.5 rounded-2xl border border-dark-border">
              <div className="flex justify-between">
                <span className="text-slate-400">Benefit Title:</span>
                <span className="font-semibold text-white">{selectedClaim.benefitTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">User Notes:</span>
                <span className="text-slate-200">{selectedClaim.userNotes}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Admin Feedback / Review Notes</label>
                <textarea
                  rows={2}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Notes recorded to immutable audit log..."
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Disbursed Amount (₹)</label>
                  <input
                    type="number"
                    value={disbursedAmount}
                    onChange={(e) => setDisbursedAmount(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Disbursement Txn Reference</label>
                  <input
                    type="text"
                    value={disbursementRef}
                    onChange={(e) => setDisbursementRef(e.target.value)}
                    placeholder="BANK_REF_9981"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleUpdateStatus('APPROVED')}
                disabled={processing}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                Approve Claim
              </button>
              <button
                onClick={() => handleUpdateStatus('DISBURSED')}
                disabled={processing}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                Mark Disbursed
              </button>
              <button
                onClick={() => handleUpdateStatus('REJECTED')}
                disabled={processing}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
