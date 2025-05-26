import { Button } from "@/components/ui/button";
import { CountryData, GlobalGood } from "@/lib/types";
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  ZoomableGroup 
} from "react-simple-maps";
import { useState, useEffect } from "react";
import { getMapGeoUrl } from "@/lib/config";
import { loadGeoJsonData } from "@/lib/mapUtils";

// Use centralized map data configuration
const geoUrl = getMapGeoUrl();

interface MapDisplayProps {
  selectedGood: GlobalGood | null;
  selectedCountryName: string | null;
  selectedGoodCountries: CountryData[];
  onSelectCountry: (code: string | null) => void;
  selectedCountryCode: string | null;
}

export function MapDisplay({
  selectedGood,
  selectedCountryName,
  selectedGoodCountries,
  onSelectCountry,
  selectedCountryCode,
}: MapDisplayProps) {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [geoData, setGeoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get array of country codes for easy comparison
  const countryCodes = selectedGoodCountries.map(country => country.code);

  // Load geo data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadGeoJsonData(geoUrl);
        setGeoData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading geo data:', error);
        setIsLoading(false);
      }
    };
    loadData();
  }, []);
  
  // Handle zoom
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position: any) => {
    setPosition(position);
  };

  if (isLoading) {
    return (
      <div className="col-span-12 md:col-span-6 lg:col-span-7 relative bg-accent/20 p-4 flex flex-col items-center justify-center">
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-7 relative bg-accent/20 p-4 flex flex-col items-center justify-center">
      <div className="text-center mb-4">
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
        <div className="flex absolute top-2 right-2 z-10 space-x-2">
          <Button size="icon" variant="outline" onClick={handleZoomIn}>+</Button>
          <Button size="icon" variant="outline" onClick={handleZoomOut}>-</Button>
        </div>
        
        {geoData && (
          <ComposableMap
            projection="geoEqualEarth"
            width={800}
            height={400}
            className="w-full h-full"
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={handleMoveEnd}
            >
              <Geographies geography={geoData}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    // Check multiple possible property names for country code
                    const countryCode = geo.properties.ISO_A3 || 
                                      geo.properties.iso_a3 || 
                                      geo.properties.ADM0_A3 || 
                                      geo.id;
                    const isActive = countryCodes.includes(countryCode);
                    const isSelected = selectedCountryCode === countryCode;
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => {
                          // Only allow clicking on countries that are in the selected global good
                          if (selectedGood && !isActive) return;
                          onSelectCountry(isSelected ? null : countryCode);
                        }}
                        style={{
                          default: {
                            fill: isActive 
                              ? isSelected 
                                ? "var(--primary)" 
                                : "var(--primary-foreground)" 
                              : "var(--muted)",
                            stroke: "var(--border)",
                            strokeWidth: 0.5,
                            outline: "none",
                            cursor: isActive ? "pointer" : "default"
                          },
                          hover: {
                            fill: isActive 
                              ? "var(--primary)" 
                              : "var(--muted)",
                            stroke: "var(--border)",
                            strokeWidth: 0.5,
                            outline: "none"
                          },
                          pressed: {
                            fill: isActive 
                              ? "var(--primary)" 
                              : "var(--muted)",
                            stroke: "var(--border)",
                            strokeWidth: 0.5,
                            outline: "none"
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        )}
      </div>
      
      <div className="mt-4 w-full max-w-2xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {selectedGood && selectedGoodCountries.map(country => (
          <Button
            key={country.code}
            variant={selectedCountryCode === country.code ? "default" : "outline"}
            size="sm"
            className="text-xs"
            onClick={() => onSelectCountry(country.code)}
          >
            {country.name.short}
          </Button>
        ))}
      </div>
    </div>
  );
}
