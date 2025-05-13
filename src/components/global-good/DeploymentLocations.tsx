
import { GlobalGood } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface DeploymentLocationsProps {
  globalGood: GlobalGood;
}

export function DeploymentLocations({ globalGood }: DeploymentLocationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Deployment Locations
        </CardTitle>
        <CardDescription>
          {globalGood.countries?.length || 0} countries using this global good
        </CardDescription>
      </CardHeader>
      <CardContent>
        {globalGood.countries && globalGood.countries.length > 0 ? (
          <div className="flex flex-col gap-1">
            {globalGood.countries.map((country) => (
              <div key={country} className="p-2 bg-secondary/30 rounded-sm text-sm">
                {country}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No country data available</p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            toast({
              title: "Map Feature",
              description: "View this global good on our interactive map to explore geographic distribution.",
              action: (
                <Button asChild variant="outline" size="sm">
                  <Link to={`/map?highlight=${globalGood.id}`}>
                    Open Map
                  </Link>
                </Button>
              ),
            });
          }}
        >
          <MapPin className="mr-2 h-4 w-4" />
          View on Map
        </Button>
      </CardFooter>
    </Card>
  );
}
