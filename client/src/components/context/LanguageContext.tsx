import { createContext, useContext, useState, ReactNode } from "react";

type Language = { code: 'FR' | 'EN'; flag: string };

interface LanguageContextType {
  currentLang: Language;
  toggleLanguage: () => void;
}

const languages: Language[] = [
  { code: 'FR', flag: '🇫🇷' },
  { code: 'EN', flag: '🇬🇧' }
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]);

  const toggleLanguage = () => {
    setCurrentLang(prev => 
      prev.code === 'FR' ? languages[1] : languages[0]
    );
  };

  return (
    <LanguageContext.Provider value={{ currentLang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
