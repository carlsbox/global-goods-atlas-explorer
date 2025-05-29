
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { LanguageCode } from '@/lib/types';
import { 
  transformEnhancedCMSGlobalGoodToFlat,
  EnhancedCMSGlobalGood,
  validateGlobalGoodData
} from './enhancedCmsTransform';

/**
 * Load Global Good from enhanced CMS format
 */
export async function loadEnhancedCMSGlobalGood(
  id: string, 
  language: LanguageCode = 'en'
): Promise<GlobalGoodFlat | undefined> {
  try {
    console.log(`Loading enhanced CMS global good: ${id}`);
    
    // Try to load from CMS-managed files first
    const cmsResponse = await fetch(`/data/global-goods/individual/${id}.json`);
    if (cmsResponse.ok) {
      const cmsData: EnhancedCMSGlobalGood = await cmsResponse.json();
      
      // Validate the data
      const validation = validateGlobalGoodData(cmsData);
      if (!validation.isValid) {
        console.warn(`Validation errors for ${id}:`, validation.errors);
        // Continue with transform but log warnings
      }
      
      return transformEnhancedCMSGlobalGoodToFlat(cmsData, language);
    }

    console.warn(`Global Good not found: ${id}`);
    return undefined;
  } catch (error) {
    console.error(`Error loading Global Good ${id}:`, error);
    return undefined;
  }
}

/**
 * Load all Global Goods from enhanced CMS format
 */
export async function loadAllEnhancedCMSGlobalGoods(
  language: LanguageCode = 'en'
): Promise<GlobalGoodFlat[]> {
  try {
    console.log('Loading all enhanced CMS global goods');
    
    // Load the index to get all available global goods
    const indexResponse = await fetch('/data/global-goods/index.json');
    if (indexResponse.ok) {
      const index = await indexResponse.json();
      const goods = await Promise.all(
        index.map((item: { ID: string }) => loadEnhancedCMSGlobalGood(item.ID, language))
      );
      return goods.filter(Boolean) as GlobalGoodFlat[];
    }

    // Fallback: try to load individual files if index fails
    const fallbackIds = ['meditrack', 'commcare', 'dhis2', 'openmrs'];
    const goods = await Promise.all(
      fallbackIds.map(id => loadEnhancedCMSGlobalGood(id, language))
    );
    return goods.filter(Boolean) as GlobalGoodFlat[];
  } catch (error) {
    console.error('Error loading Global Goods from enhanced CMS:', error);
    return [];
  }
}

/**
 * Save Global Good to CMS format (for future CMS integration)
 */
export async function saveGlobalGoodToCMS(
  globalGood: GlobalGoodFlat
): Promise<{ success: boolean; errors?: string[] }> {
  try {
    // Validate before saving
    const validation = validateGlobalGoodData(globalGood);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    // In a real CMS integration, this would save to the CMS backend
    // For now, we'll just validate and return success
    console.log('Global Good would be saved to CMS:', globalGood.ID);
    
    return { success: true };
  } catch (error) {
    console.error('Error saving Global Good to CMS:', error);
    return { success: false, errors: ['Failed to save to CMS'] };
  }
}

/**
 * Get available global good IDs from the system
 */
export async function getAvailableGlobalGoodIds(): Promise<string[]> {
  try {
    const indexResponse = await fetch('/data/global-goods/index.json');
    if (indexResponse.ok) {
      const index = await indexResponse.json();
      return index.map((item: { ID: string }) => item.ID);
    }
    return [];
  } catch (error) {
    console.error('Error loading global good IDs:', error);
    return [];
  }
}
