
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Github, Mail } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import { GlobalGood } from "@/lib/types/globalGood";

interface GlobalGoodHeaderProps {
  globalGood: GlobalGood;
}

export function GlobalGoodHeader({ globalGood }: GlobalGoodHeaderProps) {
  const { getText } = useI18n();

  // Safety checks for accessing properties with potential undefined values
  const logoUrl = globalGood.logo || (globalGood.coreMetadata && globalGood.coreMetadata.logo) || '';
  const goodName = typeof globalGood.name === 'string' ? globalGood.name : 
                  (globalGood.coreMetadata && typeof globalGood.coreMetadata.name === 'string' ? 
                    globalGood.coreMetadata.name : 'Unknown');
  const goodDescription = typeof globalGood.description === 'string' ? globalGood.description : 
                         (globalGood.productOverview && typeof globalGood.productOverview.description === 'string' ? 
                           globalGood.productOverview.description : '');
  
  // Get types with fallbacks
  const types = globalGood.coreMetadata?.globalGoodsType || [];
  const maturityLevel = globalGood.maturity && typeof globalGood.maturity === 'object' && 'level' in globalGood.maturity ? 
                        globalGood.maturity.level : 
                        (typeof globalGood.maturity === 'string' ? globalGood.maturity : '');
  
  // Get contact info with fallbacks
  const contactName = globalGood.contact?.name || '';
  const contactEmail = globalGood.contact?.email || '';
  
  // Get resource links with fallbacks
  const websiteUrl = globalGood.website || '';
  const githubUrl = globalGood.github || '';
  const sourceCodeUrl = globalGood.source_code?.primary || '';
  const demoUrl = globalGood.demo_link || '';

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column - Logo, Name, Description, Tags */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={typeof goodName === 'string' ? goodName : 'Global Good'} 
              className="h-16 w-16 object-contain"
            />
          ) : (
            <div className="h-16 w-16 bg-primary/10 rounded flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {typeof goodName === 'string' ? goodName.charAt(0) : 'G'}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold">{goodName}</h1>
            <p className="text-muted-foreground">{goodDescription}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {types.map((typegg, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs"
            >
              {typeof typegg === 'string' ? typegg : 
                (typeof typegg.title === 'string' ? typegg.title : typegg.code)}
            </Badge>
          ))}
          {maturityLevel && (
            <Badge variant="secondary" className="text-xs">
              {maturityLevel}
            </Badge>
          )}
        </div>
      </div>

      {/* Right Column - Contact Info, Website, GitHub */}
      <div className="flex flex-col justify-start gap-4 md:border-l md:pl-6">
        {/* Contact Information */}
        {(contactName || contactEmail) && (
          <div className="mb-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact</h3>
            {contactName && (
              <p className="text-sm mb-1">{contactName}</p>
            )}
            {contactEmail && (
              <a 
                href={`mailto:${contactEmail}`}
                className="text-sm text-primary hover:underline flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                {contactEmail}
              </a>
            )}
          </div>
        )}

        {/* External Links */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Resources</h3>
          <div className="flex flex-col space-y-2">
            {websiteUrl && (
              <Button asChild variant="outline" size="sm" className="justify-start w-full md:w-auto">
                <a 
                  href={websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Website: {websiteUrl}
                </a>
              </Button>
            )}
            {githubUrl && (
              <Button asChild variant="outline" size="sm" className="justify-start w-full md:w-auto">
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub: {githubUrl}
                </a>
              </Button>
            )}
            {/* Support for source_code field format from updated schema */}
            {!githubUrl && sourceCodeUrl && (
              <Button asChild variant="outline" size="sm" className="justify-start w-full md:w-auto">
                <a 
                  href={sourceCodeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub: {sourceCodeUrl}
                </a>
              </Button>
            )}
            {demoUrl && (
              <Button asChild variant="outline" size="sm" className="justify-start w-full md:w-auto">
                <a 
                  href={demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Live Demo: {demoUrl}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
