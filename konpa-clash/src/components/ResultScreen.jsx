import { titleForScore } from '../data/titles.js';

export function ResultScreen({ playerScore, opponent, opponentScore, total, results, onReplay }) {
  const title = titleForScore(playerScore);

  let verdictClass = 'draw';
  let verdictText = `Egalite 🤝 — ${playerScore}-${opponentScore}`;
  if (playerScore > opponentScore) {
    verdictClass = 'win';
    verdictText = `Ou genyen! 🏆`;
  } else if (playerScore < opponentScore) {
    verdictClass = 'lose';
    verdictText = `${opponent.name} genyen 😤`;
  }

  const emojiGrid = results.map((r) => (r ? '🟨' : '⬛')).join('');

  return (
    <div className="card">
      <div className="pips">
        {results.map((r, i) => (
          <span key={i} className={`pip ${r ? 'right' : 'wrong'}`} aria-hidden="true" />
        ))}
      </div>

      <div style={{ textAlign: 'center', fontSize: 44, marginTop: 4 }} aria-hidden="true">
        {title.emoji}
      </div>
      <h2 className="result-title">{title.title}</h2>
      <p className="result-quip">{title.quip}</p>

      <div className="weave" />

      <div className="scoreboard">
        <div className={`side ${playerScore > opponentScore ? 'win' : ''}`}>
          <div className="who">Ou 🇭🇹</div>
          <div className="score">{playerScore}<span style={{ fontSize: 18, opacity: 0.6 }}>/{total}</span></div>
        </div>
        <div className="versus">vs</div>
        <div className={`side ${opponentScore > playerScore ? 'win' : ''}`}>
          <div className="who">{opponent.name} <span className="country">{opponent.country}</span></div>
          <div className="score">{opponentScore}<span style={{ fontSize: 18, opacity: 0.6 }}>/{total}</span></div>
        </div>
      </div>

      <div className={`verdict ${verdictClass}`}>{verdictText}</div>

      <div className="emoji-grid" aria-label={`Rezilta: ${playerScore} sou ${total}`}>
        {emojiGrid}
      </div>

      <button className="rejwe" onClick={onReplay} type="button">
        🔁 Rejwe
      </button>

      <p className="footnote">Yon lòt konbatan ap tann ou.</p>
    </div>
  );
}
