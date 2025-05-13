
import { GlobalGood } from '@/lib/types';
import { convertGlobalGoodToStandardFormat } from './dataConverter';

/**
 * Example function to demonstrate conversion of the openimis global good
 * This can be used from the browser console to test the conversion
 */
export async function convertOpenimisData(): Promise<void> {
  try {
    // Load the openimis data
    const response = await fetch('/src/data/global-goods/openimis.json');
    const openimisData = await response.json();
    
    // Convert the data to our standardized format
    const { base, translations } = convertGlobalGoodToStandardFormat(openimisData);
    
    console.log('Base data (English):', base);
    console.log('Translations:', translations);
    
    // To use in the DataConverterTool, you would stringify the result:
    // console.log(JSON.stringify(openimisData));
    
    return { base, translations };
  } catch (error) {
    console.error('Error converting openimis data:', error);
    throw error;
  }
}
