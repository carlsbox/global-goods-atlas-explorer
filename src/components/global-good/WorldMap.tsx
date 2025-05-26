
import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { getMapGeoUrl } from "@/lib/config";
import { loadGeoJsonData } from "@/lib/mapUtils";

// Use centralized map data configuration
const geoUrl = getMapGeoUrl();

interface WorldMapProps {
  globalGood: GlobalGoodFlat;
}

export function WorldMap({ globalGood }: WorldMapProps) {
  const [tooltipContent, setTooltipContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [geoData, setGeoData] = useState(null);
  
  const implementationCountries = globalGood.Reach?.ImplementationCountries || [];
  
  // Create a set of ISO codes for quick lookup
  const implementedCountryCodes = new Set(
    implementationCountries.map(country => country.iso_code.toUpperCase())
  );

  // Create a map for country data lookup
  const countryDataMap = new Map(
    implementationCountries.map(country => [
      country.iso_code.toUpperCase(),
      country
    ])
  );

  // Load and convert the geo data
  useEffect(() => {
    console.log('WorldMap: Loading GeoJSON data from:', geoUrl);
    setIsLoading(true);
    setHasError(false);

    const loadData = async () => {
      try {
        const data = await loadGeoJsonData(geoUrl);
        console.log('WorldMap: GeoJSON data loaded successfully');
        setGeoData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('WorldMap: Error loading geo data:', error);
        setIsLoading(false);
        setHasError(true);
      }
    };

    loadData();
  }, [geoUrl]);

  if (hasError) {
    return (
      <div className="w-full h-[400px] bg-muted/20 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">Unable to load world map</p>
          <p className="text-sm text-muted-foreground">Please check your internet connection</p>
          <p className="text-xs text-muted-foreground mt-2">URL: {geoUrl}</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="w-full h-[400px] bg-muted/20 rounded-lg overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10">
            <div className="text-center">
              <Skeleton className="w-12 h-12 rounded-full mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Loading world map...</p>
            </div>
          </div>
        )}
        
        {geoData && (
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{
              scale: 120,
            }}
            className="w-full h-full"
          >
            <ZoomableGroup zoom={1} center={[0, 20]}>
              <Geographies geography={geoData}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    // Check multiple possible property names for country code
                    const countryCode = geo.properties.ISO_A3 || 
                                      geo.properties.iso_a3 || 
                                      geo.properties.ADM0_A3 || 
                                      geo.id;
                    const isImplemented = implementedCountryCodes.has(countryCode);
                    const countryData = countryDataMap.get(countryCode);
                    
                    return (
                      <Tooltip key={geo.rsmKey}>
                        <TooltipTrigger asChild>
                          <Geography
                            geography={geo}
                            onMouseEnter={() => {
                              if (isImplemented && countryData) {
                                setTooltipContent(countryData.names.en.formal);
                              } else {
                                setTooltipContent(
                                  geo.properties.NAME || 
                                  geo.properties.name || 
                                  geo.properties.NAME_EN ||
                                  'Unknown'
                                );
                              }
                            }}
                            onMouseLeave={() => {
                              setTooltipContent("");
                            }}
                            style={{
                              default: {
                                fill: isImplemented ? "hsl(var(--primary))" : "hsl(var(--muted))",
                                stroke: "hsl(var(--border))",
                                strokeWidth: 0.5,
                                opacity: isImplemented ? 1 : 0.3,
                                outline: "none"
                              },
                              hover: {
                                fill: isImplemented ? "hsl(var(--primary))" : "hsl(var(--muted))",
                                stroke: "hsl(var(--border))",
                                strokeWidth: 1,
                                opacity: isImplemented ? 0.8 : 0.5,
                                outline: "none"
                              },
                              pressed: {
                                fill: isImplemented ? "hsl(var(--primary))" : "hsl(var(--muted))",
                                stroke: "hsl(var(--border))",
                                strokeWidth: 0.5,
                                outline: "none"
                              }
                            }}
                          />
                        </TooltipTrigger>
                        {tooltipContent && (
                          <TooltipContent>
                            <p>{tooltipContent}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        )}
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded"></div>
              <span>Implemented ({implementationCountries.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-muted rounded opacity-30"></div>
              <span>Not implemented</span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
