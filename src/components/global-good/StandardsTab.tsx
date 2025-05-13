
import { useState, useEffect } from "react";
import { GlobalGood } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClassificationBadge } from "@/components/ClassificationBadge";
import { FileText, BookOpen, Info } from "lucide-react";

interface StandardsTabProps {
  globalGood: GlobalGood;
}

interface Standard {
  code: string;
  name: string;
  description: string;
  domain: string;
  type: string;
  link?: string;
}

export function StandardsTab({ globalGood }: StandardsTabProps) {
  const [standards, setStandards] = useState<Standard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStandards() {
      try {
        const standardsModule = await import("@/data/standards/standards.json");
        const allStandards = standardsModule.default;
        
        if (globalGood.healthStandards && globalGood.healthStandards.length > 0) {
          const filteredStandards = allStandards.filter((standard: Standard) => 
            globalGood.healthStandards?.includes(standard.code)
          );
          setStandards(filteredStandards);
        }
      } catch (error) {
        console.error("Error loading standards data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchStandards();
  }, [globalGood.healthStandards]);

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
              
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading standards...</p>
              ) : (
                <div className="space-y-4">
                  {standards.map((standard) => (
                    <div key={standard.code} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-medium">
                            {standard.code}
                          </Badge>
                          <h4 className="font-medium">{standard.name}</h4>
                        </div>
                        <Badge variant="secondary">{standard.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{standard.description}</p>
                      {standard.link && (
                        <a 
                          href={standard.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline mt-2 flex items-center"
                        >
                          <Info className="h-3 w-3 mr-1" />
                          Learn more
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
