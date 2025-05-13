
import { LanguageType } from '@/contexts/LanguageContext';
import { UseCase } from '../types';
import { loadWithTranslations } from '../translationUtils';

// Function to load use case data
export async function loadUseCase(id: string, language: LanguageType): Promise<UseCase | undefined> {
  try {
    return loadWithTranslations<UseCase>(`use-cases/${id}`, `use-cases/translations/${id}`, language);
  } catch (err) {
    console.error(`Failed to load use case: ${id}`, err);
    return undefined;
  }
}

// Function to load all use cases
export async function loadAllUseCases(language: LanguageType = 'en'): Promise<UseCase[]> {
  try {
    const context = import.meta.glob('../../data/use-cases/*.json', { eager: true });
    const items = await Promise.all(
      Object.keys(context).map(async (key) => {
        if (key.includes('/translations/')) {
          return null; // Skip translation files
        }
        
        const module = context[key] as any;
        const id = key.split('/').pop()?.replace('.json', '');
        
        if (!id) return null;
        
        try {
          // Try to load with proper translations
          return await loadUseCase(id, language);
        } catch (e) {
          console.error(`Failed to load use case ${id}:`, e);
          return null;
        }
      })
    );
    
    return items.filter(Boolean) as UseCase[];
  } catch (err) {
    console.error('Failed to load use cases', err);
    return [];
  }
}
