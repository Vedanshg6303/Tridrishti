import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { formatDate, formatPoints } from '../../utils/formatters';
import api from '../../utils/api';

export const OrdersPage: React.FC = () => {
  const [redemptions, setRedemptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRedemptions = async () => {
      try {
        const res = await api.get('/rewards/my-redemptions');
        if (res.data.success) {
          setRedemptions(res.data.redemptions || []);
        }
      } catch (err) {
        console.error('Failed to load redemptions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRedemptions();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">Orders & Redemptions History</h2>
        <p className="text-xs text-slate-400">
          Track fulfillment status, shipping tracking numbers, and delivery confirmation
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-dark-border text-slate-400 uppercase text-[10px] font-semibold">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Product</th>
                <th className="pb-3">Points Spent</th>
                <th className="pb-3">Shipping Status</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {redemptions.length > 0 ? (
                redemptions.map((r) => (
                  <tr key={r._id} className="hover:bg-dark-bg/50 transition-colors">
                    <td className="py-3.5 font-mono text-brand-400 font-bold">{r.redemptionId}</td>
                    <td className="py-3.5 font-medium text-white">{r.productSnapshot?.title || 'Reward Item'}</td>
                    <td className="py-3.5 font-bold font-mono text-amber-400">
                      {formatPoints(r.pointsSpent)} pts
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full ${
                          r.status === 'DELIVERED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : r.status === 'SHIPPED'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-400">{formatDate(r.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No reward orders placed yet. Explore the Reward Store to redeem goodies!
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
