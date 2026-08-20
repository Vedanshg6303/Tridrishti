import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Lock, Mail, ArrowRight, ShieldCheck, User, ShieldAlert } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        showToast('Welcome back to Tridrishti!', 'success');
        const user = JSON.parse(localStorage.getItem('tridrishti_user') || '{}');
        if (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        showToast(res.message || 'Invalid email or password', 'error');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Login failed. Please check credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setLoading(true);
    try {
      const res = await login(demoEmail, demoPass);
      if (res.success) {
        showToast('Signed in with Demo account!', 'success');
        const user = JSON.parse(localStorage.getItem('tridrishti_user') || '{}');
        if (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        showToast(res.message || 'Login failed', 'error');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Login failed', 'error');
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
          <h2 className="text-2xl font-display font-extrabold text-white">Sign In to Tridrishti</h2>
          <p className="text-xs text-slate-400">
            Access your membership utilities, TRI Points ledger, and welfare dashboard
          </p>
        </div>

        {/* Quick Admin Access */}
        <div className="p-3.5 rounded-2xl bg-dark-bg/80 border border-purple-500/20 text-center">
          <button
            type="button"
            onClick={() => handleDemoLogin('admin@tridrishti.com', 'Admin@123')}
            className="w-full py-2.5 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>1-Click Super Admin Login</span>
          </button>
        </div>

        {/* Standard Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <a href="#" className="text-[11px] text-brand-400 hover:underline">
                Forgot password?
              </a>
            </div>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          New to the ecosystem?{' '}
          <Link to="/register" className="text-brand-400 font-semibold hover:underline">
            Create an account (Get 10 TRI Coins)
          </Link>
        </div>

        <div className="pt-2 border-t border-dark-border text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted 256-bit SSL authentication session</span>
        </div>
      </div>
    </div>
  );
};
