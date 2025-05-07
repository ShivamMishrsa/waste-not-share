
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getCurrentUser } from '@/services/auth';

type User = {
  id: string;
  email: string;
  user_metadata: {
    name: string;
    user_type: 'restaurant' | 'charity';
  };
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isRestaurant: boolean;
  isCharity: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isRestaurant: false,
  isCharity: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser as User | null);
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUser(session?.user as unknown as User | null);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const isRestaurant = user?.user_metadata?.user_type === 'restaurant';
  const isCharity = user?.user_metadata?.user_type === 'charity';

  return (
    <AuthContext.Provider value={{ user, loading, isRestaurant, isCharity }}>
      {children}
    </AuthContext.Provider>
  );
};
