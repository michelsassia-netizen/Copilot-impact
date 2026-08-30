// Simulated opponents for Phase 1 (before real matchmaking in Phase 5/7).

const NAMES = [
  'Djakout', 'Farah', 'Ronald', 'Mikaelson', 'Naïka', 'Wideline',
  'Steevy', 'Ralph', 'Chrislove', 'Jephté', 'Sabine', 'Kervens',
  'Roselaure', 'Fabrice', 'Lorencia', 'Emmanuel', 'Islanda', 'Woodkid',
];

const COUNTRIES = ['🇭🇹', '🇺🇸', '🇨🇦', '🇫🇷', '🇧🇪'];

export function pickOpponent() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
  return { name, country };
}

// Weighted so most matches feel close (5–7/10), with occasional wipes and
// occasional 10s. Keeps head-to-head suspense honest.
export function rollOpponentScore(total = 10) {
  // Weights over 0..total. Peaks around 5–7 for a 10-question match.
  const weights = [1, 1, 2, 4, 6, 8, 9, 7, 4, 2, 1];
  const capped = weights.slice(0, total + 1);
  const sum = capped.reduce((a, b) => a + b, 0);
  let r = Math.random() * sum;
  for (let i = 0; i < capped.length; i++) {
    r -= capped[i];
    if (r <= 0) return i;
  }
  return Math.floor(total / 2);
}
