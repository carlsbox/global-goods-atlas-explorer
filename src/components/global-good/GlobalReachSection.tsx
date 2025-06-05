import { MapPin, Globe, ExternalLink, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { WorldMap } from "@/components/global-good/WorldMap";
import { CountriesModal } from "@/components/global-good/CountriesModal";
import { CountryFlag } from "@/lib/utils/countryFlags";

interface GlobalReachSectionProps {
  globalGood: GlobalGoodFlat;
}

// Helper function to parse implementation countries data
function parseImplementationCountries(globalGood: GlobalGoodFlat) {
  const countries = globalGood.Reach?.ImplementationCountries || [];
  
  // Handle different data formats - sometimes it's just country codes, sometimes full objects
  const parsedCountries = countries.map((country: any) => {
    if (typeof country === 'string') {
      // Handle string format (just ISO codes)
      return {
        iso_code: country,
        type: 'Country',
        names: {
          en: {
            short: country.toUpperCase(),
            formal: country.toUpperCase()
          }
        }
      };
    }
    // Handle full object format
    return country;
  });

  return parsedCountries;
}

// Helper function to check if external map exists
function hasValidExternalMapUrl(globalGood: GlobalGoodFlat): boolean {
  const mapUrl = globalGood.Reach?.ImplementationMapOverview?.url;
  return !!(mapUrl && mapUrl.trim() !== "" && mapUrl !== "#");
}

export function GlobalReachSection({ globalGood }: GlobalReachSectionProps) {
  const countries = parseImplementationCountries(globalGood);
  const hasExternalMap = hasValidExternalMapUrl(globalGood);
  const reach = globalGood.Reach;
  
  // Get key statistics
  const countryCount = countries.length;
  const implementationCount = reach?.NumberOfImplementations || 0;
  const reachSummary = reach?.SummaryOfReach || "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Global Reach</h2>
        {reachSummary && (
          <p className="text-muted-foreground mb-4">{reachSummary}</p>
        )}
      </div>

      {/* Statistics Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{countryCount}</p>
              <p className="text-sm text-muted-foreground">
                {countryCount === 1 ? 'Country' : 'Countries'}
              </p>
            </div>
          </CardContent>
        </Card>

        {implementationCount > 0 && (
          <Card>
            <CardContent className="flex items-center p-4">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{implementationCount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Implementations</p>
              </div>
            </CardContent>
          </Card>
        )}

        {hasExternalMap && (
          <Card>
            <CardContent className="flex items-center p-4">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Interactive Map</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* World Map and Countries in 70/30 Split */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* World Map - 70% */}
        <div className="lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Global Distribution
                </span>
                {hasExternalMap && (
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={reach!.ImplementationMapOverview!.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Interactive Map
                    </a>
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WorldMap globalGood={globalGood} />
            </CardContent>
          </Card>
        </div>

        {/* Countries Details - 30% */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Implementation Countries
                </span>
                {countryCount > 0 && <CountriesModal globalGood={globalGood} />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {countryCount === 0 ? (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No deployment information available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Deployed in {countryCount} {countryCount === 1 ? 'country' : 'countries'}
                    </p>
                    <Badge variant="secondary">{countryCount} total</Badge>
                  </div>

                  {/* Country Grid - Show first 8 countries in compact layout */}
                  <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
                    {countries.slice(0, 8).map((country, index) => (
                      <div key={index} className="flex items-center p-2 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="mr-2 flex-shrink-0">
                          <CountryFlag isoCode={country.iso_code} />
                        </div>
                        <div className="font-medium text-sm truncate">
                          {country.names?.en?.short || country.iso_code?.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Show more indicator */}
                  {countryCount > 8 && (
                    <div className="text-center pt-2">
                      <p className="text-xs text-muted-foreground">
                        And {countryCount - 8} more countries...
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
