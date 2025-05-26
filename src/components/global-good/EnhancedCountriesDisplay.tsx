
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-primary" />
          Implementation Countries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Deployed in {countries.length} {countries.length === 1 ? 'country' : 'countries'}
          </p>
        </div>
        
        <div className="space-y-3">
          {countries.map((country, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
                  {country.iso_code.toUpperCase()}
                </div>
                <div>
                  <div className="font-medium">{country.names.en.short}</div>
                  <div className="text-sm text-muted-foreground">
                    {country.names.en.formal}
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {country.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
