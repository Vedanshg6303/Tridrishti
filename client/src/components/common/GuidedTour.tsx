import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Compass,
  CheckCircle2,
  Eye,
  ShieldCheck,
  Award,
  HeartHandshake,
  GraduationCap,
  Terminal,
} from 'lucide-react';

interface TourStep {
  id: string;
  targetSelector?: string;
  targetPath?: string;
  icon: React.ComponentType<{ className?: string }>;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  actionLabel?: { en: string; hi: string };
  actionUrl?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    icon: Eye,
    title: {
      en: '🌟 Welcome to Tridrishti.com',
      hi: '🌟 त्रिनेत्र (TRIDRISHTI.COM) में आपका स्वागत है',
    },
    description: {
      en: 'Tridrishti is India’s first transparent community empowerment network. Let me take you on a quick guided tour to explain our ₹100 entry model, rewards, and welfare benefits.',
      hi: 'त्रिनेत्र भारत का पहला पारदर्शी सामुदायिक सशक्तिकरण मंच है। आइए मैं आपको ₹100 प्रवेश मॉडल, रिवॉर्ड्स और कल्याणकारी लाभों को समझाने के लिए एक त्वरित टूर पर ले चलता हूँ।',
    },
    actionLabel: { en: 'Explore Home', hi: 'होमपेज देखें' },
    actionUrl: '/',
  },
  {
    id: 'entry-model',
    targetSelector: '#membership-section',
    icon: ShieldCheck,
    title: {
      en: '💳 Step 1: ₹100 Lifetime Onboarding',
      hi: '💳 चरण 1: ₹100 में आजीवन ऑनबोर्डिंग',
    },
    description: {
      en: 'No heavy fees or hidden charges. Any citizen can join with a one-time ₹100 contribution, getting a unique referral ID and instant access to the entire platform.',
      hi: 'कोई भारी शुल्क या छिपा हुआ खर्च नहीं। कोई भी नागरिक मात्र ₹100 के एकमुश्त योगदान से जुड़ सकता है, और उसे तुरंत विशिष्ट रेफरल कोड और पूरा एक्सेस मिलता है।',
    },
    actionLabel: { en: 'View Memberships', hi: 'सदस्यता योजनाएं देखें' },
    actionUrl: '/memberships',
  },
  {
    id: 'referral-points',
    targetSelector: '#rewards-section',
    icon: Sparkles,
    title: {
      en: '💎 Step 2: Earn 10 TRI Points per Referral',
      hi: '💎 चरण 2: प्रत्येक रेफरल पर 10 TRI पॉइंट्स अर्जित करें',
    },
    description: {
      en: 'Whenever someone joins using your referral link, 10 TRI Points are credited directly to your live wallet. Points unlock tier levels, goodies, and welfare claims.',
      hi: 'जब भी कोई आपके रेफरल लिंक से जुड़ता है, आपके वॉलेट में 10 TRI पॉइंट्स तुरंत जमा हो जाते हैं। इन पॉइंट्स से स्तर अनलॉक होते हैं और उपहार मिलते हैं।',
    },
    actionLabel: { en: 'Learn About TRI Points', hi: 'TRI पॉइंट्स के बारे में जानें' },
    actionUrl: '/rewards',
  },
  {
    id: 'tier-levels',
    targetSelector: '#tiers-section',
    icon: Award,
    title: {
      en: '🏆 Step 3: Tier Levels (Bronze to Diamond)',
      hi: '🏆 चरण 3: स्तर और रैंक (कांस्य से डायमंड तक)',
    },
    description: {
      en: 'As your community grows, advance through Bronze, Silver, Gold, Platinum, and Diamond tiers. Higher tiers unlock higher welfare coverage and leadership perks.',
      hi: 'जैसे-जैसे आपका समुदाय बढ़ता है, कांस्य, रजत, स्वर्ण, प्लेटिनम और डायमंड स्तरों तक पहुंचें। उच्च स्तर अधिक कल्याणकारी सुरक्षा प्रदान करते हैं।',
    },
    actionLabel: { en: 'View Tier Milestones', hi: 'रैंक और माइलस्टोन्स देखें' },
    actionUrl: '/levels',
  },
  {
    id: 'welfare-insurance',
    targetSelector: '#welfare-section',
    icon: HeartHandshake,
    title: {
      en: '🛡️ Step 4: Healthcare & Micro-Insurance',
      hi: '🛡️ चरण 4: स्वास्थ्य सुरक्षा व माइक्रो-इंश्योरेंस',
    },
    description: {
      en: 'Active members can claim emergency healthcare reimbursement, accident coverage, and family welfare support directly through the user dashboard.',
      hi: 'सक्रिय सदस्य आपातकालीन स्वास्थ्य प्रतिपूर्ति, दुर्घटना बीमा और पारिवारिक कल्याण सहायता के लिए सीधे डैशबोर्ड से दावा कर सकते हैं।',
    },
    actionLabel: { en: 'Explore Welfare Center', hi: 'कल्याण केंद्र देखें' },
    actionUrl: '/insurance',
  },
  {
    id: 'education-impact',
    targetSelector: '#education-section',
    icon: GraduationCap,
    title: {
      en: '🎓 Step 5: Education Grants & Social Impact',
      hi: '🎓 चरण 5: शिक्षा अनुदान व सामाजिक कल्याण कोष',
    },
    description: {
      en: 'A portion of ecosystem contributions fuels child scholarships, skill workshops, and transparent community welfare projects across India.',
      hi: 'इकोसिस्टम का एक हिस्सा पूरे भारत में बच्चों की छात्रवृत्ति, कौशल कार्यशालाओं और पारदर्शी सामाजिक परियोजनाओं के लिए समर्पित है।',
    },
    actionLabel: { en: 'View Education Hub', hi: 'शिक्षा सहायता देखें' },
    actionUrl: '/education',
  },
  {
    id: 'developer-mission',
    icon: Terminal,
    title: {
      en: '⚡ Step 6: 100% Transparency & Mission Control',
      hi: '⚡ चरण 6: 100% पारदर्शिता व मिशन कंट्रोल',
    },
    description: {
      en: 'Real-time double-entry points ledger, audit records, and raw database collections are accessible directly through Developer & Owner Mission Control.',
      hi: 'रीयल-टाइम पॉइंट्स लेजर, ऑडिट रिकॉर्ड और डेटाबेस सीधे डेवलपर और ओनर मिशन कंट्रोल से देखे जा सकते हैं।',
    },
    actionLabel: { en: 'Open Mission Control', hi: 'मिशन कंट्रोल खोलें' },
    actionUrl: '/owner',
  },
  {
    id: 'finish-step',
    icon: CheckCircle2,
    title: {
      en: '🎉 Tour Complete! Join the Tridrishti Movement',
      hi: '🎉 टूर समाप्त! त्रिनेत्र महाअभियान से अभी जुड़ें',
    },
    description: {
      en: 'You are now ready to begin! Click "Join Now for ₹100" to create your account or chat with Drishti AI anytime for personalized guidance.',
      hi: 'अब आप शुरुआत करने के लिए तैयार हैं! अपना खाता बनाने के लिए "₹100 में जुड़ें" पर क्लिक करें या व्यक्तिगत मार्गदर्शन के लिए त्रिनेत्र AI से चैट करें।',
    },
    actionLabel: { en: 'Join Now (₹100)', hi: 'अभी ₹100 में जुड़ें' },
    actionUrl: '/register',
  },
];

export const GuidedTour: React.FC = () => {
  const { isTourActive, stopTour, language, openAiBot } = useLanguage();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const navigate = useNavigate();
  const autoPlayTimerRef = useRef<any>(null);

  const step = TOUR_STEPS[currentStepIndex];

  // Auto speech narration
  const speakCurrentStep = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const textToSpeak = `${step.title[language]}. ${step.description[language]}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!isTourActive) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    // Scroll to target element if present
    if (step.targetSelector) {
      const el = document.querySelector(step.targetSelector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    if (isVoiceEnabled) {
      speakCurrentStep();
    }
  }, [currentStepIndex, isTourActive, language]);

  // Auto-play timer
  useEffect(() => {
    if (isTourActive && isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < TOUR_STEPS.length - 1) {
            return prev + 1;
          } else {
            setIsAutoPlaying(false);
            return prev;
          }
        });
      }, 7000);
    } else {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    }

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isTourActive, isAutoPlaying]);

  if (!isTourActive) return null;

  const IconComponent = step.icon;

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      stopTour();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleActionClick = () => {
    if (step.actionUrl) {
      navigate(step.actionUrl);
    }
  };

  const toggleVoice = () => {
    if (!isVoiceEnabled) {
      setIsVoiceEnabled(true);
      speakCurrentStep();
    } else {
      setIsVoiceEnabled(false);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-end p-4 sm:p-6 md:p-8">
      {/* Dimmed backdrop highlight */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-auto transition-opacity" />

      {/* Guided Tour Modal Card */}
      <div className="relative z-10 pointer-events-auto max-w-2xl w-full mx-auto bg-dark-bg/95 backdrop-blur-2xl border-2 border-brand-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-brand-500/30 text-white animate-in fade-in slide-in-from-bottom-6 duration-300">
        {/* Progress & Top Bar */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/30 animate-pulse">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-full border border-brand-500/30">
                  {language === 'hi' ? 'त्रिनेत्र ऑटो-ड्राइव टूर' : 'Tridrishti Auto-Drive Tour'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {currentStepIndex + 1} / {TOUR_STEPS.length}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-300">
                {language === 'hi' ? 'वेबसाइट मार्गदर्शक' : 'Interactive Platform Guide'}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Voice toggle */}
            <button
              onClick={toggleVoice}
              className={`p-2 rounded-xl border text-xs transition-all ${
                isVoiceEnabled
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                  : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
              }`}
              title={language === 'hi' ? 'आवाज़ ऑन/ऑफ' : 'Voice Narration'}
            >
              {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Auto Play toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isAutoPlaying
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 animate-pulse'
                  : 'bg-dark-card border-dark-border text-slate-300 hover:text-white'
              }`}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{language === 'hi' ? 'रोकें' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{language === 'hi' ? 'ऑटो-ड्राइव' : 'Auto-Drive'}</span>
                </>
              )}
            </button>

            {/* Close */}
            <button
              onClick={stopTour}
              className="p-2 rounded-xl bg-dark-card hover:bg-red-500/20 border border-dark-border hover:border-red-500/40 text-slate-400 hover:text-red-400 transition-all"
              title="Close Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-dark-card h-1.5 rounded-full mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-brand-500 via-indigo-400 to-amber-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${((currentStepIndex + 1) / TOUR_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-brand-400 shrink-0">
            <IconComponent className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {step.title[language]}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {step.description[language]}
            </p>
          </div>
        </div>

        {/* Navigation & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Quick Page teleport button */}
          {step.actionLabel && (
            <button
              onClick={handleActionClick}
              className="px-4 py-2 rounded-xl bg-brand-500/20 hover:bg-brand-500/30 border border-brand-500/50 text-brand-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>{step.actionLabel[language]}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {currentStepIndex > 0 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl bg-dark-card hover:bg-dark-hover border border-dark-border text-slate-300 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{language === 'hi' ? 'पिछला' : 'Previous'}</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand-500/25 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <span>
                {currentStepIndex === TOUR_STEPS.length - 1
                  ? language === 'hi'
                    ? 'टूर समाप्त करें'
                    : 'Finish Tour'
                  : language === 'hi'
                  ? 'अगला चरण ➔'
                  : 'Next Step ➔'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
