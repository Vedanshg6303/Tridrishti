import React, { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import {
  ShieldAlert,
  Zap,
  Sliders,
  Users,
  Sparkles,
  CreditCard,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Package,
  Shield,
  LifeBuoy,
  UserPlus,
  Play,
  Save,
} from 'lucide-react';
import { formatCurrency, formatPoints, formatDate, formatDateTime } from '../../utils/formatters';
import api from '../../utils/api';

export const OwnerMasterControlPage: React.FC = () => {
  const { showToast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userSearch, setUserSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'rules' | 'claims' | 'redemptions' | 'inquiries'>('users');

  const [simName, setSimName] = useState('');
  const [simSponsorId, setSimSponsorId] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchMasterState = async () => {
    try {
      setLoading(true);
      const res = await api.get('/owner/master-state');
      if (res.data.success) {
        setData(res.data);
        if (res.data.users?.length > 0 && !selectedUser) {
          setSelectedUser(res.data.users[1] || res.data.users[0]);
        }
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to load master state', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterState();
  }, []);

  const handleQuickAction = async (action: string, targetUserId: string, payload: any = {}) => {
    setActionLoading(true);
    try {
      const res = await api.post('/owner/quick-action', {
        action,
        targetUserId,
        payload,
      });
      if (res.data.success) {
        showToast(res.data.message || 'Action executed successfully', 'success');
        await fetchMasterState();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Action failed', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSimulateReferral = async () => {
    if (!simSponsorId && !selectedUser?._id) {
      showToast('Select a sponsor user first', 'error');
      return;
    }
    const targetId = simSponsorId || selectedUser?._id;
    await handleQuickAction('SIMULATE_REFERRAL', targetId, { name: simName || undefined });
    setSimName('');
  };

  const filteredUsers = (data?.users || []).filter(
    (u: any) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.referralCode.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Master Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/80 via-dark-card to-dark-card border border-purple-500/40 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold uppercase flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Owner & Developer Master Control</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
            Tridrishti Mission Control
          </h1>
          <p className="text-xs text-slate-300">
            Control the entire platform from this single interface: ₹100 entry fees, 10 TRI coin referral rules, user points, levels, and triage.
          </p>
        </div>

        <button
          onClick={fetchMasterState}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 shrink-0 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync State</span>
        </button>
      </div>

      {/* Real-Time Financial & System HUD */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-semibold">
            <span>Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            {formatCurrency(data?.stats?.grossRevenue || 2000)}
          </div>
          <p className="text-[11px] text-emerald-400 font-medium">
            {data?.stats?.entryActivationsCount || 5} × ₹100 Entry Activations
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-semibold">
            <span>TRI Coins in Circulation</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-amber-400 font-mono">
            {formatPoints(data?.stats?.totalPointsCirculating || 52450)}
          </div>
          <p className="text-[11px] text-slate-400">
            Redeemed: {formatPoints(data?.stats?.totalRedeemedPoints || 1500)} coins
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-semibold">
            <span>Total Members</span>
            <Users className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            {data?.stats?.totalUsers || 5}
          </div>
          <p className="text-[11px] text-brand-400 font-medium">
            Active: {data?.stats?.activeMembers || 5} | KYC Pending: {data?.stats?.pendingKycCount || 1}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-dark-card border border-dark-border space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-semibold">
            <span>Action Queue</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            {(data?.stats?.pendingClaimsCount || 0) + (data?.stats?.pendingRedemptionsCount || 0) + (data?.stats?.unreadInquiriesCount || 0)}
          </div>
          <p className="text-[11px] text-amber-400 font-medium">
            Claims, Orders & Inquiries awaiting triage
          </p>
        </div>
      </div>

      {/* ⚡ 1-Click Referral Simulator Widget */}
      <div className="p-6 rounded-3xl bg-dark-card/90 border border-brand-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-brand-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              1-Click Referral Simulation Engine
            </h3>
          </div>
          <span className="text-xs text-brand-300 font-mono font-semibold">
            Rules: ₹100 Onboarding ➔ +10 TRI Coins to Sponsor
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-4">
            <input
              type="text"
              placeholder="New Member Name (e.g. Vikas Gupta)"
              value={simName}
              onChange={(e) => setSimName(e.target.value)}
              className="w-full px-3.5 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="sm:col-span-5">
            <select
              value={simSponsorId || selectedUser?._id || ''}
              onChange={(e) => setSimSponsorId(e.target.value)}
              className="w-full px-3.5 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white font-mono"
            >
              {(data?.users || []).map((u: any) => (
                <option key={u._id} value={u._id}>
                  Sponsor: {u.name} ({u.referralCode}) — Balance: {u.pointsBalance} coins
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <button
              onClick={handleSimulateReferral}
              disabled={actionLoading}
              className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Simulate ₹100 + 10 Coins</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-dark-border pb-3 overflow-x-auto">
        {[
          { key: 'users', label: 'User Master Control', count: data?.users?.length },
          { key: 'rules', label: 'Platform Rules Switchboard', count: data?.rules?.length },
          { key: 'claims', label: 'Welfare & Claims Triage', count: data?.claims?.length },
          { key: 'redemptions', label: 'Goodies Orders', count: data?.redemptions?.length },
          { key: 'inquiries', label: 'Contact Inquiries', count: data?.contactMessages?.length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
              activeTab === tab.key
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-dark-card text-slate-400 hover:text-white border border-dark-border'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="px-1.5 py-0.5 rounded-full bg-dark-bg/60 text-[10px] font-mono">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: USER MASTER CONTROL & QUICK ACTION INSPECTOR */}
      {activeTab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* User Directory Column */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user by name, email, or code..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-dark-card border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-2 max-h-[540px] overflow-y-auto pr-1">
              {filteredUsers.map((u: any) => {
                const isSelected = selectedUser?._id === u._id;
                return (
                  <div
                    key={u._id}
                    onClick={() => setSelectedUser(u)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-dark-card border-purple-500 ring-1 ring-purple-500/50 shadow-lg'
                        : 'bg-dark-card/60 border-dark-border hover:border-slate-600'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white text-xs">{u.name}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono font-bold text-[10px]">
                        {u.pointsBalance} coins
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-slate-400">
                      <span className="font-mono text-brand-400">{u.referralCode}</span>
                      <span className="text-[10px] text-purple-300 font-semibold">
                        Level {u.level} ({u.levelName})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* User Quick Action Station */}
          <div className="lg:col-span-7">
            {selectedUser ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-border pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/30 text-[10px] font-bold font-mono">
                        Level {selectedUser.level} ({selectedUser.levelName})
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      {selectedUser.email} • Code: {selectedUser.referralCode}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Coin Balance</span>
                    <span className="text-2xl font-mono font-bold text-amber-400">
                      {selectedUser.pointsBalance} coins
                    </span>
                  </div>
                </div>

                {/* 1-Click Point Adjustments */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">
                    ⚡ 1-Click Instant Coin Credit / Debit:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[+10, +50, +100, +500, -10, -50, -100].map((delta) => (
                      <button
                        key={delta}
                        onClick={() =>
                          handleQuickAction('ADJUST_POINTS', selectedUser._id, {
                            amount: delta,
                            reason: `Quick adjustment (${delta > 0 ? '+' : ''}${delta} coins) by Owner`,
                          })
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-colors ${
                          delta > 0
                            ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        {delta > 0 ? `+${delta}` : delta} Coins
                      </button>
                    ))}
                  </div>
                </div>

                {/* 1-Click Level Override */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">
                    🎖️ 1-Click Level Progression Override:
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { lvl: 1, name: 'L1 STARTER' },
                      { lvl: 2, name: 'L2 CONNECT' },
                      { lvl: 3, name: 'L3 GROW' },
                      { lvl: 4, name: 'L4 LEAD' },
                      { lvl: 5, name: 'L5 DIAMOND' },
                    ].map((l) => (
                      <button
                        key={l.lvl}
                        onClick={() =>
                          handleQuickAction('SET_LEVEL', selectedUser._id, { level: l.lvl })
                        }
                        className={`py-2 px-1 text-center rounded-xl text-[10px] font-bold border transition-all ${
                          selectedUser.level === l.lvl
                            ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                            : 'bg-dark-bg text-slate-400 hover:text-white border-dark-border'
                        }`}
                      >
                        {l.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Security & KYC Controls */}
                <div className="flex items-center gap-3 pt-3 border-t border-dark-border">
                  <button
                    onClick={() =>
                      handleQuickAction('SET_KYC', selectedUser._id, {
                        status: selectedUser.kycStatus === 'VERIFIED' ? 'PENDING' : 'VERIFIED',
                      })
                    }
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                      selectedUser.kycStatus === 'VERIFIED'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>KYC: {selectedUser.kycStatus || 'NOT_SUBMITTED'} (Toggle)</span>
                  </button>

                  <button
                    onClick={() => handleQuickAction('TOGGLE_SUSPEND', selectedUser._id)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                      selectedUser.isSuspended
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>{selectedUser.isSuspended ? 'Reactivate Account' : 'Freeze / Suspend'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-slate-500 rounded-3xl bg-dark-card border border-dark-border">
                Select a user on the left to inspect or modify attributes.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: RULES SWITCHBOARD */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-dark-card/50 border border-dark-border text-xs text-slate-300">
            Changes applied here take effect immediately across all client referral calculations and level evaluations without needing a server restart.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(data?.rules || []).map((rule: any) => (
              <div
                key={rule._id || rule.key}
                className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {rule.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{rule.key}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{rule.name}</h4>
                  <p className="text-xs text-slate-400">{rule.description}</p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-dark-border">
                  <input
                    type="number"
                    defaultValue={rule.value}
                    id={`input_${rule.key}`}
                    className="flex-1 px-3.5 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white font-mono font-bold"
                  />
                  <button
                    onClick={() => {
                      const inputEl = document.getElementById(`input_${rule.key}`) as HTMLInputElement;
                      if (inputEl) {
                        handleQuickAction('UPDATE_RULE', '', {
                          ruleKey: rule.key,
                          value: +inputEl.value,
                        });
                      }
                    }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-600/30 flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WELFARE & CLAIMS */}
      {activeTab === 'claims' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <h3 className="text-base font-bold text-white">Healthcare Passes & Education Grants Queue</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-dark-border text-slate-400 uppercase text-[10px] font-semibold">
                  <th className="pb-3">Claim ID</th>
                  <th className="pb-3">Benefit Title</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Claim Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/60">
                {(data?.claims || []).length > 0 ? (
                  data.claims.map((c: any) => (
                    <tr key={c._id}>
                      <td className="py-3 font-mono text-purple-400 font-bold">{c.claimId}</td>
                      <td className="py-3 text-white font-medium">{c.benefitTitle}</td>
                      <td className="py-3 text-slate-300">{c.category}</td>
                      <td className="py-3 font-mono text-amber-400 font-bold">
                        {c.claimAmount ? formatCurrency(c.claimAmount) : 'N/A'}
                      </td>
                      <td className="py-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No claims in queue.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: GOODIES ORDERS */}
      {activeTab === 'redemptions' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <h3 className="text-base font-bold text-white">Merchandise Redemptions & Fulfillment</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-dark-border text-slate-400 uppercase text-[10px] font-semibold">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Points</th>
                  <th className="pb-3">Shipping To</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/60">
                {(data?.redemptions || []).length > 0 ? (
                  data.redemptions.map((r: any) => (
                    <tr key={r._id}>
                      <td className="py-3 font-mono text-purple-400 font-bold">{r.redemptionId}</td>
                      <td className="py-3 text-white font-medium">{r.productSnapshot?.title}</td>
                      <td className="py-3 font-mono text-amber-400 font-bold">{r.pointsSpent} coins</td>
                      <td className="py-3 text-slate-300">
                        {r.shippingAddress?.fullName} ({r.shippingAddress?.city})
                      </td>
                      <td className="py-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No orders in queue.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: PUBLIC CONTACT INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <h3 className="text-base font-bold text-white">Public Inquiries & Helpdesk Messages</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-dark-border text-slate-400 uppercase text-[10px] font-semibold">
                  <th className="pb-3">Sender</th>
                  <th className="pb-3">Subject</th>
                  <th className="pb-3">Message</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/60">
                {(data?.contactMessages || []).map((m: any) => (
                  <tr key={m._id}>
                    <td className="py-3">
                      <div className="font-bold text-white">{m.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{m.email}</div>
                    </td>
                    <td className="py-3 text-slate-200 font-medium">{m.subject}</td>
                    <td className="py-3 text-slate-300 max-w-xs truncate">{m.message}</td>
                    <td className="py-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          m.status === 'REPLIED'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {m.status || 'UNREAD'}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400">{formatDate(m.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
