
import { GlobalGoodFlat } from "@/lib/types/globalGoodFlat";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Users, Calendar, Building } from "lucide-react";

interface OverviewTabFlatProps {
  globalGood: GlobalGoodFlat;
}

export function OverviewTabFlat({ globalGood }: OverviewTabFlatProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <p className="mb-6">
            {globalGood.ProductOverview?.Summary || globalGood.ProductOverview?.Description}
          </p>
          
          {globalGood.ProductOverview?.PrimaryFunctionality && (
            <>
              <h4 className="text-lg font-semibold mb-2">Primary Functionality</h4>
              <p className="mb-6">{globalGood.ProductOverview.PrimaryFunctionality}</p>
            </>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
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
