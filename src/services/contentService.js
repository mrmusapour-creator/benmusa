import { downloadJson } from './productService';

const CONTENT_URL = `${import.meta.env.BASE_URL}data/content.json`;

export async function fetchContent() {
  const response = await fetch(CONTENT_URL, { cache: 'no-cache' });
  if (!response.ok) {
    throw new Error(`Unable to load content.json (${response.status})`);
  }
  return normalizeContent(await response.json());
}

export function normalizeContent(content) {
  return {
    brand: {
      name_fa: text(content?.brand?.name_fa, 'بن موسی'),
      name_ar: text(content?.brand?.name_ar, 'بن موسى'),
      name_en: text(content?.brand?.name_en, 'Ben Musa'),
      logo_url: text(content?.brand?.logo_url)
    },
    hero: {
      eyebrow_fa: text(content?.hero?.eyebrow_fa),
      eyebrow_ar: text(content?.hero?.eyebrow_ar),
      eyebrow_en: text(content?.hero?.eyebrow_en),
      headline_fa: text(content?.hero?.headline_fa),
      headline_ar: text(content?.hero?.headline_ar),
      headline_en: text(content?.hero?.headline_en),
      subheadline_fa: text(content?.hero?.subheadline_fa),
      subheadline_ar: text(content?.hero?.subheadline_ar),
      subheadline_en: text(content?.hero?.subheadline_en),
      trust_fa: text(content?.hero?.trust_fa),
      trust_ar: text(content?.hero?.trust_ar),
      trust_en: text(content?.hero?.trust_en),
      image_url: text(content?.hero?.image_url)
    },
    packages: {
      title_fa: text(content?.packages?.title_fa),
      title_ar: text(content?.packages?.title_ar),
      title_en: text(content?.packages?.title_en),
      subtitle_fa: text(content?.packages?.subtitle_fa),
      subtitle_ar: text(content?.packages?.subtitle_ar),
      subtitle_en: text(content?.packages?.subtitle_en),
      standard_description_fa: text(content?.packages?.standard_description_fa),
      standard_description_ar: text(content?.packages?.standard_description_ar),
      standard_description_en: text(content?.packages?.standard_description_en),
      vip_description_fa: text(content?.packages?.vip_description_fa),
      vip_description_ar: text(content?.packages?.vip_description_ar),
      vip_description_en: text(content?.packages?.vip_description_en),
      standard_image_url: text(content?.packages?.standard_image_url),
      vip_image_url: text(content?.packages?.vip_image_url)
    },
    contact: {
      title_fa: text(content?.contact?.title_fa),
      title_ar: text(content?.contact?.title_ar),
      title_en: text(content?.contact?.title_en),
      subtitle_fa: text(content?.contact?.subtitle_fa),
      subtitle_ar: text(content?.contact?.subtitle_ar),
      subtitle_en: text(content?.contact?.subtitle_en),
      phone: text(content?.contact?.phone),
      whatsapp: text(content?.contact?.whatsapp),
      address_fa: text(content?.contact?.address_fa),
      address_ar: text(content?.contact?.address_ar),
      address_en: text(content?.contact?.address_en),
      image_url: text(content?.contact?.image_url)
    },
    seo: {
      title_fa: text(content?.seo?.title_fa),
      title_ar: text(content?.seo?.title_ar),
      title_en: text(content?.seo?.title_en),
      description_fa: text(content?.seo?.description_fa),
      description_ar: text(content?.seo?.description_ar),
      description_en: text(content?.seo?.description_en)
    }
  };
}

export function contentText(content, section, field, language) {
  return content?.[section]?.[`${field}_${language}`] || content?.[section]?.[`${field}_en`] || '';
}

export function exportContentJson(content) {
  downloadJson('content.json', normalizeContent(content));
}

export const githubContentRepository = {
  async load() {
    return fetchContent();
  },
  async save() {
    throw new Error('GitHub API persistence is not configured yet.');
  }
};

function text(value, fallback = '') {
  return String(value || fallback).trim();
}
