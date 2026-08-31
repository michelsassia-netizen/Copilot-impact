// Auth hook — resolves the current Supabase session, exposes sign-in
// (magic link) and sign-out. Works safely when Supabase isn't configured.

import { useState, useEffect, useCallback } from 'react';
import { supabase, supabaseEnabled } from '../lib/supabase.js';

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabaseEnabled) {
      setLoading(false);
      return;
    }
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (mounted) setSession(s);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = useCallback(async (email) => {
    if (!supabaseEnabled) throw new Error('Supabase pa konfigire.');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    if (!supabaseEnabled) return;
    await supabase.auth.signOut();
  }, []);

  return {
    session,
    user: session?.user ?? null,
    loading,
    signInWithEmail,
    signOut,
    enabled: supabaseEnabled,
  };
}
