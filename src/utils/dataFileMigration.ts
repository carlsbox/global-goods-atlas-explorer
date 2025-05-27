
/**
 * Utility functions for migrating data between different storage formats
 * This is intended for use during the migration phase
 */

import { GlobalGood } from '@/lib/types';
import { GlobalGoodIndexItem } from '@/lib/loaders/globalGoodHybridLoader';

/**
 * Extracts index data from full global goods data
 */
export function extractIndexData(globalGood: any): GlobalGoodIndexItem {
  return {
    id: globalGood.CoreMetadata?.ID || globalGood.ID || '',
    name: globalGood.CoreMetadata?.Name || globalGood.Name || '',
    summary: globalGood.ProductOverview?.Summary || '',
    logo: globalGood.CoreMetadata?.Logo || globalGood.Logo || '',
    sectors: globalGood.CoreMetadata?.GlobalGoodsType?.map((type: any) => 
      typeof type === 'string' ? type : type.code
    ) || [],
    countries: globalGood.Reach?.ImplementationCountries?.map((country: any) => 
      country.iso_code
    ) || [],
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Converts a global good from application format to storage format
 */
export function convertToStorageFormat(globalGood: GlobalGood): any {
  // Convert our application format back to storage format
  return {
    CoreMetadata: {
      ID: globalGood.id,
      Name: globalGood.name,
      Logo: globalGood.logo,
      Website: globalGood.coreMetadata.website,
      GlobalGoodsType: globalGood.coreMetadata.globalGoodsType,
      SourceCode: globalGood.coreMetadata.sourceCode,
      License: globalGood.coreMetadata.license,
      DemoLink: globalGood.coreMetadata.demoLink,
      Contact: globalGood.coreMetadata.contact
    },
    ProductOverview: {
      Summary: globalGood.summary,
      Description: globalGood.description,
      Details: globalGood.details,
      PrimaryFunctionality: globalGood.productOverview?.primaryFunctionality || '',
      Users: globalGood.productOverview?.users || '',
      Languages: globalGood.productOverview?.languages || [],
      Screenshots: globalGood.productOverview?.screenshots || []
    },
    // Include other sections as needed
    Reach: globalGood.reach ? {
      SummaryOfReach: globalGood.reach.summary,
      NumberOfImplementations: globalGood.reach.implementations,
      ImplementationCountries: globalGood.countries?.map(countryCode => ({
        iso_code: countryCode,
        type: "State"
      }))
    } : undefined,
    Maturity: globalGood.maturity ? {
      SummaryOfMaturity: globalGood.maturity.level,
      Scores: [globalGood.maturity.scores].filter(Boolean)
    } : undefined
  };
}

/**
 * Function to fully migrate global goods data from legacy format to hybrid format
 * This would be run as an admin operation during migration
 */
export async function migrateToHybridFormat() {
  try {
    // Step 1: Fetch all data from the legacy file
    const response = await fetch('/data/global-goods/globalgood_db.json');
    if (!response.ok) throw new Error('Failed to fetch legacy data');
    const legacyData = await response.json();
    
    // Step 2: Extract index data
    const indexData = legacyData.map(extractIndexData);
    
    // Step 3: In a production environment, this would save each item to its own file
    // and save the index. Here we just log what would be done.
    console.log('Index data to save:', indexData);
    console.log(`Would save ${legacyData.length} individual files`);
    
    return {
      success: true,
      message: `Successfully prepared migration for ${legacyData.length} global goods`,
      indexData
    };
  } catch (error) {
    console.error('Migration failed:', error);
    return {
      success: false,
      message: `Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error
    };
  }
}
