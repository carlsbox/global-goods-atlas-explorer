
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Classification {
  code: string;
  title: string;
  group_code: string;
  group_name: string;
  authority: string;
}

interface GroupedClassificationsProps {
  classifications: Classification[];
  title: string;
}

export function GroupedClassifications({ classifications, title }: GroupedClassificationsProps) {
  // Group classifications by group_name
  const grouped = classifications.reduce((acc, classification) => {
    const groupKey = classification.group_name;
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(classification);
    return acc;
  }, {} as Record<string, Classification[]>);

  if (classifications.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(grouped).map(([groupName, groupClassifications]) => (
          <div key={groupName} className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {groupClassifications[0].group_code}
              </Badge>
              <h4 className="text-sm font-medium text-muted-foreground">{groupName}</h4>
            </div>
            <div className="space-y-2 ml-4">
              {groupClassifications.map((classification, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-md bg-muted/30">
                  <Badge variant="outline" className="text-xs shrink-0">
                    {classification.code}
                  </Badge>
                  <span className="text-sm">{classification.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
