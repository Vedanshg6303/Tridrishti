import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { GuidedTour } from '../common/GuidedTour';
import { DrishtiAIBot } from '../common/DrishtiAIBot';
import {
  LayoutDashboard,
  User,
  CreditCard,
  GitFork,
  Users,
  Sparkles,
  Gift,
  Shield,
  GraduationCap,
  HeartPulse,
  Package,
  LifeBuoy,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ShieldAlert,
} from 'lucide-react';
import { formatPoints } from '../../utils/formatters';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile & KYC', path: '/dashboard/profile', icon: User },
    { name: 'Membership Plan', path: '/dashboard/membership', icon: CreditCard },
    { name: 'Community Tree', path: '/dashboard/network', icon: GitFork },
    { name: 'Referral Tools', path: '/dashboard/referrals', icon: Users },
    { name: 'TRI Points Ledger', path: '/dashboard/points', icon: Sparkles },
    { name: 'Reward Marketplace', path: '/dashboard/rewards', icon: Gift },
    { name: 'Benefits Center', path: '/dashboard/benefits', icon: Shield },
    { name: 'Education Grant', path: '/dashboard/education', icon: GraduationCap },
    { name: 'Healthcare Assistance', path: '/dashboard/healthcare', icon: HeartPulse },
    { name: 'Orders & Fulfillment', path: '/dashboard/orders', icon: Package },
    { name: 'Support Desk', path: '/dashboard/support', icon: LifeBuoy },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-dark-border bg-dark-card/50 backdrop-blur-xl shrink-0">
        {/* Brand Header with Official Logo */}
        <div className="p-5 border-b border-dark-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="TRIDRISHTI"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 font-bold">
            v2.0
          </span>
        </div>

        {/* Member Profile Quick Card */}
        <div className="p-4 m-3 rounded-2xl bg-dark-card border border-dark-border space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-md">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user?.name || 'Member'}</div>
              <div className="text-[10px] text-brand-400 font-mono font-semibold">
                Level {user?.level || 1} • {user?.levelName || 'STARTER'}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-dark-border text-[10px]">
            <span className="text-slate-400">Balance:</span>
            <span className="font-mono font-bold text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {formatPoints(user?.pointsBalance || 0)} pts
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-cyan-600 text-white font-bold shadow-lg shadow-brand-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-dark-card'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-dark-border">
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-dark-card transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-72 max-w-full bg-dark-bg border-r border-dark-border z-10 p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-dark-border">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="TRIDRISHTI"
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium ${
                      isActive ? 'bg-brand-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-dark-border bg-dark-card/30 backdrop-blur-xl flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-dark-card"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs font-semibold text-slate-400 hidden sm:block">
              Member Portal & Benefits Dashboard
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Bilingual Switcher */}
            <LanguageSwitcher compact />

            {/* Quick Public Site Link */}
            <Link
              to="/"
              className="text-xs text-slate-400 hover:text-brand-400 transition-colors hidden sm:block font-medium"
            >
              View Public Site →
            </Link>

            {/* Notification Bell */}
            <div className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-dark-card relative cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-brand-500 absolute top-1.5 right-1.5"></span>
            </div>

            {/* Profile Avatar */}
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-dark-card border border-dark-border hover:border-brand-500/50 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center font-bold text-white text-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="text-xs font-semibold text-white hidden md:inline">{user?.name}</span>
            </Link>
          </div>
        </header>

        {/* Dashboard Dynamic Page View */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <GuidedTour />
      <DrishtiAIBot />
    </div>
  );
};
