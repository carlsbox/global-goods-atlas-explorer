
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Github, Mail, ExternalLink } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import { GlobalGood } from "@/lib/types/globalGood";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface GlobalGoodHeaderProps {
  globalGood: GlobalGood;
}

export function GlobalGoodHeader({ globalGood }: GlobalGoodHeaderProps) {
  const { getText } = useI18n();

  // Get core metadata
  const logoUrl = globalGood.coreMetadata?.logo || '';
  const goodName = globalGood.coreMetadata?.name || '';
  const description = globalGood.productOverview?.summary || globalGood.productOverview?.description || '';
  
  // Get website URL
  const websiteUrl = globalGood.coreMetadata?.website?.[0]?.url || '';
  
  // Get source code URL
  const sourceCodeUrl = globalGood.coreMetadata?.sourceCode?.[0]?.url || '';
  
  // Get demo link
  const demoUrl = globalGood.coreMetadata?.demoLink?.[0]?.url || '';
  
  // Get maturity level
  const maturityLevel = globalGood.maturity?.level || globalGood.maturity?.summaryOfMaturity || '';
  
  // Get contact info
  const contactName = globalGood.coreMetadata?.contact?.[0]?.name || '';
  const contactEmail = globalGood.coreMetadata?.contact?.[0]?.email || '';
  
  // Get types/classifications
  const types = globalGood.coreMetadata?.globalGoodsType || [];

  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Logo */}
        <div className="flex justify-center md:justify-start items-center">
          {logoUrl ? (
            <div className="w-32 h-32 bg-white rounded-lg shadow-md p-2 flex items-center justify-center">
              <AspectRatio ratio={1/1} className="w-full h-full">
                <img 
                  src={logoUrl} 
                  alt={`${goodName} logo`}
                  className="w-full h-full object-contain" 
                />
              </AspectRatio>
            </div>
          ) : (
            <div className="w-32 h-32 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">
                {goodName.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Middle Column - Name, Description, Tags */}
        <div className="md:col-span-1">
          <h1 className="text-3xl font-bold">{goodName}</h1>
          
          <p className="mt-2 text-muted-foreground line-clamp-3">
            {description}
          </p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {types.map((type, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="bg-primary/5"
              >
                {typeof type === 'object' ? type.title : type}
              </Badge>
            ))}
            
            {maturityLevel && (
              <Badge variant="secondary">
                {maturityLevel}
              </Badge>
            )}
          </div>
        </div>

        {/* Right Column - Links & Contact */}
        <div className="flex flex-col gap-3">
          {websiteUrl && (
            <Button asChild variant="outline" className="justify-start">
              <a 
                href={websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Globe className="mr-2 h-4 w-4" />
                Website
                <ExternalLink className="ml-2 h-3 w-3 opacity-70" />
              </a>
            </Button>
          )}
          
          {sourceCodeUrl && (
            <Button asChild variant="outline" className="justify-start">
              <a 
                href={sourceCodeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Github className="mr-2 h-4 w-4" />
                Source Code
                <ExternalLink className="ml-2 h-3 w-3 opacity-70" />
              </a>
            </Button>
          )}
          
          {demoUrl && (
            <Button asChild variant="outline" className="justify-start">
              <a 
                href={demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
                <ExternalLink className="ml-2 h-3 w-3 opacity-70" />
              </a>
            </Button>
          )}
          
          {contactEmail && (
            <Button asChild variant="ghost" className="justify-start">
              <a 
                href={`mailto:${contactEmail}`}
                className="flex items-center text-muted-foreground"
              >
                <Mail className="mr-2 h-4 w-4" />
                {contactName || contactEmail}
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
