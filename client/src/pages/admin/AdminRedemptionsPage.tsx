import React, { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import { RewardRedemption } from '../../types';
import { formatDate, formatPoints } from '../../utils/formatters';
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';
import api from '../../utils/api';

export const AdminRedemptionsPage: React.FC = () => {
  const { showToast } = useToast();
  const [redemptions, setRedemptions] = useState<RewardRedemption[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<RewardRedemption | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [courierPartner, setCourierPartner] = useState('BlueDart');
  const [processing, setProcessing] = useState(false);

  const fetchRedemptions = async () => {
    try {
      const res = await api.get('/admin/redemptions');
      if (res.data.success) {
        setRedemptions(res.data.redemptions || []);
      }
    } catch (err) {
      console.error('Failed to load redemptions:', err);
    }
  };

  useEffect(() => {
    fetchRedemptions();
  }, []);

  const handleUpdateStatus = async (status: string) => {
    if (!selectedOrder) return;
    setProcessing(true);
    try {
      const res = await api.put(`/admin/redemptions/${selectedOrder.redemptionId}`, {
        status,
        trackingNumber: trackingNumber || undefined,
        courierPartner: courierPartner || undefined,
      });
      if (res.data.success) {
        showToast(`Order ${selectedOrder.redemptionId} marked as ${status}`, 'success');
        setSelectedOrder(null);
        setTrackingNumber('');
        fetchRedemptions();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to update order', 'error');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">Reward Store Orders & Logistics</h2>
        <p className="text-xs text-slate-400">
          Assign courier tracking numbers, dispatch physical goodies, and confirm delivery
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-dark-border text-slate-400 uppercase text-[10px] font-semibold">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Member</th>
                <th className="pb-3">Product</th>
                <th className="pb-3">Points Spent</th>
                <th className="pb-3">Shipping Address</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {redemptions.length > 0 ? (
                redemptions.map((r) => (
                  <tr key={r._id} className="hover:bg-dark-bg/50 transition-colors">
                    <td className="py-3.5 font-mono text-purple-400 font-bold">{r.redemptionId}</td>
                    <td className="py-3.5 font-semibold text-white">
                      {(r as any).userId?.name || 'Member'}
                    </td>
                    <td className="py-3.5 text-white font-medium">{r.productSnapshot?.title}</td>
                    <td className="py-3.5 font-mono text-amber-400 font-bold">{r.pointsSpent} pts</td>
                    <td className="py-3.5 text-slate-300 text-[11px]">
                      <div>{r.shippingAddress?.fullName} ({r.shippingAddress?.phone})</div>
                      <div className="text-slate-500">{r.shippingAddress?.city}, {r.shippingAddress?.state} - {r.shippingAddress?.pincode}</div>
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
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => setSelectedOrder(r)}
                        className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-lg"
                      >
                        Dispatch / Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No redemption orders currently in queue.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-dark-border pb-3">
              <h3 className="text-base font-bold text-white">Update Dispatch: {selectedOrder.redemptionId}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white text-xs">
                Cancel
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Courier Partner</label>
                <input
                  type="text"
                  value={courierPartner}
                  onChange={(e) => setCourierPartner(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Tracking Number / AWB</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="AWB123456789IN"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-3">
              <button
                onClick={() => handleUpdateStatus('SHIPPED')}
                disabled={processing}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
              >
                Mark Shipped
              </button>
              <button
                onClick={() => handleUpdateStatus('DELIVERED')}
                disabled={processing}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                Mark Delivered
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
