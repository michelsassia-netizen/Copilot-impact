// End-of-match summary (light cream) — shown after the last KONTINYE.
// Head-to-head vs simulated opponent, emoji grid, and Rejwe.

import { titleForScore } from '../data/titles.js';
import { SponsorBand } from './SponsorBand.jsx';

export function ResultScreen({
  playerScore,
  opponent,
  opponentScore,
  total,
  results,
  totalPwen,
  onReplay,
}) {
  const t = titleForScore(playerScore, total);

  let verdictClass = 'draw';
  let verdictText = `Egalite 🤝 — ${playerScore}-${opponentScore}`;
  if (playerScore > opponentScore) {
    verdictClass = 'win';
    verdictText = 'Ou genyen! 🏆';
  } else if (playerScore < opponentScore) {
    verdictClass = 'lose';
    verdictText = `${opponent.name} genyen 😤`;
  }

  const emoji = results.map((r) => (r ? '🟨' : '⬛')).join('');

  return (
    <div className="app surface-light">
      <div className="final">
        <div style={{ fontSize: 44 }} aria-hidden="true">{t.emoji}</div>
        <h1 className="final-title">{t.title}</h1>
        <div className="final-quip">{t.quip}</div>

        <div className="final-score">
          <div className={`final-side${playerScore > opponentScore ? ' win' : ''}`}>
            <div className="who">Ou 🇭🇹</div>
            <div className="val">{playerScore}<span style={{ fontSize: 18, opacity: 0.5 }}>/{total}</span></div>
          </div>
          <div className="final-versus">vs</div>
          <div className={`final-side${opponentScore > playerScore ? ' win' : ''}`}>
            <div className="who">{opponent.name} {opponent.country}</div>
            <div className="val">{opponentScore}<span style={{ fontSize: 18, opacity: 0.5 }}>/{total}</span></div>
          </div>
        </div>

        <div className={`final-verdict ${verdictClass}`}>{verdictText}</div>

        <div className="final-emoji" aria-label={`Rezilta: ${playerScore} sou ${total}`}>{emoji}</div>

        <div className="reward-stats" style={{ marginBottom: 20 }}>
          <div className="reward-stat">
            <div className="reward-stat-label">Pwen total</div>
            <div className="reward-stat-val">{totalPwen}</div>
          </div>
          <div className="reward-stat">
            <div className="reward-stat-label">Bon repons</div>
            <div className="reward-stat-val">{playerScore}/{total}</div>
          </div>
          <div className="reward-stat">
            <div className="reward-stat-label">Rezilta</div>
            <div className="reward-stat-val">
              {playerScore > opponentScore ? 'W' : playerScore < opponentScore ? 'L' : 'D'}
            </div>
          </div>
        </div>

        <button className="cta cta-primary reward-cta" onClick={onReplay} type="button">
          🔁 Rejwe
        </button>
      </div>
      <SponsorBand />
    </div>
  );
}
