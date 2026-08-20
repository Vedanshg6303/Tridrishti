import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldAlert,
  Users,
  CreditCard,
  Sliders,
  Sparkles,
  ShieldCheck,
  Package,
  FileText,
  LifeBuoy,
  LogOut,
  ArrowLeft,
  Zap,
  Lock,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, login, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [switching, setSwitching] = useState(false);

  const isAdmin = user && (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN');

  const handleAdminSwitch = async () => {
    setSwitching(true);
    try {
      await login('admin@tridrishti.com', 'Admin@123');
      window.location.reload();
    } catch (err) {
      console.error('Failed to switch to admin:', err);
    } finally {
      setSwitching(false);
    }
  };

  const adminNavItems = [
    { name: '⚡ Master Mission Control', path: '/admin/master', icon: Zap },
    { name: 'CRM Overview', path: '/admin', icon: ShieldAlert },
    { name: 'User & KYC Management', path: '/admin/users', icon: Users },
    { name: 'Membership Catalog', path: '/admin/memberships', icon: CreditCard },
    { name: 'Dynamic Rules Engine', path: '/admin/rules', icon: Sliders },
    { name: 'Global Points Ledger', path: '/admin/points-ledger', icon: Sparkles },
    { name: 'Claims Triage Desk', path: '/admin/claims', icon: ShieldCheck },
    { name: 'Public Inquiries', path: '/admin/inquiries', icon: LifeBuoy },
    { name: 'Reward Fulfillment', path: '/admin/redemptions', icon: Package },
    { name: 'System Audit Logs', path: '/admin/audit-logs', icon: FileText },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#03060d] text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-dark-card border border-dark-border p-8 rounded-3xl shadow-2xl text-center space-y-5">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-display font-bold text-white">Admin Privileges Required</h2>
            <p className="text-xs text-slate-400">
              You are currently signed in as <strong className="text-white">{user?.email || 'Guest'}</strong> (Role: <span className="font-mono text-amber-400">{user?.role || 'NONE'}</span>). The Governance CRM requires <strong>SUPER_ADMIN</strong> or <strong>ADMIN</strong> permissions.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              disabled={switching}
              onClick={handleAdminSwitch}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{switching ? 'Authenticating Admin...' : '1-Click Switch to Super Admin'}</span>
            </button>

            <div className="flex gap-2">
              <Link
                to="/dashboard"
                className="flex-1 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-xs font-semibold text-slate-300 hover:text-white transition-colors text-center"
              >
                Go to Member Dashboard
              </Link>
              <Link
                to="/login"
                className="flex-1 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-xs font-semibold text-slate-300 hover:text-white transition-colors text-center"
              >
                Sign Out & Re-login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03060d] text-slate-100 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[#172340] bg-[#070b16] shrink-0">
        <div className="p-5 border-b border-[#172340] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="TRIDRISHTI"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold uppercase">
            Admin
          </span>
        </div>

        {/* Super Admin Badge */}
        <div className="p-4 m-3 rounded-2xl bg-[#0b1224] border border-purple-500/30 space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-purple-300 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Governance Panel</span>
          </div>
          <div className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</div>
          <div className="text-[10px] text-slate-400">Access: Platform Operations & Auditing</div>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-[#0e162c]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#172340] space-y-1">
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5 w-full px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-[#0e162c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Switch to Member View</span>
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2.5 w-full px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-[#0e162c] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-[#172340] bg-[#070b16]/70 backdrop-blur-xl flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="text-xs font-semibold text-purple-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-purple-400" />
            <span>Tridrishti Platform Control Center & Compliance Governance</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs text-slate-400 hover:text-white transition-colors hidden sm:block font-medium"
            >
              Public Site →
            </Link>
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
              System Online
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
