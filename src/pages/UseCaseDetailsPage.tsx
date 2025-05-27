
import { useParams } from "react-router-dom";
import { useUseCases } from "@/lib/api";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Circle, Settings, Globe, AlertTriangle, Lightbulb, MapPin, Building, Calendar, FileText, Cog, Target, CheckCircle, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ClassificationBadge } from "@/components/ClassificationBadge";
import ReactMarkdown from "react-markdown";

export default function UseCaseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: useCases = [], isLoading } = useUseCases();
  
  const useCase = useCases.find(uc => uc.id === id);

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

      {/* Enhanced Hero Section */}
      <div className="mb-12">
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader className="pb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <CardTitle className="text-4xl font-bold mb-4 text-primary">{title}</CardTitle>
                
                {/* Key Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {useCase.organization && (
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Organization</p>
                        <p className="font-medium">{useCase.organization}</p>
                      </div>
                    </div>
                  )}
                  
                  {useCase.country && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{useCase.country}</p>
                      </div>
                    </div>
                  )}
                  
                  {useCase.year && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Year</p>
                        <p className="font-medium">{useCase.year}</p>
                      </div>
                    </div>
                  )}
                  
                  {useCase.sector && (
                    <div className="flex items-center gap-2">
                      <Circle className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Sector</p>
                        <p className="font-medium">{useCase.sector}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Classifications */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {useCase.classifications?.sdg && (
                    <ClassificationBadge code={useCase.classifications.sdg} />
                  )}
                  {useCase.classifications?.who_system && (
                    <Badge variant="outline" className="border-blue-200 bg-blue-50">
                      WHO: {useCase.classifications.who_system}
                    </Badge>
                  )}
                  {useCase.classifications?.wmo_category && (
                    <Badge variant="outline" className="border-green-200 bg-green-50">
                      WMO: {useCase.classifications.wmo_category}
                    </Badge>
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
                  <Target className="mr-2 h-5 w-5 text-primary" />
                  Executive Summary
                </h3>
                {renderMarkdown(purpose)}
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Three-Column Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Column 1: Stakeholders & Process */}
        <div className="space-y-6">
          <div className="sticky top-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 flex items-center">
              <Users className="mr-2 h-6 w-6" />
              Stakeholders & Process
            </h2>
            
            {scope && (
              <Card className="mb-6 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-blue-700">
                    <Circle className="mr-2 h-5 w-5" />
                    Scope
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderMarkdown(scope)}
                </CardContent>
              </Card>
            )}

            {actors && (
              <Card className="mb-6 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-blue-700">
                    <Users className="mr-2 h-5 w-5" />
                    Key Actors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderMarkdown(actors)}
                </CardContent>
              </Card>
            )}

            {preconditions && (
              <Card className="mb-6 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-700">Preconditions</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderMarkdown(preconditions)}
                </CardContent>
              </Card>
            )}

            {processSteps && (
              <Card className="mb-6 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-blue-700">
                    <FileText className="mr-2 h-5 w-5" />
                    Process Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderMarkdown(processSteps)}
                </CardContent>
              </Card>
            )}

            {postconditions && (
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-blue-700">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Expected Outcomes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderMarkdown(postconditions)}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Column 2: Technical Implementation */}
        <div className="space-y-6">
          <div className="sticky top-6">
            <h2 className="text-2xl font-bold mb-4 text-green-600 flex items-center">
              <Cog className="mr-2 h-6 w-6" />
              Technical Implementation
            </h2>

            {dataRequirements && (
              <Card className="mb-6 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-700">Data Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderMarkdown(dataRequirements)}
                </CardContent>
              </Card>
            )}

            {technologyComponents && (
              <Card className="mb-6 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-green-700">
                    <Settings className="mr-2 h-5 w-5" />
                    Technology Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderMarkdown(technologyComponents)}
                </CardContent>
              </Card>
            )}

            {useCase.standards && useCase.standards.length > 0 && (
              <Card className="mb-6 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-700">Standards & Interoperability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {useCase.standards.map((standard, index) => (
                      <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-800">{standard.name}</h4>
                        <p className="text-sm text-green-700 mt-1">{standard.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="border-green-300">{standard.domain}</Badge>
                          {standard.link && (
                            <a 
                              href={standard.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-green-600 hover:text-green-800 flex items-center"
                            >
                              <LinkIcon className="h-3 w-3 mr-1" />
                              Learn more
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {useCase.global_goods && useCase.global_goods.length > 0 && (
              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-green-700">
                    <Globe className="mr-2 h-5 w-5" />
                    Global Goods Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {useCase.global_goods.map((good, index) => (
                      <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-800">{good.name}</h4>
                        <Link to={good.url} className="text-sm text-green-600 hover:text-green-800 flex items-center mt-1">
                          <LinkIcon className="h-3 w-3 mr-1" />
                          View Details
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Column 3: Integration & Sustainability */}
        <div className="space-y-6">
          <div className="sticky top-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-600 flex items-center">
              <Lightbulb className="mr-2 h-6 w-6" />
              Integration & Sustainability
            </h2>

            {challenges && (
              <Card className="mb-6 border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-orange-700">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderMarkdown(challenges)}
                </CardContent>
              </Card>
            )}

            {sustainability && (
              <Card className="mb-6 border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-orange-700">
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Sustainability Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderMarkdown(sustainability)}
                </CardContent>
              </Card>
            )}

            {/* Legacy fields */}
            {useCase.results && (
              <Card className="mb-6 border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-orange-700">Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{useCase.results}</p>
                </CardContent>
              </Card>
            )}

            {useCase.impact && (
              <Card className="mb-6 border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-orange-700">Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{useCase.impact}</p>
                </CardContent>
              </Card>
            )}

            {useCase.solution && (
              <Card className="mb-6 border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-orange-700">Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{useCase.solution}</p>
                </CardContent>
              </Card>
            )}

            {useCase.lessons && useCase.lessons.length > 0 && (
              <Card className="border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-orange-700">Lessons Learned</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    {useCase.lessons.map((lesson, index) => (
                      <li key={index} className="text-muted-foreground">{lesson}</li>
                    ))}
                  </ul>
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
