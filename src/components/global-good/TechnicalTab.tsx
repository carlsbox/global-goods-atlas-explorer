
import { GlobalGood } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Tag } from "lucide-react";

interface TechnicalTabProps {
  globalGood: GlobalGood;
}

export function TechnicalTab({ globalGood }: TechnicalTabProps) {
  return (
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
  );
}
