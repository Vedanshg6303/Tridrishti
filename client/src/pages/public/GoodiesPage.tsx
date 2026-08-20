import React from 'react';
import { Gift, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GoodiesPage: React.FC = () => {
  const goodies = [
    {
      title: 'Community Starter Welcome Pack',
      includedIn: 'TRI STARTER & All Plans',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600',
      items: ['Official Member E-Handbook', 'Tridrishti Decal & Laptop Stickers', 'Digital Member Badge'],
    },
    {
      title: 'Stainless Steel Insulated Thermal Bottle (750ml)',
      includedIn: 'TRI PRO & TRI ELITE Plans',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
      items: ['Double-wall vacuum insulation', 'Touch LED temperature readout', 'Laser-engraved logo'],
    },
    {
      title: 'Tridrishti Signature Eco-Cotton Hoodie',
      includedIn: 'TRI ELITE Plan',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600',
      items: ['100% Organic combed cotton', 'Custom embroidered chest crest', 'Premium heavy-blend comfort'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Gift className="w-3.5 h-3.5" />
          <span>Membership Merch & Swag</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">Community Goodies</h1>
        <p className="text-base text-slate-300">
          Every membership includes tangible branded goodies and welcome packs delivered directly to your home.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {goodies.map((g, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-dark-card border border-dark-border overflow-hidden flex flex-col justify-between hover:border-slate-500 transition-all"
          >
            <div>
              <div className="h-56 overflow-hidden">
                <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-3">
                <span className="text-[10px] font-bold font-mono text-amber-400 uppercase tracking-widest block">
                  {g.includedIn}
                </span>
                <h3 className="text-lg font-bold text-white">{g.title}</h3>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  {g.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-6 pt-0">
              <Link
                to="/memberships"
                className="w-full py-2.5 rounded-xl bg-dark-bg hover:bg-brand-600 border border-dark-border hover:border-brand-500 text-center text-xs font-bold text-white transition-all block"
              >
                View Eligible Plan
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
