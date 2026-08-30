// Compact Sponsor of the Day strip — sits above the game card.
// Gold-haloed circular mark on the left, brand + tagline on the right,
// small pulsing tanbou icon at the far right (rhythm cue + spotlight motif).

import { SPONSOR_OF_DAY } from '../data/sponsor.js';

export function SponsorSlot() {
  const s = SPONSOR_OF_DAY;
  const content = (
    <div className={`sponsor-slot${s.isPlaceholder ? ' is-placeholder' : ''}`}>
      <div className="sponsor-label">PATNÈ JODI A</div>

      <div className="sponsor-body">
        <div className="sponsor-mark" aria-hidden="true">
          {s.brand ? s.brand.slice(0, 2) : '★'}
        </div>

        <div className="sponsor-copy">
          <div className="sponsor-brand">{s.brand}</div>
          <div className="sponsor-tag">{s.tagline}</div>
        </div>

        <TanbouPulse />
      </div>
    </div>
  );

  if (s.href) {
    return (
      <a href={s.href} target="_blank" rel="noopener noreferrer" className="sponsor-link">
        {content}
      </a>
    );
  }
  return content;
}

function TanbouPulse() {
  return (
    <svg
      className="sponsor-tanbou"
      viewBox="0 0 40 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="20" cy="8" rx="18" ry="5" fill="currentColor" opacity="0.85" />
      <path
        d="M2,8 L38,8 L34,54 L6,54 Z"
        fill="currentColor"
        opacity="0.5"
      />
      <line x1="4" y1="22" x2="36" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      <line x1="5" y1="34" x2="35" y2="34" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
      <line x1="6" y1="46" x2="34" y2="46" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
    </svg>
  );
}
