import { ArrowDown, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { contentText } from '../services/contentService';
import { Logo } from './Logo';

export function Hero({ content }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage;

  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden bg-pearl pt-28">
      <div className="absolute inset-0 -z-10 bg-islamic-grid bg-[length:26px_26px]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[74%] bg-[radial-gradient(circle_at_70%_16%,rgba(201,162,39,.28),transparent_30%),linear-gradient(135deg,#0D6E6E_0%,#083F3F_62%,#102525_100%)]" />
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-white"
        >
          <div className="mb-8 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-gold-soft shadow-xl backdrop-blur-xl">
            {contentText(content, 'hero', 'eyebrow', language) || t('hero.eyebrow')}
          </div>
          <div className="mb-8 inline-flex w-full">
            <div className="rounded-2xl bg-white/95 p-4 shadow-luxury">
              <Logo />
            </div>
          </div>
          <h1 className="max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            {contentText(content, 'hero', 'headline', language) || t('hero.headline')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-white/82">{contentText(content, 'hero', 'subheadline', language) || t('hero.subheadline')}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#packages"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-brand px-7 py-4 text-sm font-black text-teal-ink shadow-gold transition hover:-translate-y-1 hover:bg-gold-soft focus:outline-none focus:ring-4 focus:ring-gold-soft/60"
            >
              {t('common.viewPackages')}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/86">
              <CheckCircle2 className="h-5 w-5 text-gold-soft" aria-hidden="true" />
              {contentText(content, 'hero', 'trust', language) || t('hero.trust')}
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md"
          aria-hidden="true"
        >
          <div className="absolute inset-8 rounded-[2rem] border border-white/25 bg-white/10 shadow-2xl backdrop-blur-2xl" />
          <div className="absolute inset-x-4 top-10 h-72 rounded-full bg-gold-brand/20 blur-3xl" />
          {content?.hero?.image_url ? (
            <img src={content.hero.image_url} alt="" className="absolute bottom-12 left-1/2 h-[70%] w-[78%] -translate-x-1/2 rounded-[2rem] object-cover shadow-2xl" />
          ) : (
            <div className="travel-bag hero-bag absolute bottom-12 left-1/2 w-[78%] -translate-x-1/2" />
          )}
          <div className="absolute right-2 top-16 rounded-2xl border border-white/20 bg-white/15 px-5 py-4 text-white shadow-xl backdrop-blur-xl">
            <p className="text-3xl font-black text-gold-soft">VIP</p>
            <p className="text-xs font-bold uppercase tracking-[0.18em]">{t('common.vipPackage')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
