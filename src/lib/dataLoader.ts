import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { Classification, ClassificationTranslations, GlobalGood, UseCase } from './types';
import { loadWithTranslations, mergeWithTranslations } from './translationUtils';
import { LanguageType } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

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
    // First try to load from the new file structure
    try {
      const baseModule = await import(`../data/global-goods/${id}-new.json`);
      const baseData = baseModule.default;
      
      // Try to load translations
      try {
        const translationsModule = await import(`../data/global-goods/translations/${id}-new/${language}.json`);
        const translations = translationsModule.default;
        
        // Merge base data with translations
        return { ...baseData, ...translations } as GlobalGood;
      } catch (e) {
        // If translations not found, just return base data
        console.warn(`Translations not found for ${id}-new in ${language}, using base data`);
        return baseData as GlobalGood;
      }
    } catch (e) {
      // If new structure not found, try the old structure
      console.warn(`Could not load ${id}-new.json, trying legacy format`);
      const legacyModule = await import(`../data/global-goods/${id}.json`);
      return legacyModule.default[language] as GlobalGood;
    }
  } catch (err) {
    console.error(`Failed to load global good: ${id}`, err);
    return undefined;
  }
}

// Function to load all global goods
export async function loadAllGlobalGoods(): Promise<GlobalGood[]> {
  try {
    // This dynamically imports all global goods
    const context = import.meta.glob('../data/global-goods/*.json', { eager: true });
    const items = await Promise.all(
      Object.keys(context).map(async (key) => {
        if (key.includes('/translations/')) {
          return null; // Skip translation files
        }
        
        const module = context[key] as any;
        
        // Handle different file structures
        const id = key.split('/').pop()?.replace('.json', '').replace('-new', '');
        
        // Check if it's new format or old format
        if (module.default.en) {
          // Old format with languages as keys
          return { id, ...module.default.en } as GlobalGood;
        } else {
          // New format with direct properties
          return { id, ...module.default } as GlobalGood;
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
export async function loadAllUseCases(): Promise<UseCase[]> {
  try {
    const context = import.meta.glob('../data/use-cases/*.json', { eager: true });
    const items = await Promise.all(
      Object.keys(context).map(async (key) => {
        if (key.includes('/translations/')) {
          return null; // Skip translation files
        }
        
        const module = context[key] as any;
        const id = key.split('/').pop()?.replace('.json', '');
        return { id, ...module.default.en } as UseCase; // Using English as default for the list
      })
    );
    return items.filter(Boolean) as UseCase[];
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
