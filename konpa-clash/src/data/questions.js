// The 6 verified questions from the build spec (Phase 1 seed set).
// All answers verified against konpa.info / Wikipedia / Haitian Times per the
// question bank. Do not add unverified questions here.

export const VERIFIED_QUESTIONS = [
  {
    id: 'q1',
    category: 'Klasik',
    emoji: '🎵',
    difficulty: 'green',
    question: 'Kiyès yo konsidere kòm papa konpa a?',
    hint: 'Fondatè son an, 1955.',
    options: [
      'Nemours Jean-Baptiste',
      'Webert Sicot',
      'Coupé Cloué',
      'Tabou Combo',
    ],
    correctIndex: 0,
  },
  {
    id: 'q2',
    category: 'Ane',
    emoji: '📅',
    difficulty: 'yellow',
    question: 'Nan ki ane konpa dirèk te kreye?',
    hint: 'Yon dat istorik.',
    options: ['1945', '1955', '1962', '1971'],
    correctIndex: 1,
  },
  {
    id: 'q3',
    category: 'Old-School',
    emoji: '🎤',
    difficulty: 'yellow',
    question: 'Nan ki vil Carimi te fòme?',
    hint: 'Pa Ayiti…',
    options: ['Pòtoprens', 'New York City', 'Mayami', 'Monreyal'],
    correctIndex: 1,
  },
  {
    id: 'q4',
    category: 'Atis',
    emoji: '🎧',
    difficulty: 'green',
    question: "Non 'Carimi' soti nan premye lèt ki twa non?",
    hint: 'Ca-Ri-Mi.',
    options: [
      'Carl, Rico, Miki',
      'Carlo, Richard, Mickael',
      'Carlos, Rita, Max',
      'Carla, Ricky, Milo',
    ],
    correctIndex: 1,
  },
  {
    id: 'q5',
    category: 'Difisil',
    emoji: '🔴',
    difficulty: 'red',
    question: "Nan ki ane Carimi te lanse albòm 'Buzz' la?",
    hint: 'Pa konfonn ak Nasty Biznis (2004).',
    options: ['2004', '2006', '2009', '2013'],
    correctIndex: 2,
  },
  {
    id: 'q6',
    category: 'Nouvo Jenerasyon',
    emoji: '🆕',
    difficulty: 'yellow',
    question: 'Apre Carimi, ki gwoup Richard Cavé te fonde?',
    hint: 'Dènye vag la.',
    options: ['Nu Look', 'Kaï', '5lan', 'Harmonik'],
    correctIndex: 1,
  },
];

export function shuffleQuestions(questions) {
  const arr = [...questions];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
