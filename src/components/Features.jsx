import { useTranslation } from 'react-i18next';
import { featureItems } from '../data';
import { SectionHeader } from './SectionHeader';

export function Features() {
  const { t } = useTranslation();

  return (
    <section id="features" className="bg-[linear-gradient(135deg,#083F3F,#0D6E6E)] py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('features.title')} subtitle={t('features.subtitle')} inverse />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {featureItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.id} className="rounded-lg border border-white/15 bg-white/10 p-5 text-center shadow-xl backdrop-blur-xl">
                <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold-brand text-teal-ink">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-serif text-xl font-bold">{t(`features.${item.id}`)}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
