
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Menu,
  X,
  Home,
  MapPin,
  Grid3X3,
  FileText,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Global Goods', path: '/global-goods', icon: Grid3X3 },
  { name: 'Use Cases', path: '/use-cases', icon: FileText },
  { name: 'Map', path: '/map', icon: MapPin },
  { name: 'About', path: '/about', icon: Info },
];

export function MainNav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Global Goods Atlas</span>
        </NavLink>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            className={({ isActive }) => cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      {/* Mobile Navigation */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col space-y-4 mt-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center py-2 text-base font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
