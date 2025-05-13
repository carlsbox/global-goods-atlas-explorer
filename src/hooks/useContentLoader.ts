
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
        
        // Handle different content paths with direct imports instead of dynamic paths
        if (contentPath === 'pages/home') {
          const data = await import('@/data/pages/home.json');
          setContent((data as any).default[language]);
        } else if (contentPath === 'pages/navigation') {
          const data = await import('@/data/pages/navigation.json');
          setContent((data as any).default[language]);
        } else if (contentPath === 'pages/about') {
          const data = await import('@/data/pages/about.json');
          setContent((data as any).default[language]);
        } else if (contentPath === 'pages/contact') {
          const data = await import('@/data/pages/contact.json');
          setContent((data as any).default[language]);
        } else if (contentPath === 'pages/cookie') {
          const data = await import('@/data/pages/cookie.json');
          setContent((data as any).default[language]);
        } else if (contentPath === 'pages/privacy') {
          const data = await import('@/data/pages/privacy.json');
          setContent((data as any).default[language]);
        } else if (contentPath === 'pages/terms') {
          const data = await import('@/data/pages/terms.json');
          setContent((data as any).default[language]);
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
