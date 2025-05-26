
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Building, ExternalLink } from "lucide-react";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";

interface SustainabilityEconomicsSectionProps {
  globalGood: GlobalGoodFlat;
}

export function SustainabilityEconomicsSection({ globalGood }: SustainabilityEconomicsSectionProps) {
  // Helper function to check if sustainability and economics data exists
  const hasSustainabilityEconomics = () => {
    const hasSustainability = globalGood.Sustainability?.Description || 
      (globalGood.Sustainability?.KeyFundersSupporters && globalGood.Sustainability.KeyFundersSupporters.length > 0);
    const hasTCO = globalGood.TotalCostOfOwnership?.Description || globalGood.TotalCostOfOwnership?.url;
    const hasLinkedInitiatives = globalGood.LinkedInitiatives?.Initiative && 
      globalGood.LinkedInitiatives.Initiative.length > 0;
    
    return hasSustainability || hasTCO || hasLinkedInitiatives;
  };

  if (!hasSustainabilityEconomics()) {
    return null;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Sustainability & Economics</h2>
        <p className="text-muted-foreground">
          Financial sustainability, cost considerations, and related initiatives for this global good.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Sustainability and TCO */}
        <div className="space-y-6">
          {/* Sustainability Card */}
          {(globalGood.Sustainability?.Description || 
            (globalGood.Sustainability?.KeyFundersSupporters && globalGood.Sustainability.KeyFundersSupporters.length > 0)) && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Leaf className="h-5 w-5 mr-2 text-green-600" />
                  Sustainability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {globalGood.Sustainability.Description && (
                  <div>
                    <p className="text-sm text-muted-foreground">{globalGood.Sustainability.Description}</p>
                  </div>
                )}
                
                {globalGood.Sustainability.KeyFundersSupporters && globalGood.Sustainability.KeyFundersSupporters.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-3">Key Funders & Supporters</h4>
                    <div className="space-y-2">
                      {globalGood.Sustainability.KeyFundersSupporters.map((funder, index) => (
                        <div key={index} className="border rounded p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h5 className="text-sm font-medium">{funder.name}</h5>
                              <p className="text-xs text-muted-foreground mt-1">{funder.description}</p>
                            </div>
                            <Button asChild variant="ghost" size="sm" className="ml-2">
                              <a href={funder.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Total Cost of Ownership Card */}
          {(globalGood.TotalCostOfOwnership?.Description || globalGood.TotalCostOfOwnership?.url) && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Building className="h-5 w-5 mr-2 text-blue-600" />
                  Total Cost of Ownership
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {globalGood.TotalCostOfOwnership.Description && (
                  <p className="text-sm text-muted-foreground">{globalGood.TotalCostOfOwnership.Description}</p>
                )}
                
                {globalGood.TotalCostOfOwnership.url && (
                  <Button asChild className="w-full">
                    <a href={globalGood.TotalCostOfOwnership.url} target="_blank" rel="noopener noreferrer">
                      View Cost Details <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Right Column: Linked Initiatives */}
        <div>
          {globalGood.LinkedInitiatives?.Initiative && globalGood.LinkedInitiatives.Initiative.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Building className="h-5 w-5 mr-2 text-purple-600" />
                  Linked Initiatives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {globalGood.LinkedInitiatives.Initiative.map((initiative, index) => (
                    <div key={index} className="border rounded p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start gap-3">
                        {initiative.collectionInitiative.logo_url && (
                          <img 
                            src={initiative.collectionInitiative.logo_url} 
                            alt={initiative.collectionInitiative.label}
                            className="w-10 h-10 object-contain rounded"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium mb-1">{initiative.collectionInitiative.label}</h4>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {initiative.collectionInitiative.description}
                          </p>
                          <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm">
                              <a href={initiative.collectionInitiative.site_url} target="_blank" rel="noopener noreferrer">
                                Visit Initiative <ExternalLink className="ml-1 h-3 w-3" />
                              </a>
                            </Button>
                            <Button asChild variant="ghost" size="sm">
                              <a href={initiative.tool_url} target="_blank" rel="noopener noreferrer">
                                View Tool <ExternalLink className="ml-1 h-3 w-3" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
