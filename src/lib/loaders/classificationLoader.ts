
import { LanguageType } from '@/contexts/LanguageContext';
import { Classification, ClassificationTranslations } from '../types/globalGood/classification';

// Load classifications data with translations
export async function loadClassificationsData(language: LanguageType) {
  try {
    // Load base classifications
    const baseData = await import('../../data/classifications/classifcations.json');
    const classifications: Classification[] = baseData.default;
    
    // Try to load translations
    let translations: ClassificationTranslations | null = null;
    try {
      const translationsModule = await import(`../../data/classifications/translations/${language}.json`);
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
