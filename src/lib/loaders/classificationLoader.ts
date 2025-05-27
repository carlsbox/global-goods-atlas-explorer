
export async function loadClassificationsData(language?: string) {
  try {
    const module = await import('../../data/classifications/classifcations.json');
    const baseData = module.default;
    
    // If no language specified or language is 'en', return base data
    if (!language || language === 'en') {
      return baseData;
    }
    
    // Try to load translations for other languages
    try {
      const translationModule = await import(`../../data/classifications/translations/${language}.json`);
      const translations = translationModule.default;
      
      // Merge base data with translations
      return baseData.map(item => {
        const translation = translations.find(t => t.code === item.code);
        return translation ? { ...item, ...translation } : item;
      });
    } catch (translationError) {
      console.warn(`No translations found for language: ${language}, falling back to base data`);
      return baseData;
    }
  } catch (error) {
    console.error('Failed to load classifications data:', error);
    return [];
  }
}
