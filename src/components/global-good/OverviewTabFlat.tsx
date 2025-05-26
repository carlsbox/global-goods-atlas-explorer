
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Building, Globe, Image } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface OverviewTabFlatProps {
  globalGood: GlobalGoodFlat;
}

export function OverviewTabFlat({ globalGood }: OverviewTabFlatProps) {
  const hasDescription = globalGood.ProductOverview?.Description && 
    globalGood.ProductOverview.Description !== globalGood.ProductOverview?.Summary;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="prose max-w-none space-y-8">
          {/* Description - only if different from Summary */}
          {hasDescription && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="mb-6">{globalGood.ProductOverview.Description}</p>
            </div>
          )}
          
          {/* Primary Functionality */}
          {globalGood.ProductOverview?.PrimaryFunctionality && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Primary Functionality</h3>
              <p className="mb-6">{globalGood.ProductOverview.PrimaryFunctionality}</p>
            </div>
          )}

          {/* Languages */}
          {globalGood.ProductOverview?.Languages && globalGood.ProductOverview.Languages.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Globe className="mr-2 h-5 w-5 text-primary" />
                Supported Languages
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {globalGood.ProductOverview.Languages.map((language, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/5">
                    {typeof language === 'string' ? language : language.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Screenshots */}
          {globalGood.ProductOverview?.Screenshots && globalGood.ProductOverview.Screenshots.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Image className="mr-2 h-5 w-5 text-primary" />
                Screenshots
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {globalGood.ProductOverview.Screenshots.map((screenshot, index) => (
                  <div key={index} className="bg-muted rounded-lg overflow-hidden">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src={typeof screenshot === 'string' ? screenshot : screenshot.url} 
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" 
                      />
                    </AspectRatio>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Target Users and Host Organization Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {globalGood.ProductOverview?.Users && (
              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center">
                  <Users className="mr-2 h-4 w-4 text-primary" />
                  Target Users
                </h4>
                <p className="text-muted-foreground">{globalGood.ProductOverview.Users}</p>
              </div>
            )}
            
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
      <CardFooter className="border-t bg-muted/50 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          {globalGood.Community?.InceptionYear ? `Established: ${globalGood.Community.InceptionYear}` : 'Last updated: Recently'}
        </div>
      </CardFooter>
    </Card>
  );
}
