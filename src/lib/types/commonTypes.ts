
export interface MultilingualText {
  [language: string]: string;
}

export type LanguageCode = 'en' | 'fr' | 'es';

export type TranslationNamespace = 
  | 'translation' 
  | 'home' 
  | 'about' 
  | 'contact' 
  | 'globalGoods'
  | 'globalGoodDetails' 
  | 'useCases' 
  | 'map' 
  | 'admin' 
  | 'notFound' 
  | 'privacy' 
  | 'terms' 
  | 'cookie'
  | 'navigation'
  | 'climateServices';
