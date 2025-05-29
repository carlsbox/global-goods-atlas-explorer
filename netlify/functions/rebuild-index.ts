
import { Handler } from '@netlify/functions';
import { promises as fs } from 'fs';
import path from 'path';

interface GlobalGoodSummary {
  ID: string;
  Name: string;
  Summary?: string;
  Logo?: string;
  GlobalGoodType?: string[]; // Changed to just codes
  Countries?: string[]; // Just ISO codes
  Classifications?: {
    SDGs?: string[]; // Just codes
    WHO?: string[]; // Just codes
    WMO?: string[]; // Just codes
    DPI?: string[]; // Just codes
  };
  Standards?: {
    Health?: string[]; // Just codes
    Interop?: string[]; // Just codes
    Climate?: string[]; // Just codes
  };
}

async function extractSummaryFromGlobalGood(globalGood: any): Promise<GlobalGoodSummary> {
  // Extract GlobalGoodType codes
  const globalGoodTypeCodes = globalGood.GlobalGoodsType?.map((type: any) => 
    typeof type === 'string' ? type : type.code
  ) || [];

  // Extract classification codes
  const classifications = globalGood.Classifications ? {
    SDGs: globalGood.Classifications.SDGs?.map((sdg: any) => 
      typeof sdg === 'string' ? sdg : sdg.code
    ) || [],
    WHO: globalGood.Classifications.WHO?.map((who: any) => 
      typeof who === 'string' ? who : who.code
    ) || [],
    WMO: globalGood.Classifications.WMO?.map((wmo: any) => 
      typeof wmo === 'string' ? wmo : wmo.code
    ) || [],
    DPI: globalGood.Classifications.DPI?.map((dpi: any) => 
      typeof dpi === 'string' ? dpi : dpi.code
    ) || []
  } : undefined;

  // Extract standards codes
  const standards = globalGood.StandardsAndInteroperability ? {
    Health: globalGood.StandardsAndInteroperability.HealthStandards?.map((standard: any) => 
      typeof standard === 'string' ? standard : standard.code
    ) || [],
    Interop: globalGood.StandardsAndInteroperability.Interoperability?.map((standard: any) => 
      typeof standard === 'string' ? standard : standard.code
    ) || [],
    Climate: globalGood.StandardsAndInteroperability.ClimateStandards?.map((standard: any) => 
      typeof standard === 'string' ? standard : standard.code
    ) || []
  } : undefined;

  // Extract country ISO codes
  const countries = globalGood.Reach?.ImplementationCountries?.map((country: any) => {
    if (typeof country === 'string') return country;
    return country.iso_code || country.code;
  }) || [];

  return {
    ID: globalGood.ID,
    Name: globalGood.Name,
    Summary: globalGood.ProductOverview?.Summary,
    Logo: globalGood.Logo,
    GlobalGoodType: globalGoodTypeCodes,
    Countries: countries,
    Classifications: classifications,
    Standards: standards
  };
}

export const handler: Handler = async (event, context) => {
  try {
    console.log('Starting index rebuild process');
    
    // Verify authorization (basic security)
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.includes('Bearer')) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    const individualFilesDir = path.join(process.cwd(), 'public/data/global-goods/individual');
    const indexFilePath = path.join(process.cwd(), 'public/data/global-goods/index.json');

    console.log('Reading individual files from:', individualFilesDir);

    // Read all individual global good files
    const files = await fs.readdir(individualFilesDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    console.log(`Found ${jsonFiles.length} individual files`);

    const summaries: GlobalGoodSummary[] = [];

    for (const file of jsonFiles) {
      try {
        const filePath = path.join(individualFilesDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const globalGood = JSON.parse(fileContent);
        
        const summary = await extractSummaryFromGlobalGood(globalGood);
        summaries.push(summary);
        
        console.log(`Processed: ${globalGood.ID || file}`);
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
        // Continue with other files even if one fails
      }
    }

    // Sort summaries by ID for consistency
    summaries.sort((a, b) => a.ID.localeCompare(b.ID));

    // Write the new index file
    await fs.writeFile(indexFilePath, JSON.stringify(summaries, null, 2));

    console.log(`Index rebuilt successfully with ${summaries.length} entries`);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: `Index rebuilt with ${summaries.length} global goods`,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error rebuilding index:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    };
  }
};
