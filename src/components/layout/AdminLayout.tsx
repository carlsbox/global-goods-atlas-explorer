
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
  FiGrid,
  FiList,
  FiUsers,
  FiSettings,
  FiImage,
  FiFile,
  FiHome,
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiBarChart2,
  FiGlobe,
  FiBookOpen
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

  // Define sidebar links with icons
  const sidebarLinks: SidebarLink[] = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <FiGrid /> },
    { path: '/admin/global-goods', label: 'Global Goods', icon: <FiGlobe /> },
    { path: '/admin/use-cases', label: 'Use Cases', icon: <FiBookOpen /> },
    { path: '/admin/media', label: 'Media Library', icon: <FiImage /> },
    { path: '/admin/users', label: 'Users', icon: <FiUsers />, adminOnly: true },
    { path: '/admin/settings', label: 'Settings', icon: <FiSettings />, adminOnly: true },
  ];
  
  // Filter links based on user role
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
      {/* Top navigation */}
      <header className="border-b bg-background shadow-sm">
        <div className="flex h-16 items-center px-4">
          {/* Mobile menu toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="mr-2 md:hidden"
          >
            {sidebarOpen ? (
              <FiX className="h-5 w-5" />
            ) : (
              <FiMenu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          {/* Logo and title */}
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex items-center">
              <FiBarChart2 className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-lg">Global Goods CMS</span>
            </Link>
          </div>
          
          {/* Right side navigation */}
          <div className="ml-auto flex items-center gap-2">
            <Link to="/" className="flex gap-2 items-center">
              <FiHome className="h-4 w-4" />
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
                    <FiUser className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <FiLogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar */}
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
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
      
      {/* Dark overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};
