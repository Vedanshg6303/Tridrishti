import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, ShieldCheck, Mail, Phone, MapPin, Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../utils/api';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();

  if (!user) return null;

  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [addressLine1, setAddressLine1] = useState(user.address?.line1 || '');
  const [city, setCity] = useState(user.address?.city || '');
  const [state, setState] = useState(user.address?.state || '');
  const [pincode, setPincode] = useState(user.address?.pincode || '');
  const [saving, setSaving] = useState(false);

  // KYC modal state
  const [showKycModal, setShowKycModal] = useState(false);
  const [panNumber, setPanNumber] = useState(user.kycDocuments?.panNumber || '');
  const [aadhaarLast4, setAadhaarLast4] = useState(user.kycDocuments?.aadhaarLast4 || '');
  const [submittingKyc, setSubmittingKyc] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/auth/profile', {
        name,
        phone,
        address: { line1: addressLine1, city, state, pincode, country: 'India' },
      });
      if (res.data.success) {
        updateUser(res.data.user);
        showToast('Profile information saved successfully!', 'success');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!panNumber || !aadhaarLast4) {
      showToast('Please enter both PAN and Aadhaar last 4 digits', 'error');
      return;
    }

    setSubmittingKyc(true);
    try {
      const res = await api.post('/auth/kyc', {
        panNumber,
        aadhaarLast4,
        documentUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
      });
      if (res.data.success) {
        updateUser({ kycStatus: res.data.kycStatus });
        setShowKycModal(false);
        showToast('KYC documents submitted for compliance review!', 'success');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'KYC submission failed', 'error');
    } finally {
      setSubmittingKyc(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">My Profile & Compliance</h2>
          <p className="text-xs text-slate-400">Manage your identity, shipping address, and KYC documents</p>
        </div>
        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
            user.kycStatus === 'VERIFIED'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>KYC Status: {user.kycStatus || 'NOT_SUBMITTED'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-6 text-center">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-3xl mx-auto shadow-xl shadow-brand-500/20">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">{user.name}</h3>
            <p className="text-xs text-slate-400 font-mono">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 font-mono text-[11px] font-bold">
              {user.referralCode}
            </span>
          </div>

          <div className="pt-4 border-t border-dark-border space-y-2 text-left text-xs">
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Platform Role</span>
              <span className="font-semibold text-slate-200">{user.role}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Membership Tier</span>
              <span className="font-semibold text-amber-400">Level {user.level} ({user.levelName})</span>
            </div>
          </div>

          {user.kycStatus !== 'VERIFIED' && (
            <button
              onClick={() => setShowKycModal(true)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Submit KYC Verification</span>
            </button>
          )}
        </div>

        {/* Profile Edit Form */}
        <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border">
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <h4 className="text-sm font-bold text-white border-b border-dark-border pb-3 uppercase tracking-wider text-slate-400 text-xs">
              Personal Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-3.5 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <h4 className="text-sm font-bold text-white border-b border-dark-border pb-3 pt-3 uppercase tracking-wider text-slate-400 text-xs">
              Shipping & Communication Address
            </h4>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Address Line 1</label>
              <input
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder="House / Flat / Street"
                className="w-full px-3.5 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Noida"
                  className="w-full px-3.5 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Uttar Pradesh"
                  className="w-full px-3.5 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="201309"
                  className="w-full px-3.5 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-md shadow-brand-600/25"
              >
                {saving ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* KYC Modal */}
      {showKycModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-dark-border pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">KYC Document Submission</h3>
              </div>
              <button onClick={() => setShowKycModal(false)} className="text-slate-400 hover:text-white text-xs">
                Cancel
              </button>
            </div>

            <form onSubmit={handleKycSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">PAN Number (Permanent Account Number)</label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  placeholder="ABCDE1234F"
                  className="w-full px-3.5 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white font-mono uppercase focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Aadhaar Last 4 Digits</label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={aadhaarLast4}
                  onChange={(e) => setAadhaarLast4(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="8892"
                  className="w-full px-3.5 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white font-mono focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-[11px] text-slate-300">
                Your documents are securely encrypted and verified solely for platform compliance, anti-fraud prevention, and benefit processing.
              </div>

              <button
                type="submit"
                disabled={submittingKyc}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all"
              >
                {submittingKyc ? 'Submitting...' : 'Submit for Compliance Verification'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
