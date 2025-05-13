
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from "@/components/ui/use-toast";

export function useContentLoader(contentPath: string) {
  const { language } = useLanguage();
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        setIsLoading(true);
        
        // Handle different content paths with direct imports
        let data;
        try {
          // Use a dynamic import with the correct path
          data = await import(`../content/${contentPath}.json`);
          
          if (data.default[language]) {
            setContent(data.default[language]);
          } else {
            console.warn(`No translations found for ${contentPath} in ${language}, using English`);
            setContent(data.default.en);
          }
        } catch (importError) {
          console.error(`Failed to import content: ${contentPath}`, importError);
          toast({
            title: "Warning",
            description: `Could not load content for ${contentPath}`,
            variant: "destructive"
          });
          throw importError;
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
