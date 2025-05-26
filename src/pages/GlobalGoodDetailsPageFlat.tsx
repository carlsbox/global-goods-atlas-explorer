
import { useParams, Link } from "react-router-dom";
import { useGlobalGoodFlat } from "@/lib/api/globalGoodsFlat";
import { ArrowLeft } from "lucide-react";

// Import flat structure components
import { GlobalGoodHeaderFlat } from "@/components/global-good/GlobalGoodHeaderFlat";
import { OverviewTabFlat } from "@/components/global-good/OverviewTabFlat";
import { CommunityTabEnhanced } from "@/components/global-good/CommunityTabEnhanced";
import { LoadingState } from "@/components/global-good/LoadingState";
import { ErrorState } from "@/components/global-good/ErrorState";
import { RawDataViewer } from "@/components/global-good/RawDataViewer";
import { EnhancedClassificationBadge } from "@/components/EnhancedClassificationBadge";
import { GroupedClassifications } from "@/components/global-good/GroupedClassifications";
import { useI18n } from "@/hooks/useI18n";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Globe, BarChart3, Shield, MapPin, Tag, ExternalLink, FileText, Link as LinkIcon, Leaf, Heart } from "lucide-react";
import { SDGClassificationCard } from "@/components/global-good/SDGClassificationCard";

// Import new Global Reach components
import { HeroStats } from "@/components/global-good/HeroStats";
import { InteractiveMapCard } from "@/components/global-good/InteractiveMapCard";
import { EnhancedCountriesDisplay } from "@/components/global-good/EnhancedCountriesDisplay";
import { ImplementationContext } from "@/components/global-good/ImplementationContext";

export default function GlobalGoodDetailsPageFlat() {
  const { id } = useParams<{ id: string }>();
  const { data: globalGood, isLoading, error, refetch } = useGlobalGoodFlat(id);
  const { tPage } = useI18n();

  // Handle loading state
  if (isLoading) {
    return <LoadingState message={tPage('loading', 'globalGoodDetails')} />;
  }

  // Handle error state
  if (error || !globalGood) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  // Helper function to check if technical classifications have data (excluding WMO and SDGs)
  const hasTechnicalClassifications = () => {
    const classifications = globalGood.Classifications;
    return classifications && (
      (classifications.DPI && classifications.DPI.length > 0) ||
      (classifications.WHO && classifications.WHO.length > 0)
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

  // Helper function to check if climate data exists (including SDGs)
  const hasClimateData = () => {
    const hasClimateIntegration = globalGood.ClimateAndHealthIntegration?.Description;
    const hasWMO = globalGood.Classifications?.WMO && globalGood.Classifications.WMO.length > 0;
    const hasClimateStandards = globalGood.StandardsAndInteroperability?.ClimateStandards && 
      globalGood.StandardsAndInteroperability.ClimateStandards.length > 0;
    const hasSDGs = globalGood.Classifications?.SDGs && globalGood.Classifications.SDGs.length > 0;
    
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

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {/* Breadcrumb Navigation */}
      <div className="mb-6 flex justify-between items-center">
        <Link 
          to="/global-goods" 
          className="text-muted-foreground hover:text-primary flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {tPage('backToGlobalGoods', 'globalGoodDetails')}
        </Link>
        
        <RawDataViewer data={globalGood} title={`Raw Data: ${globalGood.Name}`} />
      </div>
      
      {/* Header Section */}
      <GlobalGoodHeaderFlat globalGood={globalGood} />
      
      {/* Main Content - All sections displayed vertically */}
      <div className="mt-8 space-y-10">
        {/* Overview Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{tPage('tabs.overview', 'globalGoodDetails')}</h2>
          <OverviewTabFlat globalGood={globalGood} />
        </div>
        
        <Separator />
        
        {/* Technical Information Section - Spanning both columns */}
        {hasTechnicalInformation() && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Technical Information</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Column 1: DPI, WHO, Standards and Interoperability */}
              <div>
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
                        classifications={globalGood.Classifications?.WHO || []}
                        title="World Health Organization"
                      />
                    </div>
                  </div>
                )}
                
                {/* Technical Standards and Interoperability Section */}
                {hasTechnicalStandards() && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-primary" />
                      Standards & Interoperability
                    </h3>
                    
                    {/* Health Standards */}
                    {globalGood.StandardsAndInteroperability?.HealthStandards && globalGood.StandardsAndInteroperability.HealthStandards.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium mb-3 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Health Standards
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {globalGood.StandardsAndInteroperability.HealthStandards.map((standard, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="font-medium">{standard.name}</h5>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <ExternalLink className="h-3 w-3" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>{standard.name}</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-3">
                                        <p className="text-sm text-muted-foreground">{standard.description}</p>
                                        <div className="space-y-2">
                                          <p><strong>Code:</strong> {standard.code}</p>
                                          <p><strong>Domain:</strong> {standard.domain}</p>
                                          <Button asChild className="w-full">
                                            <a href={standard.link} target="_blank" rel="noopener noreferrer">
                                              Visit Standard <ExternalLink className="ml-2 h-4 w-4" />
                                            </a>
                                          </Button>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{standard.description}</p>
                                <Badge variant="secondary" className="text-xs">{standard.domain}</Badge>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Interoperability Standards */}
                    {globalGood.StandardsAndInteroperability?.Interoperability && globalGood.StandardsAndInteroperability.Interoperability.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium mb-3 flex items-center">
                          <LinkIcon className="h-4 w-4 mr-2" />
                          Interoperability Standards
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {globalGood.StandardsAndInteroperability.Interoperability.map((standard, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="font-medium">{standard.name}</h5>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <ExternalLink className="h-3 w-3" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>{standard.name}</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-3">
                                        <p className="text-sm text-muted-foreground">{standard.description}</p>
                                        <div className="space-y-2">
                                          <p><strong>Code:</strong> {standard.code}</p>
                                          <p><strong>Type:</strong> {standard.type}</p>
                                          <Button asChild className="w-full">
                                            <a href={standard.link} target="_blank" rel="noopener noreferrer">
                                              Visit Standard <ExternalLink className="ml-2 h-4 w-4" />
                                            </a>
                                          </Button>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{standard.description}</p>
                                <Badge variant="secondary" className="text-xs">{standard.type}</Badge>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Column 2: SDGs, Climate and Health Integration, Environmental Impact, Inclusive Design */}
              <div>
                {/* SDGs Section */}
                {globalGood.Classifications?.SDGs && globalGood.Classifications.SDGs.length > 0 && (
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
                      {globalGood.Classifications.SDGs.map((sdg, index) => (
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
                {globalGood.Classifications?.WMO && globalGood.Classifications.WMO.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">
                      WMO Classifications
                    </h3>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2">
                          {globalGood.Classifications.WMO.map((wmo, index) => (
                            <EnhancedClassificationBadge 
                              key={index} 
                              code={wmo.code}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Climate Standards */}
                {globalGood.StandardsAndInteroperability?.ClimateStandards && globalGood.StandardsAndInteroperability.ClimateStandards.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-primary" />
                      Climate Standards
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {globalGood.StandardsAndInteroperability.ClimateStandards.map((standard, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-medium">{standard.name}</h5>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <ExternalLink className="h-3 w-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>{standard.name}</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-3">
                                    <p className="text-sm text-muted-foreground">{standard.description}</p>
                                    <div className="space-y-2">
                                      <p><strong>Code:</strong> {standard.code}</p>
                                      <p><strong>Domain:</strong> {standard.domain}</p>
                                      <Button asChild className="w-full">
                                        <a href={standard.link} target="_blank" rel="noopener noreferrer">
                                          Visit Standard <ExternalLink className="ml-2 h-4 w-4" />
                                        </a>
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{standard.description}</p>
                            <Badge variant="secondary" className="text-xs">{standard.domain}</Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
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
        )}
        
        <Separator />
        
        {/* Global Reach Section - Redesigned */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Global Reach</h2>
          
          {/* Implementation Context moved here */}
          <div className="mb-6">
            <ImplementationContext globalGood={globalGood} />
          </div>
          
          {/* Hero Stats Row */}
          <HeroStats globalGood={globalGood} />
          
          {/* Map & Countries Grid - Updated to 2/3 1/3 split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <InteractiveMapCard globalGood={globalGood} />
            </div>
            <div className="lg:col-span-1">
              <EnhancedCountriesDisplay globalGood={globalGood} />
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Community Section - Using Enhanced Component */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Community</h2>
          <CommunityTabEnhanced globalGood={globalGood} />
        </div>
        
        <Separator />
        
        {/* Maturity Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Maturity Assessment</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Maturity Scores
              </CardTitle>
            </CardHeader>
            <CardContent>
              {globalGood.Maturity?.Scores && globalGood.Maturity.Scores.length > 0 ? (
                <>
                  {globalGood.Maturity.SummaryOfMaturity && (
                    <p className="text-muted-foreground mb-4">{globalGood.Maturity.SummaryOfMaturity}</p>
                  )}
                  <div className="space-y-3">
                    {Object.entries(globalGood.Maturity.Scores[0]).filter(([key]) => key !== 'year').map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize">{key.replace(/_/g, ' ')}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(Number(value) / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{Number(value)}/10</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">No maturity assessment data available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
