// Screen A — Home / Splash (cream)
// Adds a small guest nudge banner + user chip when signed in / guest.

import { TanbouRays } from './TanbouRays.jsx';
import { BottomWave } from './BottomWave.jsx';
import { SponsorBand } from './SponsorBand.jsx';
import { GuestBanner } from './GuestBanner.jsx';
import { UserChip } from './UserChip.jsx';

export function HomeScreen({ onStart, onAbout, user, isGuest, onSignIn, onSignOut }) {
  return (
    <div className="app surface-light">
      <div className="home">
        <div className="home-top">
          <div className="flag-roundel" aria-label="Ayiti">🇭🇹</div>
          {user ? (
            <UserChip user={user} onSignOut={onSignOut} />
          ) : (
            <button className="home-menu" type="button" aria-label="Meni">☰</button>
          )}
        </div>

        {isGuest && <GuestBanner onSignIn={onSignIn} />}

        <div className="home-hero">
          <TanbouRays />
          <div className="wordmark">
            <div className="wordmark-konpa">KONPA</div>
            <div className="wordmark-clash-row">
              <span className="wordmark-clash-dash" aria-hidden="true" />
              <span className="wordmark-clash">CLASH</span>
              <span className="wordmark-clash-dash" aria-hidden="true" />
            </div>
            <div className="wordmark-tagline">Aprann. Jwe. Selebre.</div>
          </div>
        </div>

        <div className="couple-placeholder" role="img" aria-label="Espas pou ilistrasyon koupl la">
          <div className="couple-placeholder-icon" aria-hidden="true">💃🕺</div>
          <div className="couple-placeholder-label">Ilistrasyon koupl la ap vini la</div>
          <div className="couple-placeholder-note">
            Espas rezève pou vre atwòk atistik ou a — pa yon jenerasyon otomatik.
          </div>
        </div>

        <div className="home-ctas">
          <button className="cta cta-primary" onClick={onStart} type="button">
            Jwe kounye a ▶
          </button>
          <button className="cta cta-secondary" onClick={onAbout} type="button">
            Aprann plis 📖
          </button>
        </div>
      </div>

      <BottomWave />
      <SponsorBand />
    </div>
  );
}
