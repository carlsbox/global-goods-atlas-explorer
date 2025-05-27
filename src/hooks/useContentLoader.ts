
import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/hooks/useI18n';

export function useContentLoader(section: string) {
  const { language } = useI18n();
  
  return useQuery({
    queryKey: ['content', section, language],
    queryFn: async () => {
      try {
        // Load base content
        const baseModule = await import(`../data/pages/${section}.json`);
        const baseData = baseModule.default;
        
        // Try to load language-specific content
        try {
          const langModule = await import(`../data/pages/${section}/translations/${language}.json`);
          const langData = langModule.default;
          
          // Merge base data with language-specific data
          return { ...baseData, ...langData };
        } catch (e) {
          // If no language-specific content found, return base data
          return baseData;
        }
      } catch (e) {
        console.error(`Failed to load content for section ${section}:`, e);
        throw e;
      }
    }
  });
}
