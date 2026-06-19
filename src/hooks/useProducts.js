import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../services/productService';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    try {
      setStatus('loading');
      setError('');
      const nextProducts = await fetchProducts();
      setProducts(nextProducts);
      setStatus('ready');
    } catch (nextError) {
      setError(nextError.message || 'Unable to load products.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return useMemo(
    () => ({
      products,
      setProducts,
      status,
      error,
      reload
    }),
    [products, status, error, reload]
  );
}
