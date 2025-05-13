
import { LanguageType } from '@/contexts/LanguageContext';
import { GlobalGood } from '../types';
import { ensureMultilingualText } from '../translationUtils';
import { convertLegacyGlobalGood } from '../migrationUtils';

// Function to load global good data with translations
export async function loadGlobalGood(id: string, language: LanguageType): Promise<GlobalGood | undefined> {
  try {
    // Try to load from the standardized file structure first
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
    } catch (e) {
      // If standard format not found, try the legacy format
      console.warn(`Could not load ${id}.json in standard format, trying legacy format`);
      
      try {
        // Try the "-new" suffix format
        const legacyNewModule = await import(`../../data/global-goods/${id}-new.json`);
        const baseData = legacyNewModule.default;
        
        if (language !== 'en') {
          try {
            const translationsModule = await import(`../../data/global-goods/translations/${id}-new/${language}.json`);
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
        const veryLegacyModule = await import(`../../data/global-goods/${id}.json`);
        
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
    const context = import.meta.glob('../../data/global-goods/*.json', { eager: true });
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
