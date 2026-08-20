import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ShieldCheck,
  Gift,
  Users,
  HeartHandshake,
  GraduationCap,
  HeartPulse,
  Shield,
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  TrendingUp,
  Play,
  RotateCcw,
} from 'lucide-react';
import { formatCurrency, formatPoints } from '../../utils/formatters';
import { CinematicEyeIntro } from '../../components/common/CinematicEyeIntro';
import { InteractiveEyeVisualizer } from '../../components/common/InteractiveEyeVisualizer';

export const HomePage: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  const stats = [
    { label: 'Active Members', value: '10,400+', icon: Users, color: 'text-brand-400' },
    { label: 'TRI Points Issued', value: '1.8M+', icon: Sparkles, color: 'text-amber-400' },
    { label: 'Curated Benefits', value: '50+', icon: Shield, color: 'text-cyan-400' },
    { label: 'Impact Initiatives', value: '24 Drives', icon: HeartHandshake, color: 'text-emerald-400' },
  ];

  const highlights = [
    {
      title: 'Promotional TRI Points',
      desc: 'Earn platform points on eligible product purchases and community activities. Redeem for premium goodies.',
      icon: Sparkles,
      color: 'from-amber-500/20 to-orange-500/10',
      border: 'border-amber-500/30',
      textColor: 'text-amber-400',
    },
    {
      title: 'Community Network Graph',
      desc: 'Explore your referral connections through an interactive, zoomable SVG topology canvas with transparent attribution.',
      icon: Users,
      color: 'from-brand-500/20 to-blue-500/10',
      border: 'border-brand-500/30',
      textColor: 'text-brand-400',
    },
    {
      title: 'Healthcare Assistance',
      desc: '24x7 Telehealth physician passes, complimentary full-body NABL diagnostics, and medical guidance.',
      icon: HeartPulse,
      color: 'from-rose-500/20 to-pink-500/10',
      border: 'border-rose-500/30',
      textColor: 'text-rose-400',
    },
    {
      title: 'Education Support Grants',
      desc: 'Financial scholarships and academic guidance for members and family pursuing higher studies.',
      icon: GraduationCap,
      color: 'from-blue-500/20 to-indigo-500/10',
      border: 'border-blue-500/30',
      textColor: 'text-blue-400',
    },
    {
      title: 'Goodies & Physical Store',
      desc: 'Redeem points for organic cotton hoodies, smartwatches, wireless earbuds, and wellness kits with free shipping.',
      icon: Gift,
      color: 'from-purple-500/20 to-violet-500/10',
      border: 'border-purple-500/30',
      textColor: 'text-purple-400',
    },
    {
      title: 'Social Impact Fund',
      desc: 'Participate in transparent community charity drives, rural school book distribution, and medical camps.',
      icon: HeartHandshake,
      color: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-20 overflow-hidden">
      {/* Cinematic Logo Eye Opening Intro */}
      {showIntro && <CinematicEyeIntro onComplete={() => setShowIntro(false)} />}

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-36 lg:pt-40">
        {/* Glowing Background Mesh Aurora */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-600/20 blur-[120px] animate-pulse" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[100px]" />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-gradient-to-b from-brand-500/10 to-transparent blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-brand-500/10">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>The Modern Community, Rewards & Benefits Ecosystem</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-[1.1]">
                Connect.{' '}
                <span className="bg-gradient-to-r from-brand-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(14,165,233,0.4)]">
                  Grow.
                </span>{' '}
                Empower.
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                TRIDRISHTI unites members in a compliant community platform. Earn promotional{' '}
                <strong className="text-amber-400 font-semibold">TRI Points</strong>, climb levels, redeem tangible goodies, and unlock curated healthcare passes, education grants, and social impact programs.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-cyan-600 to-blue-600 hover:from-brand-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-brand-600/30 transition-all flex items-center justify-center gap-2.5 group"
                >
                  <span>Join the Ecosystem</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/how-it-works"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-dark-card hover:bg-dark-cardHover border border-dark-border text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore How It Works</span>
                </Link>

                {/* Replay Eye Intro Button */}
                <button
                  onClick={() => setShowIntro(true)}
                  className="p-4 rounded-2xl bg-dark-card/60 hover:bg-dark-card border border-dark-border text-slate-400 hover:text-cyan-400 transition-all"
                  title="Replay Eye Intro Animation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Trust & Compliance Pill */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Compliant Direct Ecosystem</span>
                </div>
                <span>•</span>
                <span>No Guaranteed ROI</span>
                <span>•</span>
                <span>Real Utility & Rewards</span>
              </div>
            </div>

            {/* Right Interactive Eye Visualizer */}
            <div className="lg:col-span-5 relative">
              <InteractiveEyeVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics Counter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-dark-card/70 backdrop-blur-xl border border-dark-border shadow-2xl">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="space-y-1.5 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-xs text-slate-400 font-medium">{s.label}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  {s.value}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Ecosystem Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            Ecosystem Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Everything You Need in One Unified Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Explore reward tiers, interactive community downlines, healthcare benefits, and transparent social initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((h, idx) => {
            const Icon = h.icon;
            return (
              <div
                key={idx}
                className={`p-8 rounded-3xl bg-gradient-to-b ${h.color} to-dark-card border ${h.border} backdrop-blur-xl flex flex-col justify-between space-y-6 hover:scale-[1.02] transition-all duration-300 shadow-xl group`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-dark-bg/80 border border-dark-border flex items-center justify-center shadow-lg group-hover:border-cyan-400/40 transition-colors">
                    <Icon className={`w-6 h-6 ${h.textColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {h.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{h.desc}</p>
                </div>

                <div className="pt-2 border-t border-dark-border/40">
                  <Link
                    to="/how-it-works"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Community Network Preview Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-950/80 via-dark-card to-dark-card border border-brand-500/30 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
              <Users className="w-3.5 h-3.5" />
              <span>Attribution & Network Architecture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
              Visualize Your Entire Community in Real-Time
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore your downline structure with our high-performance interactive SVG tree. Zoom, pan, search members, check qualifying activities, and monitor compliance status seamlessly.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/register"
                className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/25 transition-all flex items-center gap-2"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/how-it-works"
                className="px-6 py-3.5 rounded-xl bg-dark-bg hover:bg-dark-border border border-dark-border text-slate-300 hover:text-white font-semibold text-xs transition-colors"
              >
                <span>View Network Rules</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Trust Disclosure Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-dark-card/40 border border-dark-border text-center space-y-4 max-w-4xl mx-auto">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Trust, Transparency & Compliance Guarantee</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            TRIDRISHTI is built with strict adherence to consumer protection and platform integrity standards. TRI Points are promotional loyalty units earned through legitimate platform participation and eligible transactions. They are not financial securities, deposits, or promises of monetary returns.
          </p>
          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-brand-400">
            <Link to="/terms" className="hover:underline">
              Terms of Use
            </Link>
            <span>•</span>
            <Link to="/reward-policy" className="hover:underline">
              Reward Policy
            </Link>
            <span>•</span>
            <Link to="/compliance" className="hover:underline">
              Regulatory Disclosures
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
