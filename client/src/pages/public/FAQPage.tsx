import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Tridrishti and what are TRI Points?',
      a: 'Tridrishti is a membership, community, rewards and benefits ecosystem. TRI Points are internal platform reward points earned through eligible activities, qualifying transactions, and community engagement. They are NOT cryptocurrency, securities, or money deposits and cannot be traded on speculative exchanges.',
    },
    {
      q: 'Is Tridrishti a multi-level marketing (MLM) or investment scheme?',
      a: 'No. Tridrishti strictly does not offer guaranteed monetary returns, investment schemes, or money circulation. All platform memberships (such as TRI Starter at ₹100) are for genuine platform tools, digital services, and reward goodies.',
    },
    {
      q: 'How do I redeem my TRI Points for goodies?',
      a: 'Once you accumulate points, navigate to the Reward Store on your member dashboard, select your desired item (such as an eco-cotton hoodie, smartwatch, or book bundle), enter your shipping address, and confirm. Delivery is free across India.',
    },
    {
      q: 'How does the Education Support Grant work?',
      a: 'Members at Level 2 and above can submit an online grant request with supporting fee receipts or admission letters. Our committee verifies the documents and disburses funds directly towards the student’s academic expenses.',
    },
    {
      q: 'Are healthcare and insurance benefits guaranteed?',
      a: 'Healthcare and insurance services are provided through licensed third-party partners and are governed by specific eligibility criteria and partner policies.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">Frequently Asked Questions</h1>
        <p className="text-sm text-slate-300">
          Everything you need to know about the Tridrishti platform, reward rules, and ecosystem benefits.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-dark-card border border-dark-border transition-all cursor-pointer"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-bold text-white">{faq.q}</h3>
                <div className="p-1 rounded-lg bg-dark-bg border border-dark-border text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
              {isOpen && <p className="text-xs text-slate-300 leading-relaxed mt-3 pt-3 border-t border-dark-border">{faq.a}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
