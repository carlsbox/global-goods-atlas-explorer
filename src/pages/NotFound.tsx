
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export default function NotFound() {
  const { tPage } = useI18n();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-9xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
        {tPage("title", "notFound")}
      </h1>
      <h2 className="text-3xl font-semibold mb-4">
        {tPage("heading", "notFound")}
      </h2>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        {tPage("message", "notFound")}
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button asChild size="lg">
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            {tPage("returnHome", "notFound")}
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/global-goods" className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {tPage("browseCatalog", "notFound")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
