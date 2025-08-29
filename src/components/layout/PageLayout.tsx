
import { Outlet, useLocation } from 'react-router-dom';
import { MainNav } from './MainNav';
import { Footer } from './Footer';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CookieConsent } from '@/components/CookieConsent';

export function PageLayout() {
  const location = useLocation();
  const isClimateHealthPage = location.pathname === '/climate-health';
  
  return (
    <TooltipProvider>
      <div className={`min-h-screen flex flex-col ${isClimateHealthPage ? 'climate-theme' : ''}`}>
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container">
            <MainNav />
          </div>
        </header>
        
        <main className="flex-1">
          <Outlet />
        </main>
        
        <Footer />
        <CookieConsent />
        <Toaster />
        <Sonner />
      </div>
    </TooltipProvider>
  );
}
