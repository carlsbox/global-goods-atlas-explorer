
import { LanguageType } from '@/contexts/LanguageContext';
import { GlobalGood } from '../types';
import { ensureMultilingualText } from '../translationUtils';

// Function to load global good data with translations
export async function loadGlobalGood(id: string, language: LanguageType): Promise<GlobalGood | undefined> {
  try {
    // Load base data (English)
    const baseModule = await import(`../../data/global-goods/${id}.json`);
    const baseData = baseModule.default;
    
    // Try to load translations if not English
    if (language !== 'en') {
      try {
        const translationsModule = await import(`../../data/global-goods/translations/${id}/${language}.json`);
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
  } catch (err) {
    console.error(`Failed to load global good: ${id}`, err);
    return undefined;
  }
}

// Function to load all global goods
export async function loadAllGlobalGoods(language: LanguageType = 'en'): Promise<GlobalGood[]> {
  try {
    // This dynamically imports all global goods
    const context = import.meta.glob('../../data/global-goods/*.json', { eager: true });
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
