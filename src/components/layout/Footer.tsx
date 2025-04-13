
import { Link } from "react-router-dom";
import { useContentLoader } from "@/hooks/useContentLoader";
import { getSiteName } from "@/lib/config";

export function Footer() {
  const { content } = useContentLoader('pages/navigation');
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
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              {content ? content['nav.privacy'] : 'Privacy Policy'}
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
              {content ? content['nav.terms'] : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
