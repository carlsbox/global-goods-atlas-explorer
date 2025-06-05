
import { ExternalLink, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";

interface InteractiveMapCardProps {
  globalGood: GlobalGoodFlat;
}

// Helper function to validate external map URL
function hasValidExternalMapUrl(globalGood: GlobalGoodFlat): boolean {
  const mapUrl = globalGood.Reach?.ImplementationMapOverview?.url;
  return !!(mapUrl && mapUrl.trim() !== "" && mapUrl !== "#");
}

export function InteractiveMapCard({ globalGood }: InteractiveMapCardProps) {
  // Only show the card if there's a valid external map URL
  if (!hasValidExternalMapUrl(globalGood)) {
    return null;
  }

  const mapOverview = globalGood.Reach?.ImplementationMapOverview;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-primary" />
          Interactive Implementation Map
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-8">
          <div className="rounded-full bg-primary/10 p-4 mb-4 mx-auto w-fit">
            <ExternalLink className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">External Interactive Map Available</h3>
          <p className="text-muted-foreground mb-4">
            {mapOverview?.description || "View the interactive implementation map to explore global deployment details."}
          </p>
          <Button asChild className="w-full">
            <a 
              href={mapOverview!.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              Open Interactive Map
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
