import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  Share2,
  Copy,
  Users,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MessageSquare,
  Send,
  Facebook,
  Twitter,
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import api from '../../utils/api';

export const ReferralsPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  if (!user) return null;

  const referralUrl = typeof window !== 'undefined' ? `${window.location.origin}/join/${user.referralCode}` : `https://tridrishti.com/join/${user.referralCode}`;

  useEffect(() => {
    const fetchReferralAnalytics = async () => {
      try {
        const res = await api.get('/network/referrals');
        if (res.data.success) {
          setAnalytics(res.data.analytics);
        }
      } catch (err) {
        console.error('Failed to load referral analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReferralAnalytics();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    showToast('Referral link copied to clipboard!', 'success');
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Join me on TRIDRISHTI — a community, rewards and benefits platform. Use my referral code ${user.referralCode} to unlock perks: ${referralUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const shareOnTelegram = () => {
    const text = encodeURIComponent(
      `Join me on TRIDRISHTI — a community, rewards and benefits platform. Referral code: ${user.referralCode}`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${text}`, '_blank');
  };

  const shareOnX = () => {
    const text = encodeURIComponent(
      `Excited to build with the @Tridrishti community ecosystem! Connect, earn TRI points and unlock healthcare & education benefits: ${referralUrl}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">Referral Tools & Attribution</h2>
        <p className="text-xs text-slate-400">
          Invite members to the Tridrishti ecosystem, track conversions, and monitor network compliance
        </p>
      </div>

      {/* Referral Code, QR & Quick Share Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-950/70 via-dark-card to-dark-card border border-brand-500/30 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Info */}
          <div className="md:col-span-7 space-y-3">
            <span className="text-xs font-mono uppercase font-bold text-brand-300">Your Unique Referral Code</span>
            <div className="flex items-center gap-3">
              <div className="px-5 py-2.5 rounded-2xl bg-dark-bg border border-brand-500/40 text-xl font-mono font-extrabold text-white tracking-wider">
                {user.referralCode}
              </div>
              <button
                onClick={handleCopy}
                className="p-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30 transition-all flex items-center gap-1.5 text-xs font-bold"
                title="Copy Link"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </button>
            </div>
            <p className="text-xs text-slate-400 pt-1">
              Direct Referral Link: <span className="font-mono text-cyan-300 select-all">{referralUrl}</span>
            </p>

            {/* Social Share Buttons */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-300 block">Instant 1-Click Share to Friends:</span>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={shareOnWhatsApp}
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Share on WhatsApp</span>
                </button>
                <button
                  onClick={shareOnTelegram}
                  className="py-2.5 px-4 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Telegram</span>
                </button>
                <button
                  onClick={shareOnX}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  <span>X (Twitter)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right QR Code Generator */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-dark-bg/80 border border-dark-border rounded-2xl text-center space-y-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Scan with Phone Camera</span>
            <div className="p-2 bg-white rounded-xl shadow-lg">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(referralUrl)}`}
                alt="Referral QR Code"
                className="w-32 h-32 object-contain"
              />
            </div>
            <p className="text-[10px] text-slate-400">Scan to open registration with code pre-filled</p>
          </div>
        </div>
      </div>

      {/* Analytics Counter Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-1">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Referrals</span>
          <div className="text-2xl font-display font-bold text-white">
            {analytics?.totalReferrals || 0}
          </div>
          <p className="text-[10px] text-slate-400">Directly onboarded</p>
        </div>

        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-1">
          <span className="text-xs text-slate-400 font-semibold uppercase">Active Members</span>
          <div className="text-2xl font-display font-bold text-emerald-400">
            {analytics?.activeReferrals || 0}
          </div>
          <p className="text-[10px] text-slate-400">Good standing</p>
        </div>

        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-1">
          <span className="text-xs text-slate-400 font-semibold uppercase">Verified KYC</span>
          <div className="text-2xl font-display font-bold text-brand-400">
            {analytics?.verifiedKyc || 0}
          </div>
          <p className="text-[10px] text-slate-400">Compliance cleared</p>
        </div>

        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-1">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Team Reach</span>
          <div className="text-2xl font-display font-bold text-purple-400">
            {analytics?.teamSize || 0}
          </div>
          <p className="text-[10px] text-slate-400">Cumulative downlines</p>
        </div>
      </div>

      {/* Direct Referrals Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <h3 className="text-lg font-bold text-white">Direct Referral Directory</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-dark-border text-slate-400 uppercase text-[10px] font-semibold">
                <th className="pb-3">Member Name</th>
                <th className="pb-3">Tier / Level</th>
                <th className="pb-3">KYC Status</th>
                <th className="pb-3">Points Earned</th>
                <th className="pb-3">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {analytics?.directReferrals && analytics.directReferrals.length > 0 ? (
                analytics.directReferrals.map((refUser: any) => (
                  <tr key={refUser._id} className="hover:bg-dark-bg/50 transition-colors">
                    <td className="py-3.5">
                      <div className="font-semibold text-white">{refUser.name}</div>
                      <div className="text-[11px] text-slate-400">{refUser.email}</div>
                    </td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-[10px] font-bold">
                        Level {refUser.level} ({refUser.levelName})
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          refUser.kycStatus === 'VERIFIED'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {refUser.kycStatus}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono text-amber-400 font-bold">{refUser.pointsBalance} pts</td>
                    <td className="py-3.5 text-slate-400">{formatDate(refUser.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No direct referrals onboarded yet. Share your referral link above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
