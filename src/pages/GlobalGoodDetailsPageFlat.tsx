import { useParams, Link } from "react-router-dom";
import { useGlobalGoodFlat } from "@/lib/api/globalGoodsFlat";
import { ArrowLeft } from "lucide-react";

// Import flat structure components
import { GlobalGoodHeaderFlat } from "@/components/global-good/GlobalGoodHeaderFlat";
import { OverviewTabFlat } from "@/components/global-good/OverviewTabFlat";
import { LoadingState } from "@/components/global-good/LoadingState";
import { ErrorState } from "@/components/global-good/ErrorState";
import { RawDataViewer } from "@/components/global-good/RawDataViewer";
import { useI18n } from "@/hooks/useI18n";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Globe, Code, BarChart3, Shield, MapPin } from "lucide-react";

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
        
        {/* Technical Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Technical Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-primary" />
                  License & Standards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {globalGood.License && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">License</h3>
                    <Badge variant="outline">{globalGood.License.name}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{globalGood.License.description}</p>
                  </div>
                )}
                
                {globalGood.StandardsAndInteroperability?.HealthStandards && globalGood.StandardsAndInteroperability.HealthStandards.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Health Standards</h3>
                    <div className="flex flex-wrap gap-1">
                      {globalGood.StandardsAndInteroperability.HealthStandards.slice(0, 3).map((standard, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {standard.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  Languages & Accessibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {globalGood.ProductOverview?.Languages && globalGood.ProductOverview.Languages.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Supported Languages</h3>
                    <div className="flex flex-wrap gap-1">
                      {globalGood.ProductOverview.Languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {lang.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {globalGood.InclusiveDesign && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Inclusive Design</h3>
                    <p className="text-sm text-muted-foreground">{globalGood.InclusiveDesign.Description}</p>
                    {globalGood.InclusiveDesign.OfflineSupport && (
                      <Badge variant="secondary" className="mt-2">Offline Support: {globalGood.InclusiveDesign.OfflineSupport}</Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator />
        
        {/* Deployment Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Global Reach</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    Implementation Countries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {globalGood.Reach?.ImplementationCountries && globalGood.Reach.ImplementationCountries.length > 0 ? (
                    <>
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">
                          Deployed in {globalGood.Reach.ImplementationCountries.length} countries
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {globalGood.Reach.ImplementationCountries.map((country, index) => (
                          <Badge key={index} variant="secondary">
                            {country.names.en.short}
                          </Badge>
                        ))}
                      </div>
                      {globalGood.Reach.SummaryOfReach && (
                        <p className="text-sm text-muted-foreground mt-4">{globalGood.Reach.SummaryOfReach}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-muted-foreground">No deployment information available</p>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {globalGood.Reach?.NumberOfImplementations && (
                  <div>
                    <h3 className="text-sm font-medium mb-1">Total Implementations</h3>
                    <p className="text-2xl font-bold">{globalGood.Reach.NumberOfImplementations.toLocaleString()}</p>
                  </div>
                )}
                
                {globalGood.Community?.SizeOfCommunity && (
                  <div>
                    <h3 className="text-sm font-medium mb-1">Community Size</h3>
                    <p className="text-2xl font-bold">{globalGood.Community.SizeOfCommunity.toLocaleString()}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator />
        
        {/* Community Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Community</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Community Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {globalGood.Community?.DescriptionOfCommunity && (
                <p className="text-muted-foreground">{globalGood.Community.DescriptionOfCommunity}</p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {globalGood.Community?.Links?.Community && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Community Platform</h3>
                    <Button asChild variant="outline" size="sm">
                      <a href={globalGood.Community.Links.Community.url} target="_blank" rel="noopener noreferrer">
                        Visit Community
                      </a>
                    </Button>
                  </div>
                )}
                
                {globalGood.Community?.Links?.MailingList && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Mailing List</h3>
                    <Button asChild variant="outline" size="sm">
                      <a href={globalGood.Community.Links.MailingList.url} target="_blank" rel="noopener noreferrer">
                        Subscribe
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
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
