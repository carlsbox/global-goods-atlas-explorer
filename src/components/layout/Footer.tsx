
import { Link } from "react-router-dom";
import { useI18n } from "@/hooks/useI18n";
import { getSiteName } from "@/lib/config";

export function Footer() {
  const { tPage } = useI18n();
  const siteName = getSiteName();
  
  const year = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">{siteName}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              &copy; {year} {siteName}. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/create-global-good" className="text-sm text-muted-foreground hover:text-primary">
              {tPage('nav.createGlobalGood', 'navigation')}
            </Link>
            <a 
              href="https://www.path.org/privacy-notice/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              {tPage('nav.privacy', 'navigation')}
            </a>
            <a 
              href="https://www.path.org/terms-use/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              {tPage('nav.terms', 'navigation')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
