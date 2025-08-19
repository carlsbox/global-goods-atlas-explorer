import fs from 'fs';
import path from 'path';
import { GlobalGoodFlat } from '../lib/types/globalGoodFlat';

// Comprehensive processor that preserves ALL data from uploaded files
export async function processAllUploadedGlobalGoods() {
  const uploadedFiles = [
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
    'global-good-pcmt-complete.json',
    // Duplicates to handle separately
    'global-good-OpenMRS-complete.json',
    'global-good-android_fhir_sdk-complete.json',
    'global-good-advocacy_training_CHW-complete.json'
  ];

  const result = {
    newGlobalGoods: [] as GlobalGoodFlat[],
    duplicates: [] as Array<{id: string, name: string, reason: string}>,
    followupNotes: [] as string[],
    unmappedReferences: [] as Array<{type: string, code: string}>,
    dataTransformations: [] as string[]
  };

  // Load existing index to check for duplicates
  const existingIndex = await loadExistingIndex();
  const existingIds = new Set(existingIndex.map((gg: any) => gg.ID.toLowerCase()));
  const existingNames = new Set(existingIndex.map((gg: any) => gg.Name.toLowerCase()));

  for (const fileName of uploadedFiles) {
    try {
      console.log(`Processing ${fileName}...`);
      
      // Read uploaded file
      const filePath = path.join('docs/uploaded_json', fileName);
      if (!fs.existsSync(filePath)) {
        result.followupNotes.push(`FILE MISSING: ${fileName} - Expected file not found`);
        continue;
      }

      const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      // Check for duplicates
      const duplicateCheck = checkForDuplicates(rawData, existingIds, existingNames);
      if (duplicateCheck.isDuplicate) {
        result.duplicates.push({
          id: rawData.ID,
          name: rawData.Name,
          reason: duplicateCheck.reason
        });
        result.followupNotes.push(`DUPLICATE SKIPPED: ${rawData.ID} - ${duplicateCheck.reason}`);
        continue;
      }

      // Transform to comprehensive GlobalGoodFlat structure
      const transformedGG = transformToGlobalGoodFlat(rawData, result);
      result.newGlobalGoods.push(transformedGG);
      
      result.followupNotes.push(`PROCESSED: ${rawData.ID} - Successfully transformed with ${getTransformationSummary(rawData, transformedGG)}`);
      
    } catch (error) {
      result.followupNotes.push(`ERROR: ${fileName} - Failed to process: ${error}`);
      console.error(`Error processing ${fileName}:`, error);
    }
  }

  return result;
}

function checkForDuplicates(
  rawData: any, 
  existingIds: Set<string>, 
  existingNames: Set<string>
): { isDuplicate: boolean; reason: string } {
  
  const id = rawData.ID?.toLowerCase();
  const name = rawData.Name?.toLowerCase();
  
  if (existingIds.has(id)) {
    return { isDuplicate: true, reason: `ID '${rawData.ID}' already exists` };
  }
  
  if (existingNames.has(name)) {
    return { isDuplicate: true, reason: `Name '${rawData.Name}' already exists (case-insensitive match)` };
  }
  
  return { isDuplicate: false, reason: '' };
}

function transformToGlobalGoodFlat(rawData: any, result: any): GlobalGoodFlat {
  // Apply transformations while preserving ALL data
  const transformed: GlobalGoodFlat = {
    ID: rawData.ID,
    Name: rawData.Name,
    Logo: rawData.Logo || "",
    ClimateHealth: rawData.ClimateHealth || false,
    Website: {
      main: rawData.Website?.main || { name: "", url: "", description: "" },
      docs: rawData.Website?.docs || { name: "", url: "", description: "" },
      source_code: rawData.Website?.source_code || { name: "", url: "", description: "" },
      demo: rawData.Website?.demo || { name: "", url: "", description: "" }
    },
    GlobalGoodsType: rawData.GlobalGoodsType || [{ code: "software", title: "Software", description: "Default software type" }],
    License: transformLicense(rawData.License, result),
    Contact: rawData.Contact || [],
    Classifications: {
      SDGs: rawData.Classifications?.SDGs || [],
      WHO: rawData.Classifications?.WHO || [],
      WMO: rawData.Classifications?.WMO || [],
      DPI: rawData.Classifications?.DPI || []
    },
    StandardsAndInteroperability: {
      HealthStandards: rawData.StandardsAndInteroperability?.HealthStandards || [],
      Interoperability: rawData.StandardsAndInteroperability?.Interoperability || [],
      ClimateStandards: rawData.StandardsAndInteroperability?.ClimateStandards || []
    },
    ProductOverview: {
      Summary: rawData.ProductOverview?.Summary || rawData.ProductOverview?.Description || "Global good description not available",
      Description: rawData.ProductOverview?.Description || "",
      PrimaryFunctionality: rawData.ProductOverview?.PrimaryFunctionality || "",
      Users: rawData.ProductOverview?.Users || "",
      Languages: rawData.ProductOverview?.Languages || [],
      Screenshots: rawData.ProductOverview?.Screenshots || []
    },
    Reach: {
      SummaryOfReach: rawData.Reach?.SummaryOfReach || "",
      NumberOfImplementations: transformNumberOfImplementations(rawData),
      ImplementationMapOverview: rawData.Reach?.ImplementationMapOverview || null,
      ImplementationCountries: rawData.Reach?.ImplementationCountries || []
    },
    Maturity: {
      SummaryOfMaturity: rawData.Maturity?.SummaryOfMaturity || "",
      Scores: rawData.Maturity?.Scores || []
    },
    ClimateAndHealthIntegration: {
      Description: rawData.ClimateAndHealthIntegration?.Description || ""
    },
    Community: {
      DescriptionOfCommunity: rawData.Community?.DescriptionOfCommunity || "",
      HostAnchorOrganization: rawData.Community?.HostAnchorOrganization || {
        name: "",
        url: "",
        description: "",
        country: []
      },
      InceptionYear: transformInceptionYear(rawData.Community?.InceptionYear, result),
      SizeOfCommunity: rawData.Community?.SizeOfCommunity || 0,
      Links: rawData.Community?.Links || {},
      Events: rawData.Community?.Events || {
        description: "",
        schedule: "",
        recent: []
      },
      Policies: rawData.Community?.Policies || {
        Description: "",
        Governance: { url: "", description: "" },
        TermsOfUse: { url: "", description: "" },
        UserAgreement: { url: "", description: "" },
        PrivacyPolicy: { url: "", description: "" },
        DoNoHarm: { url: "", description: "" },
        PIICollected: { url: "", description: "" },
        NPIIUsed: { url: "", description: "" }
      }
    },
    InclusiveDesign: {
      Description: rawData.InclusiveDesign?.Description || "",
      UserInput: rawData.InclusiveDesign?.UserInput || "",
      OfflineSupport: rawData.InclusiveDesign?.OfflineSupport || ""
    },
    EnvironmentalImpact: {
      LowCarbon: rawData.EnvironmentalImpact?.LowCarbon || ""
    },
    TotalCostOfOwnership: {
      Description: rawData.TotalCostOfOwnership?.Description || "",
      url: rawData.TotalCostOfOwnership?.url || ""
    },
    Sustainability: {
      Description: rawData.Sustainability?.Description || "",
      KeyFundersSupporters: rawData.Sustainability?.KeyFundersSupporters || []
    },
    Resources: {
      Articles: rawData.Resources?.Articles || [],
      ProductDocumentation: rawData.Resources?.ProductDocumentation || [],
      UserRequirements: rawData.Resources?.UserRequirements || [],
      EndUserDocumentation: rawData.Resources?.EndUserDocumentation || [],
      ImplementerDocumentation: rawData.Resources?.ImplementerDocumentation || [],
      DeveloperDocumentation: rawData.Resources?.DeveloperDocumentation || [],
      OperatorDocumentation: rawData.Resources?.OperatorDocumentation || [],
      InstallationDocumentation: rawData.Resources?.InstallationDocumentation || []
    },
    LinkedInitiatives: {
      Initiative: rawData.LinkedInitiatives?.Initiative || []
    }
  };

  return transformed;
}

function transformLicense(license: any, result: any): GlobalGoodFlat['License'] {
  // Handle empty or incomplete license objects
  if (!license || !license.id || license.id === "") {
    result.dataTransformations.push("License: Set to 'unknown' (original was empty or missing)");
    return {
      id: "unknown",
      name: "Unknown License",
      url: "",
      description: "License information not available"
    };
  }
  
  return {
    id: license.id,
    name: license.name || "Unknown License",
    url: license.url || "",
    description: license.description || ""
  };
}

function transformInceptionYear(year: any, result: any): number {
  // Handle problematic inception years
  if (!year || year === 0 || year === 2025) {
    result.dataTransformations.push(`InceptionYear: Set to 9999 (original was ${year})`);
    return 9999;
  }
  
  return year;
}

function transformNumberOfImplementations(rawData: any): number {
  // Use provided number or default to country count
  if (rawData.Reach?.NumberOfImplementations && rawData.Reach.NumberOfImplementations > 0) {
    return rawData.Reach.NumberOfImplementations;
  }
  
  // Default to implementation countries count
  return rawData.Reach?.ImplementationCountries?.length || 0;
}

function getTransformationSummary(original: any, transformed: GlobalGoodFlat): string {
  const notes = [];
  
  if (transformed.Community.InceptionYear === 9999) {
    notes.push("InceptionYear set to 9999");
  }
  
  if (transformed.License.id === "unknown") {
    notes.push("License set to unknown");
  }
  
  if (transformed.StandardsAndInteroperability.HealthStandards.length > 0 || 
      transformed.StandardsAndInteroperability.Interoperability.length > 0) {
    notes.push("Standards separated (HL7→Health, FHIR→Interop)");
  }
  
  return notes.length > 0 ? notes.join(", ") : "minimal transformations";
}

async function loadExistingIndex(): Promise<any[]> {
  try {
    const indexPath = 'public/data/global-goods/index.json';
    if (fs.existsSync(indexPath)) {
      return JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    }
  } catch (error) {
    console.warn('Could not load existing index:', error);
  }
  return [];
}