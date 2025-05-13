
import { Button } from "@/components/ui/button";
import { CountryData, GlobalGood } from "@/lib/types";
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  ZoomableGroup 
} from "react-simple-maps";
import { useState } from "react";

// Local GeoJSON data for the world map
const geoUrl = "/src/data/countries/world-countries-110m.json";

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

  // Get array of country codes for easy comparison
  const countryCodes = selectedGoodCountries.map(country => country.code);
  
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
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  // Use ISO A3 country code format from our local GeoJSON data
                  const isActive = countryCodes.includes(geo.properties.ISO_A3);
                  const isSelected = selectedCountryCode === geo.properties.ISO_A3;
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        const countryCode = geo.properties.ISO_A3;
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
