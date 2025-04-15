import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Grid,
  List,
  Users,
  Settings,
  FileImage,
  File,
  Home,
  Menu,
  X,
  LogOut,
  User,
  BarChart2,
  Globe,
  BookOpen
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface SidebarLink {
  path: string;
  label: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const sidebarLinks: SidebarLink[] = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <Grid /> },
    { path: '/admin/global-goods', label: 'Global Goods', icon: <Globe /> },
    { path: '/admin/use-cases', label: 'Use Cases', icon: <BookOpen /> },
    { path: '/admin/media', label: 'Media Library', icon: <FileImage /> },
    { path: '/admin/users', label: 'Users', icon: <Users />, adminOnly: true },
    { path: '/admin/settings', label: 'Settings', icon: <Settings />, adminOnly: true },
  ];

  const filteredLinks = sidebarLinks.filter(
    link => !link.adminOnly || user?.role === 'admin'
  );

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const initials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`
    : user?.email?.slice(0, 2).toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <header className="border-b bg-background shadow-sm">
        <div className="flex h-16 items-center px-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="mr-2 md:hidden"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex items-center">
              <BarChart2 className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-lg">Global Goods CMS</span>
            </Link>
          </div>
          
          <div className="ml-auto flex items-center gap-2">
            <Link to="/" className="flex gap-2 items-center">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline-block">View Site</span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={user?.avatarUrl} 
                      alt={`${user?.firstName} ${user?.lastName}`} 
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user?.firstName && user?.lastName ? (
                      <p className="font-medium">{user.firstName} {user.lastName}</p>
                    ) : null}
                    {user?.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/admin/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-50 w-64 transform bg-background border-r transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-auto`}
        >
          <ScrollArea className="h-full py-4 px-3">
            <nav className="flex flex-col gap-1">
              {filteredLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </aside>
        
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};
