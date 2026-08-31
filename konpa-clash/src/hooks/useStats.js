// Reads the current player's stats + profile.
// Signed-in: from Supabase (stats + profiles + badges tables).
// Guest: from local storage.

import { useState, useEffect, useCallback } from 'react';
import { supabase, supabaseEnabled } from '../lib/supabase.js';
import { readGuestStats } from '../lib/game.js';

const EMPTY = {
  wins: 0, losses: 0, draws: 0,
  win_streak: 0, best_win_streak: 0,
  matches_played: 0, coins: 0, xp: 0,
};

export function useStats({ user, isGuest, refreshKey = 0 }) {
  const [stats, setStats] = useState(EMPTY);
  const [profile, setProfile] = useState(null);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    if (isGuest || !supabaseEnabled || !user) {
      setStats(readGuestStats());
      setProfile({ username: 'Envite', country: null });
      setBadges([]);
      setLoading(false);
      return;
    }
    const [statsRes, profileRes, badgesRes] = await Promise.all([
      supabase.from('stats').select('*').eq('user_id', user.id).maybeSingle(),
      supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
      supabase.from('badges').select('badge_key').eq('user_id', user.id),
    ]);
    setStats({ ...EMPTY, ...(statsRes.data || {}) });
    setProfile(profileRes.data || { username: user.email?.split('@')[0], country: null });
    setBadges((badgesRes.data || []).map((b) => b.badge_key));
    setLoading(false);
  }, [user, isGuest]);

  useEffect(() => { load(); }, [load, refreshKey]);

  return { stats, profile, badges, loading, reload: load };
}
