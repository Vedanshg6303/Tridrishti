import React, { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import {
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
  Play,
  Database,
  Download,
  Trash2,
  Plus,
  Edit,
  FileJson,
  Layers,
  Network,
  Lock,
  Activity,
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
  const [activeTab, setActiveTab] = useState<'database' | 'users' | 'network' | 'rules' | 'claims' | 'redemptions' | 'inquiries'>('database');

  // Database Studio State
  const [selectedCollection, setSelectedCollection] = useState<string>('users');
  const [dbSearch, setDbSearch] = useState('');
  const [rawEditorDoc, setRawEditorDoc] = useState<any>(null);
  const [isCreatingDoc, setIsCreatingDoc] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  // Quick Action State
  const [adjustAmount, setAdjustAmount] = useState('50');
  const [adjustReason, setAdjustReason] = useState('Special Community Reward');
  const [simName, setSimName] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchMasterState = async () => {
    try {
      setLoading(true);
      const res = await api.get('/owner/master-state');
      if (res.data.success) {
        setData(res.data);
        if (res.data.users?.length > 0 && !selectedUser) {
          setSelectedUser(res.data.users[0]);
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
    const targetId = selectedUser?._id || data?.users[0]?._id;
    await handleQuickAction('SIMULATE_REFERRAL', targetId, { name: simName || undefined });
    setSimName('');
  };

  const handleResetToZero = async () => {
    if (!window.confirm('⚠️ Are you sure you want to reset all platform data to zero? All non-admin members, claims, and orders will be cleared.')) {
      return;
    }
    await handleQuickAction('RESET_DATA_TO_ZERO', 'all');
  };

  const handleExportDatabase = () => {
    if (!data) return;
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tridrishti_database_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('📦 Database JSON snapshot downloaded successfully!', 'success');
  };

  // Database Studio CRUD Handlers
  const handleSaveDoc = async () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setActionLoading(true);
      const res = await api.post('/owner/database-studio', {
        collection: selectedCollection,
        operation: isCreatingDoc ? 'INSERT' : 'UPDATE',
        doc: parsed,
      });
      if (res.data.success) {
        showToast(res.data.message || 'Database document saved!', 'success');
        setRawEditorDoc(null);
        setIsCreatingDoc(false);
        await fetchMasterState();
      }
    } catch (err: any) {
      showToast(err.message || 'Invalid JSON format or database error', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteDoc = async (docId: string) => {
    if (!window.confirm(`Delete document ${docId} from ${selectedCollection}?`)) return;
    setActionLoading(true);
    try {
      const res = await api.post('/owner/database-studio', {
        collection: selectedCollection,
        operation: 'DELETE',
        filter: { _id: docId },
      });
      if (res.data.success) {
        showToast(res.data.message || 'Document deleted', 'success');
        await fetchMasterState();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to delete document', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const openDocEditor = (doc: any) => {
    setRawEditorDoc(doc);
    setIsCreatingDoc(false);
    setJsonInput(JSON.stringify(doc, null, 2));
  };

  const openCreateDoc = () => {
    setRawEditorDoc({});
    setIsCreatingDoc(true);
    setJsonInput(JSON.stringify({ _id: `${selectedCollection}_${Date.now()}` }, null, 2));
  };

  // Get current active collection list for Database Studio
  const getActiveCollectionData = () => {
    if (!data) return [];
    const mapping: Record<string, any[]> = {
      users: data.users || [],
      rules: data.rules || [],
      plans: data.plans || [],
      products: data.products || [],
      benefits: data.benefits || [],
      claims: data.claims || [],
      redemptions: data.redemptions || [],
      ledger: data.ledger || [],
      contactMessages: data.contactMessages || [],
      auditLogs: data.auditLogs || [],
    };
    const list = mapping[selectedCollection] || [];
    if (!dbSearch) return list;
    return list.filter((item: any) => JSON.stringify(item).toLowerCase().includes(dbSearch.toLowerCase()));
  };

  const filteredUsers = (data?.users || []).filter(
    (u: any) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.referralCode.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Master Mission Control Top Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/80 via-[#0a1020] to-[#0a1020] border border-purple-500/40 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold uppercase flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Developer & Owner Live Studio</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
            Tridrishti Master Command Center
          </h1>
          <p className="text-xs text-slate-300 max-w-3xl">
            Live database management, raw collection query inspector, member downline trees, financial ledger auditing, and 1-click system interventions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportDatabase}
            className="px-3.5 py-2.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Download full JSON database snapshot"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handleResetToZero}
            className="px-3.5 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Clear all active users and reset to clean state"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset to Zero</span>
          </button>

          <button
            onClick={fetchMasterState}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh State</span>
          </button>
        </div>
      </div>

      {/* Real Financials & Platform Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-dark-card/90 border border-dark-border space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-display font-black text-white">
            {formatCurrency(data?.stats?.grossRevenue || 0)}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            {data?.stats?.entryActivationsCount || 0} Paid Onboardings (₹100/each)
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-card/90 border border-dark-border space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Points in Circulation</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-display font-black text-amber-400">
            {formatPoints(data?.stats?.totalPointsCirculating || 0)}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Earned: {data?.stats?.totalLifetimeEarned || 0} | Used: {data?.stats?.totalRedeemedPoints || 0}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-card/90 border border-dark-border space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Registered Members</span>
            <Users className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-display font-black text-white">
            {data?.stats?.totalUsers || 0}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Active: {data?.stats?.activeMembers || 0} | KYC Pending: {data?.stats?.pendingKycCount || 0}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-card/90 border border-dark-border space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Pending Triage Tasks</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-display font-black text-purple-400">
            {(data?.stats?.pendingClaimsCount || 0) + (data?.stats?.pendingRedemptionsCount || 0)}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Claims: {data?.stats?.pendingClaimsCount || 0} | Orders: {data?.stats?.pendingRedemptionsCount || 0}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-dark-border pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'database'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'bg-dark-card text-slate-400 hover:text-white border border-dark-border'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>🗄️ Database Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'users'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-dark-card text-slate-400 hover:text-white border border-dark-border'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Member Manager</span>
        </button>

        <button
          onClick={() => setActiveTab('network')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'network'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-dark-card text-slate-400 hover:text-white border border-dark-border'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Community Trees</span>
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'rules'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-dark-card text-slate-400 hover:text-white border border-dark-border'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Rules Engine</span>
        </button>
      </div>

      {/* TAB 1: LIVE DATABASE STUDIO */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-dark-card/90 border border-dark-border space-y-6">
            {/* Database Studio Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-cyan-400" />
                  <span>Real-Time Collection Studio</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Inspect, query, edit, and insert raw JSON documents directly into any of the platform's collections.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={openCreateDoc}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Insert Document</span>
                </button>
              </div>
            </div>

            {/* Collection Selector Tabs */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-dark-border">
              {[
                { id: 'users', label: 'users' },
                { id: 'rules', label: 'rules' },
                { id: 'plans', label: 'plans' },
                { id: 'products', label: 'products' },
                { id: 'benefits', label: 'benefits' },
                { id: 'claims', label: 'claims' },
                { id: 'redemptions', label: 'redemptions' },
                { id: 'ledger', label: 'ledger' },
                { id: 'contactMessages', label: 'inquiries' },
                { id: 'auditLogs', label: 'auditLogs' },
              ].map((col) => (
                <button
                  key={col.id}
                  onClick={() => setSelectedCollection(col.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                    selectedCollection === col.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'bg-dark-bg text-slate-400 hover:text-white border border-dark-border'
                  }`}
                >
                  db.{col.label} ({data?.[col.id]?.length || 0})
                </button>
              ))}
            </div>

            {/* Search filter in collection */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={dbSearch}
                onChange={(e) => setDbSearch(e.target.value)}
                placeholder={`Filter documents in db.${selectedCollection}...`}
                className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Raw Documents Table */}
            <div className="border border-dark-border rounded-2xl overflow-hidden">
              <div className="max-h-[500px] overflow-y-auto divide-y divide-dark-border font-mono text-xs">
                {getActiveCollectionData().length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    No documents found in <code className="text-cyan-400">db.{selectedCollection}</code>
                  </div>
                ) : (
                  getActiveCollectionData().map((item: any, idx: number) => (
                    <div key={item._id || idx} className="p-4 hover:bg-white/[0.02] flex items-start justify-between gap-4 transition-colors">
                      <div className="space-y-1 overflow-x-auto flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-dark-bg border border-dark-border text-cyan-400 font-bold">
                            _id: {item._id}
                          </span>
                          {item.email && <span className="text-slate-300 font-bold">{item.email}</span>}
                          {item.name && <span className="text-slate-400">({item.name})</span>}
                          {item.title && <span className="text-slate-300 font-bold">{item.title}</span>}
                          {item.key && <span className="text-amber-400 font-bold">{item.key}: {String(item.value)}</span>}
                        </div>
                        <pre className="text-[11px] text-slate-400 whitespace-pre-wrap max-h-28 overflow-y-auto bg-dark-bg/60 p-2 rounded-lg border border-dark-border/40">
                          {JSON.stringify(item, null, 2)}
                        </pre>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 pt-1">
                        <button
                          onClick={() => openDocEditor(item)}
                          className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                          title="Edit Document"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDoc(item._id)}
                          className="p-1.5 rounded-lg bg-dark-bg border border-dark-border text-slate-300 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
                          title="Delete Document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* JSON Document Editor / Modal */}
          {rawEditorDoc && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="max-w-2xl w-full bg-[#080d1a] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                    <FileJson className="w-4 h-4 text-cyan-400" />
                    <span>{isCreatingDoc ? `Insert into db.${selectedCollection}` : `Edit db.${selectedCollection}.${rawEditorDoc._id}`}</span>
                  </h3>
                  <button
                    onClick={() => setRawEditorDoc(null)}
                    className="text-slate-400 hover:text-white text-xs font-mono"
                  >
                    ✕ Close
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">JSON Payload</label>
                  <textarea
                    rows={14}
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    className="w-full p-3 bg-dark-bg border border-dark-border rounded-xl text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setRawEditorDoc(null)}
                    className="px-4 py-2 rounded-xl bg-dark-bg border border-dark-border text-xs font-bold text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDoc}
                    disabled={actionLoading}
                    className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/30"
                  >
                    <Save className="w-4 h-4" />
                    <span>{actionLoading ? 'Saving...' : 'Save to Database'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MEMBER MANAGER & FAST INTERVENTIONS */}
      {activeTab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* User Selector List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search name, email, or referral code..."
                className="w-full pl-10 pr-4 py-2.5 bg-dark-card border border-dark-border rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredUsers.map((u: any) => {
                const isSelected = selectedUser?._id === u._id;
                return (
                  <button
                    key={u._id}
                    onClick={() => setSelectedUser(u)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                        : 'bg-dark-card border-dark-border text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs">{u.name}</span>
                        {u.role === 'SUPER_ADMIN' && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                            SUPER ADMIN
                          </span>
                        )}
                        {u.isSuspended && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                            SUSPENDED
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                      <div className="text-[10px] text-slate-500 font-mono">Code: {u.referralCode}</div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="text-xs font-bold text-amber-400">{formatPoints(u.pointsBalance || 0)}</div>
                      <div className="text-[10px] text-slate-400">Level {u.level || 1}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Control & Quick Actions Workspace */}
          {selectedUser ? (
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-6">
                <div className="flex items-center justify-between border-b border-dark-border pb-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-white">{selectedUser.name}</h2>
                    <div className="text-xs text-slate-400 flex items-center gap-3">
                      <span>{selectedUser.email}</span>
                      <span>•</span>
                      <span className="font-mono text-purple-400">{selectedUser.referralCode}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuickAction('TOGGLE_SUSPEND', selectedUser._id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                        selectedUser.isSuspended
                          ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30'
                          : 'bg-rose-600/20 text-rose-400 border border-rose-500/30 hover:bg-rose-600/30'
                      }`}
                    >
                      {selectedUser.isSuspended ? 'Reactivate Account' : 'Freeze / Suspend'}
                    </button>
                  </div>
                </div>

                {/* Point Balance Modifier */}
                <div className="space-y-3 p-4 rounded-2xl bg-dark-bg border border-dark-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Adjust TRI Coins Balance</span>
                    </span>
                    <span className="text-xs font-bold text-amber-400 font-mono">
                      Current: {formatPoints(selectedUser.pointsBalance || 0)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="number"
                      value={adjustAmount}
                      onChange={(e) => setAdjustAmount(e.target.value)}
                      placeholder="Amount (+ / -)"
                      className="px-3 py-2 bg-dark-card border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-purple-500"
                    />
                    <input
                      type="text"
                      value={adjustReason}
                      onChange={(e) => setAdjustReason(e.target.value)}
                      placeholder="Reason for adjustment"
                      className="px-3 py-2 bg-dark-card border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleQuickAction('ADJUST_POINTS', selectedUser._id, {
                            amount: +adjustAmount,
                            reason: adjustReason,
                          })
                        }
                        className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                      >
                        + Credit
                      </button>
                      <button
                        onClick={() =>
                          handleQuickAction('ADJUST_POINTS', selectedUser._id, {
                            amount: -Math.abs(+adjustAmount),
                            reason: adjustReason,
                          })
                        }
                        className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                      >
                        - Debit
                      </button>
                    </div>
                  </div>
                </div>

                {/* Level Modifier */}
                <div className="space-y-2 p-4 rounded-2xl bg-dark-bg border border-dark-border">
                  <span className="text-xs font-semibold text-slate-300">Set Career Tier Level:</span>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => handleQuickAction('SET_LEVEL', selectedUser._id, { level: lvl })}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedUser.level === lvl
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                            : 'bg-dark-card border border-dark-border text-slate-400 hover:text-white'
                        }`}
                      >
                        Level {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* KYC Verification Toggle */}
                <div className="space-y-2 p-4 rounded-2xl bg-dark-bg border border-dark-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">KYC Compliance Status:</span>
                    <span className="text-xs font-mono text-purple-400 font-bold">{selectedUser.kycStatus}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['VERIFIED', 'PENDING', 'REJECTED'].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleQuickAction('SET_KYC', selectedUser._id, { status: st })}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedUser.kycStatus === st
                            ? 'bg-cyan-600 text-white'
                            : 'bg-dark-card border border-dark-border text-slate-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulator Sandbox */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 to-dark-bg border border-purple-500/30 space-y-3">
                  <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5" />
                    <span>🧪 1-Click Referral Event Simulator</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Simulates a new user paying the ₹100 entry fee under <strong>{selectedUser.name}</strong>, crediting 10 Welcome TRI Coins to new user and 10 Referral Coins to sponsor.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={simName}
                      onChange={(e) => setSimName(e.target.value)}
                      placeholder="Simulated Member Name (e.g. Vikas)"
                      className="flex-1 px-3 py-2 bg-dark-card border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={handleSimulateReferral}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 shrink-0"
                    >
                      Run Simulator
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-7 flex items-center justify-center p-12 bg-dark-card rounded-3xl border border-dark-border text-slate-500 text-xs">
              Select a member from the left to inspect and control
            </div>
          )}
        </div>
      )}

      {/* TAB 3: COMMUNITY NETWORK TREE */}
      {activeTab === 'network' && (
        <div className="p-6 rounded-3xl bg-dark-card/90 border border-dark-border space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Network className="w-5 h-5 text-purple-400" />
              <span>Community Downline Tree Architecture</span>
            </h3>
            <p className="text-xs text-slate-400">
              Visual overview of member sponsor connections and direct referrals across the platform.
            </p>
          </div>

          <div className="space-y-3">
            {data?.users?.map((u: any) => {
              const directs = (data?.users || []).filter((child: any) => child.referredBy === u.referralCode);
              return (
                <div key={u._id} className="p-4 rounded-2xl bg-dark-bg border border-dark-border space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-xs">
                        L{u.level || 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{u.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">Code: {u.referralCode} | Sponsor: {u.referredBy || 'PLATFORM_ROOT'}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-cyan-400">{directs.length} Direct Members</span>
                    </div>
                  </div>

                  {directs.length > 0 && (
                    <div className="pl-6 border-l-2 border-purple-500/30 space-y-1.5 pt-1">
                      {directs.map((child: any) => (
                        <div key={child._id} className="text-xs text-slate-300 flex items-center justify-between p-2 rounded-xl bg-dark-card/60">
                          <span>↳ {child.name} ({child.email})</span>
                          <span className="text-amber-400 font-mono font-bold">{formatPoints(child.pointsBalance || 0)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: DYNAMIC RULES ENGINE */}
      {activeTab === 'rules' && (
        <div className="p-6 rounded-3xl bg-dark-card/90 border border-dark-border space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>Dynamic Platform Rules & Thresholds</span>
            </h3>
            <p className="text-xs text-slate-400">
              Configure onboarding fees, referral coin disbursements, and career level thresholds with instant live sync.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(data?.rules || []).map((r: any) => (
              <div key={r._id} className="p-4 rounded-2xl bg-dark-bg border border-dark-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{r.name}</span>
                  <span className="text-[10px] font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-500/10">
                    {r.key}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{r.description}</p>
                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="number"
                    defaultValue={r.value}
                    onBlur={(e) =>
                      handleQuickAction('UPDATE_RULE', 'rule', {
                        ruleKey: r.key,
                        value: +e.target.value,
                      })
                    }
                    className="w-28 px-3 py-1.5 bg-dark-card border border-dark-border rounded-xl text-xs font-mono text-amber-400 font-bold focus:outline-none focus:border-purple-500"
                  />
                  <span className="text-[11px] text-slate-500">Auto-saves on blur</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
