
import { LanguageType } from '@/contexts/LanguageContext';

interface SDGData {
  [key: string]: {
    code?: string;
    title: string;
  };
}

export async function loadSDGData(language: LanguageType = 'en') {
  try {
    // Load SDG data for the specified language
    const sdgModule = await import(`../../i18n/locales/${language}/sdg.json`);
    const sdgData: SDGData = sdgModule.default;
    
    // Convert to array format with consistent structure
    return Object.entries(sdgData).map(([code, data]) => ({
      code,
      title: data.title,
      // Add these for consistency with other classifications
      group_code: 'SDG',
      group_name: 'Sustainable Development Goals',
      authority: 'UN'
    }));
  } catch (err) {
    console.error(`Failed to load SDG data for language: ${language}`, err);
    // Fallback to English if the requested language fails
    if (language !== 'en') {
      return loadSDGData('en');
    }
    return [];
  }
}
