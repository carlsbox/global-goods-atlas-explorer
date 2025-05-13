
import { Link } from "react-router-dom";
import { GlobalGood } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Github } from "lucide-react";

interface GlobalGoodHeaderProps {
  globalGood: GlobalGood;
}

export function GlobalGoodHeader({ globalGood }: GlobalGoodHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        {globalGood.logo ? (
          <img 
            src={globalGood.logo} 
            alt={globalGood.name} 
            className="h-16 w-16 object-contain"
          />
        ) : (
          <div className="h-16 w-16 bg-primary/10 rounded flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {globalGood.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{globalGood.name}</h1>
          <p className="text-muted-foreground">{globalGood.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {globalGood.sector?.map((sector) => (
          <Badge key={sector} variant="outline" className="text-xs">
            {sector}
          </Badge>
        ))}
        {globalGood.maturity && (
          <Badge variant="secondary" className="text-xs">
            {globalGood.maturity}
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        {globalGood.website && (
          <Button asChild variant="outline" size="sm">
            <a 
              href={globalGood.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Globe className="mr-2 h-4 w-4" />
              Website
            </a>
          </Button>
        )}
        {globalGood.github && (
          <Button asChild variant="outline" size="sm">
            <a 
              href={globalGood.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
