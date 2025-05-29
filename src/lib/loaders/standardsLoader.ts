
import { loadStandards } from './referenceDataLoader';

export async function loadStandardsData() {
  try {
    const standards = await loadStandards();
    
    // Convert object to array format for backward compatibility
    const standardsArray = Object.values(standards);
    
    return standardsArray;
  } catch (error) {
    console.error('Failed to load standards data:', error);
    return [];
  }
}
