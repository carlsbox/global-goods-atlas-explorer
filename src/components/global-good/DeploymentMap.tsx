
import { useEffect, useRef } from "react";
import { GlobalGood, CountryData } from "@/lib/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { geoCentroid } from "d3-geo";
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  ZoomableGroup 
} from "react-simple-maps";
import { getMapGeoUrl } from "@/lib/config";

// Use centralized map data configuration
const geoUrl = getMapGeoUrl();

interface DeploymentMapProps {
  globalGood: GlobalGood;
  countries: CountryData[];
}

export function DeploymentMap({ globalGood, countries }: DeploymentMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // Get country codes from reach.countries or fall back to countries
  const countryCodes = globalGood.reach?.countries || globalGood.countries || [];
  
  return (
    <AspectRatio ratio={16/9} className="overflow-hidden rounded-md bg-muted/20 mb-4">
      <div ref={mapRef} className="w-full h-full">
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{
            scale: 120,
          }}
          className="w-full h-full"
        >
          <ZoomableGroup zoom={1} center={[0, 20]}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  // Check if this country is in the global good's countries list
                  const isActive = countryCodes.includes(geo.properties.ISO_A3.toLowerCase());
                  
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
      </div>
    </AspectRatio>
  );
}
