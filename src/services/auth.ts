
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export type UserCredentials = {
  email: string;
  password: string;
};

export type UserRegistration = UserCredentials & {
  name: string;
  userType: 'restaurant' | 'charity';
};

export const signIn = async ({ email, password }: UserCredentials) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      toast.error("Sign In Failed", {
        description: error.message,
      });
      return { user: null, error: error.message };
    }
    
    toast.success("Signed In", {
      description: "Welcome back!",
    });
    
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    toast.error("Sign In Failed", {
      description: "An unexpected error occurred",
    });
    return { user: null, error: "An unexpected error occurred" };
  }
};

export const signUp = async ({ email, password, name, userType }: UserRegistration) => {
  try {
    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          user_type: userType,
        },
      },
    });

    if (error) {
      toast.error("Registration Failed", {
        description: error.message,
      });
      return { user: null, error: error.message };
    }
    
    toast.success("Registration Successful", {
      description: "Welcome to Waste Not, Share!",
    });
    
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    toast.error("Registration Failed", {
      description: "An unexpected error occurred",
    });
    return { user: null, error: "An unexpected error occurred" };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error("Sign Out Failed", {
        description: error.message,
      });
      return { error: error.message };
    }
    
    toast.success("Signed Out", {
      description: "You have been signed out successfully",
    });
    
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    toast.error("Sign Out Failed", {
      description: "An unexpected error occurred",
    });
    return { error: "An unexpected error occurred" };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Get user error:', error);
      return null;
    }
    
    return data.user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};
