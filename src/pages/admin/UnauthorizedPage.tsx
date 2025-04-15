import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, ArrowLeft, Home } from 'lucide-react';

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/20 p-4">
      <div className="rounded-full bg-primary/10 p-6 mb-6">
        <Shield className="h-16 w-16 text-primary" />
      </div>
      
      <h1 className="text-4xl font-bold tracking-tight mb-2">Access Denied</h1>
      
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {user ? (
          <>
            Sorry, your account doesn't have the necessary permissions to access this page. 
            Please contact an administrator if you believe this is an error.
          </>
        ) : (
          <>
            You need to be signed in with appropriate permissions to access this page.
          </>
        )}
      </p>
      
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => navigate(-1)} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
        
        <Button onClick={() => navigate("/admin/dashboard")}>
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </div>
    </div>
  );
}
