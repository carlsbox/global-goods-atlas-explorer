
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGlobalGoods } from '@/lib/api';
import { FilterBar } from '@/components/global-goods/FilterBar';
import { GlobalGoodCardFlat } from '@/components/global-goods/GlobalGoodCardFlat';
import { NoResults } from '@/components/global-goods/NoResults';
import { LoadingState } from '@/components/global-good/LoadingState';
import { GlobalGood } from '@/lib/types/globalGood';

export default function GlobalGoodsPageHybrid() {
  const { t } = useTranslation('pages/globalGoods');
  const { data: globalGoods = [], isLoading, isError } = useGlobalGoods();

  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');

  // Convert GlobalGoodFlat to GlobalGood format for processing
  const convertedGoods: GlobalGood[] = globalGoods.map(good => ({
    id: good.ID,
    name: good.Name,
    summary: good.ProductOverview?.Summary || '',
    description: good.ProductOverview?.Description || '',
    logo: good.Logo,
    sectors: good.GlobalGoodsType?.map(type => type.title || type.code || '') || [],
    countries: good.Reach?.ImplementationCountries?.map(country => country.iso_code) || [],
    lastUpdated: new Date().toISOString(),
    sdgs: [],
    classifications: [],
    standards: [],
    maturity: {},
    technical: {},
    licensing: {},
    community: {},
    sustainability: {}
  }));

  // Filter the global goods based on search and sector
  const filteredGoods = convertedGoods.filter(good => {
    const goodName = typeof good.name === 'string' ? good.name : good.name.en || Object.values(good.name)[0] || '';
    const goodSummary = typeof good.summary === 'string' ? good.summary : good.summary.en || Object.values(good.summary)[0] || '';
    
    const matchesSearch = !searchTerm || 
      goodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goodSummary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector = sectorFilter === 'all' || 
      (good.sectors && good.sectors.includes(sectorFilter));

    return matchesSearch && matchesSector;
  });

  // Extract unique sectors for the filter
  const sectors: string[] = Array.from(new Set(
    convertedGoods.flatMap(good => good.sectors || [])
  ));

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setSectorFilter('all');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <LoadingState message={t('loadingCatalog')} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{t('catalogTitle')} (Hybrid)</h1>
        <p className="text-lg mt-2">{t('catalogDescription')}</p>
      </div>
      
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sectorFilter={sectorFilter}
        setSectorFilter={setSectorFilter}
        sectors={sectors}
      />
      
      {filteredGoods.length > 0 ? (
        <>
          <div className="text-sm text-gray-500 mb-4">
            {t('showing', {
              filtered: filteredGoods.length,
              total: convertedGoods.length,
            })}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGoods.map(good => {
              // Convert back to GlobalGoodFlat structure for the card component
              const flatGood = {
                ID: good.id,
                Name: typeof good.name === 'string' ? good.name : good.name.en || Object.values(good.name)[0] || '',
                Logo: good.logo,
                Website: {},
                GlobalGoodsType: [],
                License: { id: '', name: '', url: '', description: '' },
                Contact: [],
                Classifications: { SDGs: [], WHO: [], WMO: [], DPI: [] },
                StandardsAndInteroperability: { HealthStandards: [], Interoperability: [], ClimateStandards: [] },
                ProductOverview: {
                  Summary: typeof good.summary === 'string' ? good.summary : good.summary.en || Object.values(good.summary)[0] || '',
                  Description: typeof good.description === 'string' ? good.description : good.description.en || Object.values(good.description)[0] || '',
                  PrimaryFunctionality: '',
                  Users: '',
                  Languages: [],
                  Screenshots: []
                },
                Reach: {
                  SummaryOfReach: '',
                  NumberOfImplementations: 0,
                  ImplementationMapOverview: null,
                  ImplementationCountries: good.countries?.map(iso => ({
                    iso_code: iso,
                    type: 'Country',
                    names: { en: { short: iso, formal: iso } }
                  })) || []
                },
                Maturity: { SummaryOfMaturity: '', Scores: [] },
                ClimateAndHealthIntegration: { Description: '' },
                Community: {
                  DescriptionOfCommunity: '',
                  HostAnchorOrganization: { name: '', url: '', description: '', country: [] },
                  InceptionYear: 0,
                  SizeOfCommunity: 0,
                  Links: {},
                  Events: { description: '', schedule: '', recent: [] },
                  Policies: {
                    Description: '',
                    Governance: { url: '', description: '' },
                    TermsOfUse: { url: '', description: '' },
                    UserAgreement: { url: '', description: '' },
                    PrivacyPolicy: { url: '', description: '' },
                    DoNoHarm: { url: '', description: '' },
                    PIICollected: { url: '', description: '' },
                    NPIIUsed: { url: '', description: '' }
                  }
                },
                InclusiveDesign: { Description: '', UserInput: '', OfflineSupport: '' },
                EnvironmentalImpact: { LowCarbon: '' },
                TotalCostOfOwnership: { Description: '', url: '' },
                Sustainability: { Description: '', KeyFundersSupporters: [] },
                Resources: {
                  Articles: [],
                  ProductDocumentation: [],
                  UserRequirements: [],
                  EndUserDocumentation: [],
                  ImplementerDocumentation: [],
                  DeveloperDocumentation: [],
                  OperatorDocumentation: [],
                  InstallationDocumentation: []
                },
                LinkedInitiatives: { Initiative: [] }
              };
              
              return (
                <GlobalGoodCardFlat key={good.id} good={flatGood} />
              );
            })}
          </div>
        </>
      ) : (
        <NoResults onClearFilters={clearFilters} />
      )}
    </div>
  );
}
