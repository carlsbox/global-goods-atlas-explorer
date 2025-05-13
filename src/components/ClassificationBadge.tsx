
import { Badge } from "@/components/ui/badge";
import { useClassifications } from "@/lib/api";
import { Classification } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

interface ClassificationBadgeProps {
  code: string;
  showFullDetails?: boolean;
}

export function ClassificationBadge({ code, showFullDetails = false }: ClassificationBadgeProps) {
  const { data: classifications = [] } = useClassifications();
  const { language } = useLanguage();
  
  // Find the classification by code
  const classification = classifications.find(c => c.code === code);
  
  if (!classification) {
    return <Badge variant="outline">{code}</Badge>;
  }
  
  // Extract authority from the code (e.g., "WHO" from "WHO_D6")
  const authority = classification.authority;
  
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
