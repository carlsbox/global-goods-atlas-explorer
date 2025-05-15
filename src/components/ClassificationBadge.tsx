import { Badge } from "@/components/ui/badge";
import { useClassifications } from "@/lib/api";
import { Classification } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

interface ClassificationBadgeProps {
  code: string;
  showFullDetails?: boolean;
  expanded?: boolean;
}

export function ClassificationBadge({ 
  code, 
  showFullDetails = false,
  expanded = false 
}: ClassificationBadgeProps) {
  const { data: classifications = [] } = useClassifications();
  const { language } = useLanguage();
  
  // Find the classification by code
  const classification = classifications.find(c => c.code === code);
  
  if (!classification) {
    return <Badge variant="outline">{code}</Badge>;
  }
  
  // Extract authority from the code (e.g., "WHO" from "WHO_D6")
  const authority = classification.authority;
  
  // If expanded view is requested, show a detailed card instead of just a badge
  if (expanded) {
    return (
      <div className="border rounded-lg p-4 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="font-medium">{classification.title}</h4>
          </div>
          <Badge variant="secondary">{authority}</Badge>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          <span className="font-medium">Group:</span> 
          <span>{classification.group_code} - {classification.group_name}</span>
        </div>
      </div>
    );
  }
  
  // Default view with tooltip
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Badge 
              variant="outline" 
              className="cursor-help border-primary/30 hover:border-primary"
            >
              {showFullDetails ? (
                <span>
                  {code} | {classification.title}
                </span>
              ) : (
                <span>{code}</span>
              )}
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">{classification.title}</p>
            <p className="text-xs text-muted-foreground">
              {authority} · {classification.group_name}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
