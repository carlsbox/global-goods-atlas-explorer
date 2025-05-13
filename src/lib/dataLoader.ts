
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { Classification, ClassificationTranslations } from './types';
import { loadWithTranslations, mergeWithTranslations } from './translationUtils';

export function useContentLoader(contentPath: string) {
  const { language } = useLanguage();
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        setIsLoading(true);
        // Dynamic import for JSON content
        const data = await import(`../content/${contentPath}.json`);
        setContent(data.default[language]);
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

// Updated classification loader
export async function loadClassificationsData(language: string) {
  try {
    // Load base classifications
    const baseData = await import('../data/classifications/base.json');
    const classifications: Classification[] = baseData.default;
    
    // Try to load translations
    let translations: ClassificationTranslations | null = null;
    try {
      const translationsModule = await import(`../data/classifications/translations/${language}.json`);
      translations = translationsModule.default;
    } catch (e) {
      console.warn(`No translations found for classifications in language: ${language}`);
    }
    
    // Apply translations if available
    if (translations) {
      return classifications.map(item => {
        const translatedItem = { ...item };
        
        // Apply title translation if available
        if (translations[item.code]?.title) {
          translatedItem.title = translations[item.code].title;
        }
        
        // Apply group name translation if available
        if (translations.group_names?.[item.group_code]) {
          translatedItem.group_name = translations.group_names[item.group_code];
        }
        
        return translatedItem;
      });
    }
    
    return classifications;
  } catch (err) {
    console.error('Failed to load classifications data', err);
    return [];
  }
}

// Function to load global good data with translations
export async function loadGlobalGood(id: string, language: string) {
  try {
    return loadWithTranslations(`global-goods/${id}`, `global-goods/translations/${id}`, language);
  } catch (err) {
    console.error(`Failed to load global good: ${id}`, err);
    return null;
  }
}

// Function to load all global goods
export async function loadAllGlobalGoods() {
  try {
    // This dynamically imports all global goods
    const context = import.meta.glob('../data/global-goods/*.json', { eager: true });
    const items = await Promise.all(
      Object.keys(context).map(async (key) => {
        if (key.includes('/translations/')) {
          return null; // Skip translation files
        }
        
        const module = context[key] as any;
        // Add type assertion to fix the TypeScript error
        const id = key.split('/').pop()?.replace('.json', '');
        return { id, ...module.default.en }; // Using English as default for the list
      })
    );
    return items.filter(Boolean) as any[];
  } catch (err) {
    console.error('Failed to load global goods', err);
    return [];
  }
}

// Function to load use case data
export async function loadUseCase(id: string, language: string) {
  try {
    return loadWithTranslations(`use-cases/${id}`, `use-cases/translations/${id}`, language);
  } catch (err) {
    console.error(`Failed to load use case: ${id}`, err);
    return null;
  }
}

// Function to load all use cases
export async function loadAllUseCases() {
  try {
    const context = import.meta.glob('../data/use-cases/*.json', { eager: true });
    const items = await Promise.all(
      Object.keys(context).map(async (key) => {
        if (key.includes('/translations/')) {
          return null; // Skip translation files
        }
        
        const module = context[key] as any;
        const id = key.split('/').pop()?.replace('.json', '');
        return { id, ...module.default.en }; // Using English as default for the list
      })
    );
    return items.filter(Boolean) as any[];
  } catch (err) {
    console.error('Failed to load use cases', err);
    return [];
  }
}

// Function to load countries data
export async function loadCountriesData() {
  try {
    const data = await import('../data/countries/countries.json');
    // Make sure we return the array of countries, not the object with a countries property
    return (data as any).default.countries;
  } catch (err) {
    console.error('Failed to load countries data', err);
    return [];
  }
}
