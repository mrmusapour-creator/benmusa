import { Check, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { productLabel } from '../services/productService';
import { SectionHeader } from './SectionHeader';

export function Comparison({ products }) {
  const { t, i18n } = useTranslation();

  return (
    <section className="bg-pearl py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('comparison.title')} subtitle={t('comparison.subtitle')} />
        <div className="overflow-x-auto rounded-lg border border-teal-brand/10 bg-white shadow-luxury">
          <table className="min-w-[680px] w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-teal-brand text-white">
              <tr>
                <th className="px-5 py-4 text-start font-black">{t('comparison.product')}</th>
                <th className="px-5 py-4 text-center font-black">{t('common.standard')}</th>
                <th className="px-5 py-4 text-center font-black">{t('common.vip')}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-pearl/70'}>
                  <td className="px-5 py-4 font-bold text-ink">{productLabel(item, i18n.resolvedLanguage)}</td>
                  <td className="px-5 py-4 text-center">
                    <Status enabled={!item.vip} />
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Status enabled gold={item.vip} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Status({ enabled, gold }) {
  const { t } = useTranslation();
  if (!enabled) {
    return (
      <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-ink/5 text-ink/35" title={t('common.no')}>
        <Minus className="h-4 w-4" aria-hidden="true" />
      </span>
    );
  }
  return (
    <span
      className={`inline-grid h-9 w-9 place-items-center rounded-full ${
        gold ? 'bg-gold-brand text-teal-ink' : 'bg-teal-brand text-white'
      }`}
      title={t('common.yes')}
    >
      <Check className="h-5 w-5" aria-hidden="true" />
    </span>
  );
}
