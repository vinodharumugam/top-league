import { useState, useEffect } from 'react';
import { supabase, getProfile } from '../services/supabase';

interface AuthState {
  user: any | null;
  profile: any | null;
  loading: boolean;
  isGuest: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    isGuest: false,
  });

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user);
      } else {
        setState((s) => ({ ...s, loading: false }));
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          loadProfile(session.user);
        } else {
          setState({ user: null, profile: null, loading: false, isGuest: false });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (user: any) => {
    const { profile } = await getProfile(user.id);
    setState({
      user,
      profile,
      loading: false,
      isGuest: false,
    });
  };

  const setGuest = () => {
    setState({
      user: null,
      profile: null,
      loading: false,
      isGuest: true,
    });
  };

  const clearAuth = () => {
    setState({
      user: null,
      profile: null,
      loading: false,
      isGuest: false,
    });
  };

  return {
    ...state,
    setGuest,
    clearAuth,
    refreshProfile: () => state.user && loadProfile(state.user),
  };
}
