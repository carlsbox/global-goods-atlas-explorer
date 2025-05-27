
/**
 * Development script to validate types and catch common errors
 * Run this during development to prevent build errors
 */

import { validateGlobalGoodStructure, validateReactQueryConfig } from '@/lib/validation/typeChecks';

// Sample React Query configs to validate
const sampleConfigs = [
  {
    queryKey: ['test'],
    queryFn: () => Promise.resolve([]),
    staleTime: 5000,
    gcTime: 30000, // Should pass
  },
  {
    queryKey: ['test2'],
    queryFn: () => Promise.resolve([]),
    cacheTime: 30000, // Should fail
  }
];

export function runTypeValidation() {
  console.log('Running type validation checks...');

  // Validate React Query configs
  sampleConfigs.forEach((config, index) => {
    const isValid = validateReactQueryConfig(config);
    console.log(`Config ${index + 1}: ${isValid ? 'PASS' : 'FAIL'}`);
  });

  console.log('Type validation complete.');
}

// Run validation if this file is executed directly
if (typeof window === 'undefined') {
  runTypeValidation();
}
