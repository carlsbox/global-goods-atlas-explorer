
// Re-export all types from the individual files
export * from './commonTypes';
export * from './globalGood';
export * from './globalGoodFlat';
export * from './useCase';
export * from './country';
export * from './globalGood/classification';
export * from './globalGood/community';
export * from './globalGood/environmentalImpact';
export * from './globalGood/maturity';

// Create alias for Classification
export type { ClassificationData as Classification } from './globalGood/classification';
