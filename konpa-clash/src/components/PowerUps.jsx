// Three power-ups in a row: 50-50, SOTE KESYON (skip), TAN SIPLEMANTÈ (+15s).
// Each is one-shot per match in Phase 1 (no cost/inventory yet).

export function PowerUps({ used, onUse, disabled }) {
  return (
    <div className="powerups" role="group" aria-label="Pouwa">
      <button
        className="power"
        onClick={() => onUse('5050')}
        disabled={disabled || used['5050']}
        type="button"
      >
        <span className="power-icon">50/50</span>
        <span className="power-label">50-50</span>
      </button>
      <button
        className="power"
        onClick={() => onUse('skip')}
        disabled={disabled || used['skip']}
        type="button"
      >
        <span className="power-icon">»»</span>
        <span className="power-label">Sote kesyon</span>
      </button>
      <button
        className="power"
        onClick={() => onUse('addTime')}
        disabled={disabled || used['addTime']}
        type="button"
      >
        <span className="power-icon">+15s</span>
        <span className="power-label">Tan siplemantè</span>
      </button>
    </div>
  );
}
