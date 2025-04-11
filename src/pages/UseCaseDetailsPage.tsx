
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { useUseCase, useGlobalGoods } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  ArrowUpRight,
  Building,
  GanttChartSquare,
  LayoutGrid,
  FileText,
  BookOpen,
  Contact,
  Goal,
  Download,
  AlertTriangle,
  Lightbulb,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function UseCaseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: useCase, isLoading, error } = useUseCase(id);
  const { data: globalGoods = [] } = useGlobalGoods();
  
  // State for collapsible sections
  const [lessonsExpanded, setLessonsExpanded] = useState(true);
  
  // Get global good names for this use case
  const usedGoodsNames = useCase?.globalGoods?.map(goodId => {
    const good = globalGoods.find(g => g.id === goodId);
    return good ? good.name : null;
  }).filter(Boolean) || [];

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-[50vh]">
          <p>Loading use case details...</p>
        </div>
      </PageLayout>
    );
  }
  
  if (error || !useCase) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
          <AlertTriangle className="h-16 w-16 text-destructive" />
          <h2 className="text-2xl font-bold">Use Case Not Found</h2>
          <p className="text-muted-foreground">
            The use case you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Button asChild>
            <Link to="/use-cases">View All Use Cases</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      {/* Back navigation */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 pl-0 hover:pl-2 transition-all duration-300"
          asChild
        >
          <Link to="/use-cases">
            <ArrowLeft className="h-4 w-4" /> Back to Use Cases
          </Link>
        </Button>
      </div>
      
      {/* Featured image and header section */}
      {useCase.featuredImage && (
        <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
          <img
            src={useCase.featuredImage}
            alt={useCase.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Badge>{useCase.sector}</Badge>
              <div className="flex items-center gap-1 text-sm">
                <MapPin className="h-3 w-3" />
                {useCase.country}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Calendar className="h-3 w-3" />
                {useCase.year}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{useCase.title}</h1>
          </div>
        </div>
      )}
      
      {!useCase.featuredImage && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge>{useCase.sector}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {useCase.country}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {useCase.year}
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{useCase.title}</h1>
        </div>
      )}
      
      {/* Main content area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="col-span-2">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">About</h2>
                <p className="text-lg text-muted-foreground">
                  {useCase.description}
                </p>
              </section>
              
              {/* Challenge, Solution, Impact in cards */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <h3 className="font-semibold text-lg">Challenge</h3>
                    </div>
                    <p className="text-muted-foreground">{useCase.challenge}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      <h3 className="font-semibold text-lg">Solution</h3>
                    </div>
                    <p className="text-muted-foreground">{useCase.solution}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="h-5 w-5 text-rose-500" />
                      <h3 className="font-semibold text-lg">Impact</h3>
                    </div>
                    <p className="text-muted-foreground">{useCase.impact}</p>
                  </CardContent>
                </Card>
              </section>
              
              {/* Gallery if present */}
              {useCase.images && useCase.images.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {useCase.images.map((image, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${useCase.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Lessons Learned */}
              {useCase.lessons && useCase.lessons.length > 0 && (
                <section>
                  <Collapsible
                    open={lessonsExpanded}
                    onOpenChange={setLessonsExpanded}
                    className="border rounded-lg p-6"
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-semibold">Lessons Learned</h2>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          {lessonsExpanded ? "Hide" : "Show"}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    
                    <CollapsibleContent className="mt-4">
                      <ul className="space-y-3">
                        {useCase.lessons.map((lesson, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-muted-foreground">{lesson}</p>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </section>
              )}
            </TabsContent>
            
            {/* Details Tab */}
            <TabsContent value="details" className="space-y-8">
              {/* Implementation details */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Implementation Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {useCase.organization && (
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-medium mb-2">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        Implementing Organization
                      </h3>
                      <p className="text-muted-foreground">{useCase.organization}</p>
                    </div>
                  )}
                  
                  {useCase.year && (
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-medium mb-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        Implementation Year
                      </h3>
                      <p className="text-muted-foreground">{useCase.year}</p>
                    </div>
                  )}
                  
                  {useCase.country && (
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-medium mb-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        Country
                      </h3>
                      <p className="text-muted-foreground">{useCase.country}</p>
                    </div>
                  )}
                  
                  {useCase.sector && (
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-medium mb-2">
                        <GanttChartSquare className="h-5 w-5 text-muted-foreground" />
                        Sector
                      </h3>
                      <p className="text-muted-foreground">{useCase.sector}</p>
                    </div>
                  )}
                </div>
              </section>
              
              {/* SDGs */}
              {useCase.sdgs && useCase.sdgs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Goal className="h-5 w-5" />
                    Sustainable Development Goals
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {useCase.sdgs.map((sdg) => (
                      <Badge key={sdg} variant="secondary" className="text-sm py-1.5">
                        {sdg}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Results */}
              {useCase.results && (
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Results & Outcomes</h2>
                  <p className="text-muted-foreground">{useCase.results}</p>
                </section>
              )}
            </TabsContent>
            
            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-8">
              {/* Contacts */}
              {useCase.contacts && useCase.contacts.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Contact className="h-5 w-5" />
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {useCase.contacts.map((contact, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <h3 className="font-semibold text-lg mb-1">{contact.name}</h3>
                          <p className="text-muted-foreground mb-2">
                            {contact.role && `${contact.role}, `}
                            {contact.organization}
                          </p>
                          {contact.email && (
                            <Button variant="link" className="p-0 h-auto text-primary" asChild>
                              <a href={`mailto:${contact.email}`}>{contact.email}</a>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Resources & Documents */}
              {useCase.resources && useCase.resources.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Resources & Documents
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {useCase.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="capitalize">
                            {resource.type}
                          </Badge>
                          <span>{resource.title}</span>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Access
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {/* External Link */}
              {useCase.link && (
                <section>
                  <h2 className="text-2xl font-semibold mb-4">External Resources</h2>
                  <Button asChild>
                    <a 
                      href={useCase.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Visit Project Website <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </section>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div>
          {/* Global Goods Used */}
          <div className="bg-card border rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-primary" />
              Global Goods Used
            </h2>
            {usedGoodsNames.length > 0 ? (
              <div className="space-y-3">
                {usedGoodsNames.map((name, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>{name}</span>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2"
                  asChild
                >
                  <Link to="/global-goods">
                    View All Global Goods
                  </Link>
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">No global goods specified.</p>
            )}
          </div>
          
          {/* Additional Information */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Related Use Cases
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              Explore other use cases in similar sectors or using the same global goods.
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/use-cases">
                Browse All Use Cases
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
