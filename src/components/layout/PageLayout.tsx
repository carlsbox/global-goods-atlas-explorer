
import { ReactNode } from 'react';
import { MainNav } from './MainNav';
import { Footer } from './Footer';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

interface PageLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

export function PageLayout({ children, fullWidth = false }: PageLayoutProps) {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-background">
          <div className="container">
            <MainNav />
          </div>
        </header>
        
        <main className="flex-1">
          <div className={fullWidth ? "w-full" : "container py-8"}>
            {children}
          </div>
        </main>
        
        <Footer />
        <Toaster />
        <Sonner />
      </div>
    </TooltipProvider>
  );
}
