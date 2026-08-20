import React, { useState } from 'react';
import { Sparkles, Gift, Filter, Search, CheckCircle2 } from 'lucide-react';
import { formatPoints } from '../../utils/formatters';

export const RewardsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Fashion', 'Electronics', 'Lifestyle', 'Books', 'Healthcare', 'Accessories'];

  const products = [
    {
      id: '1',
      title: 'Tridrishti Signature Eco-Cotton Hoodie',
      category: 'Fashion',
      points: 400,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600',
      description: 'Heavy-blend fleece hoodie made from 100% sustainably sourced organic cotton with custom embroidered crest.',
      minLevel: 1,
    },
    {
      id: '2',
      title: 'Noise Pulse Smartwatch & Health Tracker',
      category: 'Electronics',
      points: 950,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
      description: '1.85-inch HD Display, SpO2 & 24/7 Heart Rate Monitor, 100+ Sports Modes, IP68 Water Resistant.',
      minLevel: 2,
    },
    {
      id: '3',
      title: 'Smart Vacuum Insulated Temperature Bottle (750ml)',
      category: 'Lifestyle',
      points: 250,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
      description: 'Double-walled stainless steel thermal flask with integrated touch LED temperature sensor display.',
      minLevel: 1,
    },
    {
      id: '4',
      title: 'boAt Airdopes True Wireless Earbuds',
      category: 'Electronics',
      points: 800,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600',
      description: 'Signature bass, ENx noise-cancellation mic, Beast mode low latency, and up to 42 hours total playtime.',
      minLevel: 2,
    },
    {
      id: '5',
      title: 'Ergonomic Urban Laptop Backpack (30L)',
      category: 'Accessories',
      points: 650,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
      description: 'Water-repellent ballistic nylon backpack with padded 15.6" laptop compartment and USB charging port.',
      minLevel: 1,
    },
    {
      id: '6',
      title: 'Best-Selling Leadership & Finance Book Set (5 Books)',
      category: 'Books',
      points: 350,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600',
      description: 'Curated library including Atomic Habits, Psychology of Money, Deep Work, Mindset, and Start with Why.',
      minLevel: 1,
    },
    {
      id: '7',
      title: 'Comprehensive Home First-Aid & Wellness Medical Kit',
      category: 'Healthcare',
      points: 500,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600',
      description: 'Over 80 essential emergency medical supplies, digital thermometer, pulse oximeter, and certified manual.',
      minLevel: 1,
    },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Gift className="w-3.5 h-3.5" />
          <span>Reward Marketplace</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">TRI Points Reward Store</h1>
        <p className="text-base text-slate-300">
          Redeem your earned platform reward points for physical lifestyle items, electronics, books, and merchandise with 100% free doorstep delivery across India.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-dark-card border border-dark-border">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
                  : 'bg-dark-bg text-slate-300 hover:text-white border border-dark-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search rewards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-3xl bg-dark-card border border-dark-border overflow-hidden flex flex-col justify-between hover:border-slate-500 transition-all group"
          >
            <div>
              <div className="h-56 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{formatPoints(product.points)} pts</span>
                </div>
                <div className="absolute top-3.5 left-3.5 px-2.5 py-0.5 rounded-lg bg-dark-bg/80 backdrop-blur-md text-[10px] font-mono text-slate-300 uppercase">
                  Level {product.minLevel}+ Required
                </div>
              </div>

              <div className="p-6 space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400 font-mono">
                  {product.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                  {product.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{product.description}</p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <a
                href="/login"
                className="w-full py-2.5 rounded-xl bg-dark-bg hover:bg-brand-600 border border-dark-border hover:border-brand-500 text-center text-xs font-bold text-white transition-all block"
              >
                Login to Redeem
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
