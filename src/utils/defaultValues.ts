
import { MultilingualText } from "@/lib/types/commonTypes";

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
 * Create a multilingual text object from a single string value
 */
export function createMultilingualText(text: string): MultilingualText {
  return {
    en: text,
    fr: text,
    es: text
  };
}

/**
 * Ensure that a text value is in multilingual format
 */
export function ensureMultilingualText(text: string | MultilingualText): MultilingualText {
  if (typeof text === 'string') {
    return createMultilingualText(text);
  }
  return text;
}
