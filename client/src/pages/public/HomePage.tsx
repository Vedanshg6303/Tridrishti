import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
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
  Compass,
  Bot,
} from 'lucide-react';
import { formatCurrency, formatPoints } from '../../utils/formatters';
import { CinematicEyeIntro } from '../../components/common/CinematicEyeIntro';
import { InteractiveEyeVisualizer } from '../../components/common/InteractiveEyeVisualizer';

export const HomePage: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const { language, t, startTour, openAiBot } = useLanguage();

  const stats = [
    {
      label: language === 'hi' ? 'एकमुश्त ऑनबोर्डिंग' : 'One-Time Entry Activation',
      value: '₹100',
      icon: Zap,
      color: 'text-brand-400',
    },
    {
      label: language === 'hi' ? 'रेफरल रिवॉर्ड' : 'Referral Reward',
      value: '10 TRI Points',
      icon: Sparkles,
      color: 'text-amber-400',
    },
    {
      label: language === 'hi' ? 'करियर स्तर' : 'Career Progression',
      value: language === 'hi' ? '10 करियर स्तर' : '10 Tier Levels',
      icon: Shield,
      color: 'text-cyan-400',
    },
    {
      label: language === 'hi' ? 'कल्याणकारी सुविधाएं' : 'Welfare & Healthcare',
      value: '100% Guaranteed',
      icon: Gift,
      color: 'text-emerald-400',
    },
  ];

  const highlights = [
    {
      id: 'rewards-section',
      title: language === 'hi' ? '10 TRI पॉइंट्स प्रति रेफरल' : '10 TRI Points per Referral',
      desc:
        language === 'hi'
          ? 'अपने रेफरल लिंक से जुड़े हर सदस्य पर 10 पॉइंट्स तुरंत अर्जित करें। पॉइंट्स से उपहार और वाउचर रिडीम करें।'
          : 'Earn guaranteed 10 TRI points for each registered referral member. Points unlock tier perks and luxury goodies.',
      icon: Sparkles,
      color: 'from-amber-500/20 to-orange-500/10',
      border: 'border-amber-500/30',
      textColor: 'text-amber-400',
      link: '/rewards',
    },
    {
      id: 'tiers-section',
      title: language === 'hi' ? '10-स्तरीय रैंक व विशेषाधिकार' : '10-Tier Leadership Levels',
      desc:
        language === 'hi'
          ? '10 सदस्यों से लेकर 100,000 सदस्यों तक 10 स्तर अनलॉक करें और उच्चतर स्वास्थ्य सुरक्षा, छात्रवृत्ति और एक्सक्लूसिव उपहार पाएं।'
          : 'Progress through 10 milestone tiers from 10 members to 100,000 members. Higher ranks unlock comprehensive micro-insurance, education grants, and luxury awards.',
      icon: Shield,
      color: 'from-brand-500/20 to-blue-500/10',
      border: 'border-brand-500/30',
      textColor: 'text-brand-400',
      link: '/levels',
    },
    {
      id: 'welfare-section',
      title: language === 'hi' ? 'स्वास्थ्य सुरक्षा व माइक्रो-इंश्योरेंस' : 'Healthcare & Micro-Insurance',
      desc:
        language === 'hi'
          ? '24x7 टेली-परामर्श, चिकित्सा प्रतिपूर्ति वाउचर और आपातकालीन स्वास्थ्य सहायता सीधे सदस्य पोर्टल से।'
          : 'Accidental health reimbursement, emergency medical vouchers, and 24x7 verified doctor telehealth consultations.',
      icon: HeartPulse,
      color: 'from-rose-500/20 to-pink-500/10',
      border: 'border-rose-500/30',
      textColor: 'text-rose-400',
      link: '/insurance',
    },
    {
      id: 'education-section',
      title: language === 'hi' ? 'शिक्षा सहायता व छात्रवृत्ति' : 'Education Support Grants',
      desc:
        language === 'hi'
          ? 'बच्चों की पढ़ाई के लिए छात्रवृत्ति, प्रतियोगी परीक्षाओं के लिए सहायता और डिजिटल उपकरण अनुदान।'
          : 'Direct academic scholarships, school kit distribution, and digital learning hardware assistance for members children.',
      icon: GraduationCap,
      color: 'from-blue-500/20 to-indigo-500/10',
      border: 'border-blue-500/30',
      textColor: 'text-blue-400',
      link: '/education',
    },
    {
      title: language === 'hi' ? 'विशेष उपहार व भौतिक स्टोर' : 'Goodies & Physical Store',
      desc:
        language === 'hi'
          ? 'पॉइंट्स से ब्रांडेड हुडीज, स्मार्टवॉच, ईयरबड्स और वेलनेस किट्स मुफ्त होम डिलीवरी के साथ प्राप्त करें।'
          : 'Redeem points for premium hoodies, smartwatches, wireless earbuds, and wellness kits with free door delivery.',
      icon: Gift,
      color: 'from-purple-500/20 to-violet-500/10',
      border: 'border-purple-500/30',
      textColor: 'text-purple-400',
      link: '/goodies',
    },
    {
      title: language === 'hi' ? 'सामाजिक कल्याण कोष' : 'Social Impact & Charity Fund',
      desc:
        language === 'hi'
          ? 'पारदर्शी सामुदायिक सेवा, ग्रामीण शिक्षा अभियान और आपातकालीन आपदा राहत में सक्रिय योगदान।'
          : 'Transparent community service drives, rural school support, tree plantations, and emergency relief programs.',
      icon: HeartHandshake,
      color: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      link: '/social-impact',
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
                <span>{t('hero.badge')}</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-[1.1]">
                {t('hero.titlePrefix')}{' '}
                <span className="bg-gradient-to-r from-brand-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(14,165,233,0.4)]">
                  {t('hero.titleHighlight')}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t('hero.subtitle')}
              </p>

              {/* CTAs with Tour and Drishti AI */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-brand-600/30 transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>{t('hero.ctaJoin')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Drive Through Website Tour Button */}
                <button
                  onClick={startTour}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-brand-500/15 hover:bg-brand-500/25 border-2 border-brand-500/40 hover:border-brand-500 text-brand-300 hover:text-white font-bold text-sm shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Compass className="w-4 h-4 text-brand-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>{t('hero.ctaTour')}</span>
                </button>

                {/* Ask Drishti AI Button */}
                <button
                  onClick={openAiBot}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-dark-card hover:bg-dark-cardHover border border-dark-border text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Bot className="w-4 h-4 text-amber-400" />
                  <span>{t('hero.ctaAskAI')}</span>
                </button>

                {/* Replay Eye Intro Button */}
                <button
                  onClick={() => setShowIntro(true)}
                  className="p-3.5 rounded-2xl bg-dark-card/60 hover:bg-dark-card border border-dark-border text-slate-400 hover:text-cyan-400 transition-all hidden lg:block"
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
                <span>₹100 Direct Model</span>
                <span>•</span>
                <span>Transparent Points</span>
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
      <section id="membership-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {language === 'hi' ? 'इकोसिस्टम के मुख्य स्तंभ' : 'Ecosystem Pillars'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            {language === 'hi' ? 'सब कुछ एक ही सशक्त मंच पर' : 'Everything You Need in One Unified Hub'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {language === 'hi'
              ? 'रिवॉर्ड टियर्स, कम्युनिटी नेटवर्क, स्वास्थ्य लाभ और पारदर्शी सामाजिक पहलों का अन्वेषण करें।'
              : 'Explore reward tiers, interactive community downlines, healthcare benefits, and transparent social initiatives.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((h, idx) => {
            const Icon = h.icon;
            return (
              <div
                key={idx}
                id={h.id}
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
                    to={h.link || '/how-it-works'}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    <span>{language === 'hi' ? 'अधिक जानें' : 'Learn more'}</span>
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
