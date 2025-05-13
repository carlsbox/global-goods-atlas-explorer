
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Package, FileText, Settings, Users, List, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white p-4">
        <div className="mb-6">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        
        <nav className="space-y-1">
          <NavLink to="/admin" end className={({ isActive }) => 
            cn("flex items-center px-3 py-2 rounded-md transition-colors", 
              isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
            )
          }>
            <Home className="mr-3 h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
          
          <div className="pt-4">
            <p className="px-3 pb-1 text-xs font-semibold text-slate-400 uppercase">Content</p>
            <NavLink to="/admin/global-goods" className={({ isActive }) => 
              cn("flex items-center px-3 py-2 rounded-md transition-colors", 
                isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
              )
            }>
              <Package className="mr-3 h-5 w-5" />
              <span>Global Goods</span>
            </NavLink>
            
            <NavLink to="/admin/global-goods/classifications" className={({ isActive }) => 
              cn("flex items-center px-3 py-2 rounded-md transition-colors", 
                isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
              )
            }>
              <List className="mr-3 h-5 w-5" />
              <span>Classifications</span>
            </NavLink>
            
            <NavLink to="/admin/use-cases" className={({ isActive }) => 
              cn("flex items-center px-3 py-2 rounded-md transition-colors", 
                isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
              )
            }>
              <FileText className="mr-3 h-5 w-5" />
              <span>Use Cases</span>
            </NavLink>
          </div>
          
          <div className="pt-4">
            <p className="px-3 pb-1 text-xs font-semibold text-slate-400 uppercase">Administration</p>
            <NavLink to="/admin/users" className={({ isActive }) => 
              cn("flex items-center px-3 py-2 rounded-md transition-colors", 
                isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
              )
            }>
              <Users className="mr-3 h-5 w-5" />
              <span>Users</span>
            </NavLink>
            
            <NavLink to="/admin/settings" className={({ isActive }) => 
              cn("flex items-center px-3 py-2 rounded-md transition-colors", 
                isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
              )
            }>
              <Settings className="mr-3 h-5 w-5" />
              <span>Settings</span>
            </NavLink>

            <NavLink to="/admin/tools" className={({ isActive }) => 
              cn("flex items-center px-3 py-2 rounded-md transition-colors", 
                isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
              )
            }>
              <Wrench className="mr-3 h-5 w-5" />
              <span>Tools</span>
            </NavLink>
          </div>
        </nav>
        
        <div className="absolute bottom-4 w-48">
          <Button variant="outline" className="w-full text-slate-100 hover:text-white border-slate-600" asChild>
            <NavLink to="/">Back to Site</NavLink>
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-900">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
