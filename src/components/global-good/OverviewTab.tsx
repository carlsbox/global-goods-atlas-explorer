
import { GlobalGood } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Users, Calendar } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

interface OverviewTabProps {
  globalGood: GlobalGood;
}

export function OverviewTab({ globalGood }: OverviewTabProps) {
  const { getText } = useI18n();

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <p className="mb-6">
            {globalGood.summary
              ? getText(globalGood.summary)
              : getText(globalGood.description)}
          </p>
          
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
  );
}
