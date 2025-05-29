
import { loadClassificationsByAuthority } from './classificationsReferenceLoader';

export async function loadClassificationsData(language?: string) {
  try {
    // Load all classification authorities
    const [sdgs, who, wmo, dpi] = await Promise.all([
      loadClassificationsByAuthority('sdgs'),
      loadClassificationsByAuthority('who'),
      loadClassificationsByAuthority('wmo'),
      loadClassificationsByAuthority('dpi')
    ]);

    // Convert to flat array format for backward compatibility
    const classifications = [
      ...sdgs,
      ...who,
      ...wmo,
      ...dpi
    ];

    // TODO: Apply language translations when i18n files are available
    if (language && language !== 'en') {
      console.log(`Language ${language} translations not yet implemented for classifications`);
    }

    return classifications;
  } catch (error) {
    console.error('Failed to load classifications data:', error);
    return [];
  }
}
