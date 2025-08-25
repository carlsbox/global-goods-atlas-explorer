import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct placeholder paths
const LOGO_PLACEHOLDER = '/uploads/logo-Placeholder.jpg';
const SCREENSHOT_PLACEHOLDER = '/uploads/screenshot_placeholder.jpeg';

// Function to update a single global good file
function updateLogoPlaceholder(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Replace screenshot placeholder in Logo field with logo placeholder
    const newContent = content.replace(
      /"Logo": "\/uploads\/screenshot_placeholder\.jpeg"/g,
      `"Logo": "${LOGO_PLACEHOLDER}"`
    );

    // Check if any changes were made
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      updated = true;
    }

    return updated;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main function to update all files
function fixLogoPlaceholders() {
  console.log('🔍 Fixing logo placeholder references...\n');
  
  // Update individual files
  const individualDir = path.join(__dirname, '../public/data/global-goods/individual');
  const individualFiles = [
    'fhir.json',
    'godata.json', 
    'odk.json'
  ];
  
  console.log('📁 Updating individual global good files:');
  let updatedIndividualCount = 0;
  
  for (const file of individualFiles) {
    const filePath = path.join(individualDir, file);
    if (fs.existsSync(filePath)) {
      if (updateLogoPlaceholder(filePath)) {
        updatedIndividualCount++;
        console.log(`✅ Updated: ${file}`);
      } else {
        console.log(`⏭️  No changes needed: ${file}`);
      }
    } else {
      console.log(`❌ File not found: ${file}`);
    }
  }
  
  // Update index.json
  console.log('\n📁 Updating index.json:');
  const indexFile = path.join(__dirname, '../public/data/global-goods/index.json');
  if (fs.existsSync(indexFile)) {
    if (updateLogoPlaceholder(indexFile)) {
      console.log('✅ Updated: index.json');
    } else {
      console.log('⏭️  No changes needed: index.json');
    }
  } else {
    console.log('❌ index.json not found');
  }
  
  console.log(`\n🎉 Logo placeholder fix complete!`);
  console.log(`📊 Summary:`);
  console.log(`   - Individual files updated: ${updatedIndividualCount}`);
  console.log(`   - All logo fields now use: ${LOGO_PLACEHOLDER}`);
  
  if (updatedIndividualCount > 0) {
    console.log(`\n🔄 Next step: Verify the changes with:`);
    console.log(`   grep -r '"Logo": "/uploads/screenshot_placeholder.jpeg"' public/data/global-goods/`);
  }
}

fixLogoPlaceholders();
