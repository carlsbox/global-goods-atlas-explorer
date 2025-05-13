
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LanguageType = 'en' | 'fr' | 'es';

interface TranslationCache {
  [section: string]: {
    [language: string]: any;
    base?: any;
    translations?: {
      [language: string]: any;
    };
  };
}

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: string, section?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Get language from localStorage or default to 'en'
  const [language, setLanguage] = useState<LanguageType>(() => {
    const savedLanguage = localStorage.getItem('language') as LanguageType;
    return savedLanguage || 'en';
  });

  // Cache for content
  const [contentCache, setContentCache] = useState<TranslationCache>({});

  useEffect(() => {
    // Save language to localStorage when it changes
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string, section?: string): string => {
    try {
      const keys = key.split('.');
      
      if (!section) {
        // If no specific section is provided, try to find the key in any loaded content
        for (const contentSection in contentCache) {
          if (contentCache[contentSection] && 
              contentCache[contentSection][language]) {
            let result = contentCache[contentSection][language];
            for (const k of keys) {
              if (result && result[k] !== undefined) {
                result = result[k];
              } else {
                result = undefined;
                break;
              }
            }
            
            if (result !== undefined) {
              return typeof result === 'string' ? result : JSON.stringify(result);
            }
          }
        }
      } else {
        // If section is specified, try to load that content if not already cached
        if (!contentCache[section]) {
          // This will be loaded asynchronously, so for now return a placeholder
          Promise.all([
            import(`../content/${section}.json`).catch(() => ({ default: null })),
            import(`../content/${section}/translations/${language}.json`).catch(() => ({ default: null }))
          ]).then(([baseModule, translationsModule]) => {
            if (baseModule.default) {
              setContentCache(prev => ({
                ...prev,
                [section]: {
                  base: baseModule.default,
                  translations: translationsModule.default ? {
                    [language]: translationsModule.default
                  } : undefined,
                  [language]: baseModule.default[language] || baseModule.default.en
                }
              }));
            }
          }).catch(error => {
            console.error(`Failed to load content for section ${section}:`, error);
          });
          
          return key; // Return the key as fallback while loading
        }

        // Navigate through the nested keys to find the translation
        if (contentCache[section] && contentCache[section][language]) {
          let result = contentCache[section][language];
          for (const k of keys) {
            if (result && result[k] !== undefined) {
              result = result[k];
            } else {
              return key; // Key not found, return the key itself as fallback
            }
          }
          return typeof result === 'string' ? result : JSON.stringify(result);
        }
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
    
    return key; // Return the key itself if translation not found
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
