
import { useEffect, useRef, useState } from "react";
import { GlobalGood, CountryData } from "@/lib/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  ZoomableGroup 
} from "react-simple-maps";
import { getMapGeoUrl } from "@/lib/config";
import { loadGeoJsonData } from "@/lib/mapUtils";

// Use centralized map data configuration
const geoUrl = getMapGeoUrl();

interface DeploymentMapProps {
  globalGood: GlobalGood;
  countries: CountryData[];
}

export function DeploymentMap({ globalGood, countries }: DeploymentMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [geoData, setGeoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get country codes from reach.countries or fall back to countries
  const countryCodes = globalGood.reach?.countries || globalGood.countries || [];

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

  if (isLoading) {
    return (
      <AspectRatio ratio={16/9} className="overflow-hidden rounded-md bg-muted/20 mb-4">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </AspectRatio>
    );
  }
  
  return (
    <AspectRatio ratio={16/9} className="overflow-hidden rounded-md bg-muted/20 mb-4">
      <div ref={mapRef} className="w-full h-full">
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
                    // Check if this country is in the global good's countries list
                    const isActive = countryCodes.includes(countryCode?.toLowerCase());
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            fill: isActive ? "var(--primary)" : "var(--muted)",
                            stroke: "var(--border)",
                            strokeWidth: 0.5,
                            opacity: isActive ? 1 : 0.3,
                            outline: "none"
                          },
                          hover: {
                            fill: isActive ? "var(--primary)" : "var(--muted)",
                            stroke: "var(--border)",
                            strokeWidth: 0.5,
                            outline: "none"
                          },
                          pressed: {
                            fill: isActive ? "var(--primary)" : "var(--muted)",
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
    </AspectRatio>
  );
}
