import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';

export function Header() {
  const { t } = useTranslation();
  const { language, languages, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const navItems = [
    ['packages', '#packages'],
    ['catalog', '#catalog'],
    ['features', '#features'],
    ['contact', '#contact']
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/30 bg-white/80 shadow-sm backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navItems.map(([key, href]) => (
            <a key={key} href={href} className="text-sm font-semibold text-ink/75 transition hover:text-teal-brand">
              {t(`nav.${key}`)}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 rounded-full border border-teal-brand/15 bg-white/70 p-1 shadow-sm lg:flex">
          {Object.entries(languages).map(([code, item]) => (
            <button
              key={code}
              type="button"
              onClick={() => setLanguage(code)}
              className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                language === code ? 'bg-teal-brand text-white shadow' : 'text-teal-ink hover:bg-teal-brand/10'
              }`}
              aria-pressed={language === code}
            >
              {item.short}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-teal-brand/15 bg-white text-teal-ink lg:hidden"
          aria-label={open ? t('common.close') : 'Menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-teal-brand/10 bg-white lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <nav className="grid gap-2" aria-label="Mobile primary">
                {navItems.map(([key, href]) => (
                  <a
                    key={key}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-bold text-ink hover:bg-pearl"
                  >
                    {t(`nav.${key}`)}
                  </a>
                ))}
              </nav>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {Object.entries(languages).map(([code, item]) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLanguage(code)}
                    className={`rounded-lg px-3 py-3 text-sm font-bold ${
                      language === code ? 'bg-teal-brand text-white' : 'bg-pearl text-teal-ink'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
