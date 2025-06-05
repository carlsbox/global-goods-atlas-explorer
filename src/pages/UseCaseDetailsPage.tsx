import { useParams } from "react-router-dom";
import { useUseCases } from "@/lib/api";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Users, Circle, Settings, Globe, AlertTriangle, Lightbulb, MapPin, Building, Calendar, FileText, Check, Link as LinkIcon, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { ClassificationBadge } from "@/components/ClassificationBadge";
import { ExportButton } from "@/components/ExportButton";
import ReactMarkdown from "react-markdown";
import { GlobalGoodCompactCard } from "@/components/global-good/GlobalGoodCompactCard";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StandardsBadgeCloud } from "@/components/global-good/StandardsBadgeCloud";
import { useStandardsResolver } from "@/hooks/useStandardsResolver";

export default function UseCaseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: useCases = [], isLoading } = useUseCases();
  
  const useCase = useCases.find(uc => uc.id === id);

  // Resolve standards from reference data
  const { groupedStandards, loading: standardsLoading } = useStandardsResolver(useCase?.standards || []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!useCase) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Use Case Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The use case you're looking for doesn't exist.
        </p>
        <Link to="/use-cases">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Use Cases
          </Button>
        </Link>
      </div>
    );
  }

  const renderMarkdown = (content: string) => (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );

  // Handle both new and legacy data structures
  const title = useCase.title;
  const purpose = useCase.purpose || useCase.description || "";
  const scope = useCase.scope || "";
  const actors = useCase.actors || "";
  const preconditions = useCase.preconditions || "";
  const processSteps = useCase.process_steps || "";
  const postconditions = useCase.postconditions || "";
  const dataRequirements = useCase.data_requirements || "";
  const technologyComponents = useCase.technology_components || "";
  const challenges = useCase.challenges || useCase.challenge || "";
  const sustainability = useCase.sustainability_considerations || "";

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link to="/use-cases">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Use Cases
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="mb-12">
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader className="pb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-4xl font-bold text-primary">{title}</CardTitle>
                  <ExportButton useCase={useCase} />
                </div>
                
                {/* Classifications */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {useCase.classifications?.sdg && (
                    <ClassificationBadge code={useCase.classifications.sdg} />
                  )}
                  {useCase.classifications?.who_system && (
                    <ClassificationBadge code={useCase.classifications.who_system} />
                  )}
                  {useCase.classifications?.wmo_category && (
                    <ClassificationBadge code={useCase.classifications.wmo_category} />
                  )}
                </div>
              </div>
              <Circle className="h-12 w-12 text-primary flex-shrink-0 ml-6" />
            </div>
          </CardHeader>
          
          {/* Executive Summary */}
          {purpose && (
            <CardContent className="pt-0">
              <div className="bg-white/50 rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Check className="mr-2 h-5 w-5 text-primary" />
                  Executive Summary
                </h3>
                {renderMarkdown(purpose)}
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Two-Column Main Content Grid (60/40 split) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
        
        {/* Left Column: Primary Narrative (60% - 3 columns) */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 flex items-center">
            <Users className="mr-2 h-6 w-6" />
            Use Case Overview
          </h2>
          
          {/* Card 1: Scope & Context */}
          {scope && (
            <Card className="border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-blue-700">
                  <Circle className="mr-2 h-5 w-5" />
                  Scope & Context
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderMarkdown(scope)}
              </CardContent>
            </Card>
          )}

          {/* Card 2: Key Actors */}
          {actors && (
            <Card className="border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-blue-700">
                  <Users className="mr-2 h-5 w-5" />
                  Key Actors & Stakeholders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderMarkdown(actors)}
              </CardContent>
            </Card>
          )}

          {/* Card 3: Process Flow */}
          {(preconditions || processSteps || postconditions) && (
            <Card className="border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-blue-700">
                  <FileText className="mr-2 h-5 w-5" />
                  Implementation Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {preconditions && (
                  <div>
                    <h4 className="font-medium text-blue-600 mb-2">Preconditions</h4>
                    {renderMarkdown(preconditions)}
                  </div>
                )}
                {processSteps && (
                  <div>
                    <h4 className="font-medium text-blue-600 mb-2">Process Steps</h4>
                    {renderMarkdown(processSteps)}
                  </div>
                )}
                {postconditions && (
                  <div>
                    <h4 className="font-medium text-blue-600 mb-2">Expected Outcomes</h4>
                    {renderMarkdown(postconditions)}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Card 4: Challenges & Lessons */}
          {(challenges || useCase.lessons) && (
            <Card className="border-orange-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-orange-700">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Challenges & Lessons Learned
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {challenges && (
                  <div>
                    <h4 className="font-medium text-orange-600 mb-2">Key Challenges</h4>
                    {renderMarkdown(challenges)}
                  </div>
                )}
                {useCase.lessons && useCase.lessons.length > 0 && (
                  <div>
                    <h4 className="font-medium text-orange-600 mb-2">Lessons Learned</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      {useCase.lessons.map((lesson, index) => (
                        <li key={index} className="text-muted-foreground">{lesson}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Card 5: Sustainability */}
          {sustainability && (
            <Card className="border-orange-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-orange-700">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Sustainability & Future Outlook
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderMarkdown(sustainability)}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Technical Implementation (40% - 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="sticky top-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-green-600 flex items-center">
                <Settings className="mr-2 h-6 w-6" />
                Technical Implementation
              </h2>
              <ExportButton useCase={useCase} variant="ghost" size="sm" />
            </div>

            {/* Consolidated Technical Details Card */}
            <Card className="border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-green-700">
                  <Settings className="mr-2 h-5 w-5" />
                  Implementation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">

                {/* Data Requirements */}
                {dataRequirements && (
                  <div>
                    <h4 className="font-medium text-green-600 mb-2">Data Requirements</h4>
                    {renderMarkdown(dataRequirements)}
                  </div>
                )}

                {/* Technology Components */}
                {technologyComponents && (
                  <div>
                    <h4 className="font-medium text-green-600 mb-2">Technology Components</h4>
                    {renderMarkdown(technologyComponents)}
                  </div>
                )}
                
                {/* Standards & Interoperability - Enhanced with StandardsBadgeCloud */}
                {useCase.standards && useCase.standards.length > 0 && !standardsLoading && (
                  <div>
                    <h4 className="font-medium text-green-600 mb-3">Standards & Interoperability</h4>
                    <div className="space-y-4">
                      <TooltipProvider>
                        {groupedStandards.health.length > 0 && (
                          <StandardsBadgeCloud
                            standards={groupedStandards.health}
                            variant="health"
                            title="Health Standards"
                            maxVisible={6}
                          />
                        )}
                        
                        {groupedStandards.interoperability.length > 0 && (
                          <StandardsBadgeCloud
                            standards={groupedStandards.interoperability}
                            variant="interoperability"
                            title="Interoperability Standards"
                            maxVisible={6}
                          />
                        )}
                        
                        {groupedStandards.climate.length > 0 && (
                          <StandardsBadgeCloud
                            standards={groupedStandards.climate}
                            variant="climate"
                            title="Climate Standards"
                            maxVisible={6}
                          />
                        )}
                        
                        {groupedStandards.dataCollection.length > 0 && (
                          <StandardsBadgeCloud
                            standards={groupedStandards.dataCollection}
                            variant="interoperability"
                            title="Data Collection Standards"
                            maxVisible={6}
                          />
                        )}
                        
                        {groupedStandards.emergency.length > 0 && (
                          <StandardsBadgeCloud
                            standards={groupedStandards.emergency}
                            variant="health"
                            title="Emergency Standards"
                            maxVisible={6}
                          />
                        )}
                      </TooltipProvider>
                    </div>
                  </div>
                )}

                {/* Associated Global Goods - Moved below Standards */}
                {useCase.global_goods && useCase.global_goods.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-600 mb-3 flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      Associated Global Goods
                    </h4>
                    <div className="grid gap-3">
                      {useCase.global_goods.map((good, index) => (
                        <GlobalGoodCompactCard
                          key={index}
                          globalGoodId={good.id}
                          globalGoodName={good.name}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Legacy Quick Facts Card - Keep for backward compatibility */}
            {(useCase.organization || useCase.country || useCase.year || useCase.sector) && (
              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-700">Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {useCase.organization && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Organization</p>
                        <p className="text-sm font-medium">{useCase.organization}</p>
                      </div>
                    </div>
                  )}
                  {useCase.country && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium">{useCase.country}</p>
                      </div>
                    </div>
                  )}
                  {useCase.year && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Year</p>
                        <p className="text-sm font-medium">{useCase.year}</p>
                      </div>
                    </div>
                  )}
                  {useCase.sector && (
                    <div className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Sector</p>
                        <p className="text-sm font-medium">{useCase.sector}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Legacy cards for backward compatibility */}
            {useCase.results && (
              <Card className="border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-orange-700">Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{useCase.results}</p>
                </CardContent>
              </Card>
            )}

            {useCase.impact && (
              <Card className="border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-orange-700">Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{useCase.impact}</p>
                </CardContent>
              </Card>
            )}

            {useCase.solution && (
              <Card className="border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-orange-700">Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{useCase.solution}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Resources & Contacts Footer */}
      {(useCase.resources || useCase.contacts) && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Resources & Contacts</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {useCase.resources && useCase.resources.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {useCase.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <Badge variant="outline" className="mt-1">{resource.type}</Badge>
                        </div>
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center"
                        >
                          <LinkIcon className="h-4 w-4 mr-1" />
                          Access
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {useCase.contacts && useCase.contacts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {useCase.contacts.map((contact, index) => (
                      <div key={index} className="p-3 border rounded hover:bg-gray-50">
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-sm text-muted-foreground">{contact.role} at {contact.organization}</p>
                        {contact.email && (
                          <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline">
                            {contact.email}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
