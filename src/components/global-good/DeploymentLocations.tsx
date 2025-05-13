
import { GlobalGood, CountryData } from "@/lib/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useCountries } from "@/lib/api";

interface DeploymentLocationsProps {
  globalGood: GlobalGood;
}

export function DeploymentLocations({ globalGood }: DeploymentLocationsProps) {
  const { data: countries = [] } = useCountries();
  
  // Create a map of country codes to country objects for quick lookups
  const countryMap = countries.reduce((map: Record<string, CountryData>, country) => {
    map[country.code] = country;
    return map;
  }, {});
  
  // Get the country objects for all countries in the global good
  const deploymentCountries = globalGood.countries
    ?.map(code => countryMap[code])
    .filter(Boolean) || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Deployment Locations</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {deploymentCountries.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-1">
              {deploymentCountries.map((country) => (
                <Badge key={country.code} variant="outline">
                  {country.name}
                </Badge>
              ))}
            </div>
            
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
                View on Map
              </Link>
            </Button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            No deployment information available.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
