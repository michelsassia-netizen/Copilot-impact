// End-of-match summary (light cream) — shown after the last KONTINYE.
// Head-to-head vs simulated opponent, emoji grid, and Rejwe.
// Also shows the settled stats returned by complete_match: coins earned,
// XP earned, updated total wins/streak, and any newly-awarded badges.

import { titleForScore } from '../data/titles.js';
import { BADGE_META } from '../data/levels.js';
import { SponsorBand } from './SponsorBand.jsx';

export function ResultScreen({
  playerScore, opponent, opponentScore, total, results,
  totalPwen, settled, onReplay,
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
  const newBadges = settled?.newBadges || [];

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

        {/* Post-match settlement — filled by complete_match RPC (or local guest math) */}
        <div className="settled">
          <div className="settled-row">
            <span className="settled-key">Pwen ranmase</span>
            <span className="settled-val">+{settled?.coinsEarned ?? totalPwen}</span>
          </div>
          {settled && (
            <>
              <div className="settled-row">
                <span className="settled-key">XP ranmase</span>
                <span className="settled-val">+{settled.xpEarned}</span>
              </div>
              <div className="settled-row">
                <span className="settled-key">Total viktwa</span>
                <span className="settled-val">🏆 {settled.stats?.wins ?? 0}</span>
              </div>
              <div className="settled-row">
                <span className="settled-key">Streak aktyèl</span>
                <span className="settled-val">🔥 {settled.stats?.win_streak ?? 0}</span>
              </div>
            </>
          )}
          {!settled && (
            <div className="settled-row settled-hint">
              <span className="settled-key">Ap sove pwen ou…</span>
            </div>
          )}
        </div>

        {newBadges.length > 0 && (
          <div className="new-badges">
            <div className="new-badges-title">🎉 Nouvo badj!</div>
            <div className="new-badges-row">
              {newBadges.map((k) => {
                const meta = BADGE_META[k];
                if (!meta) return null;
                return (
                  <span key={k} className="new-badge">
                    <span className="new-badge-emoji">{meta.emoji}</span>
                    <span className="new-badge-label">{meta.label}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <button className="cta cta-primary reward-cta" onClick={onReplay} type="button">
          🔁 Rejwe
        </button>
      </div>
      <SponsorBand />
    </div>
  );
}
