
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
  
  // Parse the code to extract authority and code parts
  const getFormattedBadgeText = (code: string, title: string, authority: string) => {
    if (code.startsWith('SDG-')) {
      // For SDG codes like "SDG-3", extract the number
      const sdgNumber = code.replace('SDG-', '');
      return `SDG: "${title}" [${sdgNumber}]`;
    } else if (code.startsWith('WHO_')) {
      // For WHO codes like "WHO_A2", extract the part after WHO_
      const whoCode = code.replace('WHO_', '');
      return `WHO: "${title}" [${whoCode}]`;
    } else if (code.startsWith('WMO_')) {
      // For WMO codes like "WMO_D1", extract the part after WMO_
      const wmoCode = code.replace('WMO_', '');
      return `WMO: "${title}" [${wmoCode}]`;
    } else if (code.startsWith('DPI_')) {
      // For DPI codes like "DPI_BD1", extract the part after DPI_
      const dpiCode = code.replace('DPI_', '');
      return `DPI-H: "${title}" [${dpiCode}]`;
    } else {
      // Fallback for any other format
      return `${authority}: "${title}" [${code}]`;
    }
  };

  const badgeText = getFormattedBadgeText(code, classification.title, classification.authority);
  
  // If expanded view is requested, show a detailed card instead of just a badge
  if (expanded) {
    return (
      <div className="border rounded-lg p-4 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="font-medium">{classification.title}</h4>
          </div>
          <Badge variant="secondary">{classification.authority}</Badge>
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
              {showFullDetails ? badgeText : badgeText}
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">{classification.title}</p>
            <p className="text-xs text-muted-foreground">
              {classification.authority} · {classification.group_name}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
