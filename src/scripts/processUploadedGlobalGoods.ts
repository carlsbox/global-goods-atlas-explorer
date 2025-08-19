import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';

interface SimplifiedGlobalGood {
  ID: string;
  Name: string;
  Summary: string;
  Logo?: string;
  GlobalGoodType: string[];
  ClimateHealth: boolean;
  NumberOfImplementations: number;
  Countries: string[];
  Classifications: {
    SDGs: string[];
    WHO: string[];
    WMO: string[];
    DPI: string[];
  };
  Standards: {
    Health: string[];
    Interop: string[];
    Climate: string[];
  };
}

// List of all uploaded files to process
const UPLOADED_FILES = [
  'global-good-OpenMRS-complete.json',
  'global-good-advocacy_training_CHW-complete.json',
  'global-good-android_fhir_sdk-complete.json',
  'global-good-bhamni-complete.json',
  'global-good-dhpns-complete.json',
  'global-good-fhir-complete.json',
  'global-good-gnu_health-complete.json',
  'global-good-godata-complete.json',
  'global-good-iaso-complete.json',
  'global-good-ihris-complete.json',
  'global-good-mhero-complete.json',
  'global-good-odk-complete.json',
  'global-good-omop-complete.json',
  'global-good-open_concept_lab-complete.json',
  'global-good-openboxes-complete.json',
  'global-good-openclinic_ga-complete.json',
  'global-good-opencr-complete.json',
  'global-good-openelis-complete.json',
  'global-good-openeyes-complete.json',
  'global-good-openfn-complete.json',
  'global-good-openhie-complete.json',
  'global-good-openhim-complete.json',
  'global-good-openlmis-complete.json',
  'global-good-opensrp-complete.json',
  'global-good-opnimis-complete.json',
  'global-good-rapidpro-complete.json',
  'global-good-reveal-complete.json',
  'global-good-santempi-complete.json',
  'global-good-sormas-complete.json',
  'global-good-spice-complete.json',
  'global-good-tamanu-complete.json',
  'global-good-tupaia-complete.json',
  'global-good-vxnaid-complete.json',
  'global-good-who-smart-guidelines-complete.json',
  'global-good-everwell_hub-complete.json',
  'global-good-opencrvs-complete.json',
  'global-good-gofr-complete.json',
  'global-good-openhexa-complete.json',
  'global-good-pcmt-complete.json'
];

interface ProcessingResult {
  newGlobalGoods: SimplifiedGlobalGood[];
  duplicates: { id: string; name: string; reason: string }[];
  followupNotes: string[];
  unmappedReferences: { type: string; code: string; source: string }[];
}

export async function processUploadedGlobalGoods(): Promise<ProcessingResult> {
  const result: ProcessingResult = {
    newGlobalGoods: [],
    duplicates: [],
    followupNotes: [],
    unmappedReferences: []
  };

  // Load existing global goods index
  const indexResponse = await fetch('/data/global-goods/index.json');
  const existingGlobalGoods = await indexResponse.json();
  const existingIds = new Set(existingGlobalGoods.map((gg: any) => gg.ID.toLowerCase()));
  const existingNames = new Set(existingGlobalGoods.map((gg: any) => gg.Name.toLowerCase()));

  // Load reference data for validation
  const [licensesRes, sdgsRes, whoRes, dpiRes, healthStandardsRes, interopStandardsRes] = await Promise.all([
    fetch('/data/reference/licenses.json'),
    fetch('/data/reference/classifications/sdgs.json'),
    fetch('/data/reference/classifications/who.json'),
    fetch('/data/reference/classifications/dpi.json'),
    fetch('/data/reference/standards/health.json'),
    fetch('/data/reference/standards/interoperability.json')
  ]);

  const licenses = await licensesRes.json();
  const sdgs = await sdgsRes.json();
  const whoClassifications = await whoRes.json();
  const dpiClassifications = await dpiRes.json();
  const healthStandards = await healthStandardsRes.json();
  const interopStandards = await interopStandardsRes.json();

  const licenseMap = new Map(licenses.map((l: any) => [l.id, l]));
  const sdgMap = new Map(sdgs.map((s: any) => [s.code, s]));
  const whoMap = new Map(whoClassifications.map((w: any) => [w.code, w]));
  const dpiMap = new Map(dpiClassifications.map((d: any) => [d.code, d]));
  const healthStandardMap = new Map(healthStandards.map((h: any) => [h.code, h]));
  const interopStandardMap = new Map(interopStandards.map((i: any) => [i.code, i]));

  for (const fileName of UPLOADED_FILES) {
    try {
      const fileResponse = await fetch(`/docs/uploaded_json/${fileName}`);
      const globalGoodData: GlobalGoodFlat = await fileResponse.json();

      // Check for duplicates
      const isDuplicateId = existingIds.has(globalGoodData.ID.toLowerCase());
      const isDuplicateName = existingNames.has(globalGoodData.Name.toLowerCase());

      if (isDuplicateId || isDuplicateName) {
        result.duplicates.push({
          id: globalGoodData.ID,
          name: globalGoodData.Name,
          reason: isDuplicateId ? 'Duplicate ID' : 'Duplicate Name'
        });
        result.followupNotes.push(`DUPLICATE FOUND: ${globalGoodData.ID} (${globalGoodData.Name}) - ${isDuplicateId ? 'ID already exists' : 'Name already exists'}`);
        continue;
      }

      // Transform to simplified format
      const simplified = transformToSimplified(globalGoodData, {
        licenseMap,
        sdgMap,
        whoMap,
        dpiMap,
        healthStandardMap,
        interopStandardMap
      }, result);

      result.newGlobalGoods.push(simplified);

    } catch (error) {
      result.followupNotes.push(`ERROR processing ${fileName}: ${error}`);
    }
  }

  return result;
}

function transformToSimplified(
  data: GlobalGoodFlat,
  referenceMaps: any,
  result: ProcessingResult
): SimplifiedGlobalGood {
  const {
    licenseMap,
    sdgMap,
    whoMap,
    dpiMap,
    healthStandardMap,
    interopStandardMap
  } = referenceMaps;

  // Transform license
  let licenseId = "unknown";
  if (data.License?.id && licenseMap.has(data.License.id)) {
    licenseId = data.License.id;
  } else if (data.License?.name) {
    // Try to find by name
    const foundLicense = Array.from(licenseMap.values()).find((l: any) => 
      l.name.toLowerCase() === data.License.name.toLowerCase()
    );
    if (foundLicense) {
      licenseId = (foundLicense as any).id;
      result.followupNotes.push(`${data.ID}: Mapped license "${data.License.name}" to ${(foundLicense as any).id}`);
    } else {
      result.unmappedReferences.push({
        type: 'license',
        code: data.License.name || 'empty',
        source: data.ID
      });
      result.followupNotes.push(`${data.ID}: License "${data.License.name}" not found in reference data`);
    }
  } else {
    result.followupNotes.push(`${data.ID}: No license information, defaulting to "unknown"`);
  }

  // Transform classifications
  const classifications = {
    SDGs: transformClassificationCodes(data.Classifications?.SDGs || [], sdgMap, 'SDG', data.ID, result),
    WHO: transformClassificationCodes(data.Classifications?.WHO || [], whoMap, 'WHO', data.ID, result),
    WMO: transformClassificationCodes(data.Classifications?.WMO || [], new Map(), 'WMO', data.ID, result),
    DPI: transformClassificationCodes(data.Classifications?.DPI || [], dpiMap, 'DPI', data.ID, result)
  };

  // Transform standards
  const standards = {
    Health: transformStandardsCodes(data.StandardsAndInteroperability?.HealthStandards || [], healthStandardMap, 'Health', data.ID, result),
    Interop: [
      ...transformStandardsCodes(data.StandardsAndInteroperability?.Interoperability || [], interopStandardMap, 'Interoperability', data.ID, result),
      // Handle HL7 separately from FHIR
      ...(data.StandardsAndInteroperability?.HealthStandards?.some(s => s.code === 'HL7') ? ['HL7'] : [])
    ],
    Climate: transformStandardsCodes(data.StandardsAndInteroperability?.ClimateStandards || [], new Map(), 'Climate', data.ID, result)
  };

  // Handle inception year
  let inceptionYear = 9999; // default as requested
  if (data.Community?.InceptionYear && data.Community.InceptionYear !== 0 && data.Community.InceptionYear !== 2025) {
    inceptionYear = data.Community.InceptionYear;
  } else {
    result.followupNotes.push(`${data.ID}: InceptionYear was ${data.Community?.InceptionYear || 'missing'}, defaulted to 9999`);
  }

  // Extract countries
  const countries = data.Reach?.ImplementationCountries?.map(c => c.iso_code) || [];

  // Count implementations
  const numberOfImplementations = data.Reach?.NumberOfImplementations || countries.length || 0;

  return {
    ID: data.ID,
    Name: data.Name,
    Summary: data.ProductOverview?.Summary || data.ProductOverview?.Description || `${data.Name} is a global good in the health domain.`,
    Logo: data.Logo || "",
    GlobalGoodType: data.GlobalGoodsType?.map(t => t.code) || ["software"],
    ClimateHealth: data.ClimateHealth || false,
    NumberOfImplementations: numberOfImplementations,
    Countries: countries,
    Classifications: classifications,
    Standards: standards
  };
}

function transformClassificationCodes(
  classifications: any[],
  referenceMap: Map<string, any>,
  type: string,
  sourceId: string,
  result: ProcessingResult
): string[] {
  const codes: string[] = [];
  
  for (const classification of classifications) {
    const code = classification.code;
    if (referenceMap.has(code)) {
      codes.push(code);
    } else {
      result.unmappedReferences.push({
        type: type,
        code: code,
        source: sourceId
      });
      result.followupNotes.push(`${sourceId}: ${type} classification "${code}" not found in reference data`);
    }
  }
  
  return codes;
}

function transformStandardsCodes(
  standards: any[],
  referenceMap: Map<string, any>,
  type: string,
  sourceId: string,
  result: ProcessingResult
): string[] {
  const codes: string[] = [];
  
  for (const standard of standards) {
    const code = standard.code;
    
    // Special handling for HL7 vs FHIR
    if (code === 'FHIR' && type === 'Health') {
      // FHIR goes to interoperability, not health
      continue;
    }
    
    if (referenceMap.has(code)) {
      codes.push(referenceMap.get(code).name || code);
    } else {
      // Try to map by name
      const foundStandard = Array.from(referenceMap.values()).find((s: any) => 
        s.name?.toLowerCase() === standard.name?.toLowerCase()
      );
      if (foundStandard) {
        codes.push(foundStandard.name);
        result.followupNotes.push(`${sourceId}: Mapped ${type} standard "${standard.name}" to ${foundStandard.name}`);
      } else {
        result.unmappedReferences.push({
          type: type,
          code: code,
          source: sourceId
        });
        result.followupNotes.push(`${sourceId}: ${type} standard "${code}" (${standard.name}) not found in reference data`);
      }
    }
  }
  
  return codes;
}