
import { LanguageType } from '@/contexts/LanguageContext';
import { MultilingualText } from '@/lib/types';

/**
 * Merges base object with language-specific translations
 */
export function mergeWithTranslations<T extends Record<string, any>>(
  baseData: T,
  translations: Record<string, any> | null | undefined,
  language: LanguageType
): T {
  if (!translations || !translations[language]) {
    return { ...baseData };
  }

  const result = { ...baseData } as T;
  const languageTranslations = translations[language];

  // Recursively merge translations with the base data
  for (const key in languageTranslations) {
    if (
      Object.prototype.hasOwnProperty.call(result, key) &&
      typeof result[key as keyof T] === 'object' && 
      !Array.isArray(result[key as keyof T]) && 
      typeof languageTranslations[key] === 'object' && 
      !Array.isArray(languageTranslations[key])
    ) {
      // If both are objects, merge recursively
      result[key as keyof T] = mergeWithTranslations(
        result[key as keyof T] as Record<string, any>,
        { [language]: languageTranslations[key] },
        language
      ) as any;
    } else {
      // Otherwise replace the value
      result[key as keyof T] = languageTranslations[key];
    }
  }

  return result;
}

/**
 * Loads a base data file and merges it with translations
 */
export async function loadWithTranslations<T>(
  basePath: string,
  translationPath: string,
  language: LanguageType
): Promise<T> {
  try {
    // Load base data (typically English)
    const baseModule = await import(`../data/${basePath}.json`);
    const baseData = baseModule.default;
    
    // Try to load translations
    try {
      const translationsModule = await import(`../data/${translationPath}/${language}.json`);
      const translations = translationsModule.default;
      
      // Merge base data with translations
      return mergeWithTranslations(baseData, { [language]: translations }, language);
    } catch (e) {
      // If translations not found, just return base data
      console.warn(`Translations not found for ${translationPath}/${language}, using base data`);
      return baseData;
    }
  } catch (e) {
    console.error(`Failed to load data: ${basePath}`, e);
    throw e;
  }
}

/**
 * Creates a multilingual text object with the same value for all supported languages
 */
export function createMultilingualText(text: string): MultilingualText {
  return {
    en: text,
    fr: text,
    es: text
  };
}

/**
 * Ensures a value is a proper MultilingualText object
 * Converts string values to MultilingualText objects
 */
export function ensureMultilingualText(value: string | MultilingualText | undefined): MultilingualText {
  if (!value) {
    return { en: '', fr: '', es: '' };
  }
  
  if (typeof value === 'string') {
    return createMultilingualText(value);
  }
  
  // Ensure all languages are present
  return {
    en: value.en || '',
    fr: value.fr || value.en || '',
    es: value.es || value.en || ''
  };
}
