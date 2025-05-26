
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Github, Mail, ExternalLink, Play } from "lucide-react";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface GlobalGoodHeaderFlatProps {
  globalGood: GlobalGoodFlat;
}

export function GlobalGoodHeaderFlat({ globalGood }: GlobalGoodHeaderFlatProps) {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Logo */}
        <div className="flex justify-center md:justify-start items-center">
          {globalGood.Logo ? (
            <div className="w-32 h-32 bg-white rounded-lg shadow-md p-2 flex items-center justify-center">
              <AspectRatio ratio={1/1} className="w-full h-full">
                <img 
                  src={globalGood.Logo} 
                  alt={`${globalGood.Name} logo`}
                  className="w-full h-full object-contain" 
                />
              </AspectRatio>
            </div>
          ) : (
            <div className="w-32 h-32 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">
                {globalGood.Name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Middle Column - Name, Description, Tags */}
        <div className="md:col-span-1">
          <h1 className="text-3xl font-bold">{globalGood.Name}</h1>
          
          <p className="mt-2 text-muted-foreground line-clamp-3">
            {globalGood.ProductOverview?.Summary || globalGood.ProductOverview?.Description}
          </p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {globalGood.GlobalGoodsType?.map((type, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="bg-primary/5"
              >
                {type.title}
              </Badge>
            ))}
            
            {globalGood.Maturity?.SummaryOfMaturity && (
              <Badge variant="secondary">
                {globalGood.Maturity.SummaryOfMaturity}
              </Badge>
            )}
          </div>
        </div>

        {/* Right Column - Links & Contact */}
        <div className="flex flex-col gap-3">
          {globalGood.Website?.main?.url && (
            <Button asChild variant="outline" className="justify-start">
              <a 
                href={globalGood.Website.main.url} 
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
          
          {globalGood.Website?.source_code?.url && (
            <Button asChild variant="outline" className="justify-start">
              <a 
                href={globalGood.Website.source_code.url} 
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
          
          {globalGood.Website?.demo?.url && (
            <Button asChild variant="outline" className="justify-start">
              <a 
                href={globalGood.Website.demo.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Play className="mr-2 h-4 w-4" />
                Demo
                <ExternalLink className="ml-2 h-3 w-3 opacity-70" />
              </a>
            </Button>
          )}
          
          {globalGood.Contact?.[0]?.email && (
            <Button asChild variant="ghost" className="justify-start">
              <a 
                href={`mailto:${globalGood.Contact[0].email}`}
                className="flex items-center text-muted-foreground"
              >
                <Mail className="mr-2 h-4 w-4" />
                {globalGood.Contact[0].name || globalGood.Contact[0].email}
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
