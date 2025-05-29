
import { loadClassificationsByAuthority } from './classificationsReferenceLoader';

export async function loadSDGData(language?: string) {
  try {
    const sdgs = await loadClassificationsByAuthority('sdgs');
    
    // Convert to array format for SDG components
    const sdgArray = Object.values(sdgs);

    // TODO: Apply language translations when i18n files are available
    if (language && language !== 'en') {
      console.log(`Language ${language} translations not yet implemented for SDGs`);
    }

    return sdgArray;
  } catch (error) {
    console.error('Failed to load SDG data:', error);
    return [];
  }
}
