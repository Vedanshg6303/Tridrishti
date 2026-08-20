import React, { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import { User, UserRole, KYCStatus } from '../../types';
import { formatDate, formatPoints } from '../../utils/formatters';
import { Users, Search, ShieldCheck, Ban, CheckCircle2, XCircle, Sparkles, Filter, Edit } from 'lucide-react';
import api from '../../utils/api';

export const AdminUsersPage: React.FC = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Selected User for KYC review or manual points
  const [selectedKycUser, setSelectedKycUser] = useState<User | null>(null);
  const [selectedPointsUser, setSelectedPointsUser] = useState<User | null>(null);
  const [pointsAmount, setPointsAmount] = useState('');
  const [pointsDescription, setPointsDescription] = useState('');
  const [processing, setProcessing] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/admin/users?search=${encodeURIComponent(search)}`);
      if (res.data.success) {
        setUsers(res.data.users || []);
      }
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleToggleSuspension = async (u: User) => {
    const shouldSuspend = !u.isSuspended;
    try {
      const res = await api.put(`/admin/users/${u._id}/suspension`, {
        suspend: shouldSuspend,
        reason: shouldSuspend ? 'Administrative compliance review' : undefined,
      });
      if (res.data.success) {
        showToast(`User ${shouldSuspend ? 'suspended' : 'reactivated'} successfully`, 'success');
        fetchUsers();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Action failed', 'error');
    }
  };

  const handleVerifyKyc = async (status: 'VERIFIED' | 'REJECTED') => {
    if (!selectedKycUser) return;
    setProcessing(true);
    try {
      const res = await api.put(`/admin/users/${selectedKycUser._id}/kyc`, {
        status,
        feedback: status === 'VERIFIED' ? 'Approved by Admin' : 'Documents insufficient',
      });
      if (res.data.success) {
        showToast(`KYC ${status === 'VERIFIED' ? 'Approved' : 'Rejected'}`, 'success');
        setSelectedKycUser(null);
        fetchUsers();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'KYC verification update failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handleManualPointsAdjustment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPointsUser || !pointsAmount || !pointsDescription) return;

    setProcessing(true);
    try {
      const res = await api.post('/admin/points/adjustment', {
        userId: selectedPointsUser._id,
        amount: +pointsAmount,
        description: pointsDescription,
      });
      if (res.data.success) {
        showToast('Point adjustment logged to immutable audit trail', 'success');
        setSelectedPointsUser(null);
        setPointsAmount('');
        setPointsDescription('');
        fetchUsers();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Point adjustment failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">User & Compliance Management</h2>
          <p className="text-xs text-slate-400">
            View member profiles, verify KYC submissions, adjust point balances, or manage suspensions
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, ref code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-dark-card border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-dark-border text-slate-400 uppercase text-[10px] font-semibold">
                <th className="pb-3">User</th>
                <th className="pb-3">Role & Tier</th>
                <th className="pb-3">Referral Code</th>
                <th className="pb-3">Points Balance</th>
                <th className="pb-3">KYC Status</th>
                <th className="pb-3">Account Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-dark-bg/50 transition-colors">
                    <td className="py-3.5">
                      <div className="font-semibold text-white">{u.name}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-3.5">
                      <div className="font-bold text-purple-300">{u.role}</div>
                      <div className="text-[10px] text-amber-400">Level {u.level} ({u.levelName})</div>
                    </td>
                    <td className="py-3.5 font-mono text-slate-300 font-bold">{u.referralCode}</td>
                    <td className="py-3.5 font-mono text-amber-400 font-bold">
                      {formatPoints(u.pointsBalance || 0)} pts
                    </td>
                    <td className="py-3.5">
                      <button
                        onClick={() => setSelectedKycUser(u)}
                        className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full border cursor-pointer ${
                          u.kycStatus === 'VERIFIED'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : u.kycStatus === 'PENDING'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-dark-bg text-slate-500 border-dark-border'
                        }`}
                      >
                        {u.kycStatus || 'NOT_SUBMITTED'}
                      </button>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          u.isSuspended
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                            : 'bg-emerald-500/10 text-emerald-400'
                        }`}
                      >
                        {u.isSuspended ? 'SUSPENDED' : 'ACTIVE'}
                      </span>
                    </td>
                    <td className="py-3.5 text-right space-x-2">
                      <button
                        onClick={() => setSelectedPointsUser(u)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[11px] font-semibold border border-amber-500/20"
                      >
                        Adjust Points
                      </button>
                      <button
                        onClick={() => handleToggleSuspension(u)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                          u.isSuspended
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                        }`}
                      >
                        {u.isSuspended ? 'Reactivate' : 'Suspend'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No users matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* KYC Review Modal */}
      {selectedKycUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-dark-border pb-3">
              <h3 className="text-base font-bold text-white">KYC Review: {selectedKycUser.name}</h3>
              <button onClick={() => setSelectedKycUser(null)} className="text-slate-400 hover:text-white text-xs">
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-slate-400">PAN Number</span>
                <span className="font-mono font-bold text-white">
                  {selectedKycUser.kycDocuments?.panNumber || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-slate-400">Aadhaar (Last 4 Digits)</span>
                <span className="font-mono font-bold text-white">
                  {selectedKycUser.kycDocuments?.aadhaarLast4 || 'Not provided'}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => handleVerifyKyc('VERIFIED')}
                disabled={processing}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30"
              >
                Approve KYC
              </button>
              <button
                onClick={() => handleVerifyKyc('REJECTED')}
                disabled={processing}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30"
              >
                Reject KYC
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Points Adjustment Modal */}
      {selectedPointsUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-dark-border pb-3">
              <h3 className="text-base font-bold text-white">Point Adjustment: {selectedPointsUser.name}</h3>
              <button onClick={() => setSelectedPointsUser(null)} className="text-slate-400 hover:text-white text-xs">
                Cancel
              </button>
            </div>

            <form onSubmit={handleManualPointsAdjustment} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Point Amount (Positive to Credit, Negative to Debit)</label>
                <input
                  type="number"
                  required
                  value={pointsAmount}
                  onChange={(e) => setPointsAmount(e.target.value)}
                  placeholder="e.g. 500 or -200"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Mandatory Audit Justification Note</label>
                <input
                  type="text"
                  required
                  value={pointsDescription}
                  onChange={(e) => setPointsDescription(e.target.value)}
                  placeholder="Explain reason for manual adjustment..."
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                />
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all mt-2"
              >
                {processing ? 'Processing...' : 'Apply & Write Audit Log'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
