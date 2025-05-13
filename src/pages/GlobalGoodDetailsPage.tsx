
import { useParams, Link } from "react-router-dom";
import { useGlobalGood } from "@/lib/api";
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ClassificationBadge } from "@/components/ClassificationBadge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ArrowLeft, 
  Globe, 
  Github, 
  MapPin,
  Users,
  Calendar,
  Layers,
  Tag,
  FileText,
  BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GlobalGoodDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: globalGood, isLoading, error } = useGlobalGood(id);
  const { toast } = useToast();

  // Handle various loading states
  if (isLoading) {
    return (
      <div className="text-center py-24">
        <p>Loading global good details...</p>
      </div>
    );
  }

  if (error || !globalGood) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold mb-4">Global Good Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The global good you're looking for doesn't exist or couldn't be loaded.
        </p>
        <Button asChild>
          <Link to="/global-goods">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Catalog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Link 
          to="/global-goods" 
          className="text-muted-foreground hover:text-primary flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Global Goods
        </Link>
      </div>
      
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          {globalGood.logo ? (
            <img 
              src={globalGood.logo} 
              alt={globalGood.name} 
              className="h-16 w-16 object-contain"
            />
          ) : (
            <div className="h-16 w-16 bg-primary/10 rounded flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {globalGood.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold">{globalGood.name}</h1>
            <p className="text-muted-foreground">{globalGood.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {globalGood.sector?.map((sector) => (
            <Badge key={sector} variant="outline" className="text-xs">
              {sector}
            </Badge>
          ))}
          {globalGood.maturity && (
            <Badge variant="secondary" className="text-xs">
              {globalGood.maturity}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {globalGood.website && (
            <Button asChild variant="outline" size="sm">
              <a 
                href={globalGood.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Globe className="mr-2 h-4 w-4" />
                Website
              </a>
            </Button>
          )}
          {globalGood.github && (
            <Button asChild variant="outline" size="sm">
              <a 
                href={globalGood.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="technical">Technical Details</TabsTrigger>
              <TabsTrigger value="standards">Standards & Classification</TabsTrigger>
              <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold mb-4">Summary</h3>
                    <p className="mb-6">{globalGood.summary || globalGood.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                      {globalGood.implementers && globalGood.implementers.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold mb-2 flex items-center">
                            <Users className="mr-2 h-4 w-4 text-primary" />
                            Key Implementers
                          </h4>
                          <ul className="list-disc list-inside text-muted-foreground">
                            {globalGood.implementers.map((implementer) => (
                              <li key={implementer}>{implementer}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {globalGood.supporters && globalGood.supporters.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold mb-2 flex items-center">
                            <Users className="mr-2 h-4 w-4 text-primary" />
                            Key Supporters
                          </h4>
                          <ul className="list-disc list-inside text-muted-foreground">
                            {globalGood.supporters.map((supporter) => (
                              <li key={supporter}>{supporter}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Last updated: {globalGood.lastUpdated}
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="technical" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {globalGood.technologies && globalGood.technologies.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Layers className="mr-2 h-5 w-5 text-primary" />
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {globalGood.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {globalGood.licenses && globalGood.licenses.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Tag className="mr-2 h-5 w-5 text-primary" />
                          Licenses
                        </h3>
                        <ul className="list-disc list-inside text-muted-foreground">
                          {globalGood.licenses.map((license) => (
                            <li key={license}>{license}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {globalGood.sdgs && globalGood.sdgs.length > 0 && (
                      <div className="md:col-span-2">
                        <h3 className="text-xl font-semibold mb-4">Sustainable Development Goals</h3>
                        <div className="flex flex-wrap gap-2">
                          {globalGood.sdgs.map((sdg) => (
                            <Badge key={sdg} variant="outline">
                              {sdg}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="standards" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-8">
                    {globalGood.healthStandards && globalGood.healthStandards.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <FileText className="mr-2 h-5 w-5 text-primary" />
                          Health Standards
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {globalGood.healthStandards.map((standard) => (
                            <Badge key={standard} variant="outline">
                              {standard}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Standards supported or implemented by this global good
                        </p>
                      </div>
                    )}
                    
                    {globalGood.classificationCodes && globalGood.classificationCodes.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <BookOpen className="mr-2 h-5 w-5 text-primary" />
                          Digital Health Classifications
                        </h3>
                        
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Classifications</h4>
                          <div className="flex flex-wrap gap-2">
                            {globalGood.classificationCodes.map((code) => (
                              <ClassificationBadge key={code} code={code} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 text-sm text-muted-foreground">
                  <p>Based on WHO Digital Health Atlas classification system</p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="use-cases" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    Visit the Use Cases page to explore real-world implementations of {globalGood.name}.
                  </p>
                  <Button asChild>
                    <Link to={`/use-cases?globalGood=${globalGood.id}`}>
                      View Use Cases
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Deployment Locations
              </CardTitle>
              <CardDescription>
                {globalGood.countries?.length || 0} countries using this global good
              </CardDescription>
            </CardHeader>
            <CardContent>
              {globalGood.countries && globalGood.countries.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {globalGood.countries.map((country) => (
                    <div key={country} className="p-2 bg-secondary/30 rounded-sm text-sm">
                      {country}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No country data available</p>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Map Feature",
                    description: "View this global good on our interactive map to explore geographic distribution.",
                    action: (
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/map?highlight=${globalGood.id}`}>
                          Open Map
                        </Link>
                      </Button>
                    ),
                  });
                }}
              >
                <MapPin className="mr-2 h-4 w-4" />
                View on Map
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
