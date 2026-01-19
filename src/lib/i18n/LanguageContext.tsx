import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, t as translate } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "hamyon_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get from localStorage
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && ["en", "ru", "uz"].includes(stored)) {
      return stored as Language;
    }
    
    // Try to detect from Telegram Web App
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code) {
      const tgLang = window.Telegram.WebApp.initDataUnsafe.user.language_code;
      if (tgLang === 'ru') return 'ru';
      if (tgLang === 'uz') return 'uz';
    }
    
    // Default to Uzbek
    return "uz";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const t = (path: string) => translate(path, language);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
