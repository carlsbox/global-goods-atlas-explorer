
import { useState, useEffect, useRef } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { feature } from "topojson-client";
import { Download } from "lucide-react";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getMapGeoUrl } from "@/lib/config";
import { createUnCodeToIso2Mapping } from "@/lib/utils/countryLookup";
import { useMapDownload } from "@/hooks/useMapDownload";

const geoUrl = getMapGeoUrl();

interface AggregatedWorldMapProps {
  globalGoods: GlobalGoodFlat[];
  onCountryClick?: (countryCode: string, countryName: string) => void;
  selectedCountry?: string | null;
}

interface CountryImplementationData {
  iso2Code: string;
  name: string;
  implementationCount: number;
  globalGoods: GlobalGoodFlat[];
}

export function AggregatedWorldMap({ globalGoods, onCountryClick, selectedCountry }: AggregatedWorldMapProps) {
  const [tooltipContent, setTooltipContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [geoData, setGeoData] = useState(null);
  const [unCodeToIso2Map, setUnCodeToIso2Map] = useState<Map<string, string>>(new Map());
  const [countryDataMap, setCountryDataMap] = useState<Map<string, CountryImplementationData>>(new Map());
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { downloadMapAsImage, isDownloading } = useMapDownload();

  // Initialize the UN code to ISO2 mapping
  useEffect(() => {
    const initializeMapping = async () => {
      try {
        const mapping = await createUnCodeToIso2Mapping();
        setUnCodeToIso2Map(mapping);
      } catch (error) {
        console.error('AggregatedWorldMap: Error initializing UN code mapping:', error);
        setUnCodeToIso2Map(new Map());
      }
    };
    
    initializeMapping();
  }, []);

  // Aggregate implementation data by country
  useEffect(() => {
    const aggregatedData = new Map<string, CountryImplementationData>();
    
    globalGoods.forEach(good => {
      const countries = good.Reach?.ImplementationCountries || [];
      countries.forEach(country => {
        const iso2Code = country.iso_code?.toUpperCase();
        if (!iso2Code) return;
        
        if (aggregatedData.has(iso2Code)) {
          const existing = aggregatedData.get(iso2Code)!;
          existing.implementationCount += 1;
          existing.globalGoods.push(good);
        } else {
          aggregatedData.set(iso2Code, {
            iso2Code,
            name: country.names.en.short,
            implementationCount: 1,
            globalGoods: [good]
          });
        }
      });
    });
    
    setCountryDataMap(aggregatedData);
    console.log('AggregatedWorldMap: Aggregated data for', aggregatedData.size, 'countries');
  }, [globalGoods]);

  // Fetch and convert TopoJSON to GeoJSON
  useEffect(() => {
    const loadMapData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const response = await fetch(geoUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch map data: ${response.status}`);
        }

        const topoData = await response.json();
        const countries = topoData.objects.countries || topoData.objects.land || Object.values(topoData.objects)[0];
        
        if (!countries) {
          throw new Error('No countries data found in TopoJSON');
        }

        const geoJsonData = feature(topoData, countries);
        setGeoData(geoJsonData);
        setIsLoading(false);
      } catch (error) {
        console.error('AggregatedWorldMap: Error loading map data:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadMapData();
  }, []);

  const handleDownload = () => {
    if (mapContainerRef.current) {
      downloadMapAsImage(mapContainerRef.current, "Global Goods Implementation Overview");
    }
  };

  const getCountryColor = (implementationCount: number) => {
    if (implementationCount === 0) return "#e5e7eb";
    if (implementationCount === 1) return "#dbeafe";
    if (implementationCount <= 3) return "#93c5fd";
    if (implementationCount <= 5) return "#60a5fa";
    if (implementationCount <= 10) return "#3b82f6";
    return "#1d4ed8";
  };

  const getCountryOpacity = (implementationCount: number, isSelected: boolean) => {
    if (isSelected) return 1;
    return implementationCount > 0 ? 0.9 : 0.6;
  };

  if (hasError) {
    return (
      <div className="w-full h-[400px] bg-muted/20 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">Unable to load world map</p>
          <p className="text-sm text-muted-foreground">Please check your internet connection</p>
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
                      return geographies.map(geo => {
                        const mapCountryId = geo.id || geo.properties.UN_A3 || geo.properties.ISO_A3;
                        
                        let countryIso2 = null;
                        if (mapCountryId && unCodeToIso2Map.has(String(mapCountryId))) {
                          countryIso2 = unCodeToIso2Map.get(String(mapCountryId));
                        }
                        
                        if (!countryIso2) {
                          countryIso2 = geo.properties.ISO_A2?.toLowerCase();
                        }
                        
                        const countryData = countryIso2 ? countryDataMap.get(countryIso2.toUpperCase()) : null;
                        const implementationCount = countryData?.implementationCount || 0;
                        const isSelected = selectedCountry === countryIso2?.toUpperCase();
                        const countryName = countryData?.name || geo.properties.NAME || geo.properties.NAME_EN || 'Unknown';
                        
                        return (
                          <Tooltip key={geo.rsmKey}>
                            <TooltipTrigger asChild>
                              <Geography
                                geography={geo}
                                onMouseEnter={() => {
                                  if (implementationCount > 0) {
                                    setTooltipContent(`${countryName}: ${implementationCount} global good${implementationCount > 1 ? 's' : ''}`);
                                  } else {
                                    setTooltipContent(countryName);
                                  }
                                }}
                                onMouseLeave={() => {
                                  setTooltipContent("");
                                }}
                                onClick={() => {
                                  if (implementationCount > 0 && onCountryClick && countryIso2) {
                                    onCountryClick(countryIso2.toUpperCase(), countryName);
                                  }
                                }}
                                style={{
                                  default: {
                                    fill: isSelected ? "#1e40af" : getCountryColor(implementationCount),
                                    stroke: "#e5e7eb",
                                    strokeWidth: 0.3,
                                    opacity: getCountryOpacity(implementationCount, isSelected),
                                    outline: "none",
                                    cursor: implementationCount > 0 ? "pointer" : "default"
                                  },
                                  hover: {
                                    fill: implementationCount > 0 ? "#1d4ed8" : "#f3f4f6",
                                    stroke: "#d1d5db",
                                    strokeWidth: 0.4,
                                    opacity: 1,
                                    outline: "none"
                                  },
                                  pressed: {
                                    fill: implementationCount > 0 ? "#1e40af" : "#e5e7eb",
                                    stroke: "#d1d5db",
                                    strokeWidth: 0.3,
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
          
          {/* Enhanced Legend */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-sm shadow-md border">
            <div className="space-y-3">
              <h4 className="font-medium text-center">Implementation Density</h4>
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-300 rounded"></div>
                  <span>None</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-100 rounded"></div>
                  <span>1</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-300 rounded"></div>
                  <span>2-3</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-400 rounded"></div>
                  <span>4-5</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>6-10</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-700 rounded"></div>
                  <span>10+</span>
                </div>
              </div>
              <p className="text-center text-muted-foreground text-xs">
                Click on a country to view its global goods
              </p>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
