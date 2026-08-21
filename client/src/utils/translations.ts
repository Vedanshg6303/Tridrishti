export type Language = 'en' | 'hi';

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Brand & Navigation
  'nav.home': { en: 'Home', hi: 'मुख्य पृष्ठ' },
  'nav.about': { en: 'About', hi: 'परिचय' },
  'nav.howItWorks': { en: 'How It Works', hi: 'यह कैसे काम करता है' },
  'nav.memberships': { en: 'Memberships', hi: 'सदस्यता' },
  'nav.rewards': { en: 'TRI Points', hi: 'TRI पॉइंट्स' },
  'nav.levels': { en: 'Tier Levels', hi: 'रैंक और स्तर' },
  'nav.ecosystem': { en: 'Ecosystem & Welfare', hi: 'कल्याणकारी सुविधाएं' },
  'nav.benefits': { en: 'Member Benefits', hi: 'सदस्य लाभ' },
  'nav.goodies': { en: 'Exclusive Goodies', hi: 'विशेष उपहार' },
  'nav.socialImpact': { en: 'Social Impact Fund', hi: 'सामाजिक कल्याण कोष' },
  'nav.education': { en: 'Education Support', hi: 'शिक्षा सहायता' },
  'nav.healthcare': { en: 'Healthcare Support', hi: 'स्वास्थ्य सुरक्षा' },
  'nav.insurance': { en: 'Micro-Insurance', hi: 'माइक्रो इंश्योरेंस' },
  'nav.faq': { en: 'FAQ', hi: 'अक्सर पूछे जाने वाले सवाल' },
  'nav.contact': { en: 'Contact', hi: 'संपर्क करें' },
  'nav.login': { en: 'Sign In', hi: 'लॉग इन' },
  'nav.register': { en: 'Join for ₹100', hi: '₹100 में जुड़ें' },
  'nav.dashboard': { en: 'Member Dashboard', hi: 'डैशबोर्ड' },
  'nav.ownerMaster': { en: 'Owner & Dev Control', hi: 'मास्टर कंट्रोल' },
  'nav.startTour': { en: 'Drive Through Tour', hi: 'वेबसाइट का भ्रमण करें' },
  'nav.aiAssistant': { en: 'Drishti AI Bot', hi: 'त्रिनेत्र AI सहायक' },

  // Hero Section
  'hero.badge': {
    en: '🌟 Empowering Communities • Transparent Welfare • Lifetime Growth',
    hi: '🌟 आत्मनिर्भर समाज • पारदर्शी कल्याण • जीवनभर का उत्थान',
  },
  'hero.titlePrefix': { en: 'Connect. Grow.', hi: 'जुड़ें. बढ़ें.' },
  'hero.titleHighlight': { en: 'Empower with Tridrishti.', hi: 'त्रिनेत्र से सशक्त बनें।' },
  'hero.subtitle': {
    en: 'India’s most transparent community platform. Join with a one-time ₹100 contribution, earn 10 TRI Points per referral, unlock leadership tiers, and secure education, healthcare & micro-insurance benefits.',
    hi: 'भारत का सबसे पारदर्शी और सशक्त सामाजिक मंच। मात्र ₹100 के एकमुश्त योगदान से जुड़ें, हर रेफरल पर 10 TRI पॉइंट्स अर्जित करें, स्तर अनलॉक करें और शिक्षा, स्वास्थ्य तथा बीमा लाभ पाएं।',
  },
  'hero.ctaJoin': { en: 'Get Started for ₹100', hi: 'मात्र ₹100 में अभी शुरू करें' },
  'hero.ctaTour': { en: 'Explore Website (Tour)', hi: 'पूरी वेबसाइट समझें (टूर)' },
  'hero.ctaAskAI': { en: 'Ask Drishti AI', hi: 'AI से कुछ भी पूछें' },

  // Core Value Pillars
  'pillar.entry.title': { en: '₹100 Micro-Entry', hi: '₹100 आसान प्रवेश' },
  'pillar.entry.desc': {
    en: 'Accessible to every citizen with instant onboarding and lifetime member privileges.',
    hi: 'हर नागरिक के लिए सुलभ, तुरंत ऑनबोर्डिंग और जीवनभर के सदस्य विशेषाधिकार।',
  },
  'pillar.points.title': { en: '10 TRI Points / Referral', hi: '10 TRI पॉइंट्स प्रति रेफरल' },
  'pillar.points.desc': {
    en: 'Earn guaranteed 10 reward points for every direct member you welcome into the Tridrishti family.',
    hi: 'त्रिनेत्र परिवार में आपके द्वारा जोड़े गए प्रत्येक प्रत्यक्ष सदस्य पर पाएं निश्चित 10 रिवॉर्ड पॉइंट्स।',
  },
  'pillar.welfare.title': { en: 'Welfare & Health Safety', hi: 'कल्याण और स्वास्थ्य सुरक्षा' },
  'pillar.welfare.desc': {
    en: 'Unlock micro-insurance, emergency medical claims, and scholarship grants as your tier advances.',
    hi: 'जैसे-जैसे आपका स्तर बढ़ता है, माइक्रो-इंश्योरेंस, आपातकालीन चिकित्सा सहायता और छात्रवृत्ति प्राप्त करें।',
  },
  'pillar.transparent.title': { en: '100% Transparent Ledger', hi: '100% पारदर्शी खाता' },
  'pillar.transparent.desc': {
    en: 'Real-time double-entry points ledger and audit logs visible on your dashboard anytime.',
    hi: 'रीयल-टाइम डबल-एंट्री लेजर और ऑडिट लॉग, जिसे आप अपने डैशबोर्ड पर कभी भी देख सकते हैं।',
  },

  // Interactive Guided Tour
  'tour.welcome.title': { en: 'Welcome to TRIDRISHTI.COM!', hi: 'त्रिनेत्र में आपका स्वागत है!' },
  'tour.welcome.desc': {
    en: 'Hello! I am your Drishti AI Guide. Let me drive you through our platform to show how you can earn rewards, unlock welfare benefits, and grow with our community.',
    hi: 'नमस्ते! मैं आपका त्रिनेत्र AI गाइड हूँ। आइए मैं आपको पूरी वेबसाइट का भ्रमण कराता हूँ ताकि आप समझ सकें कि रिवॉर्ड कैसे अर्जित करें और कल्याणकारी लाभ कैसे पाएं।',
  },
  'tour.entry.title': { en: 'Step 1: ₹100 Onboarding', hi: 'चरण 1: मात्र ₹100 में ऑनबोर्डिंग' },
  'tour.entry.desc': {
    en: 'Members start with a simple ₹100 payment, which grants a unique referral ID, welcome points, and immediate access to the full ecosystem.',
    hi: 'सदस्य केवल ₹100 के योगदान से शुरुआत करते हैं, जिससे उन्हें विशिष्ट रेफरल कोड, वेलकम पॉइंट्स और पूरे इकोसिस्टम का एक्सेस मिलता है।',
  },
  'tour.referral.title': { en: 'Step 2: 10 TRI Points per Member', hi: 'चरण 2: हर सदस्य पर 10 TRI पॉइंट्स' },
  'tour.referral.desc': {
    en: 'Share your referral code with friends and family. For every registered member, 10 TRI Points are credited directly to your live wallet.',
    hi: 'अपना रेफरल कोड दोस्तों और परिवार के साथ साझा करें। प्रत्येक पंजीकृत सदस्य पर आपके वॉलेट में 10 TRI पॉइंट्स तुरंत जमा होते हैं।',
  },
  'tour.tiers.title': { en: 'Step 3: 10 Tier Unlocks & Milestones', hi: 'चरण 3: 10-स्तरीय रैंक व माइलस्टोन्स' },
  'tour.tiers.desc': {
    en: 'Progress across 10 structured tiers (Level 1 at 10 members up to Level 10 at 100,000 members). Each level unlocks higher healthcare coverage, diagnostics, scholarships, and supreme welfare honors.',
    hi: '10 स्तरों में आगे बढ़ें (लेवल 1: 10 सदस्य से लेकर लेवल 10: 100,000 सदस्य तक)। प्रत्येक स्तर उच्चतर स्वास्थ्य सुरक्षा, छात्रवृत्ति, लैपटॉप अनुदान और एक्सक्लूसिव सम्मान प्रदान करता है।',
  },
  'tour.welfare.title': { en: 'Step 4: Healthcare & Micro-Insurance', hi: 'चरण 4: स्वास्थ्य एवं माइक्रो-इंश्योरेंस' },
  'tour.welfare.desc': {
    en: 'Access accidental health claims, medical reimbursement vouchers, and child education support funds directly from the member portal.',
    hi: 'पोर्टल से सीधे दुर्घटना स्वास्थ्य दावे, चिकित्सा प्रतिपूर्ति वाउचर और बच्चों की शिक्षा सहायता अनुदान प्राप्त करें।',
  },
  'tour.control.title': { en: 'Step 5: Master Control & Transparency', hi: 'चरण 5: डेवलपर व मास्टर कंट्रोल' },
  'tour.control.desc': {
    en: 'Explore the live database studio, audit ledger, and broadcast center anytime via Developer & Owner Mission Control.',
    hi: 'डेवलपर और ओनर मिशन कंट्रोल के माध्यम से रीयल-टाइम डेटाबेस, ऑडिट लेजर और ब्रॉडकास्ट कभी भी देखें।',
  },
  'tour.finish.title': { en: 'Tour Completed! You are ready to start.', hi: 'टूर समाप्त हुआ! अब आप शुरू करने के लिए तैयार हैं।' },
  'tour.finish.desc': {
    en: 'Click "Join Now" to register or ask Drishti AI any questions using the floating assistant widget.',
    hi: 'रजिस्टर करने के लिए "अभी जुड़ें" पर क्लिक करें या नीचे दिए गए फ्लोटिंग AI सहायक से कोई भी प्रश्न पूछें।',
  },
  'tour.btn.next': { en: 'Next Step ➔', hi: 'अगला चरण ➔' },
  'tour.btn.prev': { en: '⬅ Previous', hi: '⬅ पिछला' },
  'tour.btn.skip': { en: 'Exit Tour', hi: 'टूर बंद करें' },
  'tour.btn.autoPlay': { en: '▶ Auto-Drive Tour', hi: '▶ ऑटो-ड्राइव टूर' },
  'tour.btn.pause': { en: '⏸ Pause Tour', hi: '⏸ रोकें' },
  'tour.btn.speak': { en: '🔊 Voice Narration', hi: '🔊 आवाज़ में सुनें' },

  // AI Assistant Bot
  'bot.title': { en: 'Drishti AI Assistant', hi: 'त्रिनेत्र AI सहायक' },
  'bot.badge': { en: 'Live Platform Navigator & Guide', hi: 'लाइव वेबसाइट नेविगेटर व मार्गदर्शक' },
  'bot.placeholder': {
    en: 'Ask anything (e.g., How to earn 10 TRI points?)...',
    hi: 'कुछ भी पूछें (जैसे: 10 TRI पॉइंट्स कैसे पाएं?)...',
  },
  'bot.welcome': {
    en: 'Namaste! 🙏 I am **Drishti AI**, your personal platform navigator. I can guide you through every part of Tridrishti.com, explain our ₹100 entry model, calculate your referral rewards, or take you directly to any page.',
    hi: 'नमस्ते! 🙏 मैं **त्रिनेत्र AI** हूँ, आपका व्यक्तिगत मंच मार्गदर्शक। मैं आपको त्रिनेत्र वेबसाइट के हर भाग को समझा सकता हूँ, ₹100 मॉडल के बारे में बता सकता हूँ, रिवॉर्ड्स की गणना कर सकता हूँ, या आपको किसी भी पेज पर ले जा सकता हूँ।',
  },
  'bot.suggest.howWorks': { en: 'How does Tridrishti work?', hi: 'त्रिनेत्र कैसे काम करता है?' },
  'bot.suggest.earnPoints': { en: 'How to earn 10 TRI Points?', hi: '10 TRI पॉइंट्स कैसे कमाएं?' },
  'bot.suggest.insurance': { en: 'How to claim Healthcare & Insurance?', hi: 'स्वास्थ्य और बीमा का दावा कैसे करें?' },
  'bot.suggest.driveTour': { en: 'Take me on a Guided Tour', hi: 'मुझे पूरी वेबसाइट का टूर कराएं' },
  'bot.suggest.membership': { en: 'Show ₹100 Membership Details', hi: '₹100 सदस्यता विवरण दिखाएं' },
  'bot.suggest.developer': { en: 'Open Developer Mission Control', hi: 'डेवलपर मिशन कंट्रोल खोलें' },

  // Language Bar
  'lang.english': { en: 'English', hi: 'English' },
  'lang.hindi': { en: 'हिन्दी', hi: 'हिन्दी' },
  'lang.switchText': { en: 'Language / भाषा', hi: 'भाषा / Language' },
};
