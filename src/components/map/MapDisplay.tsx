
import { Button } from "@/components/ui/button";
import { CountryData, GlobalGood } from "@/lib/types";

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
  return (
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
            onClick={() => onSelectCountry(country.code)}
          >
            {country.name.short}
          </Button>
        ))}
      </div>
    </div>
  );
}
