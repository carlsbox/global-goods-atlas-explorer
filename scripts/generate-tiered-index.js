#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../public/data/global-goods');
const INDIVIDUAL_DIR = path.join(DATA_DIR, 'individual');

// Helper to safely extract values
const extractSafe = (value, defaultValue = null) => {
  return value !== undefined && value !== null ? value : defaultValue;
};

// Generate minimal index (for immediate display)
function generateMinimalIndex(goods) {
  return goods.map(good => ({
    ID: good.ID,
    Name: good.Name,
    Logo: good.Logo,
    Summary: good.Summary || good.ProductOverview?.substring(0, 200),
    ClimateHealth: !!good.ClimateHealth,
    GlobalGoodsType: Array.isArray(good.GlobalGoodsType) 
      ? good.GlobalGoodsType.slice(0, 2) // Just first 2 for quick display
      : good.GlobalGoodsType,
    CountryCount: good.Reach?.Countries?.length || 0,
    // Minimal classifications for climate badge
    Classifications: good.Classifications ? {
      SDGs: good.Classifications.SDGs?.slice(0, 3) // Just first 3 SDGs
    } : null
  }));
}

// Generate summary index (for filtering/sorting)
function generateSummaryIndex(goods) {
  return goods.map(good => ({
    ID: good.ID,
    Name: good.Name,
    Logo: good.Logo,
    Summary: good.Summary,
    ProductOverview: good.ProductOverview?.substring(0, 500),
    ClimateHealth: good.ClimateHealth,
    GlobalGoodsType: good.GlobalGoodsType,
    License: good.License,
    Website: good.Website,
    
    // For filtering
    Classifications: good.Classifications,
    Standards: good.Standards ? {
      Health: good.Standards.Health || [],
      Interoperability: good.Standards.Interoperability || [],
      Climate: good.Standards.Climate || []
    } : null,
    
    // For display
    Reach: good.Reach ? {
      Countries: good.Reach.Countries || [],
      Sectors: good.Reach.Sectors || []
    } : null,
    
    // For sorting
    Maturity: good.Maturity ? {
      OverallScore: good.Maturity.OverallScore
    } : null,
    InceptionYear: good.InceptionYear
  }));
}

// Generate resolved index (pre-resolved references)
async function generateResolvedIndex(goods) {
  // Load reference data once
  const licenses = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/reference/licenses.json'), 'utf8'));
  const globalGoodsTypes = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/reference/globalGoodsTypes.json'), 'utf8'));
  const sdgs = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/reference/classifications/sdgs.json'), 'utf8'));
  const who = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/reference/classifications/who.json'), 'utf8'));
  const wmo = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/reference/classifications/wmo.json'), 'utf8'));
  const dpi = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/reference/classifications/dpi.json'), 'utf8'));
  const healthStandards = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/reference/standards/health.json'), 'utf8'));
  const interopStandards = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/reference/standards/interoperability.json'), 'utf8'));
  const climateStandards = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/reference/standards/climate.json'), 'utf8'));
  
  // Helper to resolve references
  const resolveReference = (id, referenceData) => {
    if (!id) return null;
    if (Array.isArray(referenceData)) {
      return referenceData.find(item => item.id === id || item.code === id);
    }
    return referenceData[id];
  };
  
  return goods.map(good => {
    const resolved = { ...good };
    
    // Resolve License
    if (resolved.License) {
      resolved.LicenseResolved = resolveReference(resolved.License, licenses);
    }
    
    // Resolve GlobalGoodsType
    if (resolved.GlobalGoodsType) {
      if (Array.isArray(resolved.GlobalGoodsType)) {
        resolved.GlobalGoodsTypeResolved = resolved.GlobalGoodsType
          .map(code => resolveReference(code, globalGoodsTypes))
          .filter(Boolean);
      } else {
        resolved.GlobalGoodsTypeResolved = resolveReference(resolved.GlobalGoodsType, globalGoodsTypes);
      }
    }
    
    // Resolve Classifications
    if (resolved.Classifications) {
      resolved.ClassificationsResolved = {};
      
      if (resolved.Classifications.SDGs) {
        resolved.ClassificationsResolved.SDGs = resolved.Classifications.SDGs
          .map(id => sdgs.find(s => s.id === id))
          .filter(Boolean);
      }
      
      if (resolved.Classifications.WHO) {
        resolved.ClassificationsResolved.WHO = resolved.Classifications.WHO
          .map(id => who.find(w => w.id === id))
          .filter(Boolean);
      }
      
      if (resolved.Classifications.WMO) {
        resolved.ClassificationsResolved.WMO = resolved.Classifications.WMO
          .map(id => wmo.find(w => w.id === id))
          .filter(Boolean);
      }
      
      if (resolved.Classifications.DPI) {
        resolved.ClassificationsResolved.DPI = resolved.Classifications.DPI
          .map(id => dpi.find(d => d.id === id))
          .filter(Boolean);
      }
    }
    
    // Resolve Standards
    if (resolved.Standards) {
      resolved.StandardsResolved = {};
      
      if (resolved.Standards.Health) {
        resolved.StandardsResolved.Health = resolved.Standards.Health
          .map(code => healthStandards[code])
          .filter(Boolean);
      }
      
      if (resolved.Standards.Interoperability) {
        resolved.StandardsResolved.Interoperability = resolved.Standards.Interoperability
          .map(code => interopStandards[code])
          .filter(Boolean);
      }
      
      if (resolved.Standards.Climate) {
        resolved.StandardsResolved.Climate = resolved.Standards.Climate
          .map(code => climateStandards[code])
          .filter(Boolean);
      }
    }
    
    return resolved;
  });
}

async function generateTieredIndexes() {
  console.log('🚀 Generating tiered index files...');
  
  // Read all individual global goods files
  const files = fs.readdirSync(INDIVIDUAL_DIR).filter(f => f.endsWith('.json'));
  console.log(`📁 Found ${files.length} global goods files`);
  
  const goods = [];
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(INDIVIDUAL_DIR, file), 'utf8');
      const good = JSON.parse(content);
      goods.push(good);
    } catch (error) {
      console.error(`❌ Error reading ${file}:`, error.message);
    }
  }
  
  console.log(`✅ Loaded ${goods.length} global goods`);
  
  // Generate minimal index
  console.log('📝 Generating minimal index...');
  const minimalIndex = generateMinimalIndex(goods);
  fs.writeFileSync(
    path.join(DATA_DIR, 'index-minimal.json'),
    JSON.stringify(minimalIndex, null, 2)
  );
  console.log(`✅ Minimal index: ${JSON.stringify(minimalIndex[0], null, 2).length} bytes per item`);
  
  // Generate summary index
  console.log('📝 Generating summary index...');
  const summaryIndex = generateSummaryIndex(goods);
  fs.writeFileSync(
    path.join(DATA_DIR, 'index-summary.json'),
    JSON.stringify(summaryIndex, null, 2)
  );
  console.log(`✅ Summary index: ${JSON.stringify(summaryIndex[0], null, 2).length} bytes per item`);
  
  // Generate resolved index
  console.log('📝 Generating resolved index...');
  const resolvedIndex = await generateResolvedIndex(goods);
  fs.writeFileSync(
    path.join(DATA_DIR, 'index-resolved.json'),
    JSON.stringify(resolvedIndex, null, 2)
  );
  console.log(`✅ Resolved index: ${JSON.stringify(resolvedIndex[0], null, 2).length} bytes per item`);
  
  // Keep the original index.json for backward compatibility
  console.log('📝 Updating main index.json...');
  fs.writeFileSync(
    path.join(DATA_DIR, 'index.json'),
    JSON.stringify(summaryIndex, null, 2) // Use summary as default
  );
  
  // Print size comparison
  const minimalSize = fs.statSync(path.join(DATA_DIR, 'index-minimal.json')).size;
  const summarySize = fs.statSync(path.join(DATA_DIR, 'index-summary.json')).size;
  const resolvedSize = fs.statSync(path.join(DATA_DIR, 'index-resolved.json')).size;
  
  console.log('\n📊 Size Comparison:');
  console.log(`  Minimal: ${(minimalSize / 1024).toFixed(2)} KB`);
  console.log(`  Summary: ${(summarySize / 1024).toFixed(2)} KB`);
  console.log(`  Resolved: ${(resolvedSize / 1024).toFixed(2)} KB`);
  console.log(`  Reduction: ${((1 - minimalSize / resolvedSize) * 100).toFixed(1)}% for initial load`);
  
  console.log('\n✨ Tiered indexes generated successfully!');
}

// Run the script
generateTieredIndexes().catch(console.error);
