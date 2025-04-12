
import { NavLink } from 'react-router-dom';

export function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Global Goods Atlas</h3>
            <p className="text-muted-foreground max-w-md">
              Exploring and cataloging digital global goods that help solve global challenges in health, education, and beyond.
            </p>
          </div>
          
          <div>
            <h4 className="text-base font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <NavLink to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </NavLink>
              <NavLink to="/global-goods" className="text-muted-foreground hover:text-primary transition-colors">
                Global Goods
              </NavLink>
              <NavLink to="/use-cases" className="text-muted-foreground hover:text-primary transition-colors">
                Use Cases
              </NavLink>
              <NavLink to="/map" className="text-muted-foreground hover:text-primary transition-colors">
                Map
              </NavLink>
            </nav>
          </div>
          
          <div>
            <h4 className="text-base font-semibold mb-4">About</h4>
            <nav className="flex flex-col space-y-2">
              <NavLink to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </NavLink>
              <NavLink to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </NavLink>
            </nav>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {year} Global Goods Atlas. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary">
              Terms
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
