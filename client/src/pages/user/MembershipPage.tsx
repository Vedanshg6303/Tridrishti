import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { MembershipPlan } from '../../types';
import { formatCurrency, formatPoints } from '../../utils/formatters';
import { CreditCard, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '../../utils/api';

export const MembershipPage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get('/memberships/plans');
        if (res.data.success) {
          setPlans(res.data.plans || []);
        }
      } catch (err) {
        console.error('Failed to load membership plans:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleCheckout = async (plan: MembershipPlan) => {
    setProcessingPlanId(plan._id);
    try {
      // 1. Create order on server
      const orderRes = await api.post('/memberships/checkout', { planId: plan._id });
      if (!orderRes.data.success) {
        throw new Error(orderRes.data.message || 'Failed to initiate checkout order');
      }

      const { order } = orderRes.data;

      // 2. Simulate Razorpay Gateway Payment Verification
      const verifyRes = await api.post('/memberships/verify-payment', {
        orderId: order.id,
        paymentId: `pay_tri_${Date.now()}`,
        signature: 'mock_signature_bypass',
      });

      if (verifyRes.data.success) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        showToast(
          `Payment successful! ${verifyRes.data.pointsCredited} TRI Points credited to your ledger.`,
          'success'
        );
        await refreshUser();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || err.message || 'Payment processing failed', 'error');
    } finally {
      setProcessingPlanId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">My Membership & Upgrade</h2>
        <p className="text-xs text-slate-400">
          Manage your active membership plan, accelerate point earning rates, and unlock higher tier benefits
        </p>
      </div>

      {/* Current Active Plan Status */}
      <div className="p-6 rounded-3xl bg-dark-card border border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/25">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold">Current Active Tier</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <h3 className="text-xl font-bold text-white">Level {user?.level || 1} • {user?.levelName || 'STARTER'}</h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase">Points Balance</span>
            <span className="text-sm font-bold text-amber-400 flex items-center gap-1 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              {formatPoints(user?.pointsBalance || 0)} pts
            </span>
          </div>
        </div>
      </div>

      {/* Available Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`rounded-3xl p-8 bg-dark-card border flex flex-col justify-between space-y-6 transition-all ${
              plan.isFeatured
                ? 'border-brand-500 shadow-2xl shadow-brand-500/15 bg-gradient-to-b from-brand-950/40 to-dark-card'
                : 'border-dark-border hover:border-slate-500'
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400 font-bold uppercase">{plan.code}</span>
                {plan.isFeatured && (
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-bold uppercase">
                    Popular
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-display font-extrabold text-white">
                  {formatCurrency(plan.price)}
                </span>
                <span className="text-xs text-slate-400">one-time</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Includes {formatPoints(plan.triPointsReward)} TRI Points</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              disabled={processingPlanId === plan._id}
              onClick={() => handleCheckout(plan)}
              className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                plan.isFeatured
                  ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30'
                  : 'bg-dark-bg hover:bg-dark-border border border-dark-border text-white'
              }`}
            >
              {processingPlanId === plan._id ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <span>Activate / Upgrade</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-dark-card/40 border border-dark-border text-center text-xs text-slate-400">
        Payments are processed securely via compliant gateway interfaces with 256-bit SSL encryption. All transactions generate instant digital receipts and ledger updates.
      </div>
    </div>
  );
};
