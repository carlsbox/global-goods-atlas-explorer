
import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { AdminContentLayout } from '@/components/admin/AdminContentLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Globe, FileText, UserCheck, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <AdminLayout>
      <AdminContentLayout
        title="Dashboard"
        description={`Welcome back, ${user?.firstName || 'Admin'}`}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Global Goods"
            value="28"
            description="Total global goods"
            icon={<Globe className="h-8 w-8 text-primary" />}
          />
          <DashboardCard
            title="Use Cases"
            value="124"
            description="Implementations tracked"
            icon={<FileText className="h-8 w-8 text-primary" />}
          />
          <DashboardCard
            title="Users"
            value="43"
            description="Registered users"
            icon={<UserCheck className="h-8 w-8 text-primary" />}
          />
          <DashboardCard
            title="Last Updated"
            value="Today"
            description="Content is up to date"
            icon={<Clock className="h-8 w-8 text-primary" />}
          />
        </div>
        
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Welcome to the admin dashboard. This interface will allow you to manage
                global goods, use cases, media assets, and site settings.
              </p>
            </CardContent>
          </Card>
        </div>
      </AdminContentLayout>
    </AdminLayout>
  );
}

function DashboardCard({ 
  title, 
  value, 
  description, 
  icon 
}: { 
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
