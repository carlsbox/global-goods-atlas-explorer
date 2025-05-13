
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

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
        const data = await import(`../data/pages/${contentPath}.json`);
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

// Function to load global good data
export async function loadGlobalGood(id: string, language: string) {
  try {
    const data = await import(`../data/global-goods/${id}.json`);
    // Add type assertion to fix the TypeScript error
    return (data as any).default[language];
  } catch (err) {
    console.error(`Failed to load global good: ${id}`, err);
    return null;
  }
}

// Function to load all global goods
export async function loadAllGlobalGoods() {
  try {
    // This dynamically imports all global goods
    const context = import.meta.glob('../data/global-goods/*.json');
    const items = await Promise.all(
      Object.keys(context).map(async (key) => {
        const module = await context[key]();
        // Add type assertion to fix the TypeScript error
        const id = key.split('/').pop()?.replace('.json', '');
        return { id, ...(module as any).default.en }; // Using English as default for the list
      })
    );
    return items;
  } catch (err) {
    console.error('Failed to load global goods', err);
    return [];
  }
}

// Function to load use case data
export async function loadUseCase(id: string, language: string) {
  try {
    const data = await import(`../data/use-cases/${id}.json`);
    return (data as any).default[language];
  } catch (err) {
    console.error(`Failed to load use case: ${id}`, err);
    return null;
  }
}

// Function to load all use cases
export async function loadAllUseCases() {
  try {
    const context = import.meta.glob('../data/use-cases/*.json');
    const items = await Promise.all(
      Object.keys(context).map(async (key) => {
        const module = await context[key]();
        const id = key.split('/').pop()?.replace('.json', '');
        return { id, ...(module as any).default.en }; // Using English as default for the list
      })
    );
    return items;
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

// Function to load classifications data
export async function loadClassificationsData(language: string) {
  try {
    const data = await import('../data/classifications/classifications.json');
    return (data as any).default[language];
  } catch (err) {
    console.error('Failed to load classifications data', err);
    return null;
  }
}
