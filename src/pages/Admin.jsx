import { Download, Edit3, FileText, Image, Package, Plus, RefreshCw, Save, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '../components/Logo';
import { exportContentJson, normalizeContent } from '../services/contentService';
import { createEmptyProduct, exportProductsJson, normalizeProducts, productLabel } from '../services/productService';

const productTextFields = [
  ['name_fa', 'نام فارسی'],
  ['name_ar', 'نام عربی'],
  ['name_en', 'English name'],
  ['description_fa', 'توضیح فارسی'],
  ['description_ar', 'توضیح عربی'],
  ['description_en', 'English description'],
  ['image_url', 'Product image URL']
];

const contentSections = [
  {
    id: 'brand',
    title: 'Brand',
    fields: [
      ['name_fa', 'Brand name FA'],
      ['name_ar', 'Brand name AR'],
      ['name_en', 'Brand name EN'],
      ['logo_url', 'Logo image URL']
    ]
  },
  {
    id: 'hero',
    title: 'Hero',
    fields: [
      ['eyebrow_fa', 'Eyebrow FA'],
      ['eyebrow_ar', 'Eyebrow AR'],
      ['eyebrow_en', 'Eyebrow EN'],
      ['headline_fa', 'Headline FA'],
      ['headline_ar', 'Headline AR'],
      ['headline_en', 'Headline EN'],
      ['subheadline_fa', 'Subheadline FA'],
      ['subheadline_ar', 'Subheadline AR'],
      ['subheadline_en', 'Subheadline EN'],
      ['trust_fa', 'Trust text FA'],
      ['trust_ar', 'Trust text AR'],
      ['trust_en', 'Trust text EN'],
      ['image_url', 'Hero image URL']
    ]
  },
  {
    id: 'packages',
    title: 'Packages',
    fields: [
      ['title_fa', 'Title FA'],
      ['title_ar', 'Title AR'],
      ['title_en', 'Title EN'],
      ['subtitle_fa', 'Subtitle FA'],
      ['subtitle_ar', 'Subtitle AR'],
      ['subtitle_en', 'Subtitle EN'],
      ['standard_description_fa', 'Standard description FA'],
      ['standard_description_ar', 'Standard description AR'],
      ['standard_description_en', 'Standard description EN'],
      ['vip_description_fa', 'VIP description FA'],
      ['vip_description_ar', 'VIP description AR'],
      ['vip_description_en', 'VIP description EN'],
      ['standard_image_url', 'Standard package image URL'],
      ['vip_image_url', 'VIP package image URL']
    ]
  },
  {
    id: 'contact',
    title: 'Contact',
    fields: [
      ['title_fa', 'Title FA'],
      ['title_ar', 'Title AR'],
      ['title_en', 'Title EN'],
      ['subtitle_fa', 'Subtitle FA'],
      ['subtitle_ar', 'Subtitle AR'],
      ['subtitle_en', 'Subtitle EN'],
      ['phone', 'Phone'],
      ['whatsapp', 'WhatsApp'],
      ['address_fa', 'Address FA'],
      ['address_ar', 'Address AR'],
      ['address_en', 'Address EN'],
      ['image_url', 'Contact image URL']
    ]
  },
  {
    id: 'seo',
    title: 'SEO',
    fields: [
      ['title_fa', 'SEO title FA'],
      ['title_ar', 'SEO title AR'],
      ['title_en', 'SEO title EN'],
      ['description_fa', 'SEO description FA'],
      ['description_ar', 'SEO description AR'],
      ['description_en', 'SEO description EN']
    ]
  }
];

export function Admin({
  products,
  setProducts,
  productsStatus,
  onReloadProducts,
  content,
  setContent,
  contentStatus,
  onReloadContent
}) {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('content');
  const [draft, setDraft] = useState(createEmptyProduct());
  const [editingId, setEditingId] = useState('');
  const [query, setQuery] = useState('');

  const safeContent = useMemo(() => normalizeContent(content || {}), [content]);
  const filteredProducts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return products;
    return products.filter((product) =>
      [product.id, product.name_fa, product.name_ar, product.name_en, product.category].some((value) => String(value).toLowerCase().includes(needle))
    );
  }, [products, query]);

  const updateContent = (section, key, value) => {
    setContent((current) => normalizeContent({ ...current, [section]: { ...(current?.[section] || {}), [key]: value } }));
  };

  const updateDraft = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const resetForm = () => {
    setDraft(createEmptyProduct());
    setEditingId('');
  };

  const saveProduct = (event) => {
    event.preventDefault();
    const nextDraft = normalizeProducts([{ ...draft, id: draft.id || slugify(draft.name_en || draft.name_fa || draft.name_ar) }])[0];
    if (!nextDraft.id || !nextDraft.name_en) return;
    setProducts((current) => {
      const withoutExisting = current.filter((product) => product.id !== editingId && product.id !== nextDraft.id);
      return [...withoutExisting, nextDraft].sort((a, b) => a.id.localeCompare(b.id));
    });
    resetForm();
  };

  const editProduct = (product) => {
    setDraft(product);
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteProduct = (id) => {
    setProducts((current) => current.filter((product) => product.id !== id));
    if (editingId === id) resetForm();
  };

  const toggleProduct = (id, key) => {
    setProducts((current) => current.map((product) => (product.id === id ? { ...product, [key]: !product[key] } : product)));
  };

  return (
    <main className="min-h-screen bg-pearl">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#083F3F,#0D6E6E)] px-4 pb-12 pt-8 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-islamic-grid bg-[length:26px_26px] opacity-30" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="rounded-2xl bg-white p-3 shadow-gold">
              <Logo />
            </div>
            <a href={import.meta.env.BASE_URL} className="rounded-full border border-white/25 px-5 py-3 text-sm font-black text-white hover:bg-white/10">
              Back to site
            </a>
          </div>
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-gold-soft">/admin</p>
            <h1 className="mt-3 font-serif text-4xl font-bold sm:text-6xl">Ben Musa Admin Panel</h1>
            <p className="mt-5 text-base leading-8 text-white/76">
              Manage products, titles, section text, contact data, logo URL, and image URLs. Export JSON files and replace them in `public/data`.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          <Tab active={activeTab === 'content'} icon={FileText} label="Content & Images" onClick={() => setActiveTab('content')} />
          <Tab active={activeTab === 'products'} icon={Package} label="Products" onClick={() => setActiveTab('products')} />
        </div>

        {activeTab === 'content' ? (
          <ContentEditor content={safeContent} status={contentStatus} onReload={onReloadContent} onExport={() => exportContentJson(safeContent)} onChange={updateContent} />
        ) : (
          <ProductEditor
            products={products}
            filteredProducts={filteredProducts}
            query={query}
            setQuery={setQuery}
            draft={draft}
            editingId={editingId}
            status={productsStatus}
            language={i18n.resolvedLanguage}
            updateDraft={updateDraft}
            resetForm={resetForm}
            saveProduct={saveProduct}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
            toggleProduct={toggleProduct}
            onReload={onReloadProducts}
          />
        )}
      </section>
    </main>
  );
}

function ContentEditor({ content, status, onReload, onExport, onChange }) {
  return (
    <div className="grid gap-6">
      <Toolbar title="Website content" subtitle="Titles, copy, contact info, SEO, logo, and image URLs." status={status} onReload={onReload} onExport={onExport} exportLabel="Export content.json" />
      {contentSections.map((section) => (
        <motion.article key={section.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-teal-brand/10 bg-white p-5 shadow-luxury">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-teal-brand text-white">
              <Image className="h-5 w-5" />
            </span>
            <h2 className="font-serif text-2xl font-bold text-teal-ink">{section.title}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {section.fields.map(([key, label]) => (
              <TextControl key={key} label={label} value={content[section.id]?.[key] || ''} onChange={(value) => onChange(section.id, key, value)} long={key.includes('description') || key.includes('subtitle')} />
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function ProductEditor(props) {
  const {
    products,
    filteredProducts,
    query,
    setQuery,
    draft,
    editingId,
    status,
    language,
    updateDraft,
    resetForm,
    saveProduct,
    editProduct,
    deleteProduct,
    toggleProduct,
    onReload
  } = props;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
      <motion.form initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} onSubmit={saveProduct} className="h-fit rounded-lg border border-teal-brand/10 bg-white p-5 shadow-luxury">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-gold-brand">{editingId ? 'Edit product' : 'Add product'}</p>
            <h2 className="font-serif text-2xl font-bold text-teal-ink">Product details</h2>
          </div>
          <button type="button" onClick={resetForm} className="rounded-full bg-pearl px-4 py-2 text-sm font-black text-ink">Clear</button>
        </div>
        <div className="grid gap-4">
          <TextControl label="Product ID" value={draft.id} onChange={(value) => updateDraft('id', slugify(value))} />
          <TextControl label="Category" value={draft.category} onChange={(value) => updateDraft('category', slugify(value) || 'general')} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Toggle checked={draft.vip} label="VIP item" onChange={() => updateDraft('vip', !draft.vip)} />
            <Toggle checked={draft.women} label="Women category" onChange={() => updateDraft('women', !draft.women)} />
          </div>
          {productTextFields.map(([key, label]) => (
            <TextControl key={key} label={label} value={draft[key]} onChange={(value) => updateDraft(key, value)} long={key.startsWith('description')} />
          ))}
        </div>
        <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-brand px-6 py-4 font-black text-white shadow-luxury transition hover:-translate-y-1 hover:bg-teal-ink">
          {editingId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {editingId ? 'Save changes' : 'Add product'}
        </button>
      </motion.form>

      <div className="rounded-lg border border-teal-brand/10 bg-white p-5 shadow-luxury">
        <Toolbar title="Products JSON" subtitle={`${products.length} products loaded from products.json`} status={status} onReload={onReload} onExport={() => exportProductsJson(products)} exportLabel="Export products.json" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="mb-5 w-full rounded-lg border border-teal-brand/15 bg-pearl px-4 py-3 outline-none focus:border-gold-brand focus:bg-white focus:ring-4 focus:ring-gold-brand/20" />
        <div className="grid gap-3">
          {filteredProducts.map((product) => (
            <article key={product.id} className="rounded-lg border border-teal-brand/10 bg-pearl p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-xl font-bold text-teal-ink">{productLabel(product, language)}</h3>
                    {product.vip && <Badge label="VIP" />}
                    {product.women && <Badge label="Women" teal />}
                  </div>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-ink/45">{product.id} · {product.category}</p>
                  <p className="mt-3 text-sm leading-6 text-ink/68">{product.description_en}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button type="button" onClick={() => toggleProduct(product.id, 'vip')} className="rounded-full bg-gold-brand/20 px-3 py-2 text-xs font-black text-teal-ink">Toggle VIP</button>
                  <button type="button" onClick={() => toggleProduct(product.id, 'women')} className="rounded-full bg-teal-brand/10 px-3 py-2 text-xs font-black text-teal-ink">Toggle Women</button>
                  <IconButton label="Edit" onClick={() => editProduct(product)} icon={Edit3} />
                  <IconButton label="Delete" onClick={() => deleteProduct(product.id)} icon={Trash2} danger />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Toolbar({ title, subtitle, status, onReload, onExport, exportLabel }) {
  return (
    <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.16em] text-gold-brand">Local JSON source</p>
        <h2 className="font-serif text-2xl font-bold text-teal-ink">{title}</h2>
        <p className="mt-1 text-sm text-ink/60">{subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={onReload} className="inline-flex items-center gap-2 rounded-full bg-pearl px-4 py-2 text-sm font-black text-ink">
          <RefreshCw className={`h-4 w-4 ${status === 'loading' ? 'animate-spin' : ''}`} />
          Reload
        </button>
        <button type="button" onClick={onExport} className="inline-flex items-center gap-2 rounded-full bg-gold-brand px-4 py-2 text-sm font-black text-teal-ink">
          <Download className="h-4 w-4" />
          {exportLabel}
        </button>
      </div>
    </div>
  );
}

function TextControl({ label, value, onChange, long = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink">{label}</span>
      {long ? (
        <textarea rows="3" value={value || ''} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-teal-brand/15 bg-pearl px-4 py-3 outline-none focus:border-gold-brand focus:bg-white focus:ring-4 focus:ring-gold-brand/20" />
      ) : (
        <input value={value || ''} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-teal-brand/15 bg-pearl px-4 py-3 outline-none focus:border-gold-brand focus:bg-white focus:ring-4 focus:ring-gold-brand/20" />
      )}
    </label>
  );
}

function Tab({ active, icon: Icon, label, onClick }) {
  return (
    <button type="button" onClick={onClick} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black transition ${active ? 'bg-teal-brand text-white shadow-luxury' : 'bg-white text-teal-ink hover:bg-teal-brand/10'}`}>
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function Toggle({ checked, label, onChange }) {
  return (
    <button type="button" onClick={onChange} className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm font-black ${checked ? 'border-gold-brand bg-gold-brand/15 text-teal-ink' : 'border-teal-brand/10 bg-pearl text-ink/70'}`} aria-pressed={checked}>
      {label}
      <span className={`h-5 w-9 rounded-full p-0.5 transition ${checked ? 'bg-teal-brand' : 'bg-ink/20'}`}>
        <span className={`block h-4 w-4 rounded-full bg-white transition ${checked ? 'translate-x-4 rtl:-translate-x-4' : ''}`} />
      </span>
    </button>
  );
}

function IconButton({ icon: Icon, label, onClick, danger = false }) {
  return (
    <button type="button" onClick={onClick} className={`grid h-9 w-9 place-items-center rounded-full bg-white ${danger ? 'text-red-600' : 'text-teal-brand'}`} aria-label={label}>
      <Icon className="h-4 w-4" />
    </button>
  );
}

function Badge({ label, teal = false }) {
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${teal ? 'bg-teal-brand text-white' : 'bg-gold-brand text-teal-ink'}`}>{label}</span>;
}

function slugify(value) {
  return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
