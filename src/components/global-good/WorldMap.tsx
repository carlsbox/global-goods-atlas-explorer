
import { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const geoUrl = "/world-countries-110m.json";

interface WorldMapProps {
  globalGood: GlobalGoodFlat;
}

export function WorldMap({ globalGood }: WorldMapProps) {
  const [tooltipContent, setTooltipContent] = useState("");
  const implementationCountries = globalGood.Reach?.ImplementationCountries || [];
  
  // Create a set of ISO codes for quick lookup
  const implementedCountryCodes = new Set(
    implementationCountries.map(country => country.iso_code.toUpperCase())
  );

  return (
    <TooltipProvider>
      <div className="w-full h-[400px] bg-muted/20 rounded-lg overflow-hidden">
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
                  const isImplemented = implementedCountryCodes.has(geo.properties.ISO_A3);
                  const countryData = implementationCountries.find(
                    country => country.iso_code.toUpperCase() === geo.properties.ISO_A3
                  );
                  
                  return (
                    <Tooltip key={geo.rsmKey}>
                      <TooltipTrigger asChild>
                        <Geography
                          geography={geo}
                          onMouseEnter={() => {
                            if (isImplemented && countryData) {
                              setTooltipContent(
                                `${countryData.names.en.formal} (${countryData.type})`
                              );
                            } else {
                              setTooltipContent(geo.properties.name);
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
