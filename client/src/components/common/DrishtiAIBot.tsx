import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  HeartHandshake,
  GraduationCap,
  Terminal,
  Volume2,
  VolumeX,
  Globe,
  RotateCcw,
  Zap,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    action: () => void;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export const DrishtiAIBot: React.FC = () => {
  const { language, toggleLanguage, setLanguage, startTour, isAiBotOpen, openAiBot, closeAiBot, t } =
    useLanguage();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceSpeechEnabled, setVoiceSpeechEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize bot greeting when opened or language changes
  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      id: 'welcome-1',
      sender: 'bot',
      text:
        language === 'hi'
          ? 'नमस्ते! 🙏 मैं **त्रिनेत्र AI** (Drishti AI) हूँ, आपका 24/7 मार्गदर्शक।\n\nआप मुझसे वेबसाइट के किसी भी हिस्से, ₹100 सदस्यता, 10 TRI पॉइंट्स रिवॉर्ड, स्वास्थ्य बीमा, या शिक्षा सहायता के बारे में पूछ सकते हैं। या फिर नीचे दिए गए बटन से तुरंत पूरी वेबसाइट का भ्रमण (Tour) कर सकते हैं!'
          : 'Namaste! 🙏 I am **Drishti AI**, your personal platform navigator & guide.\n\nAsk me anything about our ₹100 lifetime onboarding, 10 TRI Points per referral, welfare benefits, healthcare claims, or tap below to start an interactive tour of the entire website!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        {
          label: language === 'hi' ? '▶ वेबसाइट का टूर शुरू करें' : '▶ Start Interactive Website Tour',
          action: () => {
            closeAiBot();
            startTour();
          },
          icon: Compass,
        },
        {
          label: language === 'hi' ? '💳 ₹100 सदस्यता योजनाएं' : '💳 ₹100 Membership Plans',
          action: () => {
            closeAiBot();
            navigate('/memberships');
          },
          icon: ShieldCheck,
        },
        {
          label: language === 'hi' ? '⚡ डेवलपर मिशन कंट्रोल' : '⚡ Developer Mission Control',
          action: () => {
            closeAiBot();
            navigate('/owner');
          },
          icon: Terminal,
        },
      ],
    };

    setMessages([welcomeMsg]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const speakText = (text: string) => {
    if (!voiceSpeechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    // Clean markdown bold and symbols
    const cleanText = text.replace(/[*#_`>]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      generateBotResponse(query);
      setIsTyping(false);
    }, 600);
  };

  const generateBotResponse = (query: string) => {
    const q = query.toLowerCase();
    let replyText = '';
    let actions: ChatMessage['actions'] = [];

    // Pattern matching logic for bilingual queries
    if (
      q.includes('tour') ||
      q.includes('drive') ||
      q.includes('टूर') ||
      q.includes('भ्रमण') ||
      q.includes('walkthrough') ||
      q.includes('guide') ||
      q.includes('दिखाओ')
    ) {
      replyText =
        language === 'hi'
          ? 'शानदार! मैं आपको पूरी वेबसाइट के सभी मुख्य हिस्सों (ऑनबोर्डिंग, पॉइंट्स, रैंक, कल्याणकारी सुविधाएं और मिशन कंट्रोल) का लाइव टूर करा रहा हूँ।'
          : 'Great! Launching the interactive Auto-Drive website tour for you right now. It will highlight and explain each section step-by-step.';
      actions = [
        {
          label: language === 'hi' ? '🚀 टूर शुरू करें' : '🚀 Launch Guided Tour',
          action: () => {
            closeAiBot();
            startTour();
          },
          icon: Compass,
        },
      ];
    } else if (
      q.includes('100') ||
      q.includes('membership') ||
      q.includes('join') ||
      q.includes('सदस्य') ||
      q.includes('जुड़ें') ||
      q.includes('रजिस्टर') ||
      q.includes('cost') ||
      q.includes('fee')
    ) {
      replyText =
        language === 'hi'
          ? 'त्रिनेत्र में शामिल होने के लिए मात्र **₹100 का एकमुश्त योगदान** देना होता है।\n\nइसके लाभ:\n1. आजीवन सक्रिय सदस्य आईडी\n2. 100 वेलकम रिवॉर्ड पॉइंट्स\n3. हर रेफरल पर 10 TRI पॉइंट्स\n4. स्वास्थ्य और आपातकालीन सहायता दावा करने की पात्रता।'
          : 'Joining Tridrishti requires a simple **one-time ₹100 contribution**.\n\nKey Benefits:\n1. Lifetime active Member ID\n2. 100 Welcome Points\n3. 10 TRI Points per direct referral\n4. Eligibility for healthcare and welfare claims.';
      actions = [
        {
          label: language === 'hi' ? 'सदस्यता पेज पर जाएं' : 'View ₹100 Membership',
          action: () => {
            closeAiBot();
            navigate('/memberships');
          },
          icon: ShieldCheck,
        },
        {
          label: language === 'hi' ? 'रजिस्टर करें' : 'Register Account',
          action: () => {
            closeAiBot();
            navigate('/register');
          },
        },
      ];
    } else if (
      q.includes('point') ||
      q.includes('tri') ||
      q.includes('coin') ||
      q.includes('पॉइंट') ||
      q.includes('कमा') ||
      q.includes('earn') ||
      q.includes('refer') ||
      q.includes('रेफरल')
    ) {
      replyText =
        language === 'hi'
          ? '🌟 **10-स्तरीय करियर व TRI रिवॉर्ड मॉडल:**\n\n- प्रत्येक ₹100 सदस्य को जोड़ने पर **10 TRI पॉइंट्स** तुरंत मिलते हैं।\n\n🏆 **10 करियर स्तर:**\n• **लेवल 1**: 10 सदस्य (100 पॉइंट्स)\n• **लेवल 2**: 50 सदस्य (500 पॉइंट्स)\n• **लेवल 3**: 100 सदस्य (1,000 पॉइंट्स)\n• **लेवल 4**: 250 सदस्य (2,500 पॉइंट्स)\n• **लेवल 5**: 500 सदस्य (5,000 पॉइंट्स)\n• **लेवल 6**: 1,000 सदस्य (10,000 पॉइंट्स)\n• **लेवल 7**: 5,000 सदस्य (50,000 पॉइंट्स)\n• **लेवल 8**: 10,000 सदस्य (100,000 पॉइंट्स)\n• **लेवल 9**: 50,000 सदस्य (500,000 पॉइंट्स)\n• **लेवल 10 (रॉयल क्राउन)**: 100,000 सदस्य (1,000,000 पॉइंट्स)!'
          : '🌟 **10-Tier Milestone & Rewards Model:**\n\n- Earn **10 TRI Points** for every member who joins with ₹100 onboarding.\n\n🏆 **10 Career Levels:**\n• **Level 1**: 10 Members (100 pts)\n• **Level 2**: 50 Members (500 pts)\n• **Level 3**: 100 Members (1,000 pts)\n• **Level 4**: 250 Members (2,500 pts)\n• **Level 5**: 500 Members (5,000 pts)\n• **Level 6**: 1,000 Members (10,000 pts)\n• **Level 7**: 5,000 Members (50,000 pts)\n• **Level 8**: 10,000 Members (100,000 pts)\n• **Level 9**: 50,000 Members (500,000 pts)\n• **Level 10 (Royal Crown)**: 100,000 Members (1,000,000 pts)!';
      actions = [
        {
          label: language === 'hi' ? 'सभी 10 स्तर देखें' : 'View All 10 Levels',
          action: () => {
            closeAiBot();
            navigate('/levels');
          },
          icon: Award,
        },
        {
          label: language === 'hi' ? 'TRI पॉइंट्स विवरण देखें' : 'View TRI Points Ledger',
          action: () => {
            closeAiBot();
            navigate('/rewards');
          },
          icon: Sparkles,
        },
      ];
    } else if (
      q.includes('insurance') ||
      q.includes('health') ||
      q.includes('बीमा') ||
      q.includes('स्वास्थ्य') ||
      q.includes('medical') ||
      q.includes('इलाज') ||
      q.includes('दावा') ||
      q.includes('claim')
    ) {
      replyText =
        language === 'hi'
          ? '🛡️ **स्वास्थ्य सुरक्षा और माइक्रो-इंश्योरेंस:**\n\nत्रिनेत्र अपने सक्रिय सदस्यों को आकस्मिक स्वास्थ्य सुरक्षा और चिकित्सा प्रतिपूर्ति प्रदान करता है। आप सीधे अपने सदस्य डैशबोर्ड से क्लेम फॉर्म और बिल सबमिट कर सकते हैं।'
          : '🛡️ **Healthcare & Micro-Insurance:**\n\nTridrishti provides accidental health cover and emergency medical reimbursements to active tier members. Claims can be filed directly with instant document upload from your dashboard.';
      actions = [
        {
          label: language === 'hi' ? 'स्वास्थ्य एवं बीमा पोर्टल' : 'Open Insurance Portal',
          action: () => {
            closeAiBot();
            navigate('/insurance');
          },
          icon: HeartHandshake,
        },
        {
          label: language === 'hi' ? 'स्वास्थ्य केंद्र' : 'Healthcare Center',
          action: () => {
            closeAiBot();
            navigate('/healthcare');
          },
        },
      ];
    } else if (
      q.includes('education') ||
      q.includes('scholarship') ||
      q.includes('शिक्षा') ||
      q.includes('छात्रवृत्ति') ||
      q.includes('स्कूल') ||
      q.includes('study')
    ) {
      replyText =
        language === 'hi'
          ? '🎓 **शिक्षा सहायता कार्यक्रम:**\n\nत्रिनेत्र पात्र सदस्यों के बच्चों के लिए स्कूली छात्रवृत्ति, उच्च शिक्षा शुल्क सहायता और डिजिटल लर्निंग डिवाइस (लैपटॉप/टैबलेट) सहायता प्रदान करता है।'
          : '🎓 **Education Support Program:**\n\nTridrishti offers school scholarships, tuition grants, and digital learning devices (laptops/tablets) for children of active qualifying members.';
      actions = [
        {
          label: language === 'hi' ? 'शिक्षा सहायता केंद्र' : 'Open Education Hub',
          action: () => {
            closeAiBot();
            navigate('/education');
          },
          icon: GraduationCap,
        },
      ];
    } else if (
      q.includes('dev') ||
      q.includes('admin') ||
      q.includes('owner') ||
      q.includes('master') ||
      q.includes('database') ||
      q.includes('डेवलपर') ||
      q.includes('मालिक') ||
      q.includes('कंट्रोल')
    ) {
      replyText =
        language === 'hi'
          ? '⚡ **डेवलपर व ओनर 360° मिशन कंट्रोल:**\n\nआप यहाँ से लाइव मोंगोडीबी डेटाबेस कलेक्शन, सभी इनक्वायरी, क्लेम अप्रूवल, पॉइंट्स लेजर, मास एयरड्रॉप और सिस्टम सेटिंग्स को रियल-टाइम में नियंत्रित कर सकते हैं।'
          : '⚡ **Developer & Owner 360° Mission Control:**\n\nAccess real-time database collections, inquiry management, claim approvals, live ledger auditing, mass airdrops, and system broadcast controls.';
      actions = [
        {
          label: language === 'hi' ? 'मिशन कंट्रोल खोलें' : 'Open Mission Control',
          action: () => {
            closeAiBot();
            navigate('/owner');
          },
          icon: Terminal,
        },
      ];
    } else if (q.includes('hindi') || q.includes('english') || q.includes('भाषा') || q.includes('language')) {
      replyText =
        language === 'hi'
          ? 'आप कभी भी ऊपर नेवबार में दिए गए भाषा बटन से या मुझसे बोलकर हिन्दी अथवा English चुन सकते हैं।'
          : 'You can switch between English and Hindi anytime using the navbar language toggle or by asking me.';
      actions = [
        {
          label: language === 'hi' ? 'Switch to English' : 'हिन्दी में बदलें',
          action: () => toggleLanguage(),
          icon: Globe,
        },
      ];
    } else {
      replyText =
        language === 'hi'
          ? `मैंने आपका प्रश्न समझ लिया है: "${query}"।\n\nत्रिनेत्र प्लेटफॉर्म में आप ₹100 से शुरुआत करके 10 TRI पॉइंट्स प्रति रेफरल पा सकते हैं और कल्याणकारी लाभ अनलॉक कर सकते हैं। आप नीचे दिए गए किसी भी विकल्प पर क्लिक करके सीधे उस पेज पर जा सकते हैं:`
          : `I understand you are asking about: "${query}".\n\nTridrishti allows you to get started for ₹100, earn 10 TRI Points per referral, and unlock healthcare and welfare benefits. Here are direct shortcuts to help you navigate:`;
      actions = [
        {
          label: language === 'hi' ? 'वेबसाइट का भ्रमण (Tour)' : 'Drive Through Website (Tour)',
          action: () => {
            closeAiBot();
            startTour();
          },
          icon: Compass,
        },
        {
          label: language === 'hi' ? 'सदस्यता योजनाएं' : 'Explore Memberships',
          action: () => {
            closeAiBot();
            navigate('/memberships');
          },
          icon: ShieldCheck,
        },
        {
          label: language === 'hi' ? 'संपर्क व सहायता' : 'Contact Support',
          action: () => {
            closeAiBot();
            navigate('/contact');
          },
        },
      ];
    }

    const botMessage: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions,
    };

    setMessages((prev) => [...prev, botMessage]);
    speakText(replyText);
  };

  const SUGGESTION_CHIPS =
    language === 'hi'
      ? [
          '▶ पूरी वेबसाइट का टूर कराएं',
          '₹100 में कैसे जुड़ें?',
          '10 TRI पॉइंट्स कैसे कमाएं?',
          'स्वास्थ्य व बीमा दावा कैसे करें?',
          'डेवलपर मिशन कंट्रोल खोलें',
        ]
      : [
          '▶ Drive me through the website (Tour)',
          'How does ₹100 membership work?',
          'How to earn 10 TRI Points?',
          'How to claim health & insurance?',
          'Open Developer Mission Control',
        ];

  return (
    <>
      {/* Floating Action Trigger Button (Bottom Right) */}
      {!isAiBotOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
          {/* Tooltip badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-bg/90 backdrop-blur-md border border-brand-500/40 text-xs font-semibold text-brand-300 shadow-xl shadow-brand-500/20 group-hover:scale-105 transition-all">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{language === 'hi' ? 'त्रिनेत्र AI से पूछें / टूर करें' : 'Ask Drishti AI / Tour'}</span>
          </div>

          <button
            onClick={openAiBot}
            className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-brand-600 via-indigo-600 to-amber-500 text-white shadow-2xl shadow-brand-500/50 hover:shadow-brand-500/80 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20"
            aria-label="Open Drishti AI Assistant"
          >
            <div className="absolute inset-0 rounded-full bg-brand-400/20 animate-ping" />
            <Bot className="w-7 h-7 sm:w-8 sm:h-8 relative z-10" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-bold items-center justify-center text-black">
                AI
              </span>
            </span>
          </button>
        </div>
      )}

      {/* Interactive AI Chatbot Window */}
      {isAiBotOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-h-[85vh] h-[650px] flex flex-col bg-dark-bg/95 backdrop-blur-2xl border-2 border-brand-500/50 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden text-white animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-dark-card via-brand-950/40 to-dark-card border-b border-dark-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-md shadow-brand-500/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-dark-bg rounded-full" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{t('bot.title')}</span>
                  <span className="text-[10px] bg-brand-500/20 text-brand-300 font-mono px-1.5 py-0.5 rounded-full border border-brand-500/30">
                    2.0
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">{t('bot.badge')}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Voice toggle */}
              <button
                onClick={() => setVoiceSpeechEnabled(!voiceSpeechEnabled)}
                className={`p-1.5 rounded-lg border text-xs transition-all ${
                  voiceSpeechEnabled
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-dark-card border-dark-border text-slate-400 hover:text-white'
                }`}
                title="Voice read-aloud"
              >
                {voiceSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="px-2 py-1 rounded-lg bg-dark-card border border-dark-border text-xs font-bold text-amber-400 hover:bg-dark-hover transition-all"
                title="Switch Language"
              >
                {language === 'en' ? '🇮🇳 HI' : '🇬🇧 EN'}
              </button>

              {/* Close */}
              <button
                onClick={closeAiBot}
                className="p-1.5 rounded-lg bg-dark-card hover:bg-red-500/20 border border-dark-border hover:border-red-500/40 text-slate-400 hover:text-red-400 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-dark-border">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-brand-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-tr-none shadow-md shadow-brand-500/20'
                      : 'bg-dark-card/90 border border-dark-border text-slate-200 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Bot Interactive Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-dark-border/60 flex flex-col gap-1.5">
                      {msg.actions.map((act, idx) => {
                        const Icon = act.icon || ArrowRight;
                        return (
                          <button
                            key={idx}
                            onClick={act.action}
                            className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 hover:border-brand-500 text-brand-300 text-xs font-semibold transition-all group"
                          >
                            <span className="flex items-center gap-1.5">
                              <Icon className="w-3.5 h-3.5 text-brand-400" />
                              <span>{act.label}</span>
                            </span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <span className="block text-[10px] text-slate-400 text-right mt-1.5">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs italic">
                <div className="w-7 h-7 rounded-xl bg-brand-600/20 flex items-center justify-center text-brand-400">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <span>{language === 'hi' ? 'त्रिनेत्र AI सोच रहा है...' : 'Drishti AI is thinking...'}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-dark-bg/60 border-t border-dark-border/40 overflow-x-auto flex gap-1.5 no-scrollbar">
            {SUGGESTION_CHIPS.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(chip)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-dark-card hover:bg-brand-500/20 border border-dark-border hover:border-brand-500/40 text-[11px] text-slate-300 hover:text-brand-300 transition-all font-medium"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-dark-card border-t border-dark-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t('bot.placeholder')}
                className="flex-1 bg-dark-bg border border-dark-border focus:border-brand-500 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-brand-500/25 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
