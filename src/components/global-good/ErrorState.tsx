
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function ErrorState() {
  return (
    <div className="text-center py-24">
      <h2 className="text-2xl font-bold mb-4">Global Good Not Found</h2>
      <p className="text-muted-foreground mb-6">
        The global good you're looking for doesn't exist or couldn't be loaded.
      </p>
      <Button asChild>
        <Link to="/global-goods">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Catalog
        </Link>
      </Button>
    </div>
  );
}
