
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

const NotFound = () => {
  const location = useLocation();
  const { tPage } = useI18n();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl md:text-6xl font-bold">{tPage('title', 'notFound')}</h1>
        <h2 className="text-2xl md:text-3xl font-semibold">{tPage('heading', 'notFound')}</h2>
        <p className="text-muted-foreground">
          {tPage('message', 'notFound')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              {tPage('returnHome', 'notFound')}
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link to="/global-goods">
              <Search className="mr-2 h-4 w-4" />
              {tPage('browseCatalog', 'notFound')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
