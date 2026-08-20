import React from 'react';

export const RewardPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2 border-b border-dark-border pb-6">
        <span className="text-xs font-mono text-amber-400 uppercase font-semibold">Reward Program Governance</span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">TRI Points Reward Policy</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="prose prose-invert max-w-none text-xs text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Nature & Definition of TRI Points</h2>
          <p>
            TRI Points are promotional, platform-internal loyalty and reward units. They do not constitute currency, cash equivalents, deposits, shares, or virtual digital assets. TRI Points hold zero intrinsic cash redemption value against INR and can only be used to redeem catalog rewards or qualify for tier benefits.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Earning Mechanisms</h2>
          <p>
            Points are earned strictly through qualifying platform actions including eligible product purchases, voluntary community initiatives, and platform onboarding bonuses. Recruitment alone does not automatically generate guaranteed financial returns.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Expiry and Forfeiture</h2>
          <p>
            Points remain active as long as the user's account remains in good standing. In the event of account suspension due to fraud, policy violation, or duplicate account creation, all associated point balances are subject to immediate forfeiture.
          </p>
        </section>
      </div>
    </div>
  );
};
