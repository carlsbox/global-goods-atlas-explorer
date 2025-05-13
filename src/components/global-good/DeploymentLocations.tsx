
import { GlobalGood } from "@/lib/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Deployment Locations</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {globalGood.countries && globalGood.countries.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-1">
              {globalGood.countries.map((country) => (
                <Badge key={country} variant="outline">
                  {country}
                </Badge>
              ))}
            </div>
            
            <Button 
              asChild 
              variant="outline" 
              className="w-full"
              onClick={() => {
                toast({
                  title: "Coming Soon",
                  description: "The map view is under development"
                });
              }}
            >
              <Link to="/map">
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
