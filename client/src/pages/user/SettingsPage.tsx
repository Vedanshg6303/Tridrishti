import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Settings, Bell, Lock, ShieldCheck, Key } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pointAlerts, setPointAlerts] = useState(true);
  const [networkAlerts, setNetworkAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handleSavePreferences = () => {
    showToast('Preferences updated successfully!', 'success');
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">Account & Security Settings</h2>
        <p className="text-xs text-slate-400">Configure notification alerts, two-factor authentication, and security preferences</p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 text-xs flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-400" />
          <span>Notification Preferences</span>
        </h3>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between py-2 border-b border-dark-border">
            <div>
              <span className="font-semibold text-white block">Email Notifications</span>
              <span className="text-slate-400 text-[11px]">Receive transaction receipts and order confirmations</span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="rounded border-dark-border bg-dark-bg text-brand-600 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-dark-border">
            <div>
              <span className="font-semibold text-white block">TRI Points Activity Alerts</span>
              <span className="text-slate-400 text-[11px]">Instant in-app alerts when points are credited or used</span>
            </div>
            <input
              type="checkbox"
              checked={pointAlerts}
              onChange={(e) => setPointAlerts(e.target.checked)}
              className="rounded border-dark-border bg-dark-bg text-brand-600 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-dark-border">
            <div>
              <span className="font-semibold text-white block">Community Referral Alerts</span>
              <span className="text-slate-400 text-[11px]">Notifications when a new member registers with your referral code</span>
            </div>
            <input
              type="checkbox"
              checked={networkAlerts}
              onChange={(e) => setNetworkAlerts(e.target.checked)}
              className="rounded border-dark-border bg-dark-bg text-brand-600 focus:ring-brand-500"
            />
          </div>
        </div>

        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400 text-xs flex items-center gap-2 pt-4">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>Security & Authentication</span>
        </h3>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between py-2 border-b border-dark-border">
            <div>
              <span className="font-semibold text-white block">Two-Factor Authentication (2FA)</span>
              <span className="text-slate-400 text-[11px]">Require OTP verification during sensitive login sessions</span>
            </div>
            <input
              type="checkbox"
              checked={twoFactorAuth}
              onChange={(e) => {
                setTwoFactorAuth(e.target.checked);
                showToast(`2FA ${e.target.checked ? 'Enabled' : 'Disabled'}`, 'info');
              }}
              className="rounded border-dark-border bg-dark-bg text-brand-600 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={handleSavePreferences}
            className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-all shadow-md shadow-brand-600/25"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
