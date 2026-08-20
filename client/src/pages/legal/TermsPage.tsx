import React from 'react';
import { Shield } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2 border-b border-dark-border pb-6">
        <span className="text-xs font-mono text-brand-400 uppercase font-semibold">Legal Documentation</span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Terms and Conditions</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="prose prose-invert max-w-none text-xs text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing, registering, or using the Tridrishti platform (tridrishti.com), you agree to be bound by these Terms and Conditions, our Privacy Policy, Refund Policy, and Reward Policy. If you do not agree, you must immediately cease using the platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Platform Nature & Non-Investment Affirmation</h2>
          <p>
            Tridrishti is a membership, digital utility, and rewards community platform. Payments for memberships (such as TRI Starter ₹100, TRI Pro ₹500, or TRI Elite ₹1,000) are consideration for platform software access, member tools, community utilities, and eligible physical merchandise. Payments are NOT investments, deposits, securities, debentures, or collective investment schemes under Indian law.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Nature of TRI Points</h2>
          <p>
            TRI Points are internal platform reward points granted purely at the platform's discretion upon completion of qualifying activities or product purchases. They do NOT constitute fiat currency, legal tender, cryptocurrency, virtual digital assets, or guaranteed financial returns. TRI Points can only be redeemed for eligible goods and benefits listed in the platform catalog.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Prohibition of Fraudulent & Circular Schemes</h2>
          <p>
            Users are strictly prohibited from creating multiple accounts, self-referrals, bot generation, or attempting circular referral structures to manipulate platform rewards. Tridrishti’s automated and human anti-fraud systems actively monitor transactions and will immediately freeze violating accounts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">5. Governing Law & Jurisdiction</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Gautam Buddha Nagar (Noida), Uttar Pradesh.
          </p>
        </section>
      </div>
    </div>
  );
};
