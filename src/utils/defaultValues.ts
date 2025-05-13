
import { MultilingualText } from "@/lib/types";

/**
 * Create a default multilingual text object with empty values for required languages
 */
export function createEmptyMultilingualText(): MultilingualText {
  return {
    en: '',
    fr: '',
    es: ''
  };
}

/**
 * Helper to ensure a value is a proper MultilingualText object
 */
export function ensureMultilingualText(value: string | MultilingualText | undefined): MultilingualText {
  if (value === undefined || value === null) {
    return createEmptyMultilingualText();
  }
  
  if (typeof value === 'string') {
    return {
      en: value,
      fr: value,
      es: value
    };
  }
  
  return value;
}
