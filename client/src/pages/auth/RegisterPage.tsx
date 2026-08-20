import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, Mail, Lock, Phone, Gift, ArrowRight, ShieldCheck, KeyRound, CheckCircle2, Sparkles } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { refCode } = useParams<{ refCode?: string }>();
  const [searchParams] = useSearchParams();
  const urlRef = refCode || searchParams.get('ref') || '';

  // Form State
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState(urlRef);
  const [agreedTerms, setAgreedTerms] = useState(false);

  // OTP State
  const [otpCode, setOtpCode] = useState('');
  const [otpPreview, setOtpPreview] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  const { sendOTP, registerWithOTP } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (urlRef) {
      setReferralCode(urlRef);
    }
  }, [urlRef]);

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

  const handleStep1Submit = async (e: React.FormEvent) => {
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
      const res = await sendOTP(email, 'SIGNUP');
      if (res.success) {
        setStep(2);
        setResendTimer(60);
        if (res.devOtpPreview) {
          setOtpPreview(res.devOtpPreview);
          setOtpCode(res.devOtpPreview);
        }
        showToast(`Verification code sent to ${email}`, 'success');
      } else {
        showToast(res.message || 'Failed to send verification code', 'error');
      }
    } catch (err: any) {
      showToast('Error sending OTP. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0 || loading) return;
    setLoading(true);
    try {
      const res = await sendOTP(email, 'SIGNUP');
      if (res.success) {
        setResendTimer(60);
        if (res.devOtpPreview) {
          setOtpPreview(res.devOtpPreview);
          setOtpCode(res.devOtpPreview);
        }
        showToast(`New verification code sent to ${email}`, 'success');
      } else {
        showToast(res.message || 'Failed to resend OTP', 'error');
      }
    } catch (err: any) {
      showToast('Error resending OTP', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStep2VerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      showToast('Please enter the 6-digit verification code', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await registerWithOTP(name, email, password, phone, referralCode, otpCode);
      if (res.success) {
        showToast('🎉 Account created successfully! 10 Welcome TRI Coins credited.', 'success');
        navigate('/dashboard');
      } else {
        showToast(res.message || 'Registration verification failed', 'error');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Verification failed', 'error');
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
          <h2 className="text-2xl font-display font-extrabold text-white">
            {step === 1 ? 'Join the Community' : 'Verify Your Account'}
          </h2>
          <p className="text-xs text-slate-400">
            {step === 1
              ? 'Create your account to unlock rewards, community benefits, and healthcare assistance'
              : 'Enter the 6-digit OTP sent to your email to activate 10 TRI Coins bonus'}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2">
          <div className={`h-1.5 rounded-full transition-all ${step === 1 ? 'w-10 bg-brand-500' : 'w-4 bg-slate-700'}`} />
          <div className={`h-1.5 rounded-full transition-all ${step === 2 ? 'w-10 bg-brand-500' : 'w-4 bg-slate-700'}`} />
        </div>

        {step === 1 ? (
          /* STEP 1: Registration Form */
          <form onSubmit={handleStep1Submit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name *</label>
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
              <label className="text-xs font-semibold text-slate-300">Email Address *</label>
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
              <label className="text-xs font-semibold text-slate-300">Password *</label>
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
                  placeholder="e.g. TRI-RAHUL-10X"
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
                and understand that TRI Points are promotional community utility rewards.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span>Generating OTP...</span>
              ) : (
                <>
                  <span>Continue & Verify OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* STEP 2: OTP Verification Form */
          <form onSubmit={handleStep2VerifyAndRegister} className="space-y-4">
            <div className="p-3.5 bg-brand-500/10 border border-brand-500/20 rounded-2xl text-center space-y-1.5">
              <p className="text-xs text-slate-300">
                Verification code sent to <span className="text-cyan-400 font-bold">{email}</span>
              </p>
              {otpPreview && (
                <div className="inline-block px-3 py-1 bg-brand-500/20 rounded-lg text-xs text-cyan-300 font-mono">
                  🚀 Dev Auto-Code: <strong>{otpPreview}</strong>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block text-center">
                Enter 6-Digit Verification Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full py-3 bg-dark-bg border border-dark-border rounded-xl text-center tracking-[0.5em] font-mono text-xl font-bold text-cyan-400 placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-400 hover:text-white"
              >
                ← Edit Information
              </button>

              <button
                type="button"
                disabled={resendTimer > 0 || loading}
                onClick={handleResendOTP}
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
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Activating Account...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Verify OTP & Claim 10 TRI Coins</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-400">
          Already a member?{' '}
          <Link to="/login" className="text-brand-400 font-semibold hover:underline">
            Sign In here
          </Link>
        </div>

        <div className="pt-2 border-t border-dark-border text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Instant OTP Security & Anti-Fraud Verification Active</span>
        </div>
      </div>
    </div>
  );
};

