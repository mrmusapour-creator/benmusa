import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getProductIcon } from '../data';
import { productLabel } from '../services/productService';

export function PackageModal({ packageType, products, onClose }) {
  const { t, i18n } = useTranslation();
  const isOpen = Boolean(packageType);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const items = products.filter((item) => (packageType === 'vip' ? true : !item.vip));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-ink/55 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="package-modal-title"
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', damping: 24, stiffness: 240 }}
            className="max-h-[86vh] w-full max-w-2xl overflow-auto rounded-lg border border-white/30 bg-white p-6 shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-brand">{t('common.included')}</p>
                <h3 id="package-modal-title" className="mt-2 font-serif text-3xl font-bold text-teal-ink">
                  {packageType === 'vip' ? t('common.vipPackage') : t('common.standardPackage')}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-pearl text-teal-ink hover:bg-teal-brand hover:text-white"
                aria-label={t('common.close')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((item) => {
                const Icon = getProductIcon(item);
                return (
                  <div key={item.id} className="flex items-center gap-3 rounded-lg border border-teal-brand/10 bg-pearl p-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-teal-brand shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-bold text-ink">{productLabel(item, i18n.resolvedLanguage)}</span>
                    {packageType === 'vip' && item.vip && (
                      <span className="ms-auto rounded-full bg-gold-brand px-2.5 py-1 text-[11px] font-black text-teal-ink">
                        {t('common.vipOnly')}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
