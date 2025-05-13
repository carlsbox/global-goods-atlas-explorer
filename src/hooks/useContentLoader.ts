
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function useContentLoader(contentPath: string) {
  const { language } = useLanguage();
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        setIsLoading(true);
        // Import content from the new data directory structure
        if (contentPath.startsWith('pages/')) {
          const data = await import(`../data/${contentPath}.json`);
          setContent(data.default[language]);
        } else {
          throw new Error(`Content path not supported: ${contentPath}`);
        }
        setError(null);
      } catch (err) {
        console.error(`Failed to load content: ${contentPath}`, err);
        setError(err instanceof Error ? err : new Error('Failed to load content'));
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [contentPath, language]);

  return { content, isLoading, error };
}
