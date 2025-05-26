
import { ExternalLink, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { WorldMap } from "./WorldMap";

interface InteractiveMapCardProps {
  globalGood: GlobalGoodFlat;
}

export function InteractiveMapCard({ globalGood }: InteractiveMapCardProps) {
  const mapOverview = globalGood.Reach?.ImplementationMapOverview;
  const hasCountries = globalGood.Reach?.ImplementationCountries && 
    globalGood.Reach.ImplementationCountries.length > 0;

  if (!hasCountries) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            Global Implementation Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No implementation data available</p>
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
          Global Implementation Map
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <WorldMap globalGood={globalGood} />
        
        {mapOverview && (
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-3">
              {mapOverview.description}
            </p>
            <Button asChild className="w-full">
              <a href={mapOverview.url} target="_blank" rel="noopener noreferrer">
                View External Interactive Map
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
