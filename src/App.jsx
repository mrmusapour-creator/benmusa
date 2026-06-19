import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { InstallPrompt } from './components/InstallPrompt';
import { Logo } from './components/Logo';
import { contentText } from './services/contentService';
import { useContent } from './hooks/useContent';
import { useProducts } from './hooks/useProducts';
import { Admin } from './pages/Admin';
import { Home } from './pages/Home';

function App() {
  const { t, i18n } = useTranslation();
  const { products, setProducts, status, error, reload } = useProducts();
  const contentState = useContent();
  const searchParams = new URLSearchParams(window.location.search);
  const fallbackRoute = decodeURIComponent(searchParams.get('route') || '');
  const isAdmin = window.location.pathname.replace(/\/$/, '').endsWith('/admin') || fallbackRoute === '/admin';
  const appStatus = status === 'error' || contentState.status === 'error' ? 'error' : status === 'loading' || contentState.status === 'loading' ? 'loading' : 'ready';
  const appError = error || contentState.error;

  useEffect(() => {
    const title = contentText(contentState.content, 'seo', 'title', i18n.resolvedLanguage) || t('meta.title');
    const metaDescription = contentText(contentState.content, 'seo', 'description', i18n.resolvedLanguage) || t('meta.description');
    document.title = title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', metaDescription);
  }, [t, i18n.language, contentState.content, i18n.resolvedLanguage]);

  if (isAdmin) {
    return (
      <Admin
        products={products}
        setProducts={setProducts}
        productsStatus={status}
        onReloadProducts={reload}
        content={contentState.content}
        setContent={contentState.setContent}
        contentStatus={contentState.status}
        onReloadContent={contentState.reload}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main>
        {appStatus === 'loading' ? <ProductsLoading /> : appStatus === 'error' ? <ProductsError message={appError} onRetry={() => { reload(); contentState.reload(); }} /> : <Home products={products} content={contentState.content} />}
      </main>
      <footer className="bg-teal-ink px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="rounded-2xl bg-white p-3">
            <Logo />
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/72">{contentText(contentState.content, 'hero', 'subheadline', i18n.resolvedLanguage) || t('footer.line')}</p>
        </div>
      </footer>
      <InstallPrompt />
    </div>
  );
}

export default App;

function ProductsError({ message, onRetry }) {
  return (
    <section className="grid min-h-screen place-items-center bg-pearl px-4 pt-28">
      <div className="max-w-xl rounded-lg border border-teal-brand/10 bg-white p-6 text-center shadow-luxury">
        <h1 className="font-serif text-3xl font-bold text-teal-ink">Products could not load</h1>
        <p className="mt-4 text-sm leading-7 text-ink/70">{message}</p>
        <button type="button" onClick={onRetry} className="mt-6 rounded-full bg-teal-brand px-6 py-3 font-black text-white">
          Retry
        </button>
      </div>
    </section>
  );
}

function ProductsLoading() {
  return (
    <section className="grid min-h-screen place-items-center bg-pearl px-4 pt-28">
      <div className="max-w-xl rounded-lg border border-teal-brand/10 bg-white p-6 text-center shadow-luxury">
        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-teal-brand/15 border-t-gold-brand" />
        <h1 className="font-serif text-3xl font-bold text-teal-ink">Loading Ben Musa</h1>
      </div>
    </section>
  );
}
