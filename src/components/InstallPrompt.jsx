import { Download, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

export function InstallPrompt() {
  const { t } = useTranslation();
  const { canInstall, install } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {canInstall && !dismissed && (
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed bottom-4 left-4 right-4 z-[70] mx-auto max-w-xl rounded-lg border border-white/40 bg-white/92 p-4 shadow-2xl backdrop-blur-2xl sm:left-auto sm:right-6 sm:mx-0"
        >
          <div className="flex gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal-brand text-white">
              <Download className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-serif text-xl font-bold text-teal-ink">{t('install.title')}</h2>
              <p className="mt-1 text-sm leading-6 text-ink/70">{t('install.body')}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={install}
                  className="rounded-full bg-gold-brand px-4 py-2 text-sm font-black text-teal-ink"
                >
                  {t('install.install')}
                </button>
                <button
                  type="button"
                  onClick={() => setDismissed(true)}
                  className="rounded-full bg-pearl px-4 py-2 text-sm font-black text-ink"
                >
                  {t('install.dismiss')}
                </button>
              </div>
            </div>
            <button type="button" onClick={() => setDismissed(true)} className="text-ink/50 hover:text-ink" aria-label={t('common.close')}>
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
