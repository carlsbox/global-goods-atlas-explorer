import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tag, Shield, FileText, ExternalLink, Link as LinkIcon, Leaf, Heart } from "lucide-react";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { EnhancedClassificationBadge } from "@/components/EnhancedClassificationBadge";
import { GroupedClassifications } from "@/components/global-good/GroupedClassifications";
import { SDGClassificationCard } from "@/components/global-good/SDGClassificationCard";
import { StandardsBadgeCloud } from "@/components/global-good/StandardsBadgeCloud";
import { useReferenceData } from "@/hooks/useReferenceData";
import { useEffect, useState } from "react";

interface TechnicalInformationSectionProps {
  globalGood: GlobalGoodFlat;
}

export function TechnicalInformationSection({ globalGood }: TechnicalInformationSectionProps) {
  const { resolveClassifications } = useReferenceData();
  const [resolvedSDGs, setResolvedSDGs] = useState<any[]>([]);
  const [resolvedWHO, setResolvedWHO] = useState<any[]>([]);
  const [resolvedWMO, setResolvedWMO] = useState<any[]>([]);

  // Resolve SDG codes to full objects
  useEffect(() => {
    const resolveSdgs = async () => {
      if (globalGood.Classifications?.SDGs && globalGood.Classifications.SDGs.length > 0) {
        // Convert SDG objects to codes if needed
        const sdgCodes = globalGood.Classifications.SDGs.map(sdg => 
          typeof sdg === 'string' ? sdg : sdg.code
        );
        const resolved = await resolveClassifications(sdgCodes);
        setResolvedSDGs(resolved);
      }
    };

    resolveSdgs();
  }, [globalGood.Classifications?.SDGs, resolveClassifications]);

  // Resolve WHO codes to full objects
  useEffect(() => {
    const resolveWho = async () => {
      if (globalGood.Classifications?.WHO && globalGood.Classifications.WHO.length > 0) {
        const whoCodes = globalGood.Classifications.WHO.map(who => 
          typeof who === 'string' ? who : who.code
        );
        const resolved = await resolveClassifications(whoCodes);
        setResolvedWHO(resolved);
      }
    };

    resolveWho();
  }, [globalGood.Classifications?.WHO, resolveClassifications]);

  // Resolve WMO codes to full objects
  useEffect(() => {
    const resolveWmo = async () => {
      if (globalGood.Classifications?.WMO && globalGood.Classifications.WMO.length > 0) {
        const wmoCodes = globalGood.Classifications.WMO.map(wmo => 
          typeof wmo === 'string' ? wmo : wmo.code
        );
        const resolved = await resolveClassifications(wmoCodes);
        setResolvedWMO(resolved);
      }
    };

    resolveWmo();
  }, [globalGood.Classifications?.WMO, resolveClassifications]);

  // Helper function to check if technical classifications have data (excluding WMO and SDGs)
  const hasTechnicalClassifications = () => {
    const classifications = globalGood.Classifications;
    return classifications && (
      (classifications.DPI && classifications.DPI.length > 0) ||
      (resolvedWHO.length > 0)
    );
  };

  // Helper function to check if technical standards have data (excluding Climate Standards)
  const hasTechnicalStandards = () => {
    const standards = globalGood.StandardsAndInteroperability;
    return standards && (
      (standards.HealthStandards && standards.HealthStandards.length > 0) ||
      (standards.Interoperability && standards.Interoperability.length > 0)
    );
  };

  // Helper function to check if climate data exists (including SDGs and WMO)
  const hasClimateData = () => {
    const hasClimateIntegration = globalGood.ClimateAndHealthIntegration?.Description;
    const hasWMO = resolvedWMO.length > 0;
    const hasClimateStandards = globalGood.StandardsAndInteroperability?.ClimateStandards && 
      globalGood.StandardsAndInteroperability.ClimateStandards.length > 0;
    const hasSDGs = resolvedSDGs.length > 0;
    
    return hasClimateIntegration || hasWMO || hasClimateStandards || hasSDGs;
  };

  // Helper function to check if environmental impact data exists
  const hasEnvironmentalImpact = () => {
    return globalGood.EnvironmentalImpact?.LowCarbon;
  };

  // Helper function to check if inclusive design data exists
  const hasInclusiveDesign = () => {
    return globalGood.InclusiveDesign?.Description || 
           globalGood.InclusiveDesign?.UserInput || 
           globalGood.InclusiveDesign?.OfflineSupport;
  };

  // Helper function to check if we should show Technical Information section
  const hasTechnicalInformation = () => {
    return hasTechnicalClassifications() || hasTechnicalStandards() || hasClimateData() || hasEnvironmentalImpact() || hasInclusiveDesign();
  };

  if (!hasTechnicalInformation()) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Technical Information</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Standards and Interoperability, then DPI and WHO */}
        <div>
          {/* Technical Standards and Interoperability Section */}
          {hasTechnicalStandards() && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Standards & Interoperability
              </h3>
              
              <div className="space-y-6">
                {/* Health Standards - Badge Cloud */}
                {globalGood.StandardsAndInteroperability?.HealthStandards && (
                  <StandardsBadgeCloud
                    standards={globalGood.StandardsAndInteroperability.HealthStandards}
                    variant="health"
                    title="Health Standards"
                    maxVisible={10}
                  />
                )}
                
                {/* Interoperability Standards - Badge Cloud */}
                {globalGood.StandardsAndInteroperability?.Interoperability && (
                  <StandardsBadgeCloud
                    standards={globalGood.StandardsAndInteroperability.Interoperability}
                    variant="interoperability"
                    title="Interoperability Standards"
                    maxVisible={10}
                  />
                )}
              </div>
            </div>
          )}

          {/* Technical Classifications Section */}
          {hasTechnicalClassifications() && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-primary" />
                Classifications
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                {/* DPI */}
                <GroupedClassifications 
                  classifications={globalGood.Classifications?.DPI || []}
                  title="Digital Public Infrastructure (DPI)"
                />
                
                {/* WHO */}
                <GroupedClassifications 
                  classifications={resolvedWHO}
                  title="World Health Organization"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Column 2: SDGs, Climate and Health Integration, WMO, Environmental Impact, Inclusive Design */}
        <div>
          {/* SDGs Section */}
          {resolvedSDGs.length > 0 && (
            <div className="mb-8">
              <div className="space-y-2 mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  Sustainable Development Goals (SDGs)
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1"
                  >
                    <a 
                      href="https://sdgs.un.org/goals"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </h3>
                <p className="text-sm text-muted-foreground">
                  UN's blueprint for peace and prosperity for people and the planet by 2030
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {resolvedSDGs.map((sdg, index) => (
                  <SDGClassificationCard 
                    key={index} 
                    sdg={sdg}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Climate and Health Integration */}
          {globalGood.ClimateAndHealthIntegration?.Description && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                Climate & Health Integration
              </h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">{globalGood.ClimateAndHealthIntegration.Description}</p>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* WMO Classifications */}
          {resolvedWMO.length > 0 && (
            <div className="mb-8">
              <GroupedClassifications 
                classifications={resolvedWMO}
                title="World Meteorological Organization (WMO)"
              />
            </div>
          )}
          
          {/* Climate Standards - Badge Cloud */}
          {globalGood.StandardsAndInteroperability?.ClimateStandards && globalGood.StandardsAndInteroperability.ClimateStandards.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Climate Standards
              </h3>
              <StandardsBadgeCloud
                standards={globalGood.StandardsAndInteroperability.ClimateStandards}
                variant="climate"
                title=""
                maxVisible={8}
              />
            </div>
          )}

          {/* Environmental Impact Card */}
          {hasEnvironmentalImpact() && (
            <div className="mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Leaf className="h-4 w-4 mr-2 text-green-600" />
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Low Carbon</h4>
                    <p className="text-sm text-muted-foreground">{globalGood.EnvironmentalImpact.LowCarbon}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Inclusive Design Card */}
          {hasInclusiveDesign() && (
            <div>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-pink-600" />
                    Inclusive Design
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {globalGood.InclusiveDesign.Description && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Description</h4>
                      <p className="text-sm text-muted-foreground">{globalGood.InclusiveDesign.Description}</p>
                    </div>
                  )}
                  {globalGood.InclusiveDesign.UserInput && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">User Input</h4>
                      <p className="text-sm text-muted-foreground">{globalGood.InclusiveDesign.UserInput}</p>
                    </div>
                  )}
                  {globalGood.InclusiveDesign.OfflineSupport && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Offline Support</h4>
                      <p className="text-sm text-muted-foreground">{globalGood.InclusiveDesign.OfflineSupport}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
