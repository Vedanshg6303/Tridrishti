import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false }) => {
  const { language, toggleLanguage, setLanguage } = useLanguage();

  if (compact) {
    return (
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-dark-card/90 hover:bg-dark-hover border border-dark-border hover:border-brand-500/50 text-xs font-semibold text-slate-200 transition-all shadow-sm group"
        title="Switch Language / भाषा बदलें"
      >
        <Globe className="w-3.5 h-3.5 text-brand-400 group-hover:rotate-45 transition-transform duration-300" />
        <span className={language === 'hi' ? 'text-amber-400 font-bold' : 'text-slate-400'}>
          {language === 'en' ? '🇮🇳 HI' : '🇬🇧 EN'}
        </span>
      </button>
    );
  }

  return (
    <div className="flex items-center p-1 rounded-xl bg-dark-bg/80 backdrop-blur-md border border-dark-border/80 shadow-inner">
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
          language === 'en'
            ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20 font-semibold'
            : 'text-slate-400 hover:text-slate-200 hover:bg-dark-card/50'
        }`}
      >
        <span>🇬🇧</span>
        <span>English</span>
      </button>
      <button
        onClick={() => setLanguage('hi')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
          language === 'hi'
            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20 font-semibold'
            : 'text-slate-400 hover:text-slate-200 hover:bg-dark-card/50'
        }`}
      >
        <span>🇮🇳</span>
        <span>हिन्दी</span>
      </button>
    </div>
  );
};
