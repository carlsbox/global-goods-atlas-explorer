
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
  // Check if languages are available from either source
  const hasLanguages = 
    (globalGood.languages && globalGood.languages.length > 0) || 
    (globalGood.productOverview?.languages && globalGood.productOverview.languages.length > 0);
  
  // Check if there's community information
  const hasCommunityInfo = 
    globalGood.community?.size_estimate || 
    globalGood.community?.sizeOfCommunity || 
    (globalGood.community?.platform?.url);
  
  // Check for environmental impact information
  const hasEnvironmentalInfo = 
    globalGood.environmentalImpact?.lowCarbon || 
    globalGood.environmentalImpact?.description ||
    globalGood.low_carbon?.considered ||
    globalGood.low_carbon?.description ||
    (globalGood.maturity?.scores?.low_carbon !== undefined);

  // Add console logs to debug what data is available
  console.log("GlobalGood data:", globalGood);
  console.log("Has languages:", hasLanguages);
  console.log("Has community info:", hasCommunityInfo);
  console.log("Has environmental info:", hasEnvironmentalInfo);
  console.log("Technologies:", globalGood.technologies);
  console.log("Features:", globalGood.features);
  console.log("Logo:", globalGood.logo);

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
        {(globalGood.technologies || globalGood.features) && (
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
                    {globalGood.technologies.map((tech, index) => (
                      <Badge key={`tech-${index}`} variant="secondary">
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
                    {globalGood.features.slice(0, 5).map((feature, index) => (
                      <li key={`feature-${index}`}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        
        {globalGood.technologies || globalGood.features ? <Separator /> : null}
        
        {/* Standards and Interoperability */}
        {(globalGood.licenses || globalGood.healthStandards) && (
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
                    {globalGood.licenses.map((license, index) => (
                      <li key={`license-${index}`}>{license}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {globalGood.healthStandards && globalGood.healthStandards.length > 0 && (
                <div>
                  <h4 className="text-md font-medium mb-2">Health Standards</h4>
                  <div className="flex flex-wrap gap-2">
                    {globalGood.healthStandards.map((standard, index) => (
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
        
        {(globalGood.licenses || globalGood.healthStandards) ? <Separator /> : null}
        
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
                        <Badge key={`lang-${index}`} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                      
                      {/* Handle languages from productOverview if available */}
                      {globalGood.productOverview?.languages && 
                        globalGood.productOverview.languages.map((lang, index) => {
                          // Fix the type issue by explicitly defining potential language shapes
                          let langDisplay = 'Unknown';
                          if (typeof lang === 'string') {
                            langDisplay = lang;
                          } else if (lang && typeof lang === 'object') {
                            // Type assertion to avoid 'never' type errors
                            const langObj = lang as Record<string, any>;
                            if (langObj && 'name' in langObj) {
                              langDisplay = String(langObj.name);
                            } else if (langObj && 'code' in langObj) {
                              langDisplay = String(langObj.code);
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
        
        {/* Environmental Impact */}
        {hasEnvironmentalInfo && (
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
                
                {globalGood.environmentalImpact?.description && (
                  <p className="text-muted-foreground mb-2">
                    {globalGood.environmentalImpact.description}
                  </p>
                )}
                
                {globalGood.low_carbon?.description && (
                  <p className="text-muted-foreground mb-2">
                    {globalGood.low_carbon.description || "Designed to minimize carbon footprint."}
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
        {globalGood.sdgs && globalGood.sdgs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Sustainable Development Goals</h3>
            <div className="flex flex-wrap gap-2">
              {globalGood.sdgs.map((sdg, index) => (
                <Badge key={`sdg-${index}`} variant="outline">
                  {sdg}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Add a fallback message if no technical data is available */}
        {!globalGood.technologies && !globalGood.features && 
         !globalGood.licenses && !globalGood.healthStandards && 
         !hasLanguages && !hasCommunityInfo && 
         !hasEnvironmentalInfo && !globalGood.sdgs && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No technical information available for this global good.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
