
import { useTranslation } from 'react-i18next';
import { LanguageCode, MultilingualText } from '@/i18n/types';

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
   */
  const tPage = (key: string, namespace?: string, options?: any) => {
    if (namespace) {
      return i18n.t(key, { ns: namespace, ...options });
    }
    return t(key, options);
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
