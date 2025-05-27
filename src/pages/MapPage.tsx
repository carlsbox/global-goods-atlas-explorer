import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGlobalGoods, useCountries } from "@/lib/api";
import { GlobalGoodFlat, CountryData } from "@/lib/types";
import { useI18n } from "@/hooks/useI18n";
import { GlobalGoodsSidebar } from "@/components/map/GlobalGoodsSidebar";
import { MapDisplay } from "@/components/map/MapDisplay";
import { GlobalGoodDetails } from "@/components/map/GlobalGoodDetails";
import { CountryDetails } from "@/components/map/CountryDetails";
import { EmptyDetails } from "@/components/map/EmptyDetails";

export default function MapPage() {
  const [searchParams] = useSearchParams();
  const highlightParam = searchParams.get("highlight");
  const { language } = useI18n();
  
  const { data: globalGoods = [] } = useGlobalGoods();
  const { data: countries = [] } = useCountries();
  
  const [selectedGood, setSelectedGood] = useState<GlobalGoodFlat | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);
  
  // Map of country codes to country objects for quick lookups
  const countryMap = countries.reduce((map: Record<string, CountryData>, country) => {
    map[country.code] = country;
    return map;
  }, {});
  
  // Set highlight from URL param
  useEffect(() => {
    if (highlightParam) {
      const goodToHighlight = globalGoods.find(g => g.ID === highlightParam);
      if (goodToHighlight) {
        setSelectedGood(goodToHighlight);
      }
    }
  }, [highlightParam, globalGoods]);
  
  // Get countries for the selected global good
  const selectedGoodCountries = selectedGood
    ? selectedGood.Reach?.ImplementationCountries
        ?.map(country => countryMap[country.iso_code])
        ?.filter(Boolean) || []
    : [];
    
  // Get global goods for the selected country
  const selectedCountryGoods = selectedCountryCode
    ? globalGoods.filter(good => 
        good.Reach?.ImplementationCountries?.some(country => 
          country.iso_code === selectedCountryCode
        )
      ).map(good => ({
        id: good.ID,
        name: good.Name,
        summary: good.ProductOverview?.Summary || '',
        description: good.ProductOverview?.Description || '',
        logo: good.Logo,
        sectors: good.GlobalGoodsType?.map(type => type.title || type.code || '') || [],
        countries: good.Reach?.ImplementationCountries?.map(c => c.iso_code) || [],
        lastUpdated: new Date().toISOString(),
        sdgs: [],
        classifications: [],
        standards: [],
        maturity: {},
        technical: {},
        licensing: {},
        community: {},
        sustainability: {}
      }))
    : [];

  // Get selected country name
  const selectedCountryName = selectedCountryCode 
    ? countryMap[selectedCountryCode]?.name.short 
    : null;

  const handleSelectGood = (good: GlobalGoodFlat | null) => {
    setSelectedGood(good);
    setSelectedCountryCode(null);
  };

  const handleSelectCountry = (code: string | null) => {
    setSelectedCountryCode(code);
  };

  // Convert selected good to GlobalGood format for components
  const selectedGoodAsGlobalGood = selectedGood ? {
    id: selectedGood.ID,
    name: selectedGood.Name,
    summary: selectedGood.ProductOverview?.Summary || '',
    description: selectedGood.ProductOverview?.Description || '',
    logo: selectedGood.Logo,
    sectors: selectedGood.GlobalGoodsType?.map(type => type.code || type.title) || [],
    countries: selectedGood.Reach?.ImplementationCountries?.map(c => c.iso_code) || [],
    lastUpdated: new Date().toISOString(),
    sdgs: [],
    classifications: [],
    standards: [],
    maturity: {},
    technical: {},
    licensing: {},
    community: {},
    sustainability: {}
  } : null;

  return (
    <div className="grid grid-cols-12 gap-0 h-[calc(100vh-8rem)]">
      {/* Left sidebar */}
      <GlobalGoodsSidebar 
        globalGoods={globalGoods.map(good => ({
          id: good.ID,
          name: good.Name,
          summary: good.ProductOverview?.Summary || '',
          description: good.ProductOverview?.Description || '',
          logo: good.Logo,
          sectors: good.GlobalGoodsType?.map(type => type.code || type.title) || [],
          countries: good.Reach?.ImplementationCountries?.map(c => c.iso_code) || [],
          lastUpdated: new Date().toISOString(),
          sdgs: [],
          classifications: [],
          standards: [],
          maturity: {},
          technical: {},
          licensing: {},
          community: {},
          sustainability: {}
        }))} 
        selectedGood={selectedGoodAsGlobalGood}
        onSelectGood={(good) => {
          if (good) {
            const flatGood = globalGoods.find(g => g.ID === good.id);
            setSelectedGood(flatGood || null);
          } else {
            setSelectedGood(null);
          }
        }}
      />
      
      {/* Main map area */}
      <MapDisplay 
        selectedGood={selectedGoodAsGlobalGood}
        selectedCountryName={selectedCountryName}
        selectedGoodCountries={selectedGoodCountries}
        onSelectCountry={handleSelectCountry}
        selectedCountryCode={selectedCountryCode}
      />
      
      {/* Right sidebar - details */}
      <div className="col-span-12 md:col-span-3 lg:col-span-3 bg-card border-l overflow-y-auto">
        {selectedGoodAsGlobalGood ? (
          <GlobalGoodDetails
            globalGood={selectedGoodAsGlobalGood}
            selectedCountryCode={selectedCountryCode}
            countries={countries}
            onSelectCountry={handleSelectCountry}
          />
        ) : selectedCountryCode ? (
          <CountryDetails
            countryName={selectedCountryName || ''}
            countryGoods={selectedCountryGoods}
            onSelectGood={(good) => {
              const flatGood = globalGoods.find(g => g.ID === good.id);
              setSelectedGood(flatGood || null);
            }}
          />
        ) : (
          <EmptyDetails />
        )}
      </div>
    </div>
  );
}
