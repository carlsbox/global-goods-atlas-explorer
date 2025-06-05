import { useState, useEffect, useRef } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { feature } from "topojson-client";
import { Download } from "lucide-react";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getMapGeoUrl } from "@/lib/config";
import { createUnCodeToIso2Mapping, getCountryByAnyCode } from "@/lib/utils/countryLookup";
import { useMapDownload } from "@/hooks/useMapDownload";

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
  const [unCodeToIso2Map, setUnCodeToIso2Map] = useState<Map<string, string>>(new Map());
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { downloadMapAsImage, isDownloading } = useMapDownload();
  
  // Parse implementation countries data to handle different formats
  const rawCountries = globalGood.Reach?.ImplementationCountries || [];
  const implementationCountries = rawCountries.map((country: any) => {
    if (typeof country === 'string') {
      // Handle string format (just ISO codes)
      return {
        iso_code: country,
        type: 'Country',
        names: {
          en: {
            short: country.toUpperCase(),
            formal: country.toUpperCase()
          }
        }
      };
    }
    // Handle full object format
    return country;
  });
  
  console.log('WorldMap: Implementation countries:', implementationCountries);
  
  // Create lookup sets for implementation countries using ISO codes
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

  // Initialize the UN code to ISO2 mapping
  useEffect(() => {
    const initializeMapping = async () => {
      try {
        const mapping = await createUnCodeToIso2Mapping();
        setUnCodeToIso2Map(mapping);
        console.log('WorldMap: UN code to ISO2 mapping initialized with', mapping.size, 'entries');
      } catch (error) {
        console.error('WorldMap: Error initializing UN code mapping:', error);
        setUnCodeToIso2Map(new Map());
      }
    };
    
    initializeMapping();
  }, []);

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

  const handleDownload = () => {
    if (mapContainerRef.current) {
      downloadMapAsImage(mapContainerRef.current, globalGood.Name);
    }
  };

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
    <div className="w-full space-y-4">
      <TooltipProvider>
        <div ref={mapContainerRef} className="w-full space-y-4">
          <div className="w-full h-[400px] bg-muted/20 rounded-lg overflow-hidden relative">
            {/* Download Button */}
            <div className="absolute top-4 right-4 z-10">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleDownload}
                    disabled={isLoading || hasError || isDownloading}
                    className="bg-white/90 hover:bg-white shadow-md"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isDownloading ? 'Downloading...' : 'Download map as image'}</p>
                </TooltipContent>
              </Tooltip>
            </div>

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
                  scale: 170,
                }}
                className="w-full h-full"
              >
                <ZoomableGroup zoom={1.3} center={[10, 0]}>
                  <Geographies geography={geoData}>
                    {({ geographies }) => {
                      console.log('WorldMap: Rendering geographies, count:', geographies.length);
                      let implementedCount = 0;
                      
                      return geographies.map(geo => {
                        // Get country identifier from map data (usually the ID is the UN code)
                        const mapCountryId = geo.id || geo.properties.UN_A3 || geo.properties.ISO_A3;
                        
                        // Try to map UN code to ISO2 code
                        let countryIso2 = null;
                        if (mapCountryId && unCodeToIso2Map.has(String(mapCountryId))) {
                          countryIso2 = unCodeToIso2Map.get(String(mapCountryId));
                        }
                        
                        // Alternative: try direct ISO code lookup
                        if (!countryIso2) {
                          countryIso2 = geo.properties.ISO_A2?.toLowerCase();
                        }
                        
                        // Check if this country is implemented
                        const isImplemented = countryIso2 && (
                          implementedCountryCodes.has(countryIso2.toUpperCase()) ||
                          implementedCountryCodes.has(countryIso2.toLowerCase())
                        );
                        
                        if (isImplemented) {
                          implementedCount++;
                        }
                        
                        const countryData = countryIso2 ? countryDataMap.get(countryIso2.toUpperCase()) : null;
                        
                        return (
                          <Tooltip key={geo.rsmKey}>
                            <TooltipTrigger asChild>
                              <Geography
                                geography={geo}
                                onMouseEnter={() => {
                                  if (isImplemented && countryData) {
                                    setTooltipContent(countryData.names?.en?.formal || countryData.names?.en?.short || countryData.iso_code);
                                  } else {
                                    setTooltipContent(geo.properties.NAME || geo.properties.NAME_EN || 'Unknown');
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
          </div>
          
          {/* Legend */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-sm shadow-md border">
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
        </div>
      </TooltipProvider>
    </div>
  );
}
