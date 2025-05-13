
export type LanguageCode = 'en' | 'fr' | 'es';

export interface MultilingualText {
  [language: string]: string;
}

export interface TypedGlobalGood {
  id: string;
  name: MultilingualText;
  summary: MultilingualText;
  description: MultilingualText;
  details: MultilingualText;
  // ... other properties remain the same
}

export interface I18nNamespace {
  translation: Record<string, unknown>;
}

export interface I18nResources {
  [language: string]: I18nNamespace;
}
