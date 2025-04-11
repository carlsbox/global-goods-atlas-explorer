
import { ReactNode } from 'react';
import { MainNav } from './MainNav';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

export function PageLayout({ children, fullWidth = false }: PageLayoutProps) {
  return (
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
    </div>
  );
}
