import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';
import fa from './translations/fa.json';
import ar from './translations/ar.json';

export const languages = {
  fa: { label: 'فارسی', dir: 'rtl', short: 'FA' },
  ar: { label: 'العربية', dir: 'rtl', short: 'AR' },
  en: { label: 'English', dir: 'ltr', short: 'EN' }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fa: { translation: fa },
      ar: { translation: ar }
    },
    fallbackLng: 'fa',
    supportedLngs: Object.keys(languages),
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
