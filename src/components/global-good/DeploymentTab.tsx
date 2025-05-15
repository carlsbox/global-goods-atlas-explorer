
import { GlobalGood, CountryData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Globe, Info } from "lucide-react";
import { useCountries } from "@/lib/api";
import { useI18n } from "@/hooks/useI18n";
import { DeploymentMap } from "./DeploymentMap";

interface DeploymentTabProps {
  globalGood: GlobalGood;
}

export function DeploymentTab({ globalGood }: DeploymentTabProps) {
  const { data: countries = [] } = useCountries();
  const { tPage } = useI18n();
  
  // Create a map of country codes to country objects for quick lookups
  const countryMap = countries.reduce((map: Record<string, CountryData>, country) => {
    map[country.code] = country;
    return map;
  }, {});
  
  // Get the countries data from the reach property in the new structure
  const countryCodes = globalGood.reach?.countries || [];
  
  // Get the country objects for all countries in the global good
  const deploymentCountries = countryCodes
    .map(code => countryMap[code])
    .filter(Boolean);

  // Count of countries for display
  const countryCount = deploymentCountries.length;
  
  // Get implementation count from the reach data
  const implementationCount = globalGood.reach?.implementations || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-primary" />
              Deployment Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            {countryCodes.length > 0 ? (
              <>
                <DeploymentMap globalGood={globalGood} countries={countries} />
                <div className="mt-4 text-sm text-muted-foreground">
                  {tPage('countries', 'globalGoodDetails', { count: countryCount })}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Info className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  {tPage('noDeployments', 'globalGoodDetails')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Deployment Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {implementationCount > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Total Implementations</h3>
                <p className="text-2xl font-bold">{implementationCount.toLocaleString()}</p>
              </div>
            )}
            
            {countryCount > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Countries</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{countryCount}</p>
                  <Badge variant="outline">
                    {Math.round((countryCount / countries.length) * 100)}% of world
                  </Badge>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-xs font-medium uppercase text-muted-foreground mb-2">
                    Top Deployment Countries
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {deploymentCountries.slice(0, 5).map((country) => (
                      <Badge key={country.code} variant="secondary">
                        {country.name.short}
                      </Badge>
                    ))}
                    {deploymentCountries.length > 5 && (
                      <Badge variant="outline">
                        +{deploymentCountries.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {globalGood.reach?.summary && (
              <div className="mt-4 pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Reach Summary</h3>
                <p className="text-sm text-muted-foreground">{globalGood.reach.summary}</p>
              </div>
            )}
            
            <Button 
              asChild 
              variant="outline" 
              className="w-full mt-4"
            >
              <Link to={`/map?highlight=${globalGood.id}`}>
                <MapPin className="mr-2 h-4 w-4" />
                {tPage('viewOnMap', 'globalGoodDetails')}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
