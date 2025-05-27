
import { Badge } from "@/components/ui/badge";

interface Classification {
  code: string;
  title: string;
}

interface ClassificationBadgesProps {
  whoClassifications: Classification[];
  dpiClassifications: Classification[];
  wmoClassifications: Classification[];
}

export function ClassificationBadges({ 
  whoClassifications, 
  dpiClassifications, 
  wmoClassifications 
}: ClassificationBadgesProps) {
  return (
    <>
      {/* WHO Classifications */}
      {whoClassifications.length > 0 && (
        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground">WHO</div>
          <div className="flex flex-wrap gap-1">
            {whoClassifications.slice(0, 2).map((classification) => (
              <Badge key={classification.code} variant="default" className="text-xs bg-green-100 text-green-800 hover:bg-green-200">
                {classification.title}
              </Badge>
            ))}
            {whoClassifications.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{whoClassifications.length - 2} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* DPI Classifications */}
      {dpiClassifications.length > 0 && (
        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground">DPI</div>
          <div className="flex flex-wrap gap-1">
            {dpiClassifications.slice(0, 2).map((classification) => (
              <Badge key={classification.code} variant="default" className="text-xs bg-purple-100 text-purple-800 hover:bg-purple-200">
                {classification.title}
              </Badge>
            ))}
            {dpiClassifications.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{dpiClassifications.length - 2} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* WMO Classifications */}
      {wmoClassifications.length > 0 && (
        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground">WMO</div>
          <div className="flex flex-wrap gap-1">
            {wmoClassifications.slice(0, 2).map((classification) => (
              <Badge key={classification.code} variant="default" className="text-xs bg-orange-100 text-orange-800 hover:bg-orange-200">
                {classification.title}
              </Badge>
            ))}
            {wmoClassifications.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{wmoClassifications.length - 2} more
              </Badge>
            )}
          </div>
        </div>
      )}
    </>
  );
}
