import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logo mapping with priority (SVG > PNG > WEBP)
const LOGO_MAPPING = {
  // Direct matches with priority order
  'openimis': ['openimis.svg', 'openimis.png'],
  'openlmis': ['openlmis.png'],
  'pcmt': ['product-catalog-management-tool.png'],
  'rapidpro': ['rapidpro.png', 'rapidpro.svg'],
  'reveal': ['reveal.png'],
  'santempi': ['santempi.png'],
  'tamanu': ['tamanu.png'],
  'openhim': ['openhim.png'],
  'openelis': ['openelis.png'], // Specific requirement: only use openelis.png
  'openboxes': ['openboxes.png'],
  'mhero': ['mhero.png'],
  'open_concept_lab': ['open-concept-lab.png'],
  'odk': ['odk.png'],
  'ihris': ['ihris.png'],
  'iaso': ['iaso.png'],
  'spice': ['spice.svg'],
  'vxnaid': ['vxnaid.webp'],
  'openfn': ['openfn.webp'],
  'openeyes': ['openeyes.webp'],
  'openhexa': ['openhexa.webp'],
  'fhir': ['fhir-logo-www.png'],
  'geoprism': ['Geoprism_logo.png'],
  'harmony': ['HarmonyLogo_Horizontal.png'],
  'commcare': ['CHT_Final_Horizontal_Light.png'],
  'dhis2': ['dhis2-logo-rgb-positive.svg'],
  
  // Potential matches that need verification
  'sormas': ['surveillance-outbreak-response-management-and-analysis-system.webp'],
  
  // Global goods without logo files (will keep placeholders)
  'tupaia': null,
  'who-smart-guidelines': null,
  'openmrs': null,
  'openhie': null,
  'opencrvs': null,
  'opencr': null,
  'omop': null,
  'openclinic_ga': null,
  'godata': null,
  'gofr': null,
  'gnu_health': null,
  'dhpns': null,
  'everwell_hub': null,
  'android_fhir_sdk': null,
  'bahmni': null,
  'advocacy_training_CHW': null,
  'ewars': null,
  'opnimis': null,
  'pcmt': null,
  'open_concept_lab': null,
  'openboxes': null,
  'openclinic_ga': null,
  'opencr': null,
  'opencrvs': null,
  'openeyes': null,
  'openfn': null,
  'openhexa': null,
  'openhie': null,
  'openhim': null,
  'openlmis': null,
  'openmrs': null,
  'opnimis': null,
  'open_concept_lab': null,
  'openclinic_ga': null,
  'tupaia': null,
  'advocacy_training_CHW': null,
  'everwell_hub': null,
  'android_fhir_sdk': null,
  'bahmni': null,
  'advocacy_training_CHW': null,
  'ewars': null
};

// Function to find the best available logo file
function findBestLogoFile(globalGoodId) {
  const logoOptions = LOGO_MAPPING[globalGoodId];
  if (!logoOptions) return null;
  
  const logosDir = path.join(__dirname, '../public/uploads/gg_logos');
  
  for (const logoFile of logoOptions) {
    const logoPath = path.join(logosDir, logoFile);
    if (fs.existsSync(logoPath)) {
      return `/uploads/gg_logos/${logoFile}`;
    }
  }
  
  return null;
}

// Function to update a single global good file
function updateGlobalGoodLogo(filePath, globalGoodId) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const bestLogoPath = findBestLogoFile(globalGoodId);
    
    if (!bestLogoPath) {
      // Keep placeholder if no logo file found
      return false;
    }
    
    // Replace placeholder logo with actual logo
    const newContent = content.replace(
      /"Logo": "\/uploads\/logo-Placeholder\.jpg"/g,
      `"Logo": "${bestLogoPath}"`
    );
    
    // Check if any changes were made
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main function to update all global good logos
function updateAllGlobalGoodLogos() {
  console.log('🎨 Updating global good logos with actual logo files...\n');
  
  const individualDir = path.join(__dirname, '../public/data/global-goods/individual');
  
  try {
    const files = fs.readdirSync(individualDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    console.log(`📁 Found ${jsonFiles.length} individual global good files to process`);
    
    let updatedCount = 0;
    let keptPlaceholderCount = 0;
    let totalCount = 0;
    
    for (const file of jsonFiles) {
      const filePath = path.join(individualDir, file);
      const globalGoodId = path.basename(file, '.json');
      totalCount++;
      
      if (updateGlobalGoodLogo(filePath, globalGoodId)) {
        updatedCount++;
        console.log(`✅ Updated: ${file} with actual logo`);
      } else {
        keptPlaceholderCount++;
        console.log(`⏭️  Kept placeholder: ${file}`);
      }
    }
    
    console.log(`\n🎉 Logo update complete!`);
    console.log(`📊 Summary:`);
    console.log(`   - Total files processed: ${totalCount}`);
    console.log(`   - Files updated with actual logos: ${updatedCount}`);
    console.log(`   - Files keeping placeholders: ${keptPlaceholderCount}`);
    
    if (updatedCount > 0) {
      console.log(`\n🔄 Next steps:`);
      console.log(`   1. Verify the logo updates:`);
      console.log(`      grep -r '"Logo": "/uploads/gg_logos/' public/data/global-goods/individual/`);
      console.log(`   2. Regenerate index.json:`);
      console.log(`      node scripts/generate-index.js`);
    }
    
  } catch (error) {
    console.error('Error updating global good logos:', error);
    process.exit(1);
  }
}

updateAllGlobalGoodLogos();
