import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, Mail, Lock, Phone, Gift, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { refCode } = useParams<{ refCode?: string }>();
  const [searchParams] = useSearchParams();
  const urlRef = refCode || searchParams.get('ref') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState(urlRef);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (urlRef) {
      setReferralCode(urlRef);
    }
  }, [urlRef]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('Please fill out all mandatory fields', 'error');
      return;
    }
    if (!agreedTerms) {
      showToast('Please accept the Platform Terms and Compliance Policy', 'error');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, phone, referralCode);
      showToast('Account registered successfully! Welcome to Tridrishti.', 'success');
      navigate('/dashboard');
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Registration failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6 bg-dark-card/90 backdrop-blur-xl border border-dark-border p-8 sm:p-10 rounded-3xl shadow-2xl relative">
        {/* Brand Logo Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-block focus:outline-none">
            <img
              src="/logo.png"
              alt="TRIDRISHTI"
              className="h-14 w-auto mx-auto object-contain transition-transform hover:scale-105"
            />
          </Link>
          <h2 className="text-2xl font-display font-extrabold text-white">Join the Community</h2>
          <p className="text-xs text-slate-400">
            Create your account to unlock rewards, community benefits, and healthcare assistance
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Mobile Number (Optional)</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Referral / Sponsor Code (Optional)</label>
            <div className="relative">
              <Gift className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                placeholder="e.g. TRI-VDNSH-82K"
                className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-white uppercase placeholder-slate-500 font-mono focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="flex items-start gap-2.5 pt-1 text-xs">
            <input
              type="checkbox"
              id="terms"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-1 rounded border-dark-border bg-dark-bg text-brand-600 focus:ring-brand-500"
            />
            <label htmlFor="terms" className="text-slate-400 text-[11px] leading-tight">
              I agree to the{' '}
              <Link to="/terms" className="text-brand-400 hover:underline">
                Terms & Conditions
              </Link>
              ,{' '}
              <Link to="/privacy" className="text-brand-400 hover:underline">
                Privacy Policy
              </Link>{' '}
              and understand that TRI Points are non-investment promotional rewards.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Already a member?{' '}
          <Link to="/login" className="text-brand-400 font-semibold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};
