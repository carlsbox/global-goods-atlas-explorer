
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { UseCase } from '@/lib/types/useCase';
import { LanguageCode } from '@/lib/types';
import { 
  transformCMSGlobalGoodToFlat, 
  transformCMSUseCaseToApp,
  CMSGlobalGood,
  CMSUseCase
} from './cmsTransform';

/**
 * Load Global Good from CMS format
 */
export async function loadCMSGlobalGood(
  id: string, 
  language: LanguageCode = 'en'
): Promise<GlobalGoodFlat | undefined> {
  try {
    // Try to load from CMS format first
    const cmsResponse = await fetch(`/data/global-goods/cms/${id}/${language}.json`);
    if (cmsResponse.ok) {
      const cmsData: CMSGlobalGood = await cmsResponse.json();
      return transformCMSGlobalGoodToFlat(cmsData, language);
    }

    // Fallback to existing flat format
    const response = await fetch(`/data/global-goods/individual/${id}.json`);
    if (response.ok) {
      return await response.json();
    }

    console.warn(`Global Good not found: ${id}`);
    return undefined;
  } catch (error) {
    console.error(`Error loading Global Good ${id}:`, error);
    return undefined;
  }
}

/**
 * Load all Global Goods from CMS format
 */
export async function loadAllCMSGlobalGoods(
  language: LanguageCode = 'en'
): Promise<GlobalGoodFlat[]> {
  try {
    // Try to load from CMS index
    const cmsIndexResponse = await fetch('/data/global-goods/cms/index.json');
    if (cmsIndexResponse.ok) {
      const cmsIndex = await cmsIndexResponse.json();
      const goods = await Promise.all(
        cmsIndex.map((item: { id: string }) => loadCMSGlobalGood(item.id, language))
      );
      return goods.filter(Boolean) as GlobalGoodFlat[];
    }

    // Fallback to existing loader
    const { loadAllGlobalGoodsFlat } = await import('../loaders/globalGoodFlatLoader');
    return await loadAllGlobalGoodsFlat();
  } catch (error) {
    console.error('Error loading Global Goods from CMS:', error);
    return [];
  }
}

/**
 * Load Use Case from CMS format
 */
export async function loadCMSUseCase(
  id: string,
  language: LanguageCode = 'en'
): Promise<UseCase | undefined> {
  try {
    // Try to load from CMS format first
    const cmsResponse = await fetch(`/src/data/use-cases/cms/${id}/${language}.json`);
    if (cmsResponse.ok) {
      const cmsData: CMSUseCase = await cmsResponse.json();
      return transformCMSUseCaseToApp(cmsData, language);
    }

    // Fallback to existing multilingual format
    const { loadUseCase } = await import('../loaders/useCaseLoader');
    return await loadUseCase(id, language);
  } catch (error) {
    console.error(`Error loading Use Case ${id}:`, error);
    return undefined;
  }
}

/**
 * Load all Use Cases from CMS format
 */
export async function loadAllCMSUseCases(
  language: LanguageCode = 'en'
): Promise<UseCase[]> {
  try {
    // Try to load from CMS index
    const cmsIndexResponse = await fetch('/src/data/use-cases/cms/index.json');
    if (cmsIndexResponse.ok) {
      const cmsIndex = await cmsIndexResponse.json();
      const useCases = await Promise.all(
        cmsIndex.map((item: { id: string }) => loadCMSUseCase(item.id, language))
      );
      return useCases.filter(Boolean) as UseCase[];
    }

    // Fallback to existing loader
    const { loadAllUseCases } = await import('../loaders/useCaseLoader');
    return await loadAllUseCases(language);
  } catch (error) {
    console.error('Error loading Use Cases from CMS:', error);
    return [];
  }
}
