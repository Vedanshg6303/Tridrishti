import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { RewardProduct } from '../../types';
import { formatPoints } from '../../utils/formatters';
import { Gift, Sparkles, Search, ShoppingBag, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '../../utils/api';

export const RewardsStorePage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();
  const [products, setProducts] = useState<RewardProduct[]>([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Redemption Modal State
  const [selectedProduct, setSelectedProduct] = useState<RewardProduct | null>(null);
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [addressLine1, setAddressLine1] = useState(user?.address?.line1 || '');
  const [city, setCity] = useState(user?.address?.city || '');
  const [state, setState] = useState(user?.address?.state || '');
  const [pincode, setPincode] = useState(user?.address?.pincode || '');
  const [redeeming, setRedeeming] = useState(false);

  const categories = ['All', 'Fashion', 'Electronics', 'Lifestyle', 'Books', 'Healthcare', 'Accessories'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/rewards/products');
        if (res.data.success) {
          setProducts(res.data.products || []);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    if (!addressLine1 || !city || !pincode) {
      showToast('Please provide a complete shipping address', 'error');
      return;
    }

    setRedeeming(true);
    try {
      const res = await api.post('/rewards/redeem', {
        productId: selectedProduct._id,
        shippingAddress: {
          fullName,
          phone,
          addressLine1,
          city,
          state,
          pincode,
        },
      });

      if (res.data.success) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
        showToast(`Redemption successful! ${selectedProduct.title} order confirmed.`, 'success');
        setSelectedProduct(null);
        await refreshUser();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Redemption failed', 'error');
    } finally {
      setRedeeming(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = category === 'All' || p.category === category;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Reward Marketplace</h2>
          <p className="text-xs text-slate-400">
            Redeem your available TRI Points for physical merchandise and goods delivered to your doorstep
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold font-mono text-xs shadow-md">
          <Sparkles className="w-4 h-4" />
          <span>Your Balance: {formatPoints(user?.pointsBalance || 0)} pts</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-dark-card border border-dark-border">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                category === cat
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
                  : 'bg-dark-bg text-slate-300 hover:text-white border border-dark-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const hasEnoughPoints = (user?.pointsBalance || 0) >= product.pointsRequired;
          const meetsLevel = (user?.level || 1) >= product.minLevelRequired;
          const canRedeem = hasEnoughPoints && meetsLevel && product.stock > 0;

          return (
            <div
              key={product._id}
              className="rounded-3xl bg-dark-card border border-dark-border overflow-hidden flex flex-col justify-between hover:border-slate-500 transition-all group"
            >
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{formatPoints(product.pointsRequired)} pts</span>
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-dark-bg/80 backdrop-blur-md text-[10px] font-mono text-slate-300 uppercase">
                    Level {product.minLevelRequired}+
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="text-brand-400 font-bold uppercase">{product.category}</span>
                    <span>Stock: {product.stock} left</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{product.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  disabled={!canRedeem}
                  onClick={() => setSelectedProduct(product)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    canRedeem
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25'
                      : 'bg-dark-bg border border-dark-border text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {!meetsLevel
                      ? `Requires Level ${product.minLevelRequired}`
                      : !hasEnoughPoints
                      ? 'Insufficient TRI Points'
                      : 'Redeem Item'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Redemption Confirmation Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-dark-border pb-3">
              <h3 className="text-base font-bold text-white">Confirm Reward Order</h3>
              <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-white text-xs">
                Cancel
              </button>
            </div>

            {/* Product Summary */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-dark-bg border border-dark-border">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.title}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-white">{selectedProduct.title}</h4>
                <div className="text-xs text-amber-400 font-bold font-mono mt-1">
                  Cost: {formatPoints(selectedProduct.pointsRequired)} TRI Points
                </div>
              </div>
            </div>

            <form onSubmit={handleRedeem} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="Flat / Building / Street Address"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Pincode</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400">
                100% Free Shipping. Your point balance will be deducted immediately.
              </div>

              <button
                type="submit"
                disabled={redeeming}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 transition-all mt-2"
              >
                {redeeming ? 'Processing Redemption...' : 'Confirm & Place Order'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
