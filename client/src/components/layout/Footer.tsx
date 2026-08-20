import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-bg border-t border-dark-border text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block focus:outline-none">
              <img
                src="/logo.png"
                alt="TRIDRISHTI"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Tridrishti is a modern membership, community, rewards and social assistance ecosystem. Connect, earn promotional TRI Points, and unlock curated benefits, education grants, and healthcare passes.
            </p>

            <div className="p-3 rounded-2xl bg-dark-card/70 border border-dark-border text-[11px] text-slate-400 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-200">Compliance Assurance:</strong> TRI Points are non-monetary platform rewards with no cash dividend or investment return guarantee.
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-brand-400 transition-colors">
                  About Tridrishti
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-brand-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/memberships" className="hover:text-brand-400 transition-colors">
                  Membership Tiers
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="hover:text-brand-400 transition-colors">
                  TRI Points Engine
                </Link>
              </li>
              <li>
                <Link to="/levels" className="hover:text-brand-400 transition-colors">
                  Levels & Perks
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem Benefits */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Ecosystem</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/goodies" className="hover:text-brand-400 transition-colors">
                  Goodies & Store
                </Link>
              </li>
              <li>
                <Link to="/benefits" className="hover:text-brand-400 transition-colors">
                  Benefits Center
                </Link>
              </li>
              <li>
                <Link to="/social-impact" className="hover:text-brand-400 transition-colors">
                  Social Impact Drives
                </Link>
              </li>
              <li>
                <Link to="/education" className="hover:text-brand-400 transition-colors">
                  Education Grants
                </Link>
              </li>
              <li>
                <Link to="/healthcare" className="hover:text-brand-400 transition-colors">
                  Healthcare Passes
                </Link>
              </li>
              <li>
                <Link to="/insurance" className="hover:text-brand-400 transition-colors">
                  Partner Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Legal & Trust</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="hover:text-brand-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-brand-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-brand-400 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/reward-policy" className="hover:text-brand-400 transition-colors">
                  Reward Points Policy
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="hover:text-brand-400 transition-colors">
                  Compliance Disclosures
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-brand-400 transition-colors">
                  Helpdesk & FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} TRIDRISHTI.COM. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for community empowerment
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
