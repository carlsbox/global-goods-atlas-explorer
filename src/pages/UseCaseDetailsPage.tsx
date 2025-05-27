import { useParams } from "react-router-dom";
import { useUseCases } from "@/lib/api";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, Crosshair, Settings, Globe, AlertTriangle, Lightbulb } from "lucide-react";
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/use-cases">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Use Cases
          </Button>
        </Link>
      </div>

      {/* Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-3xl mb-4">{title}</CardTitle>
              
              {/* Classifications */}
              <div className="flex flex-wrap gap-2 mb-4">
                {useCase.classifications?.sdg && (
                  <ClassificationBadge 
                    code={useCase.classifications.sdg} 
                  />
                )}
                {useCase.classifications?.who_system && (
                  <Badge variant="outline">
                    WHO: {useCase.classifications.who_system}
                  </Badge>
                )}
                {useCase.classifications?.wmo_category && (
                  <Badge variant="outline">
                    WMO: {useCase.classifications.wmo_category}
                  </Badge>
                )}
                {/* Legacy support */}
                {useCase.country && (
                  <Badge variant="secondary">{useCase.country}</Badge>
                )}
                {useCase.sector && (
                  <Badge variant="secondary">{useCase.sector}</Badge>
                )}
                {useCase.year && (
                  <Badge variant="outline">{useCase.year}</Badge>
                )}
              </div>
            </div>
            <Crosshair className="h-8 w-8 text-primary flex-shrink-0 ml-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Crosshair className="mr-2 h-5 w-5" />
                {purpose ? "Purpose" : "Overview"}
              </h3>
              {renderMarkdown(purpose)}
            </div>
            <div>
              {/* Quick stats */}
              <div className="space-y-4">
                {useCase.global_goods && useCase.global_goods.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      Global Goods ({useCase.global_goods.length})
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {useCase.global_goods.map((good, index) => (
                        <Badge key={index} className="text-xs">
                          {good.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {useCase.standards && useCase.standards.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Standards ({useCase.standards.length})
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {useCase.standards.map((standard, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {standard.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {useCase.organization && (
                  <div>
                    <h4 className="font-medium mb-2">Organization</h4>
                    <p className="text-sm text-muted-foreground">{useCase.organization}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="process">Process Flow</TabsTrigger>
          <TabsTrigger value="technical">Technical Setup</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {scope && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Scope
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderMarkdown(scope)}
                </CardContent>
              </Card>
            )}

            {actors && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
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
              <Card>
                <CardHeader>
                  <CardTitle>Preconditions</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderMarkdown(preconditions)}
                </CardContent>
              </Card>
            )}

            {dataRequirements && (
              <Card>
                <CardHeader>
                  <CardTitle>Data Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderMarkdown(dataRequirements)}
                </CardContent>
              </Card>
            )}

            {/* Legacy fields */}
            {useCase.results && (
              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{useCase.results}</p>
                </CardContent>
              </Card>
            )}

            {useCase.impact && (
              <Card>
                <CardHeader>
                  <CardTitle>Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{useCase.impact}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="process" className="space-y-6">
          {processSteps && (
            <Card>
              <CardHeader>
                <CardTitle>Process Steps</CardTitle>
              </CardHeader>
              <CardContent>
                {renderMarkdown(processSteps)}
              </CardContent>
            </Card>
          )}

          {postconditions && (
            <Card>
              <CardHeader>
                <CardTitle>Expected Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                {renderMarkdown(postconditions)}
              </CardContent>
            </Card>
          )}

          {useCase.lessons && useCase.lessons.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Lessons Learned</CardTitle>
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
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          {technologyComponents && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
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
            <Card>
              <CardHeader>
                <CardTitle>Standards & Interoperability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {useCase.standards.map((standard, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-medium">{standard.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {standard.description}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {standard.domain}
                      </Badge>
                      {standard.link && (
                        <a 
                          href={standard.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block text-sm text-primary hover:underline mt-1"
                        >
                          Learn more →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {useCase.global_goods && useCase.global_goods.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Global Goods Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {useCase.global_goods.map((good, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-medium">{good.name}</h4>
                      <Link to={good.url} className="text-sm text-primary hover:underline">
                        View Details →
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {useCase.resources && useCase.resources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {useCase.resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <Badge variant="outline" className="mt-1">{resource.type}</Badge>
                      </div>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Access →
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="implementation" className="space-y-6">
          {challenges && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Sustainability Considerations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderMarkdown(sustainability)}
              </CardContent>
            </Card>
          )}

          {useCase.solution && (
            <Card>
              <CardHeader>
                <CardTitle>Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{useCase.solution}</p>
              </CardContent>
            </Card>
          )}

          {useCase.contacts && useCase.contacts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {useCase.contacts.map((contact, index) => (
                    <div key={index} className="p-3 border rounded">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
