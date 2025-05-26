
import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { feature } from "topojson-client";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { getMapGeoUrl } from "@/lib/config";

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
  
  console.log('WorldMap: Implementation countries:', implementationCountries);
  
  // Create multiple lookup sets for different country code formats
  const implementedCountryCodes = new Set([
    ...implementationCountries.map(country => country.iso_code?.toUpperCase()),
    ...implementationCountries.map(country => country.iso_code?.toLowerCase()),
  ].filter(Boolean));

  // Create a map for country data lookup
  const countryDataMap = new Map(
    implementationCountries.map(country => [
      country.iso_code?.toUpperCase(),
      country
    ])
  );

  // Fetch and convert TopoJSON to GeoJSON
  useEffect(() => {
    console.log('WorldMap: Loading TopoJSON from:', geoUrl);
    
    const loadMapData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const response = await fetch(geoUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch map data: ${response.status}`);
        }

        const topoData = await response.json();
        console.log('WorldMap: TopoJSON loaded, converting to GeoJSON');

        // Convert TopoJSON to GeoJSON using topojson-client
        // The countries are typically in the 'countries' or 'land' property
        const countries = topoData.objects.countries || topoData.objects.land || Object.values(topoData.objects)[0];
        
        if (!countries) {
          throw new Error('No countries data found in TopoJSON');
        }

        const geoJsonData = feature(topoData, countries);
        console.log('WorldMap: Conversion successful, countries count:', geoJsonData.features.length);
        console.log('WorldMap: Sample country properties:', geoJsonData.features[0]?.properties);
        
        setGeoData(geoJsonData);
        setIsLoading(false);
      } catch (error) {
        console.error('WorldMap: Error loading map data:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadMapData();
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
                {({ geographies }) => {
                  console.log('WorldMap: Rendering geographies, count:', geographies.length);
                  
                  return geographies.map(geo => {
                    // Check multiple potential country code properties
                    const countryCode = geo.properties.ISO_A3 || 
                                      geo.properties.ISO_A2 || 
                                      geo.properties.iso_a3 || 
                                      geo.properties.iso_a2 || 
                                      geo.id;
                    
                    // Check if implemented using multiple formats
                    const isImplemented = implementedCountryCodes.has(countryCode) ||
                                        implementedCountryCodes.has(countryCode?.toUpperCase()) ||
                                        implementedCountryCodes.has(countryCode?.toLowerCase());
                    
                    const countryData = countryDataMap.get(countryCode?.toUpperCase());
                    
                    console.log('WorldMap: Country:', {
                      name: geo.properties.NAME || geo.properties.name,
                      code: countryCode,
                      isImplemented,
                      allProperties: Object.keys(geo.properties)
                    });
                    
                    return (
                      <Tooltip key={geo.rsmKey}>
                        <TooltipTrigger asChild>
                          <Geography
                            geography={geo}
                            onMouseEnter={() => {
                              if (isImplemented && countryData) {
                                setTooltipContent(countryData.names.en.formal);
                              } else {
                                setTooltipContent(geo.properties.NAME || geo.properties.name || 'Unknown');
                              }
                            }}
                            onMouseLeave={() => {
                              setTooltipContent("");
                            }}
                            style={{
                              default: {
                                fill: isImplemented ? "#3b82f6" : "#e5e7eb",
                                stroke: "#d1d5db",
                                strokeWidth: 0.5,
                                opacity: isImplemented ? 1 : 0.8,
                                outline: "none"
                              },
                              hover: {
                                fill: isImplemented ? "#2563eb" : "#f3f4f6",
                                stroke: "#9ca3af",
                                strokeWidth: 1,
                                opacity: 1,
                                outline: "none"
                              },
                              pressed: {
                                fill: isImplemented ? "#1d4ed8" : "#e5e7eb",
                                stroke: "#6b7280",
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
                  });
                }}
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        )}
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-sm shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Implemented ({implementationCountries.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <span>Not implemented</span>
            </div>
          </div>
        </div>
        
        {/* Debug info */}
        {geoData && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-600">
            Countries loaded: {(geoData as any).features?.length || 0}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
