import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from "@/hooks/use-toast";

export function useContentLoader(contentPath: string) {
  const { language } = useLanguage();
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        setIsLoading(true);
        
        // Handle path construction based on what's passed in
        let adjustedPath = contentPath;
        if (contentPath.startsWith('pages/')) {
          // If path already includes pages/, keep it as is
          adjustedPath = contentPath;
        } else if (contentPath.includes('/')) {
          // If path has other directories but not pages/, keep as is
          adjustedPath = contentPath;
        } else {
          // For simple names, try directly
          adjustedPath = contentPath;
        }

        // Try loading the content with proper error handling
        let data;
        try {
          // First try direct import from content root
          data = await import(`../content/${adjustedPath}.json`);
        } catch (directImportError) {
          // If direct import fails, try with pages/ prefix
          try {
            data = await import(`../content/pages/${adjustedPath}.json`);
          } catch (pageImportError) {
            console.error(`Failed to import from both paths for ${contentPath}`, pageImportError);
            toast({
              title: "Warning",
              description: `Could not load content for ${contentPath}`,
              variant: "destructive"
            });
            throw pageImportError;
          }
        }
        
        if (data.default[language]) {
          setContent(data.default[language]);
        } else {
          console.warn(`No translations found for ${contentPath} in ${language}, using English`);
          setContent(data.default.en);
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
