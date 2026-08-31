// Post-match titles keyed by score fraction (score/total).

export function titleForScore(score, total = 10) {
  const pct = score / total;
  if (pct >= 1) return { emoji: '👑', title: 'Konpa Royal', quip: 'Pa gen manti — ou se yon legliz konpa.' };
  if (pct >= 0.83) return { emoji: '🎧', title: 'Ekspè', quip: 'Prèske pafè. Ou konnen mizik ou anpil.' };
  if (pct >= 0.66) return { emoji: '💃', title: 'Bon Dansè', quip: 'Solid! Men gen kèk klasik pou w revize.' };
  if (pct >= 0.5) return { emoji: '🎶', title: 'Fan Regilye', quip: 'Nan mitan an.' };
  if (pct >= 0.33) return { emoji: '😅', title: 'Ti Touris', quip: 'Ou bezwen yon ti sesyon nan yon fèt konpa.' };
  return { emoji: '🚨', title: 'Fo Ayisyen', quip: 'Yo pral retire kat idantite ou 😭' };
}
