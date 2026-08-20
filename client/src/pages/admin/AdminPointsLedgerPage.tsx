import React, { useState, useEffect } from 'react';
import { Sparkles, Search, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { formatDate, formatPoints } from '../../utils/formatters';
import api from '../../utils/api';

export const AdminPointsLedgerPage: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const res = await api.get('/points/ledger?limit=100');
        if (res.data.success) {
          setTransactions(res.data.transactions || []);
        }
      } catch (err) {
        console.error('Failed to load ledger:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTransactions();
  }, []);

  const filtered = transactions.filter((t) =>
    t.transactionId.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Global Points Ledger & Audit Inspector</h2>
          <p className="text-xs text-slate-400">
            Immutable inspection of all platform credit and debit transactions
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by transaction ID..."
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
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Source</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {filtered.length > 0 ? (
                filtered.map((tx) => (
                  <tr key={tx._id} className="hover:bg-dark-bg/50 transition-colors">
                    <td className="py-3.5 font-mono text-purple-400 font-bold">{tx.transactionId}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-dark-bg border border-dark-border text-slate-300 text-[10px] font-mono">
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3.5 text-white font-medium">{tx.description}</td>
                    <td className="py-3.5 text-slate-400 text-[11px] font-mono">{tx.source}</td>
                    <td className="py-3.5 text-slate-400">{formatDate(tx.createdAt)}</td>
                    <td className="py-3.5 text-right font-bold font-mono">
                      <span className={tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {tx.amount > 0 ? `+${tx.amount}` : tx.amount} pts
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No ledger records match your filter.
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
