
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Github, Mail } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import { GlobalGood } from "@/lib/types/globalGood/globalGood";

interface GlobalGoodHeaderProps {
  globalGood: GlobalGood;
}

export function GlobalGoodHeader({ globalGood }: GlobalGoodHeaderProps) {
  const { getText } = useI18n();

  // Get the name and description using our getText helper
  const goodName = getText(globalGood.coreMetadata.name);
  const goodDescription = getText(globalGood.productOverview.description);

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column - Logo, Name, Description, Tags */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          {globalGood.logo ? (
            <img 
              src={globalGood.coreMetadata.logo} 
              alt={goodName} 
              className="h-16 w-16 object-contain"
            />
          ) : (
            <div className="h-16 w-16 bg-primary/10 rounded flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {goodName.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold">{goodName}</h1>
            <p className="text-muted-foreground">{goodDescription}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {globalGood.coreMetadata.GlobalGoodsType?.map((typegg) => (
            <Badge key={typegg} variant="outline" className="text-xs">
              {typegg}
            </Badge>
          ))}
          {typeof globalGood.maturity === 'string' ? (
            <Badge variant="secondary" className="text-xs">
              {globalGood.maturity}
            </Badge>
          ) : globalGood.maturity?.level ? (
            <Badge variant="secondary" className="text-xs">
              {globalGood.maturity.level}
            </Badge>
          ) : null}
        </div>
      </div>

      {/* Right Column - Contact Info, Website, GitHub */}
      <div className="flex flex-col justify-start gap-4 md:border-l md:pl-6">
        {/* Contact Information */}
        {globalGood.contact && (globalGood.contact.name || globalGood.contact.email) && (
          <div className="mb-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact</h3>
            {globalGood.contact.name && (
              <p className="text-sm mb-1">{globalGood.contact.name}</p>
            )}
            {globalGood.contact.email && (
              <a 
                href={`mailto:${globalGood.contact.email}`}
                className="text-sm text-primary hover:underline flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                {globalGood.contact.email}
              </a>
            )}
          </div>
        )}

        {/* External Links */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Resources</h3>
          <div className="flex flex-col space-y-2">
            {globalGood.website && (
              <Button asChild variant="outline" size="sm" className="justify-start w-full md:w-auto">
                <a 
                  href={globalGood.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Website: {globalGood.website}
                </a>
              </Button>
            )}
            {globalGood.github && (
              <Button asChild variant="outline" size="sm" className="justify-start w-full md:w-auto">
                <a 
                  href={globalGood.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub: {globalGood.github}
                </a>
              </Button>
            )}
            {/* Support for source_code field format from updated schema */}
            {!globalGood.github && globalGood.source_code?.primary && (
              <Button asChild variant="outline" size="sm" className="justify-start w-full md:w-auto">
                <a 
                  href={globalGood.source_code.primary} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub: {globalGood.source_code.primary}
                </a>
              </Button>
            )}
            {globalGood.demo_link && (
              <Button asChild variant="outline" size="sm" className="justify-start w-full md:w-auto">
                <a 
                  href={globalGood.demo_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Live Demo: {globalGood.demo_link}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
