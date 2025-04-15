
import { useState, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { 
  Home, Settings, Users, Globe, FileText, 
  LayoutDashboard, LogOut, Menu, X, ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSiteName } from "@/lib/config";
import { cn } from "@/lib/utils";
import AdminLanguageSwitcher from "./AdminLanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  children?: { label: string; href: string }[];
  adminOnly?: boolean;
}

function NavItem({ icon: Icon, label, href, isActive, children, adminOnly = false }: NavItemProps) {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("cms_user") || "{}");
  const isAdmin = user.role === "admin";
  
  // If this is an admin-only item and user is not admin, don't render it
  if (adminOnly && !isAdmin) {
    return null;
  }

  if (children) {
    return (
      <Collapsible 
        open={open} 
        onOpenChange={setOpen}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 px-3",
              isActive && "bg-accent text-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="flex-1 text-left">{label}</span>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              open && "rotate-180"
            )} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-8 pt-1">
          <div className="flex flex-col gap-1">
            {children.map((item) => (
              <Link 
                key={item.href} 
                to={item.href}
                className="text-sm py-1.5 px-3 rounded-md hover:bg-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2",
        isActive && "bg-accent text-accent-foreground"
      )}
      asChild
    >
      <Link to={href}>
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </Link>
    </Button>
  );
}

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const siteName = getSiteName();
  
  const [user, setUser] = useState<{ email: string; role: string; name: string } | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("cms_user");
    if (!userStr) {
      navigate("/admin/login");
      return;
    }
    
    try {
      const userData = JSON.parse(userStr);
      setUser(userData);
    } catch (error) {
      console.error("Failed to parse user data", error);
      navigate("/admin/login");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("cms_user");
    navigate("/admin/login");
  };

  if (!user) {
    return null; // Don't render anything until we check auth
  }

  const currentPath = window.location.pathname;
  
  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex md:w-64 border-r bg-background flex-col h-screen">
        <div className="p-4 border-b">
          <Link to="/admin" className="font-semibold text-xl flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary" />
            <span>{siteName} CMS</span>
          </Link>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            <NavItem 
              icon={LayoutDashboard} 
              label="Dashboard" 
              href="/admin" 
              isActive={currentPath === "/admin"} 
            />
            <NavItem 
              icon={Globe} 
              label="Global Goods" 
              href="/admin/global-goods" 
              isActive={currentPath.startsWith("/admin/global-goods")}
              children={[
                { label: "All Global Goods", href: "/admin/global-goods" },
                { label: "Add New", href: "/admin/global-goods/new" },
                { label: "Categories", href: "/admin/global-goods/categories" },
              ]} 
            />
            <NavItem 
              icon={FileText} 
              label="Use Cases" 
              href="/admin/use-cases"
              isActive={currentPath.startsWith("/admin/use-cases")}
              children={[
                { label: "All Use Cases", href: "/admin/use-cases" },
                { label: "Add New", href: "/admin/use-cases/new" },
              ]} 
            />
            <NavItem 
              icon={Users} 
              label="Users" 
              href="/admin/users" 
              isActive={currentPath.startsWith("/admin/users")}
              adminOnly
            />
            <NavItem 
              icon={Settings} 
              label="Site Settings" 
              href="/admin/settings" 
              isActive={currentPath.startsWith("/admin/settings")}
              adminOnly
            />
            <NavItem 
              icon={Home} 
              label="View Site" 
              href="/" 
            />
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <AdminLanguageSwitcher />
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 border-b bg-background z-30 px-4 flex items-center justify-between">
        <Link to="/admin" className="font-semibold text-lg flex items-center space-x-2">
          <Globe className="h-5 w-5 text-primary" />
          <span>{siteName}</span>
        </Link>
        
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-20 pt-14">
          <ScrollArea className="h-[calc(100vh-3.5rem)]">
            <div className="p-3 space-y-1">
              <NavItem 
                icon={LayoutDashboard} 
                label="Dashboard" 
                href="/admin" 
                isActive={currentPath === "/admin"} 
              />
              <NavItem 
                icon={Globe} 
                label="Global Goods" 
                href="/admin/global-goods" 
                isActive={currentPath.startsWith("/admin/global-goods")}
                children={[
                  { label: "All Global Goods", href: "/admin/global-goods" },
                  { label: "Add New", href: "/admin/global-goods/new" },
                  { label: "Categories", href: "/admin/global-goods/categories" },
                ]} 
              />
              <NavItem 
                icon={FileText} 
                label="Use Cases" 
                href="/admin/use-cases"
                isActive={currentPath.startsWith("/admin/use-cases")}
                children={[
                  { label: "All Use Cases", href: "/admin/use-cases" },
                  { label: "Add New", href: "/admin/use-cases/new" },
                ]} 
              />
              <NavItem 
                icon={Users} 
                label="Users" 
                href="/admin/users" 
                isActive={currentPath.startsWith("/admin/users")}
                adminOnly
              />
              <NavItem 
                icon={Settings} 
                label="Settings" 
                href="/admin/settings" 
                isActive={currentPath.startsWith("/admin/settings")}
                adminOnly
              />
              <NavItem 
                icon={Home} 
                label="View Site" 
                href="/" 
              />
              <Separator className="my-2" />
              <div className="p-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <AdminLanguageSwitcher />
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
      
      {/* Main content */}
      <main className="flex-1 md:ml-0 mt-14 md:mt-0 overflow-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
