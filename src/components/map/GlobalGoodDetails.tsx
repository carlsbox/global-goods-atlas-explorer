
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlobalGood, CountryData } from "@/lib/types";

interface GlobalGoodDetailsProps {
  globalGood: GlobalGood;
  selectedCountryCode: string | null;
  countries: CountryData[];
  onSelectCountry: (code: string | null) => void;
}

export function GlobalGoodDetails({
  globalGood,
  selectedCountryCode,
  countries,
  onSelectCountry
}: GlobalGoodDetailsProps) {
  // Get countries for the selected global good
  const selectedGoodCountries = globalGood.countries
    .map(code => countries.find(c => c.code === code))
    .filter(Boolean) as CountryData[];
  
  return (
    <Card className="border-0 shadow-none rounded-none h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {globalGood.logo ? (
            <img 
              src={globalGood.logo} 
              alt={globalGood.name} 
              className="h-6 w-6 object-contain"
            />
          ) : null}
          {globalGood.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {globalGood.description}
        </p>
        
        <h3 className="font-semibold mb-2">Countries</h3>
        <div className="mb-6">
          {selectedGoodCountries.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {selectedGoodCountries.map(country => (
                <Button
                  key={country.code}
                  variant={selectedCountryCode === country.code ? "default" : "outline"}
                  size="sm"
                  className="text-xs justify-start"
                  onClick={() => onSelectCountry(selectedCountryCode === country.code ? null : country.code)}
                >
                  {country.name.short}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No country data available</p>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {globalGood.sector?.map(sector => (
            <Badge key={sector} variant="secondary" className="text-xs">
              {sector}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
