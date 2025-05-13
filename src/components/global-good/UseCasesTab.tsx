
import { GlobalGood } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useI18n } from "@/hooks/useI18n";

interface UseCasesTabProps {
  globalGood: GlobalGood;
}

export function UseCasesTab({ globalGood }: UseCasesTabProps) {
  const { getText } = useI18n();
  const goodName = getText(globalGood.name);

  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-muted-foreground mb-4">
          Visit the Use Cases page to explore real-world implementations of {goodName}.
        </p>
        <Button asChild>
          <Link to={`/use-cases?globalGood=${globalGood.id}`}>
            View Use Cases
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
