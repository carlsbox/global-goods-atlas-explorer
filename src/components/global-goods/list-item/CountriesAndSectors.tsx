
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

interface CountriesAndSectorsProps {
  countryCount: number;
  sectors: string[];
}

export function CountriesAndSectors({ countryCount, sectors }: CountriesAndSectorsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-3">
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Globe className="h-4 w-4" />
        <span>{countryCount} {countryCount === 1 ? 'country' : 'countries'}</span>
      </div>
      
      {sectors.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {sectors.slice(0, 2).map((sector) => (
            <Badge key={sector} variant="secondary" className="text-xs">
              {sector}
            </Badge>
          ))}
          {sectors.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{sectors.length - 2} sectors
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
