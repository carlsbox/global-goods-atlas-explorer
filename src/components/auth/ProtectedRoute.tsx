
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'editor';
}

export function ProtectedRoute({ 
  children, 
  requiredRole 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requiredRole) {
    // Check if user has the required role
    if (
      (requiredRole === 'admin' && user.role !== 'admin') || 
      (requiredRole === 'editor' && !['admin', 'editor'].includes(user.role))
    ) {
      return <Navigate to="/admin/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}
