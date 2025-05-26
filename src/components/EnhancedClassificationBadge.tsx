
import { Badge } from "@/components/ui/badge";
import { useClassifications } from "@/lib/api";
import { loadSDGData } from "@/lib/loaders";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";

interface EnhancedClassificationBadgeProps {
  code: string;
  showFullDetails?: boolean;
  expanded?: boolean;
}

export function EnhancedClassificationBadge({ 
  code, 
  showFullDetails = false,
  expanded = false 
}: EnhancedClassificationBadgeProps) {
  const { data: classifications = [] } = useClassifications();
  const { language } = useLanguage();
  
  // Load SDG data
  const { data: sdgData = [] } = useQuery({
    queryKey: ['sdg-data', language],
    queryFn: () => loadSDGData(language),
  });
  
  // Check if this is an SDG code
  const isSDG = code.startsWith('SDG-');
  
  // Find the classification by code
  let classification;
  if (isSDG) {
    classification = sdgData.find(s => s.code === code);
  } else {
    classification = classifications.find(c => c.code === code);
  }
  
  if (!classification) {
    return <Badge variant="outline">{code}</Badge>;
  }
  
  // Extract authority from the classification
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
