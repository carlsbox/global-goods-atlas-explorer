
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState } from '@/lib/types';
import { supabase, getCurrentUser, getCurrentSession } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  getUserRole: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  const { toast } = useToast();

  useEffect(() => {
    const fetchInitialSession = async () => {
      try {
        // Check for existing session
        const { session, error: sessionError } = await getCurrentSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (session) {
          const { user, error: userError } = await getCurrentUser();
          
          if (userError) {
            throw userError;
          }

          // Fetch additional user data from profiles table
          const { data: profileData } = await supabase
            .from('profiles')
            .select('role, first_name, last_name, avatar_url')
            .eq('id', user?.id)
            .single();
          
          const extendedUser: User = {
            id: user?.id || '',
            email: user?.email || '',
            role: profileData?.role || 'editor',
            firstName: profileData?.first_name,
            lastName: profileData?.last_name,
            avatarUrl: profileData?.avatar_url,
            lastLogin: new Date().toISOString(),
          };

          setAuthState({
            user: extendedUser,
            session,
            loading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            session: null,
            loading: false,
            error: null,
          });
        }
      } catch (error: any) {
        console.error('Auth initialization error:', error);
        setAuthState({
          user: null,
          session: null,
          loading: false,
          error: error.message,
        });
      }
    };

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (event === 'SIGNED_IN' && newSession) {
          // Update user in state
          const { user } = await getCurrentUser();
          
          // Fetch user profile data
          const { data: profileData } = await supabase
            .from('profiles')
            .select('role, first_name, last_name, avatar_url')
            .eq('id', user?.id)
            .single();
          
          const extendedUser: User = {
            id: user?.id || '',
            email: user?.email || '',
            role: profileData?.role || 'editor',
            firstName: profileData?.first_name,
            lastName: profileData?.last_name,
            avatarUrl: profileData?.avatar_url,
            lastLogin: new Date().toISOString(),
          };
          
          // Update the profile with last login
          await supabase
            .from('profiles')
            .update({ last_login: new Date().toISOString() })
            .eq('id', user?.id);

          setAuthState({
            user: extendedUser,
            session: newSession,
            loading: false,
            error: null,
          });

          toast({
            title: "Signed in",
            description: `Welcome back, ${extendedUser.firstName || extendedUser.email}!`,
          });
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            session: null,
            loading: false,
            error: null,
          });
          toast({
            title: "Signed out",
            description: "You have been signed out successfully.",
          });
        }
      }
    );

    // Initialize auth state
    fetchInitialSession();

    // Cleanup subscription
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    setAuthState({ ...authState, loading: true, error: null });
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.message,
      });
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message,
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin/dashboard`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google sign in failed",
        description: error.message,
      });
    }
  };

  const signOut = async () => {
    setAuthState({ ...authState, loading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.message,
      });
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: error.message,
      });
    }
  };

  const getUserRole = async (): Promise<string | null> => {
    if (!authState.user) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authState.user.id)
        .single();
      
      if (error) throw error;
      return data?.role || null;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signIn,
        signInWithGoogle,
        signOut,
        getUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
