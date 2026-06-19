import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchContent } from '../services/contentService';

export function useContent() {
  const [content, setContent] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    try {
      setStatus('loading');
      setError('');
      setContent(await fetchContent());
      setStatus('ready');
    } catch (nextError) {
      setError(nextError.message || 'Unable to load content.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return useMemo(() => ({ content, setContent, status, error, reload }), [content, status, error, reload]);
}
