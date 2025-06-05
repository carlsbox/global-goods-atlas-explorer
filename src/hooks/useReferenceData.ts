
import { useState, useEffect } from 'react';
import { useLazyReferenceData } from '@/hooks/useLazyReferenceData';
import { resolveClassificationCodes, getClassificationByCode } from '@/lib/loaders/classificationsReferenceLoader';
import { useI18n } from '@/hooks/useI18n';

export function useReferenceData() {
  const { language } = useI18n();
  const {
    sdgs = [],
    classifications = [],
    standards = {},
    countries = [],
    loading,
    error,
  } = useLazyReferenceData(['classifications', 'countries', 'standards']);

  // Helper functions for classification resolution
  const resolveClassifications = async (codes: string[]) => {
    try {
      return await resolveClassificationCodes(codes);
    } catch (error) {
      console.error('Failed to resolve classification codes:', error);
      return [];
    }
  };

  const getClassification = async (code: string) => {
    try {
      return await getClassificationByCode(code);
    } catch (error) {
      console.error('Failed to get classification by code:', error);
      return null;
    }
  };

  const findClassificationByCode = (code: string) => {
    return classifications.find(c => c.code === code) || null;
  };

  const getClassificationsByAuthority = (authority: string) => {
    return classifications.filter(c => 
      c.authority === authority || 
      c.authority === authority.toUpperCase()
    );
  };

  return {
    sdgs,
    classifications,
    standards,
    countries,
    loading,
    error,
    resolveClassifications,
    getClassification,
    findClassificationByCode,
    getClassificationsByAuthority,
  };
}
