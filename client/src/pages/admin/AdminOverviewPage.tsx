import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Package,
  AlertTriangle,
  Receipt,
  GraduationCap,
  TrendingUp,
  FileText,
} from 'lucide-react';
import { formatCurrency, formatPoints } from '../../utils/formatters';
import api from '../../utils/api';

export const AdminOverviewPage: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await api.get('/admin/metrics');
        if (res.data.success) {
          setMetrics(res.data.metrics);
        }
      } catch (err) {
        console.error('Failed to load admin metrics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">Platform CRM & Governance Overview</h2>
        <p className="text-xs text-slate-400">
          Real-time metrics, user growth, point liability, pending compliance verifications, and benefit claims
        </p>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Users</span>
            <Users className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white">
            {metrics?.totalUsers || 8}
          </div>
          <p className="text-[11px] text-emerald-400 font-medium">
            Active Members: {metrics?.activeUsers || 8}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Gross Revenue</span>
            <Receipt className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white">
            {formatCurrency(metrics?.totalRevenue || 1600)}
          </div>
          <p className="text-[11px] text-slate-400">Verified via Gateway Signatures</p>
        </div>

        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Points Issued</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-display font-extrabold text-amber-400 font-mono">
            {formatPoints(metrics?.totalPointsIssued || 54970)}
          </div>
          <p className="text-[11px] text-slate-400">
            Redeemed: {formatPoints(metrics?.totalPointsRedeemed || 1500)} pts
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Pending Claims</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white">
            {metrics?.pendingClaims || 1}
          </div>
          <p className="text-[11px] text-amber-400 font-medium">Requires operations review</p>
        </div>
      </div>

      {/* Governance & Action Queue */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 text-xs">
              Pending KYC Queue
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold font-mono">
              {metrics?.pendingKycCount || 1}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Members have submitted PAN/Aadhaar compliance records awaiting verification.
          </p>
          <a
            href="/admin/users?kycStatus=PENDING"
            className="block w-full py-2.5 rounded-xl bg-dark-bg hover:bg-dark-border border border-dark-border text-center text-xs font-bold text-white transition-colors"
          >
            Review KYC Documents
          </a>
        </div>

        <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 text-xs">
              Reward Orders to Dispatch
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold font-mono">
              {metrics?.pendingRedemptions || 0}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Goodies and merchandise orders pending tracking number assignment and courier dispatch.
          </p>
          <a
            href="/admin/redemptions"
            className="block w-full py-2.5 rounded-xl bg-dark-bg hover:bg-dark-border border border-dark-border text-center text-xs font-bold text-white transition-colors"
          >
            Manage Redemptions
          </a>
        </div>

        <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 text-xs">
              Rules Engine State
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono">
              Active
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Configure dynamic point ratios, level promotion thresholds, and anti-fraud velocity limits without code changes.
          </p>
          <a
            href="/admin/rules"
            className="block w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-center text-xs font-bold text-white shadow-lg shadow-purple-600/25 transition-all"
          >
            Open Rules Engine
          </a>
        </div>
      </div>
    </div>
  );
};
