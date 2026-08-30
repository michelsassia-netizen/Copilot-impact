// Photorealistic hero background — the AI-generated art from Sassia's Copilot
// mockup: dancing couple backlit by warm amber sparks, tanbou on the right,
// drapery on the sides. Sits as a fixed layer behind the whole app.
// See src/assets/heroBg.js for the base64-inlined JPEG.

import { HERO_BG_DATA_URI } from '../assets/heroBg.js';

export function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="scene-wash" />
      <div
        className="scene-photo"
        style={{ backgroundImage: `url("${HERO_BG_DATA_URI}")` }}
      />
      <div className="scene-vignette" />
    </div>
  );
}
