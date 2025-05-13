
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGlobalGoods, useCountries } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { GlobalGood, CountryData } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MapPage() {
  const [searchParams] = useSearchParams();
  const highlightParam = searchParams.get("highlight");
  const { language } = useLanguage();
  
  const { data: globalGoods = [] } = useGlobalGoods();
  const { data: countries = [] } = useCountries();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGood, setSelectedGood] = useState<GlobalGood | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);
  
  // Map of country codes to country objects for quick lookups
  const countryMap = countries.reduce((map: Record<string, CountryData>, country) => {
    map[country.code] = country;
    return map;
  }, {});
  
  // Filter global goods based on search
  const filteredGoods = globalGoods.filter(good => 
    good.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
    ? countryMap[selectedCountryCode]?.name 
    : null;

  return (
    <div className="grid grid-cols-12 gap-0 h-[calc(100vh-8rem)]">
      {/* Left sidebar */}
      <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-card border-r overflow-y-auto p-4">
        <h2 className="font-semibold text-lg mb-4">Global Goods</h2>
        
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search global goods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-2.5"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        
        <div className="space-y-1">
          {filteredGoods.map(good => (
            <Button
              key={good.id}
              variant={selectedGood?.id === good.id ? "default" : "ghost"}
              className="w-full justify-start text-left font-normal"
              onClick={() => {
                setSelectedGood(selectedGood?.id === good.id ? null : good);
                setSelectedCountryCode(null);
              }}
            >
              {good.name}
              <Badge variant="outline" className="ml-auto text-xs">
                {good.countries?.length || 0}
              </Badge>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Main map area */}
      <div className="col-span-12 md:col-span-6 lg:col-span-7 relative bg-accent/20 p-4 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Global Goods Distribution</h1>
          <p className="text-muted-foreground">
            {selectedGood
              ? `Showing countries using ${selectedGood.name}`
              : selectedCountryName
                ? `Showing global goods used in ${selectedCountryName}`
                : "Select a global good or country to view its distribution"
            }
          </p>
        </div>
        
        <div className="relative w-full max-w-2xl aspect-[2/1] border rounded-lg bg-card overflow-hidden shadow-lg">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              <path 
                d="M300,250 C400,200 600,200 700,250 C800,300 800,400 700,450 C600,500 400,500 300,450 C200,400 200,300 300,250 Z" 
                fill="currentColor" 
              />
            </svg>
          </div>
          
          <div className="absolute inset-0 p-4">
            <div className="text-center flex flex-col items-center justify-center h-full">
              <p className="text-muted-foreground mb-4">
                This is a placeholder for the interactive map.
              </p>
              <p className="text-sm">
                In a production app, this would be replaced with an interactive map using 
                libraries like Mapbox, Leaflet, or Google Maps.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 w-full max-w-2xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {selectedGood && selectedGoodCountries.map(country => (
            <Button
              key={country.code}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setSelectedCountryCode(country.code)}
            >
              {country.name}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Right sidebar - details */}
      <div className="col-span-12 md:col-span-3 lg:col-span-3 bg-card border-l overflow-y-auto">
        {selectedGood ? (
          <Card className="border-0 shadow-none rounded-none h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {selectedGood.logo ? (
                  <img 
                    src={selectedGood.logo} 
                    alt={selectedGood.name} 
                    className="h-6 w-6 object-contain"
                  />
                ) : null}
                {selectedGood.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedGood.description}
              </p>
              
              <h3 className="font-semibold mb-2">Countries</h3>
              <div className="mb-6">
                {selectedGood.countries && selectedGood.countries.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {selectedGoodCountries.map(country => (
                      <Button
                        key={country.code}
                        variant={selectedCountryCode === country.code ? "default" : "outline"}
                        size="sm"
                        className="text-xs justify-start"
                        onClick={() => setSelectedCountryCode(selectedCountryCode === country.code ? null : country.code)}
                      >
                        {country.name}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No country data available</p>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedGood.sector?.map(sector => (
                  <Badge key={sector} variant="secondary" className="text-xs">
                    {sector}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : selectedCountryCode ? (
          <Card className="border-0 shadow-none rounded-none h-full">
            <CardHeader>
              <CardTitle>{selectedCountryName}</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Global Goods Used</h3>
              <div className="space-y-2">
                {selectedCountryGoods.length > 0 ? (
                  selectedCountryGoods.map(good => (
                    <Button
                      key={good.id}
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      onClick={() => setSelectedGood(good)}
                    >
                      <div className="flex items-center">
                        {good.logo ? (
                          <img 
                            src={good.logo} 
                            alt={good.name} 
                            className="h-5 w-5 mr-2 object-contain" 
                          />
                        ) : null}
                        {good.name}
                      </div>
                      <div className="ml-auto flex gap-1">
                        {good.sector?.slice(0, 1).map(sector => (
                          <Badge key={sector} variant="secondary" className="text-xs">
                            {sector}
                          </Badge>
                        ))}
                      </div>
                    </Button>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No global goods data available for this country</p>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Map Explorer</h3>
            <p className="text-muted-foreground mb-4">
              Select a global good or country to view details and distribution information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
