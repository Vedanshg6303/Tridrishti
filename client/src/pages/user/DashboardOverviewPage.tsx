import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatPoints, formatCurrency, getLevelColor, formatDate } from '../../utils/formatters';
import {
  Sparkles,
  Users,
  Award,
  ShieldCheck,
  Gift,
  ArrowRight,
  Share2,
  Copy,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Clock,
  HeartPulse,
  Zap,
} from 'lucide-react';
import api from '../../utils/api';
import { PointTransaction } from '../../types';

export const DashboardOverviewPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [recentTransactions, setRecentTransactions] = useState<PointTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  if (!user) return null;

  const levelStyle = getLevelColor(user.level || 1);

  useEffect(() => {
    const fetchRecentLedger = async () => {
      try {
        const res = await api.get('/points/ledger?limit=5');
        if (res.data.success) {
          setRecentTransactions(res.data.transactions || []);
        }
      } catch (err) {
        console.error('Error fetching recent ledger:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentLedger();
  }, []);

  const copyReferralLink = () => {
    const link = typeof window !== 'undefined' ? `${window.location.origin}/join/${user.referralCode}` : `https://tridrishti.com/join/${user.referralCode}`;
    navigator.clipboard.writeText(link);
    showToast('Referral link copied! Share to earn 10 TRI Coins per referral.', 'success');
  };

  // Progress to next level calculation based on 50, 200, 500, 1000 thresholds
  const getLevelTarget = (lvl: number) => {
    if (lvl === 1) return { target: 50, base: 0, nextName: 'Level 2 CONNECT' };
    if (lvl === 2) return { target: 200, base: 50, nextName: 'Level 3 GROW' };
    if (lvl === 3) return { target: 500, base: 200, nextName: 'Level 4 LEAD' };
    if (lvl === 4) return { target: 1000, base: 500, nextName: 'Level 5 DIAMOND' };
    return { target: 1000, base: 1000, nextName: 'MAX LEVEL (DIAMOND)' };
  };

  const levelMeta = getLevelTarget(user.level || 1);
  const earned = user.pointsBalance || 0;
  const progressPercent = user.level >= 5
    ? 100
    : Math.min(Math.round(((earned - levelMeta.base) / (levelMeta.target - levelMeta.base)) * 100), 100);

  return (
    <div className="space-y-8">
      {/* 1. Welcome & Level Progress Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-950/70 via-dark-card to-dark-card border border-brand-500/30 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className={`text-xs font-bold font-mono px-3 py-1 rounded-full uppercase border ${levelStyle.bg} ${levelStyle.text} ${levelStyle.border}`}>
                LEVEL {user.level || 1} • {user.levelName || 'STARTER'}
              </span>
              <span className="text-xs text-slate-400 font-mono">Ref Code: {user.referralCode}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Welcome back, {user.name}!
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Invite friends to activate with ₹100 and earn <strong className="text-amber-400 font-bold">10 TRI Coins</strong> per referral. Advance levels to unlock full-body diagnostic vouchers and education tuition grants!
            </p>
          </div>

          {/* Quick Share Pill */}
          <div className="flex items-center gap-2 bg-dark-bg/80 p-2 rounded-2xl border border-dark-border">
            <div className="px-3 py-1.5 overflow-hidden">
              <span className="text-[10px] text-amber-400 font-bold block">Earn 10 Coins / Referral</span>
              <span className="text-xs font-mono font-bold text-brand-400 truncate block">
                tridrishti.com/join/{user.referralCode}
              </span>
            </div>
            <button
              onClick={copyReferralLink}
              className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="Copy Link"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
          </div>
        </div>

        {/* Level Progression Progress Bar */}
        <div className="mt-8 pt-6 border-t border-dark-border/80 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">
              Progress to <strong className="text-brand-400">{levelMeta.nextName}</strong>
            </span>
            <span className="font-bold text-amber-400 font-mono">
              {earned} / {levelMeta.target} TRI Coins ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-dark-bg border border-dark-border overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 via-indigo-500 to-amber-400 transition-all duration-500 shadow-sm shadow-brand-500/50"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: TRI Points Balance */}
        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-3 hover:border-slate-600 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">TRI Coins Balance</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-display font-extrabold text-white flex items-baseline gap-1">
              <span className="text-amber-400">{formatPoints(user.pointsBalance || 0)}</span>
              <span className="text-xs text-slate-400 font-bold">coins</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Lifetime: <span className="text-slate-200 font-medium">{formatPoints(user.lifetimePointsEarned || 0)}</span>
            </p>
          </div>
          <Link
            to="/dashboard/points"
            className="text-[11px] font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1 pt-1"
          >
            <span>View Points Ledger</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Metric 2: Network Reach */}
        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-3 hover:border-slate-600 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Referrals & Team</span>
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-display font-extrabold text-white">
              {Math.floor((user.pointsBalance || 0) / 10)} <span className="text-xs text-slate-400 font-normal">referrals</span>
            </div>
            <p className="text-[11px] text-emerald-400 font-medium">
              Earn 10 coins per ₹100 activation
            </p>
          </div>
          <Link
            to="/dashboard/network"
            className="text-[11px] font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1 pt-1"
          >
            <span>Open Network Tree</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Metric 3: Eligible Benefits */}
        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-3 hover:border-slate-600 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Unlocked Perks</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-display font-extrabold text-white">
              {user.level >= 3 ? 'Diagnostic Pass + Grants' : user.level >= 2 ? 'Doctor Pass + 5% Off' : 'Starter Guidance'}
            </div>
            <p className="text-[11px] text-slate-400">Level {user.level} Unlocked Benefits</p>
          </div>
          <Link
            to="/dashboard/benefits"
            className="text-[11px] font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1 pt-1"
          >
            <span>Browse Benefits</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Metric 4: KYC Verification */}
        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-3 hover:border-slate-600 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">KYC Verification</span>
            <div
              className={`p-2 rounded-xl border ${
                user.kycStatus === 'VERIFIED'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  user.kycStatus === 'VERIFIED' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                }`}
              ></span>
              <span>{user.kycStatus || 'NOT SUBMITTED'}</span>
            </div>
            <p className="text-[11px] text-slate-400">Required for welfare disbursements</p>
          </div>
          <Link
            to="/dashboard/profile"
            className="text-[11px] font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1 pt-1"
          >
            <span>Manage Documents</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 3. Quick Action Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          to="/dashboard/referrals"
          className="p-4 rounded-2xl bg-dark-card border border-dark-border hover:border-amber-500/50 hover:bg-amber-500/5 transition-all text-center space-y-2 group"
        >
          <Zap className="w-6 h-6 text-amber-400 mx-auto group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white block">Refer & Earn</span>
          <span className="text-[10px] text-slate-400 block">+10 Coins / Member</span>
        </Link>

        <Link
          to="/dashboard/healthcare"
          className="p-4 rounded-2xl bg-dark-card border border-dark-border hover:border-rose-500/50 hover:bg-rose-500/5 transition-all text-center space-y-2 group"
        >
          <HeartPulse className="w-6 h-6 text-rose-400 mx-auto group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white block">Telehealth Pass</span>
          <span className="text-[10px] text-slate-400 block">24x7 Doctor Call</span>
        </Link>

        <Link
          to="/dashboard/rewards"
          className="p-4 rounded-2xl bg-dark-card border border-dark-border hover:border-brand-500/50 hover:bg-brand-500/5 transition-all text-center space-y-2 group"
        >
          <Gift className="w-6 h-6 text-brand-400 mx-auto group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white block">Redeem Goodies</span>
          <span className="text-[10px] text-slate-400 block">Hoodies, Tech, Kits</span>
        </Link>

        <Link
          to="/dashboard/membership"
          className="p-4 rounded-2xl bg-dark-card border border-dark-border hover:border-purple-500/50 hover:bg-purple-500/5 transition-all text-center space-y-2 group"
        >
          <Award className="w-6 h-6 text-purple-400 mx-auto group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white block">Upgrade Plan</span>
          <span className="text-[10px] text-slate-400 block">Fast-Track Level</span>
        </Link>
      </div>

      {/* 4. Recent Point Ledger Activity */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Recent Point Ledger Transactions</h3>
            <p className="text-xs text-slate-400">All TRI coins credited or used are recorded with immutable transaction IDs.</p>
          </div>
          <Link
            to="/dashboard/points"
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-dark-border text-slate-400 uppercase text-[10px] font-semibold">
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Source</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((tx) => (
                  <tr key={tx._id || tx.transactionId} className="hover:bg-dark-bg/50 transition-colors">
                    <td className="py-3.5 font-mono text-slate-300">{tx.transactionId}</td>
                    <td className="py-3.5 text-white font-medium">{tx.description}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-dark-bg border border-dark-border text-slate-300 text-[10px] font-mono">
                        {tx.source}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-400">{formatDate(tx.createdAt)}</td>
                    <td className="py-3.5 text-right font-bold font-mono">
                      <span className={tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {tx.amount > 0 ? `+${tx.amount}` : tx.amount} coins
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No transactions found in your point ledger yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
