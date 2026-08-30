// SPONSOR OFFISYÈL band — sits pinned to the bottom of cream surfaces,
// with a tap-tap textile stripe above the navy panel.
// Sponsor data comes from src/data/sponsor.js.

import { SPONSOR_OF_DAY } from '../data/sponsor.js';

export function SponsorBand() {
  const s = SPONSOR_OF_DAY;
  return (
    <div className="sponsor-band" aria-hidden={s.isPlaceholder ? 'true' : undefined}>
      <div className="band-stripe" />
      <div className="band-inner">
        <span className="band-label">Sponsor Offisyèl</span>
        <span className="band-logo">
          {s.isPlaceholder ? 'LOGO ICI' : s.brand}
        </span>
        <span className="band-tagline">
          {s.isPlaceholder ? 'Ansanm n ap avanse' : s.tagline}
        </span>
      </div>
    </div>
  );
}
