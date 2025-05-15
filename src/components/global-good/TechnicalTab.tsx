
import { GlobalGood } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Tag, Code, Database, Languages, Users, Shield, GitBranch, Leaf } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface TechnicalTabProps {
  globalGood: GlobalGood;
}

export function TechnicalTab({ globalGood }: TechnicalTabProps) {
  // Extract technologies from StandardsAndInteroperability section if available
  const technologies = globalGood.technologies || [];
  
  // Get standards from the standardsAndInteroperability section
  const healthStandards = globalGood.standardsAndInteroperability?.healthStandards?.map(std => std.name) || 
                          globalGood.healthStandards || [];
  
  // Get languages from productOverview
  const languages = globalGood.productOverview?.languages?.map(lang => {
    if (typeof lang === 'string') return lang;
    return lang.name || lang.code || '';
  }).filter(Boolean) || globalGood.languages || [];
  
  // Get licenses from coreMetadata
  const licenses = globalGood.coreMetadata?.license?.map(lic => lic.name) || 
                  globalGood.licenses || [];
  
  // Extract features from productOverview or fall back to existing features
  const features = globalGood.productOverview?.primaryFunctionality?.split(',').map(f => f.trim()) || 
                   globalGood.features || [];
  
  // Get community info
  const hasCommunityInfo = 
    (globalGood.community?.sizeOfCommunity > 0) || 
    (globalGood.community?.hostAnchorOrganization?.name);
    
  // Check for environmental impact
  const environmentalInfo = globalGood.environmentalImpact?.lowCarbon || 
                           (globalGood.low_carbon?.description) ||
                           (globalGood.maturity?.scores?.low_carbon !== undefined);
  
  // Get SDGs from Classifications
  const sdgs = globalGood.classifications?.SDGs?.map(sdg => sdg.title) || 
               globalGood.sdgs || [];
  
  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        {/* Display logo at the top if available */}
        {globalGood.logo && (
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 relative">
              <AspectRatio ratio={1 / 1}>
                <img 
                  src={globalGood.logo} 
                  alt={`${globalGood.name} logo`} 
                  className="w-full h-full object-contain"
                />
              </AspectRatio>
            </div>
          </div>
        )}
      
        {/* Technology Stack */}
        {(technologies.length > 0 || features.length > 0) && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Code className="mr-2 h-5 w-5 text-primary" />
              Technology Implementation
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {technologies.length > 0 && (
                <div>
                  <h4 className="text-md font-medium mb-2">Core Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <Badge key={`tech-${index}`} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {features.length > 0 && (
                <div>
                  <h4 className="text-md font-medium mb-2">Key Features</h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {features.slice(0, 5).map((feature, index) => (
                      <li key={`feature-${index}`}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        
        {(technologies.length > 0 || features.length > 0) ? <Separator /> : null}
        
        {/* Standards and Interoperability */}
        {(licenses.length > 0 || healthStandards.length > 0) && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Standards & Interoperability
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {licenses.length > 0 && (
                <div>
                  <h4 className="text-md font-medium mb-2">
                    <Tag className="mr-2 h-4 w-4" />
                    Licenses
                  </h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {licenses.map((license, index) => (
                      <li key={`license-${index}`}>{license}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {healthStandards.length > 0 && (
                <div>
                  <h4 className="text-md font-medium mb-2">Health Standards</h4>
                  <div className="flex flex-wrap gap-2">
                    {healthStandards.map((standard, index) => (
                      <Badge key={`standard-${index}`} variant="outline" className="text-primary">
                        {standard}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {(licenses.length > 0 || healthStandards.length > 0) ? <Separator /> : null}
        
        {/* Development and Community */}
        {(hasCommunityInfo || languages.length > 0) && (
          <>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <GitBranch className="mr-2 h-5 w-5 text-primary" />
                Development & Community
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Display languages from either the root level or productOverview */}
                {languages.length > 0 && (
                  <div>
                    <h4 className="text-md font-medium mb-2">
                      <Languages className="mr-2 h-4 w-4" />
                      Supported Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang, index) => (
                        <Badge key={`lang-${index}`} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {hasCommunityInfo && (
                  <div>
                    <h4 className="text-md font-medium mb-2">
                      <Users className="mr-2 h-4 w-4" />
                      Community
                    </h4>
                    {globalGood.community?.sizeOfCommunity && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Community size: {globalGood.community.sizeOfCommunity.toLocaleString()} members
                      </p>
                    )}
                    {globalGood.community?.hostAnchorOrganization?.name && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Host organization: {globalGood.community.hostAnchorOrganization.name}
                      </p>
                    )}
                    {globalGood.community?.links?.community?.[0]?.url && (
                      <a 
                        href={globalGood.community.links.community[0].url} 
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
        
        {/* Environmental Impact */}
        {environmentalInfo && (
          <>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-green-500" />
                Environmental Impact
              </h3>
              
              <div>
                {globalGood.environmentalImpact?.lowCarbon && (
                  <p className="text-muted-foreground mb-2">
                    {globalGood.environmentalImpact.lowCarbon}
                  </p>
                )}
                
                {globalGood.low_carbon?.description && (
                  <p className="text-muted-foreground mb-2">
                    {globalGood.low_carbon.description}
                  </p>
                )}
                
                {globalGood.maturity?.scores?.low_carbon !== undefined && (
                  <div className="flex items-center mt-2">
                    <span className="text-sm font-medium mr-2">Low Carbon Score:</span>
                    <Badge variant="outline" className="bg-green-50">
                      {globalGood.maturity.scores.low_carbon}/10
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            
            <Separator />
          </>
        )}
        
        {/* SDGs */}
        {sdgs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Sustainable Development Goals</h3>
            <div className="flex flex-wrap gap-2">
              {sdgs.map((sdg, index) => (
                <Badge key={`sdg-${index}`} variant="outline">
                  {sdg}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Add a fallback message if no technical data is available */}
        {!technologies.length && !features.length && 
         !licenses.length && !healthStandards.length && 
         !languages.length && !hasCommunityInfo && 
         !environmentalInfo && !sdgs.length && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No technical information available for this global good.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
