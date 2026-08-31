// Match-completion wrapper. Talks to Supabase when signed in (via the
// complete_match RPC), otherwise updates a local guest bag in localStorage
// so the game still works before Supabase is set up.

import { supabase, supabaseEnabled } from './supabase.js';

const GUEST_STATS_KEY = 'konpa_clash_guest_stats';

const DEFAULT_STATS = {
  wins: 0,
  losses: 0,
  draws: 0,
  win_streak: 0,
  best_win_streak: 0,
  matches_played: 0,
  coins: 0,
  xp: 0,
};

export function readGuestStats() {
  try {
    const raw = localStorage.getItem(GUEST_STATS_KEY);
    return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : { ...DEFAULT_STATS };
  } catch {
    return { ...DEFAULT_STATS };
  }
}

function writeGuestStats(stats) {
  try {
    localStorage.setItem(GUEST_STATS_KEY, JSON.stringify(stats));
  } catch {
    /* ignore */
  }
}

// The same math the RPC uses, mirrored on the client for guest mode.
// Kept in one place so signed-in and guest outcomes match.
function scoreMatch({ playerScore, opponentScore, correctCount, total }) {
  const won = playerScore > opponentScore;
  const draw = playerScore === opponentScore;
  const lost = playerScore < opponentScore;
  const coinsEarned = correctCount * 100;
  const xpEarned = correctCount * 50 + (won ? 200 : draw ? 100 : 0);
  return { won, draw, lost, coinsEarned, xpEarned };
}

function newBadges(prev, next) {
  const earned = [];
  if (next.wins >= 1 && prev.wins < 1) earned.push('first_win');
  if (next.wins >= 10 && prev.wins < 10) earned.push('ten_wins');
  if (next.wins >= 100 && prev.wins < 100) earned.push('hundred_wins');
  if (next.best_win_streak >= 5 && prev.best_win_streak < 5) earned.push('streak_5');
  if (next.best_win_streak >= 10 && prev.best_win_streak < 10) earned.push('streak_10');
  return earned;
}

/**
 * Complete a match. Awards coins/XP/W-L-D/streak, checks for badges.
 * Server-side when signed in, local-storage when guest.
 * Returns { stats, coinsEarned, xpEarned, newBadges, verdict }.
 */
export async function completeMatch({
  playerScore,
  opponentScore,
  correctCount,
  total,
  isGuest,
}) {
  const { won, draw, coinsEarned, xpEarned } = scoreMatch({
    playerScore, opponentScore, correctCount, total,
  });
  const verdict = won ? 'W' : draw ? 'D' : 'L';

  // ----- Signed-in path: RPC -----
  if (!isGuest && supabaseEnabled) {
    const { data, error } = await supabase.rpc('complete_match', {
      p_player_score: playerScore,
      p_opponent_score: opponentScore,
      p_correct_count: correctCount,
      p_total: total,
    });
    if (error) throw error;
    // RPC returns a single row with stats after update + new badges array
    const row = Array.isArray(data) ? data[0] : data;
    return {
      stats: {
        wins: row.wins,
        losses: row.losses,
        draws: row.draws,
        win_streak: row.win_streak,
        best_win_streak: row.best_win_streak,
        matches_played: row.matches_played,
        coins: row.coins,
        xp: row.xp,
      },
      coinsEarned,
      xpEarned,
      newBadges: row.new_badges || [],
      verdict,
    };
  }

  // ----- Guest path: local storage -----
  const prev = readGuestStats();
  const nextStreak = won ? prev.win_streak + 1 : 0;
  const nextStats = {
    wins: prev.wins + (won ? 1 : 0),
    losses: prev.losses + (won ? 0 : (draw ? 0 : 1)),
    draws: prev.draws + (draw ? 1 : 0),
    win_streak: nextStreak,
    best_win_streak: Math.max(prev.best_win_streak, nextStreak),
    matches_played: prev.matches_played + 1,
    coins: prev.coins + coinsEarned,
    xp: prev.xp + xpEarned,
  };
  writeGuestStats(nextStats);
  return {
    stats: nextStats,
    coinsEarned,
    xpEarned,
    newBadges: newBadges(prev, nextStats),
    verdict,
  };
}
