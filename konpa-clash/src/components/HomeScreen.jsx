// Screen A — Home / Splash (light cream)
// Flag roundel, gold tanbou + rays, KONPA CLASH wordmark, tagline,
// placeholder image slot (per spec: DO NOT ship a final-looking couple
// illustration; leave a labeled placeholder for Sassia's real artwork),
// primary "JWE KOUNYE A" button, secondary "APRANN PLIS",
// navy+red bottom wave, sponsor band footer.

import { TanbouRays } from './TanbouRays.jsx';
import { BottomWave } from './BottomWave.jsx';
import { SponsorBand } from './SponsorBand.jsx';

export function HomeScreen({ onStart, onAbout }) {
  return (
    <div className="app surface-light">
      <div className="home">
        <div className="home-top">
          <div className="flag-roundel" aria-label="Ayiti">🇭🇹</div>
          <button className="home-menu" type="button" aria-label="Meni">☰</button>
        </div>

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
