import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Logo({ compact = false }) {
  const { t } = useTranslation();

  return (
    <a href="#home" className="group flex items-center gap-3" aria-label={t('common.brand')}>
      <span className="relative grid h-11 w-11 place-items-center rounded-full bg-teal-brand text-white shadow-gold ring-1 ring-gold-brand/40">
        <Sparkles className="h-5 w-5 text-gold-soft" aria-hidden="true" />
        <span className="absolute inset-1 rounded-full border border-white/20" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-2xl font-bold text-teal-ink">{t('common.brand')}</span>
          <span className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-gold-brand to-transparent" />
        </span>
      )}
    </a>
  );
}
