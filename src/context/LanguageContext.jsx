import { createContext, useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '../i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const language = languages[i18n.resolvedLanguage] ? i18n.resolvedLanguage : 'fa';
  const direction = languages[language].dir;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const value = useMemo(
    () => ({
      language,
      direction,
      languages,
      setLanguage: (nextLanguage) => i18n.changeLanguage(nextLanguage)
    }),
    [language, direction, i18n]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}
