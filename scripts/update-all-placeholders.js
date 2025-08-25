import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Placeholder image paths
const LOGO_PLACEHOLDER = '/uploads/logo-Placeholder.jpg';
const SCREENSHOT_PLACEHOLDER = '/uploads/screenshot_placeholder.jpeg';

// Function to update a single global good file
function updateGlobalGoodFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Replace all Unsplash logo URLs with our placeholder
    let newContent = content.replace(
      /https:\/\/images\.unsplash\.com\/photo-1576091160399-112ba8d25d1f\?w=400/g,
      LOGO_PLACEHOLDER
    );
    
    // Replace other Unsplash screenshot URLs with our placeholder
    newContent = newContent.replace(
      /https:\/\/images\.unsplash\.com\/photo-1559757148-5c350d0d3c56\?w=400/g,
      SCREENSHOT_PLACEHOLDER
    );
    
    // Replace all other Unsplash URLs with appropriate placeholders
    // For logos (w=400)
    newContent = newContent.replace(
      /https:\/\/images\.unsplash\.com\/photo-[^?]+\?w=400/g,
      LOGO_PLACEHOLDER
    );
    
    // For screenshots (w=800)
    newContent = newContent.replace(
      /https:\/\/images\.unsplash\.com\/photo-[^?]+\?w=800/g,
      SCREENSHOT_PLACEHOLDER
    );
    
    // For any other Unsplash URLs
    newContent = newContent.replace(
      /https:\/\/images\.unsplash\.com\/photo-[^"]+/g,
      SCREENSHOT_PLACEHOLDER
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

// Main function to update all global good files
function updateAllPlaceholders() {
  const individualDir = path.join(__dirname, '../public/data/global-goods/individual');
  
  try {
    // Read all files in the individual directory
    const files = fs.readdirSync(individualDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    console.log(`Found ${jsonFiles.length} individual global good files to process`);
    
    let updatedCount = 0;
    let totalCount = 0;
    
    // Process each individual file
    for (const file of jsonFiles) {
      const filePath = path.join(individualDir, file);
      totalCount++;
      
      if (updateGlobalGoodFile(filePath)) {
        updatedCount++;
        console.log(`✅ Updated: ${file}`);
      } else {
        console.log(`⏭️  No changes needed: ${file}`);
      }
    }
    
    console.log(`\n🎉 Update Complete!`);
    console.log(`📊 Summary:`);
    console.log(`   - Total files processed: ${totalCount}`);
    console.log(`   - Files updated: ${updatedCount}`);
    console.log(`   - Files unchanged: ${totalCount - updatedCount}`);
    
    if (updatedCount > 0) {
      console.log(`\n🔄 Next step: Regenerate index.json to reflect changes`);
      console.log(`   Run: node scripts/generate-index.js`);
    }
    
  } catch (error) {
    console.error('Error updating placeholders:', error);
    process.exit(1);
  }
}

// Run the script
updateAllPlaceholders();
