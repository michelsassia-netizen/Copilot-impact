// Placeholder screen for tabs that are queued for later phases
// (LIDÈ / Leaderboard = Phase 4; BOUTIK / Shop = Phase 6b).

import { SponsorBand } from './SponsorBand.jsx';

export function ComingSoonScreen({ icon, title, phase, blurb }) {
  return (
    <div className="app surface-light with-tabbar">
      <div className="coming-soon">
        <div className="coming-icon" aria-hidden="true">{icon}</div>
        <h1 className="coming-title">{title}</h1>
        <div className="coming-phase">Ap vini nan {phase}</div>
        <p className="coming-blurb">{blurb}</p>
      </div>
      <SponsorBand />
    </div>
  );
}
