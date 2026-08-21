import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '../utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  isTourActive: boolean;
  startTour: () => void;
  stopTour: () => void;
  isAiBotOpen: boolean;
  openAiBot: () => void;
  closeAiBot: () => void;
  toggleAiBot: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('tridrishti_lang');
    return saved === 'hi' || saved === 'en' ? (saved as Language) : 'en';
  });

  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [isAiBotOpen, setIsAiBotOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('tridrishti_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key: string, fallback?: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return fallback || key;
  };

  const startTour = () => {
    setIsTourActive(true);
  };

  const stopTour = () => {
    setIsTourActive(false);
  };

  const openAiBot = () => setIsAiBotOpen(true);
  const closeAiBot = () => setIsAiBotOpen(false);
  const toggleAiBot = () => setIsAiBotOpen((prev) => !prev);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isTourActive,
        startTour,
        stopTour,
        isAiBotOpen,
        openAiBot,
        closeAiBot,
        toggleAiBot,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
