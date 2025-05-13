import { LanguageType } from '@/contexts/LanguageContext';

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

  const result = { ...baseData };
  const languageTranslations = translations[language];

  // Recursively merge translations with the base data
  for (const key in languageTranslations) {
    if (key in result && typeof result[key] === 'object' && !Array.isArray(result[key]) && 
        typeof languageTranslations[key] === 'object' && !Array.isArray(languageTranslations[key])) {
      // If both are objects, merge recursively
      result[key] = mergeWithTranslations(result[key], { [language]: languageTranslations[key] }, language);
    } else {
      // Otherwise replace the value
      result[key] = languageTranslations[key];
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
