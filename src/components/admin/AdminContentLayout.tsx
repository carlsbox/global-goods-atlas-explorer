
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { AdminNav } from './AdminNav';

interface AdminContentLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function AdminContentLayout({ children, title, description }: AdminContentLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <AdminNav className="md:justify-end" />
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
