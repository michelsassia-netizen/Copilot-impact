// Simulated opponents for Phase 1 (before real matchmaking in Phase 5/7).
// Names lean Haitian-diaspora to keep the vibe honest.

const NAMES = [
  'Djakout',
  'Farah',
  'Ronald',
  'Mikaelson',
  'Naïka',
  'Wideline',
  'Steevy',
  'Ralph',
  'Chrislove',
  'Jephté',
  'Sabine',
  'Kervens',
  'Roselaure',
  'Fabrice',
  'Lorencia',
  'Emmanuel',
  'Islanda',
  'Woodkid',
];

const COUNTRIES = ['🇭🇹', '🇺🇸', '🇨🇦', '🇫🇷', '🇧🇪'];

export function pickOpponent() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
  return { name, country };
}

// Weighted score so results feel like real players — mostly 3-5/6, occasionally
// a wipe or a 6. Keeps head-to-head suspense honest without being a pushover.
export function rollOpponentScore(total = 6) {
  const weights = [1, 2, 5, 8, 10, 7, 3]; // idx 0..6 out of 6
  const sum = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * sum;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return Math.min(i, total);
  }
  return Math.floor(total / 2);
}
