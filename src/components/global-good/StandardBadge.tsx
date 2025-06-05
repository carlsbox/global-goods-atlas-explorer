
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ExternalLink } from "lucide-react";
import { getStandardsBadgeColors } from "@/lib/config";

interface Standard {
  code: string;
  name: string;
  description: string;
  domain?: string;
  type?: string;
  link?: string;
}

interface StandardBadgeProps {
  standard: Standard;
  variant: 'health' | 'interoperability' | 'climate';
}

export function StandardBadge({ standard, variant }: StandardBadgeProps) {
  const colors = getStandardsBadgeColors()[variant];
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge 
          variant="outline"
          className={`cursor-pointer transition-all ${colors.background} ${colors.text} ${colors.hover} ${colors.border}`}
        >
          {standard.code}
        </Badge>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-80 p-4" side="top">
        <div className="space-y-3">
          {/* Header */}
          <div>
            <h4 className="font-semibold text-sm mb-1">
              {standard.name}
            </h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {standard.domain && (
                <Badge variant="secondary" className="text-xs px-1 py-0 h-4">
                  {standard.domain}
                </Badge>
              )}
              {standard.type && (
                <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                  {standard.type}
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-3">
            {standard.description}
          </p>

          {/* Action */}
          {standard.link && (
            <div className="flex justify-end pt-2 border-t">
              <Button variant="outline" size="sm" asChild className="text-xs h-6">
                <a href={standard.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Visit
                </a>
              </Button>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
