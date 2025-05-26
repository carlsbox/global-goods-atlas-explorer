
import { ExternalLink, Map } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";

interface InteractiveMapCardProps {
  globalGood: GlobalGoodFlat;
}

export function InteractiveMapCard({ globalGood }: InteractiveMapCardProps) {
  const mapOverview = globalGood.Reach?.ImplementationMapOverview;

  if (!mapOverview || mapOverview.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Map className="h-5 w-5 mr-2 text-primary" />
            Implementation Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Map className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No map visualization available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Map className="h-5 w-5 mr-2 text-primary" />
          Implementation Map
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mapOverview.map((map, index) => (
          <div key={index} className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-3">
              {map.description}
            </p>
            <Button asChild className="w-full">
              <a href={map.url} target="_blank" rel="noopener noreferrer">
                View Interactive Map
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
