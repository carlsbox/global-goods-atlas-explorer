
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Menu,
  Home,
  MapPin,
  Grid3X3,
  FileText,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

const navItems = [
  { name: 'Home', path: '/', icon: Home, translationKey: 'nav.home' },
  { name: 'Global Goods', path: '/global-goods', icon: Grid3X3, translationKey: 'nav.globalGoods' },
  { name: 'Use Cases', path: '/use-cases', icon: FileText, translationKey: 'nav.useCases' },
  { name: 'Map', path: '/map', icon: MapPin, translationKey: 'nav.map' },
  { name: 'About', path: '/about', icon: Info, translationKey: 'nav.about' },
];

export function MainNav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { t } = useLanguage();

  // Fallback translations for navigation
  const translations = {
    en: {
      'nav.home': 'Home',
      'nav.globalGoods': 'Global Goods',
      'nav.useCases': 'Use Cases',
      'nav.map': 'Map',
      'nav.about': 'About'
    },
    fr: {
      'nav.home': 'Accueil',
      'nav.globalGoods': 'Biens Mondiaux',
      'nav.useCases': 'Cas d\'Utilisation',
      'nav.map': 'Carte',
      'nav.about': 'À Propos'
    },
    es: {
      'nav.home': 'Inicio',
      'nav.globalGoods': 'Bienes Globales',
      'nav.useCases': 'Casos de Uso',
      'nav.map': 'Mapa',
      'nav.about': 'Acerca de'
    }
  };
  
  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Global Goods Atlas</span>
        </NavLink>
      </div>
      
      {/* Desktop Navigation */}
      <div className="flex items-center">
        <nav className="hidden md:flex space-x-8 mr-4">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              className={({ isActive }) => cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {t(item.translationKey) || item.name}
            </NavLink>
          ))}
        </nav>
        
        {/* Language selector */}
        <LanguageSelector />
      </div>
      
      {/* Mobile Navigation */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <div className="flex justify-end mb-4">
            <LanguageSelector />
          </div>
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
                {t(item.translationKey) || item.name}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
