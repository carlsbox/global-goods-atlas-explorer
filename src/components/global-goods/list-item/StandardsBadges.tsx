
import { Badge } from "@/components/ui/badge";

interface Standard {
  code: string;
}

interface StandardsBadgesProps {
  healthStandards: Standard[];
  interopStandards: Standard[];
}

export function StandardsBadges({ healthStandards, interopStandards }: StandardsBadgesProps) {
  if (healthStandards.length === 0 && interopStandards.length === 0) return null;

  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-muted-foreground">Standards</div>
      <div className="flex flex-wrap gap-1">
        {/* Health Standards */}
        {healthStandards.slice(0, 2).map((standard) => (
          <Badge key={standard.code} variant="default" className="text-xs bg-red-100 text-red-800 hover:bg-red-200">
            Health: {standard.code}
          </Badge>
        ))}
        
        {/* Interoperability Standards */}
        {interopStandards.slice(0, 2).map((standard) => (
          <Badge key={standard.code} variant="default" className="text-xs bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
            Interop: {standard.code}
          </Badge>
        ))}
        
        {/* Show overflow count for standards */}
        {(healthStandards.length + interopStandards.length > 4) && (
          <Badge variant="outline" className="text-xs">
            +{(healthStandards.length - 2) + (interopStandards.length - 2)} standards
          </Badge>
        )}
      </div>
    </div>
  );
}
