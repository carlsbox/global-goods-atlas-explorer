
import { Outlet } from 'react-router-dom';
import { MainNav } from './MainNav';
import { Footer } from './Footer';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export function PageLayout() {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-background">
          <div className="container">
            <MainNav />
          </div>
        </header>
        
        <main className="flex-1">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
        
        <Footer />
        <Toaster />
        <Sonner />
      </div>
    </TooltipProvider>
  );
}
