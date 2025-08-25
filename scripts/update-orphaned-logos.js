import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Direct matches: orphaned logo files to global good IDs
const ORPHANED_LOGO_MAPPING = {
  // Direct matches
  'openlmis': 'openlmis.png',
  'pcmt': 'product-catalog-management-tool.png',
  'openhim': 'openhim.png',
  'openboxes': 'openboxes.png',
  'open_concept_lab': 'open-concept-lab.png',
  'openfn': 'openfn.webp',
  'openeyes': 'openeyes.webp',
  'openhexa': 'openhexa.webp',
  'dhis2': 'dhis2-logo-rgb-positive.svg',
  
  // Confirmed mappings from user
  'santempi': 'santesuite.svg',  // Item 12
  'geoprism': 'Geoprism_logo.png',  // Item 16
  'commcare': 'CHT_Final_Horizontal_Light.png'  // CHT = CommCare
};

// Function to update a single global good file
function updateGlobalGoodLogo(filePath, globalGoodId) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const logoFile = ORPHANED_LOGO_MAPPING[globalGoodId];
    
    if (!logoFile) {
      return false; // No mapping for this global good
    }
    
    // Replace placeholder logo with actual logo
    const newContent = content.replace(
      /"Logo": "\/uploads\/logo-Placeholder\.jpg"/g,
      `"Logo": "/uploads/gg_logos/${logoFile}"`
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

// Main function to update all orphaned logo references
function updateOrphanedLogos() {
  console.log('🔗 Updating global goods with orphaned logo files...\n');
  
  const individualDir = path.join(__dirname, '../public/data/global-goods/individual');
  
  try {
    const files = fs.readdirSync(individualDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    console.log(`📁 Found ${jsonFiles.length} individual global good files to process`);
    
    let updatedCount = 0;
    let totalCount = 0;
    
    for (const file of jsonFiles) {
      const filePath = path.join(individualDir, file);
      const globalGoodId = path.basename(file, '.json');
      totalCount++;
      
      if (updateGlobalGoodLogo(filePath, globalGoodId)) {
        updatedCount++;
        console.log(`✅ Updated: ${file} with orphaned logo`);
      } else {
        console.log(`⏭️  No changes needed: ${file}`);
      }
    }
    
    console.log(`\n🎉 Orphaned logo update complete!`);
    console.log(`📊 Summary:`);
    console.log(`   - Total files processed: ${totalCount}`);
    console.log(`   - Files updated with orphaned logos: ${updatedCount}`);
    console.log(`   - Files unchanged: ${totalCount - updatedCount}`);
    
    if (updatedCount > 0) {
      console.log(`\n🔄 Next steps:`);
      console.log(`   1. Verify the logo updates:`);
      console.log(`      grep -r '"Logo": "/uploads/gg_logos/' public/data/global-goods/individual/`);
      console.log(`   2. Regenerate index.json:`);
      console.log(`      node scripts/generate-index.js`);
    }
    
  } catch (error) {
    console.error('Error updating orphaned logos:', error);
    process.exit(1);
  }
}

updateOrphanedLogos();
