
import { Users, MapPin, BarChart3, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";

interface HeroStatsProps {
  globalGood: GlobalGoodFlat;
}

export function HeroStats({ globalGood }: HeroStatsProps) {
  const implementationCount = globalGood.Reach?.NumberOfImplementations || 0;
  const countriesCount = globalGood.Reach?.ImplementationCountries?.length || 0;
  const mapOverview = globalGood.Reach?.ImplementationMapOverview;

  const stats = [
    {
      icon: BarChart3,
      label: "Total Implementations",
      value: implementationCount.toLocaleString(),
      description: "Active deployments worldwide"
    },
    {
      icon: MapPin,
      label: "Countries Reached",
      value: countriesCount.toLocaleString(),
      description: "Nations with active implementations"
    }
  ];

  // Add conditional implementation map card
  if (mapOverview) {
    stats.push({
      icon: Globe,
      label: "Interactive Map",
      value: "Available",
      description: mapOverview.description
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={stat.label} className="text-center">
          <CardContent className="p-6">
            <div className="flex justify-center mb-3">
              <stat.icon className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-1">
              {stat.value}
            </div>
            <div className="font-medium text-gray-900 mb-1">
              {stat.label}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.description}
            </div>
            {stat.label === "Interactive Map" && mapOverview && (
              <Button asChild size="sm" className="mt-3">
                <a href={mapOverview.url} target="_blank" rel="noopener noreferrer">
                  View External Map
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
