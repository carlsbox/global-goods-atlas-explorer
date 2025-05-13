
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGlobalGoods, useCountries } from "@/lib/api";
import { GlobalGood, CountryData } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { GlobalGoodsSidebar } from "@/components/map/GlobalGoodsSidebar";
import { MapDisplay } from "@/components/map/MapDisplay";
import { GlobalGoodDetails } from "@/components/map/GlobalGoodDetails";
import { CountryDetails } from "@/components/map/CountryDetails";
import { EmptyDetails } from "@/components/map/EmptyDetails";

export default function MapPage() {
  const [searchParams] = useSearchParams();
  const highlightParam = searchParams.get("highlight");
  const { language } = useLanguage();
  
  const { data: globalGoods = [] } = useGlobalGoods();
  const { data: countries = [] } = useCountries();
  
  const [selectedGood, setSelectedGood] = useState<GlobalGood | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);
  
  // Map of country codes to country objects for quick lookups
  const countryMap = countries.reduce((map: Record<string, CountryData>, country) => {
    map[country.code] = country;
    return map;
  }, {});
  
  // Set highlight from URL param
  useEffect(() => {
    if (highlightParam) {
      const goodToHighlight = globalGoods.find(g => g.id === highlightParam);
      if (goodToHighlight) {
        setSelectedGood(goodToHighlight);
      }
    }
  }, [highlightParam, globalGoods]);
  
  // Get countries for the selected global good
  const selectedGoodCountries = selectedGood
    ? selectedGood.countries
        .map(code => countryMap[code])
        .filter(Boolean)
    : [];
    
  // Get global goods for the selected country
  const selectedCountryGoods = selectedCountryCode
    ? globalGoods.filter(good => 
        good.countries && good.countries.includes(selectedCountryCode)
      )
    : [];

  // Get selected country name
  const selectedCountryName = selectedCountryCode 
    ? countryMap[selectedCountryCode]?.name.short 
    : null;

  const handleSelectGood = (good: GlobalGood | null) => {
    setSelectedGood(good);
    setSelectedCountryCode(null);
  };

  const handleSelectCountry = (code: string | null) => {
    setSelectedCountryCode(code);
  };

  return (
    <div className="grid grid-cols-12 gap-0 h-[calc(100vh-8rem)]">
      {/* Left sidebar */}
      <GlobalGoodsSidebar 
        globalGoods={globalGoods} 
        selectedGood={selectedGood}
        onSelectGood={handleSelectGood}
      />
      
      {/* Main map area */}
      <MapDisplay 
        selectedGood={selectedGood}
        selectedCountryName={selectedCountryName}
        selectedGoodCountries={selectedGoodCountries}
        onSelectCountry={handleSelectCountry}
        selectedCountryCode={selectedCountryCode}
      />
      
      {/* Right sidebar - details */}
      <div className="col-span-12 md:col-span-3 lg:col-span-3 bg-card border-l overflow-y-auto">
        {selectedGood ? (
          <GlobalGoodDetails
            globalGood={selectedGood}
            selectedCountryCode={selectedCountryCode}
            countries={countries}
            onSelectCountry={handleSelectCountry}
          />
        ) : selectedCountryCode ? (
          <CountryDetails
            countryName={selectedCountryName || ''}
            countryGoods={selectedCountryGoods}
            onSelectGood={setSelectedGood}
          />
        ) : (
          <EmptyDetails />
        )}
      </div>
    </div>
  );
}
