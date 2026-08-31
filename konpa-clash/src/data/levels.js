// Level ladder with Kreyòl titles. XP is cumulative.
// Sourced from the v2 spec: "Debitan → Amatè Konpa → …"

export const LEVELS = [
  { n: 1, title: 'Debitan',       min: 0     },
  { n: 2, title: 'Ti Fanatik',    min: 200   },
  { n: 3, title: 'Fanatik',       min: 500   },
  { n: 4, title: 'Amatè Konpa',   min: 1000  },
  { n: 5, title: 'Ekspè',         min: 2000  },
  { n: 6, title: 'Mèt Konpa',     min: 4000  },
  { n: 7, title: 'Legliz Konpa',  min: 8000  },
];

export function levelFromXp(xp) {
  let current = LEVELS[0];
  let next = LEVELS[1] ?? LEVELS[0];
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].min) {
      current = LEVELS[i];
      next = LEVELS[i + 1] ?? LEVELS[i];
    }
  }
  const isMax = current.n === LEVELS[LEVELS.length - 1].n;
  const span = isMax ? 1 : (next.min - current.min);
  const into = Math.min(xp - current.min, span);
  return {
    level: current.n,
    title: current.title,
    currentMin: current.min,
    nextMin: next.min,
    into,
    span,
    isMax,
    // Handy for the mockup's "320 / 600 XP" label
    label: isMax ? `${xp} XP · MAX` : `${xp - current.min} / ${next.min - current.min} XP`,
  };
}

// Per spec: "5-Win Streak, 10-Win Streak, First Win, 10 Wins, 100 Wins,
// Giant Slayer, Daily Challenge Champ, Diaspora Champion"
export const BADGE_META = {
  first_win:      { emoji: '🥇', label: 'Premye Viktwa' },
  ten_wins:       { emoji: '🔟', label: '10 Viktwa' },
  hundred_wins:   { emoji: '💯', label: '100 Viktwa' },
  streak_5:       { emoji: '🔥', label: 'Streak 5' },
  streak_10:      { emoji: '⚡', label: 'Streak 10' },
  giant_slayer:   { emoji: '🐉', label: 'Giant Slayer' },
  daily_champ:    { emoji: '📅', label: 'Chanpyon Jou a' },
  diaspora_champ: { emoji: '🌍', label: 'Chanpyon Diaspora' },
};
