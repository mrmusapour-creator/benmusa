const PRODUCTS_URL = `${import.meta.env.BASE_URL}data/products.json`;

export async function fetchProducts() {
  const response = await fetch(PRODUCTS_URL, { cache: 'no-cache' });
  if (!response.ok) {
    throw new Error(`Unable to load products.json (${response.status})`);
  }
  const products = await response.json();
  return normalizeProducts(products);
}

export function normalizeProducts(products) {
  if (!Array.isArray(products)) return [];
  return products.map((product) => ({
    id: String(product.id || '').trim(),
    name_fa: String(product.name_fa || '').trim(),
    name_ar: String(product.name_ar || '').trim(),
    name_en: String(product.name_en || '').trim(),
    category: String(product.category || 'general').trim() || 'general',
    vip: Boolean(product.vip),
    women: Boolean(product.women),
    image_url: String(product.image_url || '').trim(),
    description_fa: String(product.description_fa || '').trim(),
    description_ar: String(product.description_ar || '').trim(),
    description_en: String(product.description_en || '').trim()
  }));
}

export function createEmptyProduct() {
  return {
    id: '',
    name_fa: '',
    name_ar: '',
    name_en: '',
    category: 'general',
    vip: false,
    women: false,
    image_url: '',
    description_fa: '',
    description_ar: '',
    description_en: ''
  };
}

export function productLabel(product, language) {
  return product[`name_${language}`] || product.name_en || product.name_fa || product.id;
}

export function productDescription(product, language) {
  return product[`description_${language}`] || product.description_en || product.description_fa || '';
}

export function exportProductsJson(products) {
  downloadJson('products.json', normalizeProducts(products));
}

export function downloadJson(filename, data) {
  const payload = JSON.stringify(data, null, 2);
  const blob = new Blob([payload], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export const githubProductRepository = {
  async load() {
    return fetchProducts();
  },
  async save() {
    throw new Error('GitHub API persistence is not configured yet.');
  }
};
