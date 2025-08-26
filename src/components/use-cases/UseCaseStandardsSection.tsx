import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { StandardsBadgeCloud } from "@/components/global-good/StandardsBadgeCloud";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUseCaseStandardsResolver } from "@/hooks/useUseCaseStandardsResolver";

interface UseCaseStandardsSectionProps {
  standards: string[];
}

export function UseCaseStandardsSection({ standards }: UseCaseStandardsSectionProps) {
  const { groupedStandards, loading, resolvedStandards, error } = useUseCaseStandardsResolver(standards);

  if (!standards || standards.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No standards specified for this use case.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <LoadingSpinner />
        Loading standards information...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-600">
        Error loading standards: {error}
        <div className="mt-2">
          <div className="text-xs text-muted-foreground">
            Standards codes: {standards.join(', ')}
          </div>
        </div>
      </div>
    );
  }

  if (resolvedStandards.length === 0) {
    return (
      <div className="space-y-2">
        <div className="text-sm text-orange-600">
          Could not resolve standards information from reference data.
        </div>
        <div className="flex flex-wrap gap-2">
          {standards.map((code) => (
            <Badge key={code} variant="outline" className="text-xs">
              {code}
            </Badge>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TooltipProvider>
        {groupedStandards.health.length > 0 && (
          <StandardsBadgeCloud
            standards={groupedStandards.health}
            variant="health"
            title="Health Standards"
            maxVisible={6}
          />
        )}
        
        {groupedStandards.interoperability.length > 0 && (
          <StandardsBadgeCloud
            standards={groupedStandards.interoperability}
            variant="interoperability"
            title="Interoperability Standards"
            maxVisible={6}
          />
        )}
        
        {groupedStandards.climate.length > 0 && (
          <StandardsBadgeCloud
            standards={groupedStandards.climate}
            variant="climate"
            title="Climate Standards"
            maxVisible={6}
          />
        )}
        
        {groupedStandards.dataCollection.length > 0 && (
          <StandardsBadgeCloud
            standards={groupedStandards.dataCollection}
            variant="interoperability"
            title="Data Collection Standards"
            maxVisible={6}
          />
        )}
        
        {groupedStandards.emergency.length > 0 && (
          <StandardsBadgeCloud
            standards={groupedStandards.emergency}
            variant="health"
            title="Emergency Standards"
            maxVisible={6}
          />
        )}
      </TooltipProvider>
    </div>
  );
}