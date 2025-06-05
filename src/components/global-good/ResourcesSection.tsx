import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Code, FileText, Package, ExternalLink } from "lucide-react";
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";

interface ResourcesSectionProps {
  globalGood: GlobalGoodFlat;
}

export function ResourcesSection({ globalGood }: ResourcesSectionProps) {
  // Helper function to validate if a resource has valid URL and description
  const isValidResource = (resource: { description: string; url: string }) => {
    return resource.url && resource.url.trim() !== "" && resource.description && resource.description.trim() !== "";
  };

  // Helper function to check if any valid resources exist
  const hasValidResources = () => {
    const resources = globalGood.Resources;
    if (!resources) return false;

    const allResourceArrays = [
      resources.Articles || [],
      resources.ProductDocumentation || [],
      resources.UserRequirements || [],
      resources.EndUserDocumentation || [],
      resources.ImplementerDocumentation || [],
      resources.DeveloperDocumentation || [],
      resources.OperatorDocumentation || [],
      resources.InstallationDocumentation || []
    ];

    return allResourceArrays.some(resourceArray => 
      resourceArray.some(resource => isValidResource(resource))
    );
  };

  // Helper function to organize resources into categories with validation
  const getResourceCategories = () => {
    const resources = globalGood.Resources;
    if (!resources) return [];

    const categories = [
      {
        title: "General Resources",
        icon: BookOpen,
        color: "text-blue-600",
        items: [
          ...(resources.Articles || []).filter(isValidResource).map(item => ({ ...item, type: "Article" }))
        ]
      },
      {
        title: "User Documentation",
        icon: FileText,
        color: "text-green-600",
        items: [
          ...(resources.ProductDocumentation || []).filter(isValidResource).map(item => ({ ...item, type: "Product Documentation" })),
          ...(resources.EndUserDocumentation || []).filter(isValidResource).map(item => ({ ...item, type: "End User Documentation" })),
          ...(resources.ImplementerDocumentation || []).filter(isValidResource).map(item => ({ ...item, type: "Implementer Documentation" })),
          ...(resources.OperatorDocumentation || []).filter(isValidResource).map(item => ({ ...item, type: "Operator Documentation" })),
          ...(resources.UserRequirements || []).filter(isValidResource).map(item => ({ ...item, type: "User Requirements" }))
        ]
      },
      {
        title: "Technical Documentation",
        icon: Code,
        color: "text-purple-600",
        items: [
          ...(resources.DeveloperDocumentation || []).filter(isValidResource).map(item => ({ ...item, type: "Developer Documentation" })),
          ...(resources.InstallationDocumentation || []).filter(isValidResource).map(item => ({ ...item, type: "Installation Documentation" }))
        ]
      }
    ];

    return categories.filter(category => category.items.length > 0);
  };

  // Empty State Component
  const EmptyResourcesState = () => (
    <Card className="border-dashed border-2 border-muted">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Resources Available</h3>
        <p className="text-muted-foreground mb-4 max-w-md">
          Documentation and resources for this global good are not currently available in our database.
        </p>
        <div className="text-sm text-muted-foreground">
          <p>For more information, try:</p>
          <ul className="mt-2 space-y-1">
            {globalGood.Website?.main?.url && (
              <li>• Visit the <a href={globalGood.Website.main.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">official website</a></li>
            )}
            {globalGood.Website?.docs?.url && (
              <li>• Check the <a href={globalGood.Website.docs.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">documentation site</a></li>
            )}
            {globalGood.Contact?.[0]?.email && (
              <li>• Contact the <a href={`mailto:${globalGood.Contact[0].email}`} className="text-primary hover:underline">project team</a></li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          <Package className="h-6 w-6 mr-2 text-primary" />
          Resources & Documentation
        </h2>
        <p className="text-muted-foreground">
          Comprehensive documentation and resources to help you understand, implement, and use this global good.
        </p>
      </div>
      
      {hasValidResources() ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getResourceCategories().map((category, categoryIndex) => (
            <Card key={categoryIndex} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <category.icon className={`h-5 w-5 mr-2 ${category.color}`} />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {/* Show first 5 items */}
                  {category.items.slice(0, 5).map((item, index) => (
                    <div key={index} className="border rounded p-2 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium mb-1 line-clamp-2 leading-tight">{item.description}</h4>
                          <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-auto">{item.type}</Badge>
                        </div>
                        <Button asChild variant="ghost" size="sm" className="ml-2 h-6 w-6 p-0 shrink-0">
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Show "View All" button if there are more than 5 items */}
                  {category.items.length > 5 && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          View All {category.title} ({category.items.length})
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center">
                            <category.icon className={`h-5 w-5 mr-2 ${category.color}`} />
                            {category.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                          {category.items.map((item, index) => (
                            <Card key={index} className="hover:shadow-sm transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="font-medium mb-2">{item.description}</h4>
                                    <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                                  </div>
                                  <Button asChild className="ml-4">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                      Visit Resource <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyResourcesState />
      )}
    </div>
  );
}
