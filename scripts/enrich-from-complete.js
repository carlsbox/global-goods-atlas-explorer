import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INDIVIDUAL_DIR = path.join(__dirname, '../public/data/global-goods/individual');
const COMPLETE_DIR = path.join(__dirname, '../docs/uploaded_json');

function safeGet(obj, pathArr, fallback) {
  try {
    let curr = obj;
    for (const key of pathArr) curr = curr?.[key];
    return curr ?? fallback;
  } catch {
    return fallback;
  }
}

function mapCompleteToIndividual(complete, existing) {
  const result = { ...existing };

  // Basic fields
  result.ID = complete.ID || existing.ID;
  result.Name = complete.Name || existing.Name;
  result.ClimateHealth = typeof complete.ClimateHealth === 'boolean' ? complete.ClimateHealth : existing.ClimateHealth;

  // License (string id if available)
  const licenseId = safeGet(complete, ['License', 'id'], null);
  if (licenseId) result.License = licenseId;

  // Website
  result.Website = result.Website || {};
  const website = safeGet(complete, ['Website'], {});
  result.Website.main = {
    url: safeGet(website, ['main', 'url'], safeGet(result, ['Website', 'main', 'url'], '')),
    description: safeGet(website, ['main', 'description'], safeGet(result, ['Website', 'main', 'description'], ''))
  };
  result.Website.docs = {
    url: safeGet(website, ['docs', 'url'], safeGet(result, ['Website', 'docs', 'url'], '')),
    description: safeGet(website, ['docs', 'description'], safeGet(result, ['Website', 'docs', 'description'], ''))
  };
  result.Website.source_code = {
    url: safeGet(website, ['source_code', 'url'], safeGet(result, ['Website', 'source_code', 'url'], '')),
    description: safeGet(website, ['source_code', 'description'], safeGet(result, ['Website', 'source_code', 'description'], ''))
  };
  result.Website.demo = {
    url: safeGet(website, ['demo', 'url'], safeGet(result, ['Website', 'demo', 'url'], '')),
    description: safeGet(website, ['demo', 'description'], safeGet(result, ['Website', 'demo', 'description'], ''))
  };

  // Contact - keep existing; add known email if present in complete
  const contactEmail = safeGet(complete, ['Contact', 0, 'email'], null);
  if (contactEmail) {
    result.Contact = [{ email: contactEmail }];
  }

  // GlobalGoodsType - normalize to array of strings
  const types = safeGet(complete, ['GlobalGoodsType'], null);
  if (Array.isArray(types) && types.length > 0) {
    const codes = types.map(t => (typeof t === 'string' ? t : t.code)).filter(Boolean);
    if (codes.length) result.GlobalGoodsType = codes;
  }

  // Classifications -> arrays of codes
  const classifications = safeGet(complete, ['Classifications'], {});
  const mapCodes = (arr) => Array.isArray(arr) ? arr.map(x => x.code || x).filter(Boolean) : [];
  result.Classifications = {
    SDGs: mapCodes(classifications.SDGs) || existing.Classifications?.SDGs || [],
    WHO: mapCodes(classifications.WHO) || existing.Classifications?.WHO || [],
    WMO: mapCodes(classifications.WMO) || existing.Classifications?.WMO || [],
    DPI: mapCodes(classifications.DPI) || existing.Classifications?.DPI || []
  };

  // Standards and interoperability -> arrays of names/codes
  const standards = safeGet(complete, ['StandardsAndInteroperability'], {});
  const mapStd = (arr) => Array.isArray(arr) ? arr.map(x => x.code || x.name || x).filter(Boolean) : [];
  result.StandardsAndInteroperability = {
    HealthStandards: mapStd(standards.HealthStandards) || existing.StandardsAndInteroperability?.HealthStandards || [],
    Interoperability: mapStd(standards.Interoperability) || existing.StandardsAndInteroperability?.Interoperability || [],
    ClimateStandards: mapStd(standards.ClimateStandards) || existing.StandardsAndInteroperability?.ClimateStandards || []
  };

  // Product overview fields
  result.ProductOverview = result.ProductOverview || {};
  const pov = safeGet(complete, ['ProductOverview'], {});
  result.ProductOverview.Summary = pov.Summary || result.ProductOverview.Summary || '';
  result.ProductOverview.Description = pov.Description || result.ProductOverview.Description || '';
  result.ProductOverview.PrimaryFunctionality = pov.PrimaryFunctionality || result.ProductOverview.PrimaryFunctionality || '';
  result.ProductOverview.Users = pov.Users || result.ProductOverview.Users || '';
  result.ProductOverview.Languages = Array.isArray(pov.Languages) ? pov.Languages : (result.ProductOverview.Languages || []);
  // don't alter Screenshots here

  // Reach
  result.Reach = result.Reach || {};
  result.Reach.SummaryOfReach = safeGet(complete, ['Reach', 'SummaryOfReach'], result.Reach.SummaryOfReach || '');
  // keep NumberOfImplementations as-is if we can't parse
  if (typeof complete?.Reach?.NumberOfImplementations === 'number') {
    result.Reach.NumberOfImplementations = complete.Reach.NumberOfImplementations;
  }
  // ImplementationCountries can be array of objects with iso_code
  const impl = safeGet(complete, ['Reach', 'ImplementationCountries'], null);
  if (Array.isArray(impl)) {
    const codes = impl.map(c => (typeof c === 'string' ? c : c.iso_code)).filter(Boolean);
    if (codes.length) result.Reach.ImplementationCountries = codes;
  }

  // Maturity
  result.Maturity = result.Maturity || {};
  result.Maturity.SummaryOfMaturity = safeGet(complete, ['Maturity', 'SummaryOfMaturity'], result.Maturity.SummaryOfMaturity || '');
  const scores = safeGet(complete, ['Maturity', 'Scores'], null);
  if (Array.isArray(scores) && scores.length) {
    result.Maturity.Scores = scores.map(s => ({
      year: s.year,
      global_utility: s.global_utility ?? 0,
      community_support: s.community_support ?? 0,
      maturity_of_gg: s.maturity_of_gg ?? 0,
      inclusive_design: s.inclusive_design ?? 0,
      climate_resilience: s.climate_resilience ?? 0,
      low_carbon: s.low_carbon ?? 0
    }));
  }

  // Sustainability (Description)
  result.Sustainability = result.Sustainability || {};
  result.Sustainability.Description = safeGet(complete, ['Sustainability', 'Description'], result.Sustainability.Description || '');

  // Resources - copy arrays as description/url pairs when present
  const resources = safeGet(complete, ['Resources'], {});
  const copyList = (list) => Array.isArray(list) ? list.map(x => ({ description: x.description || '', url: x.url || '' })) : [];
  result.Resources = {
    Articles: copyList(resources.Articles) || result.Resources?.Articles || [],
    ProductDocumentation: copyList(resources.ProductDocumentation) || result.Resources?.ProductDocumentation || [],
    UserRequirements: copyList(resources.UserRequirements) || result.Resources?.UserRequirements || [],
    EndUserDocumentation: copyList(resources.EndUserDocumentation) || result.Resources?.EndUserDocumentation || [],
    ImplementerDocumentation: copyList(resources.ImplementerDocumentation) || result.Resources?.ImplementerDocumentation || [],
    DeveloperDocumentation: copyList(resources.DeveloperDocumentation) || result.Resources?.DeveloperDocumentation || [],
    OperatorDocumentation: copyList(resources.OperatorDocumentation) || result.Resources?.OperatorDocumentation || [],
    InstallationDocumentation: copyList(resources.InstallationDocumentation) || result.Resources?.InstallationDocumentation || []
  };

  // Linked initiatives
  const linked = safeGet(complete, ['LinkedInitiatives', 'Initiative'], null);
  if (Array.isArray(linked)) {
    result.LinkedInitiatives = { Initiative: linked };
  }

  return result;
}

function enrichAll() {
  const files = fs.readdirSync(COMPLETE_DIR).filter(f => f.endsWith('-complete.json'));
  console.log(`Found ${files.length} complete files`);

  let updated = 0; let skipped = 0;

  for (const file of files) {
    try {
      const completePath = path.join(COMPLETE_DIR, file);
      const complete = JSON.parse(fs.readFileSync(completePath, 'utf8'));
      const id = complete.ID;
      const individualPath = path.join(INDIVIDUAL_DIR, `${id}.json`);
      if (!fs.existsSync(individualPath)) {
        console.log(`❌ Missing individual file for ${id}`);
        skipped++; continue;
      }
      const existing = JSON.parse(fs.readFileSync(individualPath, 'utf8'));
      const enriched = mapCompleteToIndividual(complete, existing);
      if (JSON.stringify(enriched) !== JSON.stringify(existing)) {
        fs.writeFileSync(individualPath, JSON.stringify(enriched, null, 2), 'utf8');
        console.log(`✅ Enriched: ${id}`);
        updated++;
      } else {
        console.log(`⏭️  No changes: ${id}`);
      }
    } catch (e) {
      console.error(`Error enriching from ${file}:`, e.message);
      skipped++;
    }
  }
  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
}

enrichAll();
