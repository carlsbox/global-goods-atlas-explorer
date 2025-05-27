
import { Badge } from "@/components/ui/badge";

interface SDG {
  code: string;
  title: string;
}

interface SDGBadgesProps {
  sdgs: SDG[];
}

export function SDGBadges({ sdgs }: SDGBadgesProps) {
  if (sdgs.length === 0) return null;

  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-muted-foreground">SDGs</div>
      <div className="flex flex-wrap gap-1">
        {sdgs.slice(0, 4).map((sdg) => (
          <Badge key={sdg.code} variant="default" className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200">
            {sdg.code} - {sdg.title}
          </Badge>
        ))}
        {sdgs.length > 4 && (
          <Badge variant="outline" className="text-xs">
            +{sdgs.length - 4} more
          </Badge>
        )}
      </div>
    </div>
  );
}
