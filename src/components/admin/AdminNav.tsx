
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Globe, 
  FileText, 
  Image, 
  Users, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { name: 'Global Goods', icon: Globe, path: '/admin/global-goods' },
  { name: 'Use Cases', icon: FileText, path: '/admin/use-cases' },
  { name: 'Media', icon: Image, path: '/admin/media' },
  { name: 'Users', icon: Users, path: '/admin/users', adminOnly: true },
  { name: 'Settings', icon: Settings, path: '/admin/settings', adminOnly: true }
];

export function AdminNav({ className, userRole = 'admin' }: { className?: string; userRole?: string }) {
  const location = useLocation();
  
  const filteredNavItems = navItems.filter(item => 
    !item.adminOnly || userRole === 'admin'
  );

  return (
    <nav className={cn("flex space-x-2", className)}>
      {filteredNavItems.map((item) => (
        <Button
          key={item.path}
          variant={location.pathname === item.path ? "default" : "ghost"}
          size="sm"
          className="justify-start"
          asChild
        >
          <Link to={item.path} className="flex items-center">
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
