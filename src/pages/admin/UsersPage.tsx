
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/hooks/useI18n';

const UsersPage = () => {
  const { tPage } = useI18n();

  return (
    <div className="container p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{tPage('users.title', 'admin')}</h1>
        <p className="text-muted-foreground">{tPage('users.description', 'admin')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tPage('users.management.title', 'admin')}</CardTitle>
          <CardDescription>
            {tPage('users.management.description', 'admin')}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <p className="text-center text-muted-foreground py-8">
            {tPage('users.comingSoon', 'admin')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
