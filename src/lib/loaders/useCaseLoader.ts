
import { LanguageCode } from '@/lib/types';
import { UseCase } from '../types';

// Function to load use case data
export async function loadUseCase(id: string, language: LanguageCode): Promise<UseCase | undefined> {
  try {
    const context = import.meta.glob('../../data/use-cases/*.json', { eager: true });
    const filePath = `../../data/use-cases/${id}.json`;
    
    if (!context[filePath]) {
      console.error(`Use case file not found: ${id}`);
      return undefined;
    }
    
    const module = context[filePath] as any;
    const data = module.default;
    
    // Handle new multilingual format
    if (data[language]) {
      return { ...data[language], id };
    }
    
    // Fallback to English if requested language not available
    if (data.en) {
      console.warn(`Language ${language} not available for use case ${id}, falling back to English`);
      return { ...data.en, id };
    }
    
    // Handle legacy flat format (backward compatibility)
    if (data.title) {
      return { ...data, id };
    }
    
    console.error(`Invalid use case format for: ${id}`);
    return undefined;
  } catch (err) {
    console.error(`Failed to load use case: ${id}`, err);
    return undefined;
  }
}

// Function to load all use cases
export async function loadAllUseCases(language: LanguageCode = 'en'): Promise<UseCase[]> {
  try {
    const context = import.meta.glob('../../data/use-cases/*.json', { eager: true });
    const items = await Promise.all(
      Object.keys(context).map(async (key) => {
        const module = context[key] as any;
        const id = key.split('/').pop()?.replace('.json', '');
        
        if (!id) return null;
        
        try {
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
