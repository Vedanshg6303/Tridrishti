import React from 'react';

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2 border-b border-dark-border pb-6">
        <span className="text-xs font-mono text-brand-400 uppercase font-semibold">Payment & Cancellation</span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Refund & Cancellation Policy</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="prose prose-invert max-w-none text-xs text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Membership Fees Non-Refundable</h2>
          <p>
            Payments made for platform membership access (e.g. TRI Starter ₹100, TRI Pro ₹500, TRI Elite ₹1,000) are activated immediately upon payment verification, unlocking digital tools, referral infrastructure, and point credits. Consequently, membership fees are strictly non-refundable once activated.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Reward Merchandise Damaged in Transit</h2>
          <p>
            If physical merchandise redeemed from the Reward Store arrives damaged or defective, members must notify support within 48 hours of delivery with photographic evidence. Upon verification, replacement merchandise or point reimbursement will be issued.
          </p>
        </section>
      </div>
    </div>
  );
};
