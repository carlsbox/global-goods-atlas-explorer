
import { useTranslation } from 'react-i18next';
import { LanguageCode, MultilingualText } from '@/lib/types';

export function useI18n() {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lang: LanguageCode) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  const getCurrentLanguage = (): LanguageCode => {
    return i18n.language as LanguageCode;
  };

  /**
   * Get text from a multilingual field based on the current language
   */
  const getMultilingualText = (
    field: string | MultilingualText | undefined
  ): string => {
    const currentLang = getCurrentLanguage();
    
    if (field === undefined || field === null) {
      return '';
    }
    
    if (typeof field === 'string') {
      return field;
    }
    
    // Try to get the text in the current language
    if (field[currentLang]) {
      return field[currentLang];
    }
    
    // Fallback to English
    if (field.en) {
      return field.en;
    }
    
    // Last resort - return the first value we find
    const firstValue = Object.values(field)[0];
    return firstValue || '';
  };
  
  /**
   * Get translation with namespace support
   * Ensure we always return a string rather than allowing object returns
   */
  const tPage = (key: string, namespace?: string, options?: any): string => {
    if (namespace) {
      const result = i18n.t(key, { ns: namespace, ...options });
      return typeof result === 'string' ? result : String(result);
    }
    const result = t(key, options);
    return typeof result === 'string' ? result : String(result);
  };
  
  return {
    t,
    tPage,
    i18n,
    language: getCurrentLanguage(),
    changeLanguage,
    getText: getMultilingualText
  };
}
