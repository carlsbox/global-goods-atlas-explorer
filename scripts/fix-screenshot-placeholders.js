import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct placeholder paths
const LOGO_PLACEHOLDER = '/uploads/logo-Placeholder.jpg';
const SCREENSHOT_PLACEHOLDER = '/uploads/screenshot_placeholder.jpeg';

// Function to update a single global good file
function updateScreenshotPlaceholders(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Fix 1: Replace logo placeholder in Screenshots arrays with screenshot placeholder
    let newContent = content.replace(
      /"Screenshots": \[[^\]]*"\/uploads\/logo-Placeholder\.jpg"[^\]]*\]/g,
      (match) => {
        return match.replace(/\/uploads\/logo-Placeholder\.jpg/g, SCREENSHOT_PLACEHOLDER);
      }
    );

    // Fix 2: Replace logo placeholder in Screenshots arrays (simple array format)
    newContent = newContent.replace(
      /"Screenshots": \[[^\]]*\/uploads\/logo-Placeholder\.jpg[^\]]*\]/g,
      (match) => {
        return match.replace(/\/uploads\/logo-Placeholder\.jpg/g, SCREENSHOT_PLACEHOLDER);
      }
    );

    // Fix 3: Replace logo placeholder in Screenshots arrays (object format with url field)
    newContent = newContent.replace(
      /"url": "\/uploads\/logo-Placeholder\.jpg"/g,
      `"url": "${SCREENSHOT_PLACEHOLDER}"`
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

// Main function to fix all screenshot placeholder issues
function fixScreenshotPlaceholders() {
  console.log('🔍 Fixing screenshot placeholder references...\n');
  
  const individualDir = path.join(__dirname, '../public/data/global-goods/individual');
  
  try {
    const files = fs.readdirSync(individualDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    console.log(`📁 Found ${jsonFiles.length} individual global good files to process`);
    
    let updatedCount = 0;
    let totalCount = 0;
    
    for (const file of jsonFiles) {
      const filePath = path.join(individualDir, file);
      totalCount++;
      
      if (updateScreenshotPlaceholders(filePath)) {
        updatedCount++;
        console.log(`✅ Fixed: ${file}`);
      } else {
        console.log(`⏭️  No changes needed: ${file}`);
      }
    }
    
    console.log(`\n🎉 Screenshot placeholder fix complete!`);
    console.log(`📊 Summary:`);
    console.log(`   - Total files processed: ${totalCount}`);
    console.log(`   - Files updated: ${updatedCount}`);
    console.log(`   - Files unchanged: ${totalCount - updatedCount}`);
    
    if (updatedCount > 0) {
      console.log(`\n🔄 Next steps:`);
      console.log(`   1. Verify the fixes:`);
      console.log(`      grep -r '"/uploads/logo-Placeholder.jpg"' public/data/global-goods/individual/ --include="*.json"`);
      console.log(`   2. Regenerate index.json:`);
      console.log(`      node scripts/generate-index.js`);
    }
    
  } catch (error) {
    console.error('Error fixing screenshot placeholders:', error);
    process.exit(1);
  }
}

fixScreenshotPlaceholders();
