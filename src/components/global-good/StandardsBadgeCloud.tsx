
import { StandardBadge } from "./StandardBadge";
import { TooltipProvider } from "@/components/ui/tooltip";

interface Standard {
  code: string;
  name: string;
  description: string;
  domain?: string;
  type?: string;
  link?: string;
}

interface StandardsBadgeCloudProps {
  standards: Standard[];
  variant: 'health' | 'interoperability' | 'climate';
  title: string;
  maxVisible?: number;
}

export function StandardsBadgeCloud({ 
  standards, 
  variant, 
  title, 
  maxVisible = 8 
}: StandardsBadgeCloudProps) {
  if (!standards || standards.length === 0) return null;

  const visibleStandards = standards.slice(0, maxVisible);
  const hiddenCount = Math.max(0, standards.length - maxVisible);

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
      <TooltipProvider>
        <div className="flex flex-wrap gap-2">
          {visibleStandards.map((standard, index) => (
            <StandardBadge
              key={`${standard.code}-${index}`}
              standard={standard}
              variant={variant}
            />
          ))}
          {hiddenCount > 0 && (
            <div className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-md">
              +{hiddenCount} more
            </div>
          )}
        </div>
      </TooltipProvider>
    </div>
  );
}
