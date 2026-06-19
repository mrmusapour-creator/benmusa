import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getProductIcon } from '../data';
import { productDescription, productLabel } from '../services/productService';
import { SectionHeader } from './SectionHeader';

export function ProductCatalog({ products }) {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState('all');
  const filteredItems = filter === 'all' ? products : products.filter((item) => (filter === 'women' ? item.women || item.category === 'women' : item.category === 'men'));
  const categories = ['all', 'men', 'women'];

  return (
    <section id="catalog" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('categories.title')} subtitle={t('categories.subtitle')} />
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={`category-card group rounded-lg border p-5 text-start shadow-sm transition ${
                filter === category ? 'border-gold-brand bg-teal-brand text-white shadow-gold' : 'border-teal-brand/10 bg-pearl text-ink hover:-translate-y-1'
              }`}
            >
              <span className={`illustration ${category === 'women' ? 'woman' : category === 'men' ? 'man' : 'all'}`} />
              <span className="mt-4 block font-serif text-2xl font-bold">
                {category === 'all' ? t('categories.all') : t(`categories.${category}`)}
              </span>
              {category !== 'all' && <span className="mt-2 block text-sm leading-6 opacity-75">{t(`categories.${category}Description`)}</span>}
            </button>
          ))}
        </div>
        <SectionHeader title={t('catalog.title')} subtitle={t('catalog.subtitle')} />
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence>
            {filteredItems.map((item) => {
              const Icon = getProductIcon(item);
              return (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  className="rounded-lg border border-teal-brand/10 bg-pearl p-5 shadow-sm"
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    {item.image_url ? (
                      <img src={item.image_url} alt="" className="h-14 w-14 rounded-full object-cover shadow-sm" />
                    ) : (
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-teal-brand shadow-sm">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                    )}
                    <span className="flex flex-wrap justify-end gap-2">
                      {item.vip && <Badge variant="vip">{t('common.vip')}</Badge>}
                      {item.women && <Badge>{t('common.women')}</Badge>}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-ink">{productLabel(item, i18n.resolvedLanguage)}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/65">{productDescription(item, i18n.resolvedLanguage)}</p>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Badge({ children, variant = 'women' }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${variant === 'vip' ? 'bg-gold-brand text-teal-ink' : 'bg-teal-brand text-white'}`}>
      {children}
    </span>
  );
}
