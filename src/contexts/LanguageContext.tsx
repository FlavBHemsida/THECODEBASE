import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'sv' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (sv: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'sv',
  toggleLang: () => {},
  t: (sv) => sv,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('sv');
  const toggleLang = useCallback(() => setLang(l => l === 'sv' ? 'en' : 'sv'), []);
  const t = useCallback((sv: string, en: string) => lang === 'sv' ? sv : en, [lang]);
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
