// The 6 verified questions from the spec (Phase 1 seed set).
// Verified against konpa.info / Wikipedia / Haitian Times per the bank.
// Never seed unverified questions here.

export const VERIFIED_QUESTIONS = [
  {
    id: 'q1',
    category: 'Klasik',
    question: 'Kiyès yo konsidere kòm papa konpa a?',
    hint: 'Fondatè son an, 1955.',
    options: ['Nemours Jean-Baptiste', 'Webert Sicot', 'Coupé Cloué', 'Tabou Combo'],
    correctIndex: 0,
  },
  {
    id: 'q2',
    category: 'Ane',
    question: 'Nan ki ane konpa dirèk te kreye?',
    hint: 'Yon dat istorik.',
    options: ['1945', '1955', '1962', '1971'],
    correctIndex: 1,
  },
  {
    id: 'q3',
    category: 'Old-School',
    question: 'Nan ki vil Carimi te fòme?',
    hint: 'Pa Ayiti…',
    options: ['Pòtoprens', 'New York City', 'Mayami', 'Monreyal'],
    correctIndex: 1,
  },
  {
    id: 'q4',
    category: 'Atis',
    question: "Non 'Carimi' soti nan premye lèt ki twa non?",
    hint: 'Ca-Ri-Mi.',
    options: ['Carl, Rico, Miki', 'Carlo, Richard, Mickael', 'Carlos, Rita, Max', 'Carla, Ricky, Milo'],
    correctIndex: 1,
  },
  {
    id: 'q5',
    category: 'Difisil',
    question: "Nan ki ane Carimi te lanse albòm 'Buzz' la?",
    hint: 'Pa konfonn ak Nasty Biznis (2004).',
    options: ['2004', '2006', '2009', '2013'],
    correctIndex: 2,
  },
  {
    id: 'q6',
    category: 'Nouvo Jenerasyon',
    question: 'Apre Carimi, ki gwoup Richard Cavé te fonde?',
    hint: 'Dènye vag la.',
    options: ['Nu Look', 'Kaï', '5lan', 'Harmonik'],
    correctIndex: 1,
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build a 10-question match from the 6 verified questions by shuffling and
// looping. Consecutive appearances of the same question are avoided so it
// doesn't feel repetitive.
export function buildMatchQuestions(count = 10) {
  const pool = shuffle(VERIFIED_QUESTIONS);
  const out = [];
  let lastId = null;
  let idx = 0;
  while (out.length < count) {
    let candidate = pool[idx % pool.length];
    if (candidate.id === lastId) {
      candidate = pool[(idx + 1) % pool.length];
      idx += 1;
    }
    out.push({ ...candidate, id: `${candidate.id}-${out.length}` });
    lastId = candidate.id.split('-')[0];
    idx += 1;
    if (idx % pool.length === 0) {
      // reshuffle each full pass so the second/third loops feel fresh
      pool.push(...shuffle(pool.splice(0, pool.length)));
    }
  }
  return out;
}
