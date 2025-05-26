
import { Users, MapPin, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";

interface HeroStatsProps {
  globalGood: GlobalGoodFlat;
}

export function HeroStats({ globalGood }: HeroStatsProps) {
  const implementationCount = globalGood.Reach?.NumberOfImplementations || 0;
  const countriesCount = globalGood.Reach?.ImplementationCountries?.length || 0;
  const communitySize = globalGood.Community?.SizeOfCommunity || 0;

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
    },
    {
      icon: Users,
      label: "Community Size",
      value: communitySize.toLocaleString(),
      description: "Active community members"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
