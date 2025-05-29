
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SDGClassification {
  code: string;
  title: string;
}

interface SDGClassificationCardProps {
  sdg: SDGClassification;
}

// Official UN SDG colors mapping
const SDG_COLORS = {
  'SDG-1': { bg: '#E5243B', text: '#FFFFFF' },
  'SDG-2': { bg: '#DDA63A', text: '#FFFFFF' },
  'SDG-3': { bg: '#4C9F38', text: '#FFFFFF' },
  'SDG-4': { bg: '#C5192D', text: '#FFFFFF' },
  'SDG-5': { bg: '#FF3A21', text: '#FFFFFF' },
  'SDG-6': { bg: '#26BDE2', text: '#FFFFFF' },
  'SDG-7': { bg: '#FCC30B', text: '#000000' },
  'SDG-8': { bg: '#A21942', text: '#FFFFFF' },
  'SDG-9': { bg: '#FD6925', text: '#FFFFFF' },
  'SDG-10': { bg: '#DD1367', text: '#FFFFFF' },
  'SDG-11': { bg: '#FD9D24', text: '#000000' },
  'SDG-12': { bg: '#BF8B2E', text: '#FFFFFF' },
  'SDG-13': { bg: '#3F7E44', text: '#FFFFFF' },
  'SDG-14': { bg: '#0A97D9', text: '#FFFFFF' },
  'SDG-15': { bg: '#56C02B', text: '#FFFFFF' },
  'SDG-16': { bg: '#00689D', text: '#FFFFFF' },
  'SDG-17': { bg: '#19486A', text: '#FFFFFF' }
};

export function SDGClassificationCard({ sdg }: SDGClassificationCardProps) {
  // Safety check for undefined code
  if (!sdg || !sdg.code) {
    console.warn('SDG object missing code property:', sdg);
    return null;
  }

  const colors = SDG_COLORS[sdg.code as keyof typeof SDG_COLORS] || { bg: '#6B7280', text: '#FFFFFF' };
  const sdgNumber = sdg.code.replace('SDG-', '');
  
  return (
    <Card 
      className="hover:shadow-md transition-all duration-200 hover:scale-105 border-l-4"
      style={{ borderLeftColor: colors.bg }}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Badge 
            className="shrink-0 font-bold text-sm px-3 py-1"
            style={{ 
              backgroundColor: colors.bg, 
              color: colors.text,
              border: 'none'
            }}
          >
            {sdgNumber}
          </Badge>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm leading-tight mb-1">
              {sdg.title}
            </h4>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground hover:text-primary"
            >
              <a 
                href={`https://sdgs.un.org/goals/goal${sdgNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                Learn more <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
