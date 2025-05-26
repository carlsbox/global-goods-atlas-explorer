
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
  // Helper function to check if resources data exists
  const hasResources = () => {
    const resources = globalGood.Resources;
    return resources && (
      (resources.Articles && resources.Articles.length > 0) ||
      (resources.ProductDocumentation && resources.ProductDocumentation.length > 0) ||
      (resources.UserRequirements && resources.UserRequirements.length > 0) ||
      (resources.EndUserDocumentation && resources.EndUserDocumentation.length > 0) ||
      (resources.ImplementerDocumentation && resources.ImplementerDocumentation.length > 0) ||
      (resources.DeveloperDocumentation && resources.DeveloperDocumentation.length > 0) ||
      (resources.OperatorDocumentation && resources.OperatorDocumentation.length > 0) ||
      (resources.InstallationDocumentation && resources.InstallationDocumentation.length > 0)
    );
  };

  // Helper function to organize resources into categories
  const getResourceCategories = () => {
    const resources = globalGood.Resources;
    if (!resources) return [];

    const categories = [
      {
        title: "General Resources",
        icon: BookOpen,
        color: "text-blue-600",
        items: [
          ...(resources.Articles || []).map(item => ({ ...item, type: "Article" }))
        ]
      },
      {
        title: "User Documentation",
        icon: FileText,
        color: "text-green-600",
        items: [
          ...(resources.ProductDocumentation || []).map(item => ({ ...item, type: "Product Documentation" })),
          ...(resources.EndUserDocumentation || []).map(item => ({ ...item, type: "End User Documentation" })),
          ...(resources.ImplementerDocumentation || []).map(item => ({ ...item, type: "Implementer Documentation" })),
          ...(resources.OperatorDocumentation || []).map(item => ({ ...item, type: "Operator Documentation" })),
          ...(resources.UserRequirements || []).map(item => ({ ...item, type: "User Requirements" }))
        ]
      },
      {
        title: "Technical Documentation",
        icon: Code,
        color: "text-purple-600",
        items: [
          ...(resources.DeveloperDocumentation || []).map(item => ({ ...item, type: "Developer Documentation" })),
          ...(resources.InstallationDocumentation || []).map(item => ({ ...item, type: "Installation Documentation" }))
        ]
      }
    ];

    return categories.filter(category => category.items.length > 0);
  };

  if (!hasResources()) {
    return null;
  }

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
    </div>
  );
}
