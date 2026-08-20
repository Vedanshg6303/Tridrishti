import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, ArrowUpRight, ArrowDownLeft, Search, Filter, ShieldCheck, Clock } from 'lucide-react';
import { formatPoints, formatDate } from '../../utils/formatters';
import { PointTransaction } from '../../types';
import api from '../../utils/api';

export const PointsPage: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [loading, setLoading] = useState(true);

  if (!user) return null;

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const res = await api.get('/points/ledger?limit=50');
        if (res.data.success) {
          setTransactions(res.data.transactions || []);
        }
      } catch (err) {
        console.error('Failed to load points ledger:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLedger();
  }, []);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.source.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'ALL' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">TRI Points Ledger & Balance</h2>
        <p className="text-xs text-slate-400">
          Complete, immutable point audit trail. Points are promotional platform utility units governed by the Reward Policy.
        </p>
      </div>

      {/* Points Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/60 to-dark-card border border-amber-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-300 uppercase font-semibold">Available Balance</span>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white flex items-baseline gap-1">
            <span>{formatPoints(user.pointsBalance || 0)}</span>
            <span className="text-xs text-amber-400 font-bold">pts</span>
          </div>
          <p className="text-[11px] text-slate-400">Ready for instant store redemption</p>
        </div>

        <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-semibold">Lifetime Earned</span>
            <ArrowUpRight className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white flex items-baseline gap-1">
            <span>{formatPoints(user.lifetimePointsEarned || 0)}</span>
            <span className="text-xs text-slate-400 font-bold">pts</span>
          </div>
          <p className="text-[11px] text-slate-400">Total cumulative points issued</p>
        </div>

        <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-semibold">Lifetime Redeemed</span>
            <ArrowDownLeft className="w-5 h-5 text-rose-400" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white flex items-baseline gap-1">
            <span>{formatPoints(user.lifetimePointsUsed || 0)}</span>
            <span className="text-xs text-slate-400 font-bold">pts</span>
          </div>
          <p className="text-[11px] text-slate-400">Goodies, merch & benefits claimed</p>
        </div>
      </div>

      {/* Ledger Table Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 w-full sm:w-auto">
            <h3 className="text-lg font-bold text-white">Immutable Point Ledger</h3>
            <p className="text-xs text-slate-400">Every transaction contains a cryptographically traceable ID.</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by ID or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-dark-border text-slate-400 uppercase text-[10px] font-semibold">
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Points</th>
                <th className="pb-3 text-right">Balance After</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx._id || tx.transactionId} className="hover:bg-dark-bg/50 transition-colors">
                    <td className="py-3.5 font-mono text-slate-300">{tx.transactionId}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-dark-bg border border-dark-border text-slate-300 text-[10px] font-mono">
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3.5 text-white font-medium">{tx.description}</td>
                    <td className="py-3.5 text-slate-400">{formatDate(tx.createdAt)}</td>
                    <td className="py-3.5 text-right font-bold font-mono">
                      <span className={tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {tx.amount > 0 ? `+${tx.amount}` : tx.amount} pts
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-mono text-slate-400">{tx.balanceAfter} pts</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No transactions match your search.
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
