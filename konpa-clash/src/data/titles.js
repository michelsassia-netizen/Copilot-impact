// Post-match titles, keyed by score out of 6.

export function titleForScore(score) {
  if (score >= 6) {
    return {
      emoji: '👑',
      title: 'Konpa Royal',
      quip: 'Pa gen manti — ou se yon legliz konpa.',
    };
  }
  if (score === 5) {
    return {
      emoji: '🎧',
      title: 'Ekspè',
      quip: 'Prèske pafè. Ou konnen mizik ou anpil.',
    };
  }
  if (score === 4) {
    return {
      emoji: '💃',
      title: 'Bon Dansè',
      quip: 'Solid! Men gen kèk klasik pou w revize.',
    };
  }
  if (score === 3) {
    return {
      emoji: '🎶',
      title: 'Fan Regilye',
      quip: 'Nan mitan an.',
    };
  }
  if (score === 2) {
    return {
      emoji: '😅',
      title: 'Ti Touris',
      quip: 'Ou bezwen yon ti sesyon nan yon fèt konpa.',
    };
  }
  return {
    emoji: '🚨',
    title: 'Fo Ayisyen',
    quip: 'Yo pral retire kat idantite ou 😭',
  };
}
