
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGlobalGoodsHybrid } from '@/lib/api';
import { FilterBar } from '@/components/global-goods/FilterBar';
import { GlobalGoodCardFlat } from '@/components/global-goods/GlobalGoodCardFlat';
import { NoResults } from '@/components/global-goods/NoResults';
import { LoadingState } from '@/components/global-good/LoadingState';

export default function GlobalGoodsPageHybrid() {
  const { t } = useTranslation('pages/globalGoods');
  const { data: globalGoods = [], isLoading, isError } = useGlobalGoodsHybrid();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  // Filter the global goods based on search and sector
  const filteredGoods = globalGoods.filter(good => {
    const matchesSearch = !searchQuery || 
      (typeof good.name === 'string' 
        ? good.name.toLowerCase().includes(searchQuery.toLowerCase())
        : Object.values(good.name).some(value => 
            value.toLowerCase().includes(searchQuery.toLowerCase())
          )) ||
      (typeof good.summary === 'string'
        ? good.summary.toLowerCase().includes(searchQuery.toLowerCase())
        : Object.values(good.summary).some(value => 
            value.toLowerCase().includes(searchQuery.toLowerCase())
          ));

    const matchesSector = !selectedSector || 
      (good.sectors && good.sectors.includes(selectedSector));

    return matchesSearch && matchesSector;
  });

  // Extract unique sectors for the filter
  const sectors = Array.from(new Set(
    globalGoods.flatMap(good => good.sectors || [])
  ));

  // Reset filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSector(null);
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
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSector={selectedSector}
        onSectorChange={setSelectedSector}
        sectors={sectors}
        onClearFilters={clearFilters}
      />
      
      {filteredGoods.length > 0 ? (
        <>
          <div className="text-sm text-gray-500 mb-4">
            {t('showing', {
              filtered: filteredGoods.length,
              total: globalGoods.length,
            })}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGoods.map(good => (
              <GlobalGoodCardFlat key={good.id} good={good} />
            ))}
          </div>
        </>
      ) : (
        <NoResults onClearFilters={clearFilters} />
      )}
    </div>
  );
}
