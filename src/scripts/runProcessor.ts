import { processUploadedGlobalGoods } from './processUploadedGlobalGoods';

async function main() {
  try {
    console.log('Starting to process uploaded global goods...');
    const result = await processUploadedGlobalGoods();
    
    console.log(`Processed ${result.newGlobalGoods.length} new global goods`);
    console.log(`Found ${result.duplicates.length} duplicates`);
    console.log(`Generated ${result.followupNotes.length} followup notes`);
    console.log(`Found ${result.unmappedReferences.length} unmapped references`);

    // Create individual files for new global goods
    for (const globalGood of result.newGlobalGoods) {
      const fileName = `public/data/global-goods/individual/${globalGood.ID}.json`;
      console.log(`Creating ${fileName}`);
      // In a real environment, you'd write these files
    }

    // Update the main index
    const indexResponse = await fetch('/data/global-goods/index.json');
    const existingIndex = await indexResponse.json();
    const updatedIndex = [...existingIndex, ...result.newGlobalGoods];
    console.log(`Updated index would have ${updatedIndex.length} total global goods`);

    // Generate followup.txt content
    let followupContent = "# Global Goods Import Follow-up Notes\n\n";
    followupContent += `Import completed: ${new Date().toISOString()}\n`;
    followupContent += `New global goods added: ${result.newGlobalGoods.length}\n`;
    followupContent += `Duplicates found: ${result.duplicates.length}\n\n`;

    if (result.duplicates.length > 0) {
      followupContent += "## Duplicates Found (Not Imported)\n\n";
      for (const duplicate of result.duplicates) {
        followupContent += `- **${duplicate.id}** (${duplicate.name}): ${duplicate.reason}\n`;
      }
      followupContent += "\n";
    }

    followupContent += "## Individual Global Good Notes\n\n";
    for (const note of result.followupNotes) {
      followupContent += `- ${note}\n`;
    }

    if (result.unmappedReferences.length > 0) {
      followupContent += "\n## Missing Reference Data Summary\n\n";
      const groupedReferences = result.unmappedReferences.reduce((acc, ref) => {
        if (!acc[ref.type]) acc[ref.type] = new Set();
        acc[ref.type].add(ref.code);
        return acc;
      }, {} as Record<string, Set<string>>);

      for (const [type, codes] of Object.entries(groupedReferences)) {
        followupContent += `### ${type}\n`;
        for (const code of Array.from(codes)) {
          followupContent += `- ${code}\n`;
        }
        followupContent += "\n";
      }
    }

    console.log('\n--- FOLLOWUP CONTENT ---');
    console.log(followupContent);

    return {
      success: true,
      result,
      followupContent,
      updatedIndex
    };

  } catch (error) {
    console.error('Error processing uploaded global goods:', error);
    return { success: false, error };
  }
}

// Export for use in other scripts
export { main as runProcessor };

// Run if called directly
if (typeof window === 'undefined') {
  main();
}