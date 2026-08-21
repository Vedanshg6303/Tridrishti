import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Gift,
  Shield,
  HeartHandshake,
  GraduationCap,
  HeartPulse,
  LogOut,
  User,
  LayoutDashboard,
  ShieldAlert,
  Compass,
  Bot,
} from 'lucide-react';
import { formatPoints } from '../../utils/formatters';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, t, startTour, openAiBot } = useLanguage();
  const isAuthenticated = !!user;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setEcosystemOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-bg/90 backdrop-blur-xl border-b border-dark-border/80 shadow-xl shadow-black/40 py-2.5'
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative flex items-center justify-center">
              <img
                src="/logo.png"
                alt="TRIDRISHTI"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/about"
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                location.pathname === '/about' ? 'text-brand-400 bg-brand-500/10' : 'text-slate-300 hover:text-white hover:bg-dark-card'
              }`}
            >
              {t('nav.about')}
            </Link>

            <Link
              to="/how-it-works"
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                location.pathname === '/how-it-works' ? 'text-brand-400 bg-brand-500/10' : 'text-slate-300 hover:text-white hover:bg-dark-card'
              }`}
            >
              {t('nav.howItWorks')}
            </Link>

            <Link
              to="/memberships"
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                location.pathname === '/memberships' ? 'text-brand-400 bg-brand-500/10' : 'text-slate-300 hover:text-white hover:bg-dark-card'
              }`}
            >
              {t('nav.memberships')}
            </Link>

            <Link
              to="/rewards"
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                location.pathname === '/rewards' ? 'text-brand-400 bg-brand-500/10' : 'text-slate-300 hover:text-white hover:bg-dark-card'
              }`}
            >
              {t('nav.rewards')}
            </Link>

            {/* Ecosystem Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setEcosystemOpen(!ecosystemOpen)}
                onMouseEnter={() => setEcosystemOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-dark-card transition-colors"
              >
                <span>{t('nav.ecosystem')}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {ecosystemOpen && (
                <div
                  onMouseLeave={() => setEcosystemOpen(false)}
                  className="absolute top-full left-0 mt-1 w-64 rounded-2xl bg-dark-card/95 backdrop-blur-xl border border-dark-border shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                >
                  <Link
                    to="/levels"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-dark-bg transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">{t('nav.levels')}</div>
                      <div className="text-[10px] text-slate-400">STARTER, CONNECT, GROW & more</div>
                    </div>
                  </Link>

                  <Link
                    to="/benefits"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-dark-bg transition-colors"
                  >
                    <Shield className="w-4 h-4 text-brand-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">{t('nav.benefits')}</div>
                      <div className="text-[10px] text-slate-400">Curated member utilities</div>
                    </div>
                  </Link>

                  <Link
                    to="/goodies"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-dark-bg transition-colors"
                  >
                    <Gift className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">{t('nav.goodies')}</div>
                      <div className="text-[10px] text-slate-400">Physical merchandise & store</div>
                    </div>
                  </Link>

                  <Link
                    to="/social-impact"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-dark-bg transition-colors"
                  >
                    <HeartHandshake className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">{t('nav.socialImpact')}</div>
                      <div className="text-[10px] text-slate-400">Community service & drives</div>
                    </div>
                  </Link>

                  <Link
                    to="/education"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-dark-bg transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">{t('nav.education')}</div>
                      <div className="text-[10px] text-slate-400">Scholarships & grant applications</div>
                    </div>
                  </Link>

                  <Link
                    to="/insurance"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-dark-bg transition-colors"
                  >
                    <HeartPulse className="w-4 h-4 text-rose-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">{t('nav.insurance')}</div>
                      <div className="text-[10px] text-slate-400">Micro-insurance & claim assistance</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Tour Button */}
            <button
              onClick={startTour}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-semibold transition-all hover:scale-105"
              title="Drive Through Website (Tour)"
            >
              <Compass className="w-3.5 h-3.5 text-brand-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>{t('nav.startTour')}</span>
            </button>
          </nav>

          {/* Right User Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {/* Points Pill */}
                <Link
                  to="/dashboard/points"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold hover:bg-brand-500/20 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono">{formatPoints(user.pointsBalance || 0)} pts</span>
                </Link>

                {/* Dashboard / Admin Button */}
                {user.role === 'SUPER_ADMIN' || user.role === 'ADMIN' ? (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-semibold transition-colors"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Admin CRM</span>
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-600/25 transition-all"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>{t('nav.dashboard')}</span>
                  </Link>
                )}

                <button
                  type="button"
                  onClick={logout}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-dark-card transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-dark-card transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25 transition-all"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle & Language */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher compact />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-dark-card focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-dark-bg/98 backdrop-blur-2xl border-b border-dark-border shadow-2xl p-6 space-y-4 animate-in slide-in-from-top-4 max-h-[85vh] overflow-y-auto">
          {/* Quick Guided Tour in Mobile */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              startTour();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-brand-500/25"
          >
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
            <span>{t('nav.startTour')}</span>
          </button>

          <nav className="flex flex-col space-y-1.5 text-sm font-medium">
            <Link to="/about" className="px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-card">
              {t('nav.about')}
            </Link>
            <Link to="/how-it-works" className="px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-card">
              {t('nav.howItWorks')}
            </Link>
            <Link to="/memberships" className="px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-card">
              {t('nav.memberships')}
            </Link>
            <Link to="/rewards" className="px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-card">
              {t('nav.rewards')}
            </Link>
            <Link to="/levels" className="px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-card">
              {t('nav.levels')}
            </Link>
            <Link to="/benefits" className="px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-card">
              {t('nav.benefits')}
            </Link>
            <Link to="/goodies" className="px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-card">
              {t('nav.goodies')}
            </Link>
            <Link to="/social-impact" className="px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-card">
              {t('nav.socialImpact')}
            </Link>
            <Link to="/education" className="px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-card">
              {t('nav.education')}
            </Link>
            <Link to="/healthcare" className="px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-card">
              {t('nav.healthcare')}
            </Link>
            <Link to="/insurance" className="px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-card">
              {t('nav.insurance')}
            </Link>
            <Link to="/faq" className="px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-card">
              {t('nav.faq')}
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-xl text-slate-300 hover:bg-dark-card">
              {t('nav.contact')}
            </Link>
          </nav>

          <div className="pt-4 border-t border-dark-border flex flex-col gap-2">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  className="block w-full py-2.5 text-center rounded-xl bg-brand-600 text-white font-semibold text-xs shadow-lg shadow-brand-600/30"
                >
                  {t('nav.dashboard')}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="block w-full py-2.5 text-center rounded-xl bg-dark-card border border-dark-border text-rose-400 font-semibold text-xs"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className="py-2.5 text-center rounded-xl bg-dark-card border border-dark-border text-white text-xs font-semibold"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="py-2.5 text-center rounded-xl bg-brand-600 text-white text-xs font-semibold shadow-lg shadow-brand-600/25"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
