
import { Link } from "react-router-dom";
import { useI18n } from "@/hooks/useI18n";
import { getSiteName } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { CCLicenseBadge } from "@/components/CCLicenseBadge";

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
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-sm text-muted-foreground">
                &copy; {year} {siteName}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{tPage('footer.contentLicense', 'navigation') || 'Content licensed under'}</span>
                <CCLicenseBadge showIcon={true} showText={true} className="h-5" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/create-global-good" className="text-sm text-muted-foreground hover:text-primary">
              {tPage('nav.createGlobalGood', 'navigation')}
            </Link>
            <Link to="/content-license" className="text-sm text-muted-foreground hover:text-primary">
              {tPage('nav.contentLicense', 'navigation') || 'Content License'}
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
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-sm font-normal text-muted-foreground hover:text-primary"
              onClick={() => window.dispatchEvent(new CustomEvent('openCookieSettings'))}
            >
              <Settings className="h-3 w-3 mr-1" />
              {tPage('nav.cookieSettings', 'navigation') || 'Cookie Settings'}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
