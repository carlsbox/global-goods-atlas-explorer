import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to extract and transform data from individual files to index format
function transformToIndexFormat(individualData) {
  return {
    ID: individualData.ID,
    Name: individualData.Name,
    Summary: individualData.ProductOverview?.Summary || individualData.Summary || "",
    Logo: individualData.Logo || "",
    GlobalGoodType: individualData.GlobalGoodsType || individualData.GlobalGoodType || ["software"],
    ClimateHealth: individualData.ClimateHealth || false,
    NumberOfImplementations: individualData.Reach?.NumberOfImplementations || individualData.NumberOfImplementations || 0,
    Countries: individualData.Reach?.ImplementationCountries || individualData.Countries || [],
    Classifications: {
      SDGs: individualData.Classifications?.SDGs || [],
      WHO: individualData.Classifications?.WHO || [],
      WMO: individualData.Classifications?.WMO || [],
      DPI: individualData.Classifications?.DPI || []
    },
    Standards: {
      Health: individualData.StandardsAndInteroperability?.HealthStandards || individualData.Standards?.Health || [],
      Interop: individualData.StandardsAndInteroperability?.Interoperability || individualData.Standards?.Interop || [],
      Climate: individualData.StandardsAndInteroperability?.ClimateStandards || individualData.Standards?.Climate || []
    }
  };
}

// Function to try to extract implementation count from various sources
function extractImplementationCount(individualData) {
  // Try to extract from Reach.NumberOfImplementations first
  if (individualData.Reach?.NumberOfImplementations && individualData.Reach.NumberOfImplementations > 0) {
    return individualData.Reach.NumberOfImplementations;
  }
  
  // Try to extract from NumberOfImplementations
  if (individualData.NumberOfImplementations && individualData.NumberOfImplementations > 0) {
    return individualData.NumberOfImplementations;
  }
  
  // Try to extract from Reach.SummaryOfReach text
  if (individualData.Reach?.SummaryOfReach) {
    const summary = individualData.Reach.SummaryOfReach.toLowerCase();
    
    // Look for patterns like "over X countries", "X+ countries", "X countries"
    const countryPattern = /(\d+)\+?\s*countries?/i;
    const countryMatch = summary.match(countryPattern);
    if (countryMatch) {
      return parseInt(countryMatch[1]);
    }
    
    // Look for patterns like "implemented in X countries"
    const implementedPattern = /implemented\s+in\s+(\d+)\s+countries?/i;
    const implementedMatch = summary.match(implementedPattern);
    if (implementedMatch) {
      return parseInt(implementedMatch[1]);
    }
    
    // Look for patterns like "used in X countries"
    const usedPattern = /used\s+in\s+(\d+)\s+countries?/i;
    const usedMatch = summary.match(usedPattern);
    if (usedMatch) {
      return parseInt(usedMatch[1]);
    }
  }
  
  // Default to 0 if no information found
  return 0;
}

// Function to try to extract countries from various sources
function extractCountries(individualData) {
  // Try to extract from Reach.ImplementationCountries first
  if (individualData.Reach?.ImplementationCountries && individualData.Reach.ImplementationCountries.length > 0) {
    return individualData.Reach.ImplementationCountries;
  }
  
  // Try to extract from Countries
  if (individualData.Countries && individualData.Countries.length > 0) {
    return individualData.Countries;
  }
  
  // Try to extract from Reach.SummaryOfReach text
  if (individualData.Reach?.SummaryOfReach) {
    const summary = individualData.Reach.SummaryOfReach.toLowerCase();
    
    // Look for patterns like "over 60 countries", "50+ countries"
    const countryPattern = /(\d+)\+?\s*countries?/i;
    const countryMatch = summary.match(countryPattern);
    if (countryMatch) {
      // If we find a number but no specific countries, return empty array
      // as requested to keep empty
      return [];
    }
  }
  
  // Default to empty array if no information found
  return [];
}

// Main function to generate the index
function generateIndex() {
  const individualDir = path.join(__dirname, '../public/data/global-goods/individual');
  const outputFile = path.join(__dirname, '../public/data/global-goods/index.json');
  
  try {
    // Read all files in the individual directory
    const files = fs.readdirSync(individualDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    console.log(`Found ${jsonFiles.length} individual global good files`);
    
    const indexData = [];
    
    // Process each individual file
    for (const file of jsonFiles) {
      const filePath = path.join(individualDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      try {
        const individualData = JSON.parse(fileContent);
        
        // Transform to index format
        const indexEntry = {
          ID: individualData.ID,
          Name: individualData.Name,
          Summary: individualData.ProductOverview?.Summary || individualData.Summary || "",
          Logo: individualData.Logo || "",
          GlobalGoodType: individualData.GlobalGoodsType || individualData.GlobalGoodType || ["software"],
          ClimateHealth: individualData.ClimateHealth || false,
          NumberOfImplementations: extractImplementationCount(individualData),
          Countries: extractCountries(individualData),
          Classifications: {
            SDGs: individualData.Classifications?.SDGs || [],
            WHO: individualData.Classifications?.WHO || [],
            WMO: individualData.Classifications?.WMO || [],
            DPI: individualData.Classifications?.DPI || []
          },
          Standards: {
            Health: individualData.StandardsAndInteroperability?.HealthStandards || individualData.Standards?.Health || [],
            Interop: individualData.StandardsAndInteroperability?.Interoperability || individualData.Standards?.Interop || [],
            Climate: individualData.StandardsAndInteroperability?.ClimateStandards || individualData.Standards?.Climate || []
          }
        };
        
        indexData.push(indexEntry);
        console.log(`Processed: ${individualData.ID}`);
        
      } catch (parseError) {
        console.error(`Error parsing ${file}:`, parseError.message);
      }
    }
    
    // Sort by ID for consistent ordering
    indexData.sort((a, b) => a.ID.localeCompare(b.ID));
    
    // Write the new index file
    fs.writeFileSync(outputFile, JSON.stringify(indexData, null, 2), 'utf8');
    
    console.log(`\n✅ Successfully generated index with ${indexData.length} global goods`);
    console.log(`📁 Output written to: ${outputFile}`);
    
    // Show summary statistics
    const climateHealthCount = indexData.filter(item => item.ClimateHealth).length;
    const softwareCount = indexData.filter(item => item.GlobalGoodType.includes('software')).length;
    const contentCount = indexData.filter(item => item.GlobalGoodType.includes('content')).length;
    
    console.log(`\n📊 Summary Statistics:`);
    console.log(`   - Total Global Goods: ${indexData.length}`);
    console.log(`   - Climate Health: ${climateHealthCount}`);
    console.log(`   - Software: ${softwareCount}`);
    console.log(`   - Content: ${contentCount}`);
    
  } catch (error) {
    console.error('Error generating index:', error);
    process.exit(1);
  }
}

// Run the script
generateIndex();
