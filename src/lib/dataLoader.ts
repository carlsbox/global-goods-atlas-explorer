
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { Classification, ClassificationTranslations, CountryData, CountryTranslations, GlobalGood, UseCase } from './types';
import { loadWithTranslations, mergeWithTranslations, ensureMultilingualText } from './translationUtils';
import { LanguageType } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { convertLegacyGlobalGood } from './migrationUtils';

// Import the updated useContentLoader from the hooks directory
export { useContentLoader } from '@/hooks/useContentLoader';

// Updated classification loader
export async function loadClassificationsData(language: LanguageType) {
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
export async function loadGlobalGood(id: string, language: LanguageType): Promise<GlobalGood | undefined> {
  try {
    // Try to load from the standardized file structure first
    try {
      // Load base data (English)
      const baseModule = await import(`../data/global-goods/${id}.json`);
      const baseData = baseModule.default;
      
      // Try to load translations if not English
      if (language !== 'en') {
        try {
          const translationsModule = await import(`../data/global-goods/translations/${id}/${language}.json`);
          const translations = translationsModule.default;
          
          // Create a copy of the base data
          const result = { ...baseData };
          
          // Apply translations to multilingual fields
          for (const field of ['name', 'summary', 'description', 'details']) {
            if (translations[field]) {
              result[field] = {
                ...ensureMultilingualText(baseData[field]),
                [language]: translations[field]
              };
            }
          }
          
          // Apply translations to other fields if present
          for (const key in translations) {
            if (!['name', 'summary', 'description', 'details'].includes(key)) {
              result[key] = translations[key];
            }
          }
          
          return result as GlobalGood;
        } catch (e) {
          // If translations not found, just return base data
          console.warn(`Translations not found for ${id} in ${language}, using base data`);
          
          // Ensure multilingual fields are properly formatted
          const result = { ...baseData };
          ['name', 'summary', 'description', 'details'].forEach(field => {
            result[field] = ensureMultilingualText(baseData[field]);
          });
          
          return result as GlobalGood;
        }
      }
      
      // For English, ensure multilingual fields are properly formatted
      const result = { ...baseData };
      ['name', 'summary', 'description', 'details'].forEach(field => {
        result[field] = ensureMultilingualText(baseData[field]);
      });
      
      return result as GlobalGood;
    } catch (e) {
      // If standard format not found, try the legacy format
      console.warn(`Could not load ${id}.json in standard format, trying legacy format`);
      
      try {
        // Try the "-new" suffix format
        const legacyNewModule = await import(`../data/global-goods/${id}-new.json`);
        const baseData = legacyNewModule.default;
        
        if (language !== 'en') {
          try {
            const translationsModule = await import(`../data/global-goods/translations/${id}-new/${language}.json`);
            const translations = translationsModule.default;
            
            return { ...baseData, ...translations } as GlobalGood;
          } catch (e) {
            // If translations not found, just return base data
            console.warn(`Translations not found for ${id}-new in ${language}, using base data`);
            return baseData as GlobalGood;
          }
        }
        
        return baseData as GlobalGood;
      } catch (e) {
        // If new-legacy format not found, try the very old format
        console.warn(`Could not load ${id}-new.json, trying very legacy format`);
        const veryLegacyModule = await import(`../data/global-goods/${id}.json`);
        
        if (veryLegacyModule.default[language]) {
          // Old format with languages as keys
          return convertLegacyGlobalGood(veryLegacyModule.default[language]) as GlobalGood;
        } else {
          // Fallback to English
          return convertLegacyGlobalGood(veryLegacyModule.default.en || veryLegacyModule.default) as GlobalGood;
        }
      }
    }
  } catch (err) {
    console.error(`Failed to load global good: ${id}`, err);
    return undefined;
  }
}

// Function to load all global goods
export async function loadAllGlobalGoods(language: LanguageType = 'en'): Promise<GlobalGood[]> {
  try {
    // This dynamically imports all global goods
    const context = import.meta.glob('../data/global-goods/*.json', { eager: true });
    const items = await Promise.all(
      Object.keys(context).map(async (key) => {
        if (key.includes('/translations/')) {
          return null; // Skip translation files
        }
        
        const module = context[key] as any;
        const id = key.split('/').pop()?.replace('.json', '').replace('-new', '');
        
        if (!id) return null;
        
        try {
          // Try to load with proper translations
          return await loadGlobalGood(id, language);
        } catch (e) {
          console.error(`Failed to load global good ${id}:`, e);
          return null;
        }
      })
    );
    
    return items.filter(Boolean) as GlobalGood[];
  } catch (err) {
    console.error('Failed to load global goods', err);
    return [];
  }
}

// Function to load use case data
export async function loadUseCase(id: string, language: LanguageType): Promise<UseCase | undefined> {
  try {
    return loadWithTranslations<UseCase>(`use-cases/${id}`, `use-cases/translations/${id}`, language);
  } catch (err) {
    console.error(`Failed to load use case: ${id}`, err);
    return undefined;
  }
}

// Function to load all use cases
export async function loadAllUseCases(language: LanguageType = 'en'): Promise<UseCase[]> {
  try {
    const context = import.meta.glob('../data/use-cases/*.json', { eager: true });
    const items = await Promise.all(
      Object.keys(context).map(async (key) => {
        if (key.includes('/translations/')) {
          return null; // Skip translation files
        }
        
        const module = context[key] as any;
        const id = key.split('/').pop()?.replace('.json', '');
        
        if (!id) return null;
        
        try {
          // Try to load with proper translations
          return await loadUseCase(id, language);
        } catch (e) {
          console.error(`Failed to load use case ${id}:`, e);
          return null;
        }
      })
    );
    
    return items.filter(Boolean) as UseCase[];
  } catch (err) {
    console.error('Failed to load use cases', err);
    return [];
  }
}

// Updated function to load countries data with translations
export async function loadCountriesData(language: LanguageType = 'en') {
  try {
    // Load base country data
    const baseData = await import('../data/countries/countries.json');
    const countries: CountryData[] = (baseData as any).default.countries;
    
    // Try to load translations if not English
    if (language !== 'en') {
      try {
        const translationsModule = await import(`../data/countries/translations/${language}.json`);
        const translations: CountryTranslations = translationsModule.default;
        
        // Apply translations to country names
        return countries.map(country => {
          if (translations[country.code]?.name) {
            // Create a new object with the translated name
            return {
              ...country,
              name: {
                ...country.name,
                short: translations[country.code].name
              }
            };
          }
          return country;
        });
      } catch (e) {
        console.warn(`No translations found for countries in language: ${language}`);
      }
    }
    
    return countries;
  } catch (err) {
    console.error('Failed to load countries data', err);
    return [];
  }
}
