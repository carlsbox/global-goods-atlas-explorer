
import { MultilingualText } from "@/lib/types/commonTypes";
import { createMultilingualText, ensureMultilingualText } from "@/lib/translationUtils";

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

// Re-export these functions from translationUtils for backward compatibility
export { createMultilingualText, ensureMultilingualText };
