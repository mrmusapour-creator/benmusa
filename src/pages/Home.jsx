import { Comparison } from '../components/Comparison';
import { Contact } from '../components/Contact';
import { Features } from '../components/Features';
import { Hero } from '../components/Hero';
import { Packages } from '../components/Packages';
import { ProductCatalog } from '../components/ProductCatalog';

export function Home({ products, content }) {
  return (
    <>
      <Hero content={content} />
      <Packages products={products} content={content} />
      <Comparison products={products} />
      <ProductCatalog products={products} />
      <Features />
      <Contact content={content} />
    </>
  );
}
