
import { MultilingualText } from "@/lib/types/commonTypes";
import { useI18n } from "@/hooks/useI18n";

/**
 * Helper function to extract text from a multilingual object
 */
export function getTextFromObject(
  textObject: string | MultilingualText | undefined, 
  language: string = 'en'
): string {
  if (textObject === undefined || textObject === null) {
    return '';
  }
  
  if (typeof textObject === 'string') {
    return textObject;
  }
  
  // Try to get the text in the specified language
  if (textObject[language]) {
    return textObject[language];
  }
  
  // Fallback to English
  if (textObject.en) {
    return textObject.en;
  }
  
  // Last resort - return first available text
  const firstValue = Object.values(textObject)[0];
  return firstValue || '';
}

/**
 * React hook for getting multilingual text
 */
export function useMultilingualText() {
  const { language } = useI18n();
  
  const getText = (textObject: string | MultilingualText | undefined): string => {
    return getTextFromObject(textObject, language);
  };
  
  return { getText };
}
