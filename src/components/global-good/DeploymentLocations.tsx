
import { GlobalGood, CountryData } from "@/lib/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Globe } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useCountries } from "@/lib/api";
import { DeploymentMap } from "./DeploymentMap";
import { useI18n } from "@/hooks/useI18n";

interface DeploymentLocationsProps {
  globalGood: GlobalGood;
}

export function DeploymentLocations({ globalGood }: DeploymentLocationsProps) {
  const { data: countries = [] } = useCountries();
  const { tPage } = useI18n();
  
  // Create a map of country codes to country objects for quick lookups
  const countryMap = countries.reduce((map: Record<string, CountryData>, country) => {
    map[country.code] = country;
    return map;
  }, {});
  
  // Get the country objects for all countries in the global good
  const deploymentCountries = globalGood.countries
    ?.map(code => countryMap[code])
    .filter(Boolean) || [];

  // Count of countries for display
  const countryCount = deploymentCountries.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">{tPage('deployments', 'globalGoodDetails')}</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {deploymentCountries.length > 0 ? (
          <>
            {/* Map visualization */}
            <DeploymentMap globalGood={globalGood} countries={countries} />
            
            {/* Country count */}
            <div className="text-sm text-muted-foreground mb-2">
              {tPage('countries', 'globalGoodDetails', { count: countryCount })}
            </div>
            
            {/* Country badges */}
            <div className="flex flex-wrap gap-1 mb-4">
              {deploymentCountries.slice(0, 10).map((country) => (
                <Badge key={country.code} variant="outline">
                  {country.name.short}
                </Badge>
              ))}
              {deploymentCountries.length > 10 && (
                <Badge variant="outline">
                  +{deploymentCountries.length - 10} more
                </Badge>
              )}
            </div>
            
            {/* Map view button */}
            <Button 
              asChild 
              variant="outline" 
              className="w-full"
              onClick={() => {
                toast({
                  title: "Map View Available",
                  description: "Redirecting to the map visualization"
                });
              }}
            >
              <Link to={`/map?highlight=${globalGood.id}`}>
                <MapPin className="mr-2 h-4 w-4" />
                {tPage('viewOnMap', 'globalGoodDetails', { fallback: "View on Map" })}
              </Link>
            </Button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            {tPage('noDeployments', 'globalGoodDetails')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
