/**
 * Utility functions for validating reference data and providing fallbacks
 */

interface ValidationResult {
  isValid: boolean;
  missingCodes: string[];
  warnings: string[];
}

/**
 * Validates an array of codes against available reference data
 */
export function validateCodes(
  codes: string[], 
  referenceMap: Map<string, any>, 
  dataType: string
): ValidationResult {
  const missingCodes: string[] = [];
  const warnings: string[] = [];

  codes.forEach(code => {
    if (!referenceMap.has(code)) {
      missingCodes.push(code);
      warnings.push(`Missing ${dataType} reference for code: ${code}`);
    }
  });

  return {
    isValid: missingCodes.length === 0,
    missingCodes,
    warnings
  };
}

/**
 * Console warning helper for missing reference data
 */
export function logReferenceDataWarnings(globalGoods: any[], referenceData: any) {
  if (process.env.NODE_ENV === 'development') {
    const allStandardCodes = new Set<string>();
    const allCountryCodes = new Set<string>();
    const allClassificationCodes = new Set<string>();

    // Collect all codes used in global goods
    globalGoods.forEach(good => {
      // Collect standards
      good.StandardsAndInteroperability?.HealthStandards?.forEach((s: any) => 
        allStandardCodes.add(s.code)
      );
      good.StandardsAndInteroperability?.Interoperability?.forEach((s: any) => 
        allStandardCodes.add(s.code)
      );

      // Collect countries
      good.Reach?.ImplementationCountries?.forEach((c: any) => 
        allCountryCodes.add(c.iso)
      );

      // Collect classifications
      ['SDGs', 'WHO', 'DPI', 'WMO'].forEach(authority => {
        good.Classifications?.[authority]?.forEach((c: any) => 
          allClassificationCodes.add(c.code)
        );
      });
    });

    // Validate standards
    const standardsValidation = validateCodes(
      Array.from(allStandardCodes), 
      referenceData.standardsMap, 
      'standard'
    );

    // Validate countries
    const countriesValidation = validateCodes(
      Array.from(allCountryCodes), 
      referenceData.countriesMap, 
      'country'
    );

    // Validate classifications
    const classificationsValidation = validateCodes(
      Array.from(allClassificationCodes), 
      referenceData.classificationsMap, 
      'classification'
    );

    // Log warnings
    if (!standardsValidation.isValid) {
      console.warn('Standards Reference Data Issues:', standardsValidation.warnings);
    }
    
    if (!countriesValidation.isValid) {
      console.warn('Countries Reference Data Issues:', countriesValidation.warnings);
    }
    
    if (!classificationsValidation.isValid) {
      console.warn('Classifications Reference Data Issues:', classificationsValidation.warnings);
    }

    // Summary
    const totalIssues = standardsValidation.missingCodes.length + 
                       countriesValidation.missingCodes.length + 
                       classificationsValidation.missingCodes.length;
    
    if (totalIssues > 0) {
      console.warn(`Reference Data Validation Summary: ${totalIssues} missing references found`);
    } else {
      console.log('✅ All reference data codes validated successfully');
    }
  }
}

/**
 * Creates a safe display name that falls back to the code if reference is missing
 */
export function getSafeDisplayName(
  code: string, 
  referenceMap: Map<string, any>, 
  nameProperty: string = 'name'
): string {
  const reference = referenceMap.get(code);
  return reference?.[nameProperty] || code;
}