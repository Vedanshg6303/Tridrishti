import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2 border-b border-dark-border pb-6">
        <span className="text-xs font-mono text-brand-400 uppercase font-semibold">Privacy & Security</span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="prose prose-invert max-w-none text-xs text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Data Collection & Processing</h2>
          <p>
            Tridrishti collects user information including name, email address, phone number, shipping address, and optional KYC documents (PAN / Aadhaar last-4) exclusively for platform authentication, order fulfillment, anti-fraud compliance, and benefit delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Data Security & Storage</h2>
          <p>
            All sensitive passwords and tokens are encrypted with industry-standard bcrypt and Argon2 hashing. Network communication is secured via TLS/HTTPS. We do not sell or monetize personal user data to third-party marketing entities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Third-Party Integrations</h2>
          <p>
            Payment transactions are processed by certified Indian payment gateways (such as Razorpay). Partner insurance and healthcare quotes are shared only with explicit user authorization for policy issuance.
          </p>
        </section>
      </div>
    </div>
  );
};
