
import { Handler } from '@netlify/functions';
import { promises as fs } from 'fs';
import path from 'path';

interface GlobalGoodSummary {
  ID: string;
  Name: string;
  Summary?: string;
  Logo?: string;
  GlobalGoodType?: Array<{
    code?: string;
    title?: string;
    description?: string;
  }>;
  Countries?: string[];
  Classifications?: {
    SDGs?: Array<{ code: string; title: string; }>;
    WHO?: Array<{ code: string; title: string; group_code: string; group_name: string; authority: string; }>;
    WMO?: Array<any>;
    DPI?: Array<{ code: string; title: string; group_code: string; group_name: string; authority: string; }>;
  };
  StandardsAndInteroperability?: {
    HealthStandards?: Array<{ code: string; domain: string; link: string; name: string; description: string; }>;
    Interoperability?: Array<{ code: string; type: string; link: string; name: string; description: string; }>;
    ClimateStandards?: Array<any>;
  };
  ImplementationCountries?: Array<{
    iso_code: string;
    type: string;
    names: { en: { short: string; formal: string; } };
  }>;
}

async function extractSummaryFromGlobalGood(globalGood: any): Promise<GlobalGoodSummary> {
  return {
    ID: globalGood.ID,
    Name: globalGood.Name,
    Summary: globalGood.ProductOverview?.Summary,
    Logo: globalGood.Logo,
    GlobalGoodType: globalGood.GlobalGoodsType,
    Countries: globalGood.Reach?.ImplementationCountries?.map((country: any) => country.iso_code),
    Classifications: globalGood.Classifications,
    StandardsAndInteroperability: globalGood.StandardsAndInteroperability,
    ImplementationCountries: globalGood.Reach?.ImplementationCountries
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
