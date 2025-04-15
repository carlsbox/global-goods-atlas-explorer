// Using mock authentication for development without Supabase
import { User } from './types';

// Mock values for development without actual Supabase connection
const MOCK_USER: User = {
  id: 'mock-user-id',
  email: 'admin@example.com',
  role: 'admin',
  firstName: 'Admin',
  lastName: 'User',
  avatarUrl: null,
  lastLogin: new Date().toISOString(),
};

// Create a mock Supabase client with dummy auth methods
const createMockClient = () => {
  console.log('Using mock Supabase client for development');
  
  return {
    auth: {
      signInWithPassword: async () => ({
        data: {
          user: MOCK_USER,
          session: { access_token: 'mock-token' }
        },
        error: null
      }),
      signInWithOAuth: async () => ({
        data: {},
        error: null
      }),
      signOut: async () => ({ error: null }),
      getUser: async () => ({
        data: { user: MOCK_USER },
        error: null
      }),
      getSession: async () => ({
        data: {
          session: {
            access_token: 'mock-token',
            user: MOCK_USER
          }
        },
        error: null
      }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } }
      })
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => {
            if (table === 'profiles') {
              return {
                data: {
                  role: 'admin',
                  first_name: 'Admin',
                  last_name: 'User',
                  avatar_url: null
                },
                error: null
              };
            }
            return { data: null, error: null };
          }
        })
      }),
      update: () => ({
        eq: async () => ({ error: null })
      })
    })
  };
};

// Try to create a real Supabase client if env vars are available,
// otherwise fall back to the mock client
let supabase: any;
let usingMockClient = false;

try {
  // Check if Supabase URL and anon key are available
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (supabaseUrl && supabaseAnonKey) {
    // If environment variables are available, import and use the real Supabase client
    const { createClient } = await import('@supabase/supabase-js');
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Using real Supabase client');
  } else {
    // If environment variables are not available, use mock client
    supabase = createMockClient();
    usingMockClient = true;
  }
} catch (error) {
  console.warn('Error initializing Supabase client, using mock instead:', error);
  // Fallback to mock client if there's an error
  supabase = createMockClient();
  usingMockClient = true;
}

export { supabase, usingMockClient };

// Authentication helper functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user, error };
};

export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data?.session, error };
};
