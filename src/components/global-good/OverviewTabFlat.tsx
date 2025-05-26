
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Building, Globe, Image } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface OverviewTabFlatProps {
  globalGood: GlobalGoodFlat;
}

export function OverviewTabFlat({ globalGood }: OverviewTabFlatProps) {
  const hasDescription = globalGood.ProductOverview?.Description && 
    globalGood.ProductOverview.Description !== globalGood.ProductOverview?.Summary;
  
  const hasScreenshots = globalGood.ProductOverview?.Screenshots && 
    globalGood.ProductOverview.Screenshots.length > 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Description - only if different from Summary */}
            {hasDescription && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Description</h3>
                <p className="text-muted-foreground">{globalGood.ProductOverview.Description}</p>
              </div>
            )}
            
            {/* Primary Functionality */}
            {globalGood.ProductOverview?.PrimaryFunctionality && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Primary Functionality</h3>
                <p className="text-muted-foreground">{globalGood.ProductOverview.PrimaryFunctionality}</p>
              </div>
            )}

            {/* Target Users */}
            {globalGood.ProductOverview?.Users && (
              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center">
                  <Users className="mr-2 h-4 w-4 text-primary" />
                  Target Users
                </h4>
                <p className="text-muted-foreground">{globalGood.ProductOverview.Users}</p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Languages */}
            {globalGood.ProductOverview?.Languages && globalGood.ProductOverview.Languages.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-primary" />
                  Supported Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {globalGood.ProductOverview.Languages.map((language, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/5">
                      {typeof language === 'string' ? language : language.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots - only show if they exist */}
            {hasScreenshots && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Image className="mr-2 h-5 w-5 text-primary" />
                  Screenshots
                </h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      View Screenshots ({globalGood.ProductOverview.Screenshots.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Screenshots</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {globalGood.ProductOverview.Screenshots.map((screenshot, index) => (
                        <div key={index} className="bg-muted rounded-lg overflow-hidden">
                          <AspectRatio ratio={16/9}>
                            <img 
                              src={typeof screenshot === 'string' ? screenshot : screenshot.url} 
                              alt={`Screenshot ${index + 1}`}
                              className="w-full h-full object-cover" 
                            />
                          </AspectRatio>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
            
            {/* Host Organization */}
            {globalGood.Community?.HostAnchorOrganization && (
              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center">
                  <Building className="mr-2 h-4 w-4 text-primary" />
                  Host Organization
                </h4>
                <p className="text-muted-foreground">{globalGood.Community.HostAnchorOrganization.name}</p>
                <p className="text-sm text-muted-foreground">{globalGood.Community.HostAnchorOrganization.description}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
