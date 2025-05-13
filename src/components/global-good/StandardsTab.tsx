
import { GlobalGood } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClassificationBadge } from "@/components/ClassificationBadge";
import { FileText, BookOpen } from "lucide-react";

interface StandardsTabProps {
  globalGood: GlobalGood;
}

export function StandardsTab({ globalGood }: StandardsTabProps) {
  return (
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
  );
}
