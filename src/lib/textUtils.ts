
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Gets text from a multilingual field based on the current language
 */
export function getTextFromLanguageObject(
  field: string | { [key: string]: string } | undefined,
  language: string = 'en'
): string {
  if (field === undefined || field === null) {
    return '';
  }
  
  if (typeof field === 'string') {
    return field;
  }
  
  // Try to get the text in the current language
  if (field[language]) {
    return field[language];
  }
  
  // Fallback to English
  if (field.en) {
    return field.en;
  }
  
  // Last resort - return the first value we find
  const firstValue = Object.values(field)[0];
  return firstValue || '';
}

/**
 * React hook to handle multilingual fields based on the current language
 */
export function useMultilingualText() {
  const { language } = useLanguage();
  
  const getText = (field: string | { [key: string]: string } | undefined): string => {
    return getTextFromLanguageObject(field, language);
  };
  
  return { getText };
}
