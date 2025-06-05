
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { CountriesModal } from "./CountriesModal";
import { CountryFlag } from "@/lib/utils/countryFlags";

interface EnhancedCountriesDisplayProps {
  globalGood: GlobalGoodFlat;
}

export function EnhancedCountriesDisplay({ globalGood }: EnhancedCountriesDisplayProps) {
  const countries = globalGood.Reach?.ImplementationCountries || [];

  if (countries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            Implementation Countries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No deployment information available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Filter out any undefined/null countries and sort them
  const validCountries = countries.filter(country => country && typeof country === 'object');
  
  // Sort countries alphabetically by their name, handling the expected data structure
  const sortedCountries = [...validCountries].sort((a, b) => {
    // Use only the properties that exist on the expected type
    const nameA = a.names?.en?.short || 'Unknown';
    const nameB = b.names?.en?.short || 'Unknown';
    
    return nameA.localeCompare(nameB);
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-primary" />
          Implementation Countries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Deployed in {countries.length} {countries.length === 1 ? 'country' : 'countries'}
          </p>
          <CountriesModal globalGood={globalGood} />
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          <div className="grid grid-cols-1 gap-2">
            {sortedCountries.map((country, index) => {
              // Get the country name using only expected properties
              const countryName = country.names?.en?.short || 'Unknown Country';
              const isoCode = country.iso_code || '';
              
              return (
                <div key={`${isoCode}-${index}`} className="flex items-center p-2 border rounded hover:bg-muted/50 transition-colors">
                  <div className="mr-3 flex-shrink-0">
                    <CountryFlag isoCode={isoCode} />
                  </div>
                  <div className="font-medium text-sm truncate">
                    {countryName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
