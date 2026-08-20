import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Lock, Mail, ArrowRight, ShieldCheck, User, ShieldAlert, KeyRound, Smartphone, RefreshCw, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'PASSWORD' | 'OTP'>('OTP');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // OTP state
  const [otpTarget, setOtpTarget] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpPreview, setOtpPreview] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  const [loading, setLoading] = useState(false);
  const { login, sendOTP, loginWithOTP } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Resend cooldown timer
  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
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
        showToast(res.message || 'Login failed', 'error');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Login failed. Please check credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!otpTarget) {
      showToast('Please enter your registered email or phone number', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await sendOTP(otpTarget, 'LOGIN');
      if (res.success) {
        setOtpSent(true);
        setResendTimer(60);
        if (res.devOtpPreview) {
          setOtpPreview(res.devOtpPreview);
          setOtpCode(res.devOtpPreview); // Auto-fill for seamless developer experience
        }
        showToast(`Verification code sent to ${otpTarget}`, 'success');
      } else {
        showToast(res.message || 'Failed to send OTP code', 'error');
      }
    } catch (err: any) {
      showToast('Could not send OTP. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpTarget || !otpCode) {
      showToast('Please enter the 6-digit verification code', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await loginWithOTP(otpTarget, otpCode);
      if (res.success) {
        showToast('🎉 OTP Verified! Welcome to Tridrishti.', 'success');
        const user = JSON.parse(localStorage.getItem('tridrishti_user') || '{}');
        if (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        showToast(res.message || 'Invalid or expired OTP', 'error');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'OTP Login failed', 'error');
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
            Access your membership utilities, TRI Points ledger, and welfare portal
          </p>
        </div>

        {/* Demo Fast Login Shortcuts */}
        <div className="p-3.5 rounded-2xl bg-dark-bg/80 border border-brand-500/20 space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-400 block text-center">
            🚀 1-Click Fast Demo Login
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('rahul.sharma@example.com', 'User@123')}
              className="py-2 px-3 rounded-xl bg-brand-600/20 hover:bg-brand-600/30 border border-brand-500/30 text-brand-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Demo Member</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin@tridrishti.com', 'Admin@123')}
              className="py-2 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Super Admin</span>
            </button>
          </div>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex bg-dark-bg p-1 rounded-xl border border-dark-border">
          <button
            type="button"
            onClick={() => setAuthMode('OTP')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'OTP'
                ? 'bg-gradient-to-r from-brand-600 to-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Instant OTP Login</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('PASSWORD')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'PASSWORD'
                ? 'bg-gradient-to-r from-brand-600 to-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Password Sign In</span>
          </button>
        </div>

        {/* Form Sections */}
        {authMode === 'OTP' ? (
          <div className="space-y-4">
            {!otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Registered Email / Phone</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={otpTarget}
                      onChange={(e) => setOtpTarget(e.target.value)}
                      placeholder="e.g. rahul.sharma@example.com or phone"
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
                    <span>Sending Code...</span>
                  ) : (
                    <>
                      <span>Send 6-Digit OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtpLogin} className="space-y-4">
                <div className="p-3 bg-brand-500/10 border border-brand-500/20 rounded-xl text-center space-y-1">
                  <p className="text-xs text-slate-300">
                    Verification code sent to <span className="text-brand-300 font-bold">{otpTarget}</span>
                  </p>
                  {otpPreview && (
                    <div className="inline-block px-2.5 py-1 bg-brand-500/20 rounded-lg text-[11px] text-cyan-300 font-mono">
                      🚀 Dev Auto-Code: <strong>{otpPreview}</strong>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Enter 6-Digit Code</label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="123456"
                      className="w-full pl-10 pr-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-center tracking-[0.4em] font-mono text-base font-bold text-cyan-400 placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtpCode('');
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    Change Email/Phone
                  </button>

                  <button
                    type="button"
                    disabled={resendTimer > 0 || loading}
                    onClick={() => handleSendOTP()}
                    className={`font-semibold ${
                      resendTimer > 0 ? 'text-slate-500 cursor-not-allowed' : 'text-brand-400 hover:underline'
                    }`}
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading || otpCode.length < 6}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Verifying OTP...</span>
                  ) : (
                    <>
                      <span>Verify & Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
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
                  <span>Sign In with Password</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

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

