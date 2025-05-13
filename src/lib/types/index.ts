
// Re-export all types from the individual files
export * from './commonTypes';
export * from './globalGood';
export * from './useCase';
export * from './country';
export * from './classification';

// Add LanguageType for consistency
export type LanguageCode = 'en' | 'fr' | 'es';
export interface MultilingualText {
  [language: string]: string;
}
