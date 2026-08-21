import React from 'react';
import {
  Award,
  Sparkles,
  CheckCircle2,
  Shield,
  ArrowRight,
  Zap,
  Users,
  HeartPulse,
  GraduationCap,
  Gift,
  Crown,
  Flame,
  Star,
  Gem,
  Trophy,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const LevelsPage: React.FC = () => {
  const { language, t } = useLanguage();

  const levels = [
    {
      level: 1,
      name: language === 'hi' ? 'STARTER (शुरुआती)' : 'STARTER',
      icon: Zap,
      membersRequired: '10 Members',
      coinsEarned: '100 TRI Points',
      badge: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
      referralPerk: '10 TRI Points per referral member',
      benefits: [
        language === 'hi'
          ? 'व्यक्तिगत रेफरल लिंक और इंटरैक्टिव ट्री विजुअलाइज़र'
          : 'Personal Referral Link & Interactive Tree Visualizer',
        language === 'hi'
          ? 'वेलकम किट ई-हैंडबुक और डिजिटल बैज'
          : 'Welcome Kit E-Handbook & Digital Badge',
        language === 'hi'
          ? 'बेसिक वेलफेयर गाइडेंस और सपोर्ट डेस्क'
          : 'Basic Healthcare Guidance & Support Desk Access',
      ],
    },
    {
      level: 2,
      name: language === 'hi' ? 'CONNECT (सम्पर्क)' : 'CONNECT',
      icon: Users,
      membersRequired: '50 Members',
      coinsEarned: '500 TRI Points',
      badge: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      referralPerk: '1.2x Activity Multiplier + Direct Milestone Bonus',
      benefits: [
        language === 'hi'
          ? '24x7 डॉक्टर टेली-हेल्थ परामर्श पास'
          : '24x7 Doctor Telehealth Consult Pass',
        language === 'hi'
          ? 'गुडिज स्टोर पर 5% विशेष छूट'
          : '5% Exclusive Goodies Store Discount',
        language === 'hi'
          ? 'प्राथमिकता सहायता एवं क्लेम समीक्षा'
          : 'Priority Support & Fast-Track Claim Review',
      ],
    },
    {
      level: 3,
      name: language === 'hi' ? 'GROW (विकास)' : 'GROW',
      icon: Sparkles,
      membersRequired: '100 Members',
      coinsEarned: '1,000 TRI Points',
      badge: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
      referralPerk: '1.5x Multiplier + Smartwatch / Earbuds Redemption',
      benefits: [
        language === 'hi'
          ? 'वार्षिक संपूर्ण शरीर डायग्नोस्टिक चेकअप वाउचर (60+ जांच)'
          : 'Annual Full-Body Diagnostic Checkup Pass (60+ tests)',
        language === 'hi'
          ? 'शिक्षा सहायता एवं छात्रवृत्ति आवेदन पात्रता'
          : 'Higher Education Support & Tuition Grant Eligibility',
        language === 'hi'
          ? 'ब्रांडेड हुडीज और मर्चेंडाइज मुफ्त डिलीवरी'
          : 'Branded Goodies & Apparel with Free Home Delivery',
      ],
    },
    {
      level: 4,
      name: language === 'hi' ? 'LEAD (नेतृत्व)' : 'LEAD',
      icon: Flame,
      membersRequired: '250 Members',
      coinsEarned: '2,500 TRI Points',
      badge: 'border-orange-500/40 text-orange-400 bg-orange-500/10',
      referralPerk: '1.8x Multiplier + Tech Gadget Rewards',
      benefits: [
        language === 'hi'
          ? 'आकस्मिक स्वास्थ्य और चिकित्सा प्रतिपूर्ति सुरक्षा'
          : 'Emergency Medical Reimbursement & Health Claims',
        language === 'hi'
          ? 'कौशल विकास व वोकेशनल ट्रेनिंग स्पॉन्सरशिप'
          : 'Skill Development & Vocational Training Sponsorship',
        language === 'hi'
          ? 'समर्पित रिलेशनशिप मैनेजर सहायता'
          : 'Dedicated Relationship Manager Support',
      ],
    },
    {
      level: 5,
      name: language === 'hi' ? 'ADVANCE (प्रगति)' : 'ADVANCE',
      icon: Shield,
      membersRequired: '500 Members',
      coinsEarned: '5,000 TRI Points',
      badge: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
      referralPerk: '2.0x Accelerated Multiplier + Tablet / Device Grant',
      benefits: [
        language === 'hi'
          ? 'बच्चों के लिए डिजिटल लर्निंग डिवाइस (टैबलेट) सहायता'
          : 'Digital Learning Device (Tablet) Scholarship Assistance',
        language === 'hi'
          ? 'माइक्रो-इंश्योरेंस प्रीमियम कवरेज सपोर्ट'
          : 'Micro-Insurance Premium Coverage Support',
        language === 'hi'
          ? 'क्षेत्रीय लीडरशिप मीट एवं रिकॉग्निशन अवार्ड्स'
          : 'Regional Leadership Meets & Recognition Awards',
      ],
    },
    {
      level: 6,
      name: language === 'hi' ? 'EXECUTIVE (कार्यकारी)' : 'EXECUTIVE',
      icon: Star,
      membersRequired: '1,000 Members',
      coinsEarned: '10,000 TRI Points',
      badge: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
      referralPerk: '2.2x High Tier Multiplier + Laptop Grant Eligibility',
      benefits: [
        language === 'hi'
          ? 'लैपटॉप एवं उच्च शिक्षा उपकरण अनुदान पात्रता'
          : 'Laptop & Higher Education Hardware Grant Eligibility',
        language === 'hi'
          ? 'पारिवारिक स्वास्थ्य सुरक्षा कोष में प्राथमिकता आवंटन'
          : 'Family Healthcare Protection Fund Allocation',
        language === 'hi'
          ? 'वीआईपी कस्टमर कॉन्सिएर्ज सहायता'
          : 'VIP Customer Concierge Support Desk',
      ],
    },
    {
      level: 7,
      name: language === 'hi' ? 'DIRECTOR (निदेशक)' : 'DIRECTOR',
      icon: Trophy,
      membersRequired: '5,000 Members',
      coinsEarned: '50,000 TRI Points',
      badge: 'border-rose-500/40 text-rose-400 bg-rose-500/10',
      referralPerk: '2.5x Multiplier + Community Welfare Leadership',
      benefits: [
        language === 'hi'
          ? 'अपने क्षेत्र में त्रिनेत्र सामुदायिक सेवा व चिकित्सा शिविर स्पॉन्सरशिप'
          : 'Sponsor Regional Tridrishti Medical & Food Relief Camps',
        language === 'hi'
          ? 'पूर्ण छात्रवृत्ति और उच्च अध्ययन निधि'
          : 'Full Tuition Grant & Higher Education Study Fund',
        language === 'hi'
          ? 'कार्यकारी लीडरशिप बोर्ड में सदस्यता आमंत्रण'
          : 'Executive Leadership Council Member Invitation',
      ],
    },
    {
      level: 8,
      name: language === 'hi' ? 'AMBASSADOR (राजदूत)' : 'AMBASSADOR',
      icon: Gem,
      membersRequired: '10,000 Members',
      coinsEarned: '100,000 TRI Points',
      badge: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
      referralPerk: '2.8x Elite Multiplier + Luxury Goodies Suite',
      benefits: [
        language === 'hi'
          ? 'राष्ट्रीय त्रिनेत्र सम्मेलन में मुख्य अतिथि सम्मान व ट्रॉफी'
          : 'National Convention Keynote Guest Honor & Memento',
        language === 'hi'
          ? 'असीमित परिवार स्वास्थ्य सुरक्षा व वेलफेयर प्रोटेक्शन'
          : 'Comprehensive Family Health & Welfare Shield',
        language === 'hi'
          ? 'मासिक लीडरशिप रिवॉर्ड व वेलफेयर ग्रांट्स'
          : 'Monthly Leadership Recognition & Community Grants',
      ],
    },
    {
      level: 9,
      name: language === 'hi' ? 'PRESIDENTIAL (अध्यक्षीय)' : 'PRESIDENTIAL',
      icon: Award,
      membersRequired: '50,000 Members',
      coinsEarned: '500,000 TRI Points',
      badge: 'border-teal-500/40 text-teal-300 bg-teal-500/10',
      referralPerk: '3.0x Apex Multiplier + State Welfare Patronage',
      benefits: [
        language === 'hi'
          ? 'राज्य स्तरीय सामाजिक प्रभाव परियोजना संचालन का अधिकार'
          : 'State-Wide Social Impact Project Direction Rights',
        language === 'hi'
          ? 'डायरेक्ट ओनर कंसल्टेशन एवं पॉलिसी एडवाइजरी रोल'
          : 'Direct Owner Council & Platform Policy Advisory Seat',
        language === 'hi'
          ? 'सर्वोच्च मर्चेंडाइज एवं लाइफस्टाइल रिवॉर्ड्स'
          : 'Supreme Luxury Lifestyle & Welfare Redemptions',
      ],
    },
    {
      level: 10,
      name: language === 'hi' ? 'ROYAL CROWN (सर्वोच्च त्रिनेत्र आइकॉन)' : 'ROYAL CROWN',
      icon: Crown,
      membersRequired: '100,000 Members',
      coinsEarned: '1,000,000 TRI Points',
      badge: 'border-yellow-400 text-yellow-300 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 shadow-lg shadow-yellow-500/20',
      referralPerk: '👑 Lifetime Royal Status + National Welfare Trustee',
      benefits: [
        language === 'hi'
          ? '👑 त्रिनेत्र राष्ट्रीय वेलफेयर ट्रस्टी एवं सर्वोच्च सम्मान'
          : '👑 National Welfare Trustee & Supreme Tridrishti Hall of Fame',
        language === 'hi'
          ? 'आजीवन पूर्ण स्वास्थ्य, शिक्षा व आपातकालीन सुरक्षा संरक्षण'
          : 'Lifetime Comprehensive Healthcare, Education & Family Security',
        language === 'hi'
          ? 'वार्षिक राष्ट्रीय सामाजिक प्रभाव निधि का संयुक्त नेतृत्व'
          : 'Joint Leadership of Annual Multi-Crore Social Impact Fund',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-500/10">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>{language === 'hi' ? '10-स्तरीय करियर व कल्याणकारी प्रगति मैट्रिक्स' : '10-Tier Career & Welfare Progression Matrix'}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
          {language === 'hi' ? 'स्तर और अनलॉक होने वाले लाभ' : 'Levels & Unlocked Benefits'}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {language === 'hi'
            ? '₹100 सदस्यता वाले सदस्यों को जोड़कर स्तर बढ़ाएं (प्रत्येक रेफरल पर 10 TRI पॉइंट्स)। हर स्तर स्वास्थ्य सुरक्षा, छात्रवृत्ति और एक्सक्लूसिव उपहार अनलॉक करता है।'
            : 'Advance through 10 prestigious tiers by welcoming members with ₹100 membership (earn 10 TRI Points per referral). Each level automatically unlocks higher healthcare coverage, diagnostic passes, and education grants.'}
        </p>
      </div>

      {/* 10 Levels Grid */}
      <div className="space-y-4">
        {levels.map((lvl) => {
          const IconComp = lvl.icon;
          return (
            <div
              key={lvl.level}
              className={`p-6 sm:p-8 rounded-3xl bg-dark-card/90 border transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-xl hover:scale-[1.01] ${
                lvl.level === 10 ? 'border-amber-400/80 bg-gradient-to-r from-amber-950/30 via-dark-card to-yellow-950/30' : 'border-dark-border hover:border-slate-500'
              }`}
            >
              {/* Level & Requirement */}
              <div className="lg:col-span-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase border ${lvl.badge}`}>
                    <IconComp className="w-3.5 h-3.5" />
                    <span>LEVEL {lvl.level}</span>
                  </span>
                  {lvl.level === 10 && (
                    <span className="text-[10px] uppercase font-extrabold bg-gradient-to-r from-amber-400 to-yellow-300 text-black px-2 py-0.5 rounded-full">
                      SUPREME APEX
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">{lvl.name}</h3>
                <div className="space-y-1">
                  <p className="text-xs text-amber-400 font-mono font-bold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'hi' ? `लक्ष्य: ${lvl.membersRequired} (₹100 सदस्य)` : `Requirement: ${lvl.membersRequired} (₹100 each)`}</span>
                  </p>
                  <p className="text-xs text-brand-300 font-mono font-semibold">
                    ⚡ {language === 'hi' ? `अर्जित पॉइंट्स: ${lvl.coinsEarned}` : `Points Earned: ${lvl.coinsEarned}`}
                  </p>
                </div>
              </div>

              {/* Referral Perk */}
              <div className="lg:col-span-3 space-y-1 p-3 rounded-2xl bg-dark-bg/60 border border-dark-border/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  {language === 'hi' ? 'रिवॉर्ड गुणक व सुविधाएं' : 'Multiplier & Earning Perk'}
                </span>
                <span className="text-xs font-semibold text-slate-200 flex items-start gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{lvl.referralPerk}</span>
                </span>
              </div>

              {/* Unlocked Benefits List */}
              <div className="lg:col-span-5 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  {language === 'hi' ? 'अनलॉक होने वाले सामाजिक व कल्याणकारी लाभ' : 'Tier-Unlocked Welfare & Goodies'}
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {lvl.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Action Bar */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-950/80 via-dark-card to-brand-950/80 border border-brand-500/30 text-center space-y-4 shadow-2xl">
        <h3 className="text-2xl font-bold text-white">
          {language === 'hi' ? 'आज ही लेवल 1 से अपनी यात्रा शुरू करें!' : 'Begin Your Journey from Level 1 Today!'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          {language === 'hi'
            ? 'मात्र ₹100 के योगदान से जुड़ें और 10 सदस्यों को जोड़कर तुरंत लेवल 1 अचीव करें।'
            : 'Join with a simple one-time ₹100 contribution and reach Level 1 by welcoming your first 10 members.'}
        </p>
        <div className="pt-2">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-brand-500/25 transition-all"
          >
            <span>{language === 'hi' ? '₹100 में अभी शुरू करें' : 'Get Started for ₹100'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Compliance Disclosure */}
      <div className="p-6 rounded-2xl bg-dark-card/40 border border-dark-border text-center text-xs text-slate-400 max-w-3xl mx-auto leading-relaxed">
        {language === 'hi'
          ? 'महत्वपूर्ण सूचना: स्तर और रैंक प्लेटफ़ॉर्म पहचान और सामाजिक कल्याण पात्रता का प्रतिनिधित्व करते हैं। ये किसी भी प्रकार के गारंटीकृत मौद्रिक रिटर्न, ब्याज या वित्तीय लाभांश का वादा नहीं करते हैं।'
          : 'Important Compliance Disclosure: Tier levels represent platform recognition and access eligibility for community welfare grants, healthcare reimbursement passes, and product goodies. Tiers do not provide guaranteed monetary income, investment dividends, or financial yields.'}
      </div>
    </div>
  );
};
