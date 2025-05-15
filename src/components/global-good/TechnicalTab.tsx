
import { GlobalGood } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Tag, Code, Database, Languages, Users, Shield, GitBranch } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface TechnicalTabProps {
  globalGood: GlobalGood;
}

export function TechnicalTab({ globalGood }: TechnicalTabProps) {
  const hasLanguages = globalGood.languages && globalGood.languages.length > 0 || 
                      (globalGood.productOverview?.languages && globalGood.productOverview.languages.length > 0);
  
  const hasCommunityInfo = globalGood.community?.size_estimate || 
                          globalGood.community?.sizeOfCommunity || 
                          (globalGood.community?.platform?.url);
  
  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        {/* Technology Stack */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Code className="mr-2 h-5 w-5 text-primary" />
            Technology Implementation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {globalGood.technologies && globalGood.technologies.length > 0 && (
              <div>
                <h4 className="text-md font-medium mb-2">Core Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {globalGood.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {globalGood.features && globalGood.features.length > 0 && (
              <div>
                <h4 className="text-md font-medium mb-2">Key Features</h4>
                <ul className="list-disc list-inside text-muted-foreground">
                  {globalGood.features.slice(0, 5).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <Separator />
        
        {/* Standards and Interoperability */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            Standards & Interoperability
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {globalGood.licenses && globalGood.licenses.length > 0 && (
              <div>
                <h4 className="text-md font-medium mb-2">
                  <Tag className="mr-2 h-4 w-4" />
                  Licenses
                </h4>
                <ul className="list-disc list-inside text-muted-foreground">
                  {globalGood.licenses.map((license) => (
                    <li key={license}>{license}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {globalGood.healthStandards && globalGood.healthStandards.length > 0 && (
              <div>
                <h4 className="text-md font-medium mb-2">Health Standards</h4>
                <div className="flex flex-wrap gap-2">
                  {globalGood.healthStandards.map((standard) => (
                    <Badge key={standard} variant="outline" className="text-primary">
                      {standard}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <Separator />
        
        {/* Development and Community */}
        {(hasCommunityInfo || hasLanguages) && (
          <>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <GitBranch className="mr-2 h-5 w-5 text-primary" />
                Development & Community
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Display languages from either the root level or productOverview */}
                {hasLanguages && (
                  <div>
                    <h4 className="text-md font-medium mb-2">
                      <Languages className="mr-2 h-4 w-4" />
                      Supported Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(globalGood.languages || []).map((lang, index) => (
                        <Badge key={index} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                      
                      {/* Handle languages from productOverview if available */}
                      {globalGood.productOverview?.languages && 
                        globalGood.productOverview.languages.map((lang, index) => {
                          // Use type checking instead of property access
                          let langDisplay = 'Unknown';
                          if (typeof lang === 'string') {
                            langDisplay = lang;
                          } else if (lang && typeof lang === 'object') {
                            // Safely check for properties
                            if ('name' in lang) {
                              langDisplay = String(lang.name);
                            } else if ('code' in lang) {
                              langDisplay = String(lang.code);
                            }
                          }
                          
                          return (
                            <Badge key={`po-${index}`} variant="secondary">
                              {langDisplay}
                            </Badge>
                          );
                        })
                      }
                    </div>
                  </div>
                )}
                
                {hasCommunityInfo && (
                  <div>
                    <h4 className="text-md font-medium mb-2">
                      <Users className="mr-2 h-4 w-4" />
                      Community
                    </h4>
                    {(globalGood.community?.size_estimate || globalGood.community?.sizeOfCommunity) && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Community size: {(globalGood.community.size_estimate || globalGood.community.sizeOfCommunity).toLocaleString()} members
                      </p>
                    )}
                    {globalGood.community?.platform?.url && (
                      <a 
                        href={globalGood.community.platform.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-primary hover:underline"
                      >
                        Community Platform
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <Separator />
          </>
        )}
        
        {/* SDGs */}
        {globalGood.sdgs && globalGood.sdgs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Sustainable Development Goals</h3>
            <div className="flex flex-wrap gap-2">
              {globalGood.sdgs.map((sdg) => (
                <Badge key={sdg} variant="outline">
                  {sdg}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
