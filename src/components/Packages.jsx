import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { contentText } from '../services/contentService';
import { SectionHeader } from './SectionHeader';
import { TravelBag } from './TravelBag';
import { PackageModal } from './PackageModal';

export function Packages({ products, content }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage;
  const [modal, setModal] = useState(null);

  return (
    <section id="packages" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={contentText(content, 'packages', 'title', language) || t('packages.title')} subtitle={contentText(content, 'packages', 'subtitle', language) || t('packages.subtitle')} />
        <div className="grid gap-6 lg:grid-cols-2">
          <TravelBag
            title={t('common.standardPackage')}
            description={contentText(content, 'packages', 'standard_description', language) || t('packages.standardDescription')}
            imageUrl={content?.packages?.standard_image_url}
            onClick={() => setModal('standard')}
          />
          <TravelBag
            variant="vip"
            title={t('common.vipPackage')}
            description={contentText(content, 'packages', 'vip_description', language) || t('packages.vipDescription')}
            imageUrl={content?.packages?.vip_image_url}
            onClick={() => setModal('vip')}
          />
        </div>
      </div>
      <PackageModal packageType={modal} products={products} onClose={() => setModal(null)} />
    </section>
  );
}
