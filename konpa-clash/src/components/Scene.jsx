// Full atmospheric background for Konpa Clash.
// Layers, back to front:
//   1. Deep-indigo gradient wash + amber stage bloom (in CSS)
//   2. Vèvè-inspired ornament — decorative, not any specific lwa's sacred sign
//   3. Drapery hints on the two side edges (indigo panels with a red/gold seam)
//   4. String of bokeh party lights across the top
//   5. Live-band silhouettes on stage: trumpet, electric guitar, keyboard,
//      three tanbou (Haitian hand drums) behind the dancers
//   6. Palm leaf silhouettes tucked into the corners
//   7. Hibiscus accents in the lower corners
//   8. The dancing couple, close-hold konpa pose (kept from prior version)
//   9. Warm gold floor pool + soft haze
// Everything is pure SVG/CSS, scales on any phone, no external assets.

export function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="scene-wash" />
      <div className="scene-bloom" />
      <div className="scene-drape scene-drape-left" />
      <div className="scene-drape scene-drape-right" />
      <div className="scene-bokeh" />

      {/* Vèvè-inspired ornament — high, faint, symmetric */}
      <svg
        className="scene-veve"
        viewBox="-110 -110 220 220"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round">
          {/* outer ring */}
          <circle cx="0" cy="0" r="95" strokeDasharray="2 3" />
          <circle cx="0" cy="0" r="70" />
          {/* central cross */}
          <line x1="0" y1="-88" x2="0" y2="88" />
          <line x1="-88" y1="0" x2="88" y2="0" />
          {/* diagonal star */}
          <line x1="-62" y1="-62" x2="62" y2="62" strokeDasharray="1 2" />
          <line x1="-62" y1="62" x2="62" y2="-62" strokeDasharray="1 2" />
          {/* four hearts on the axis */}
          <path d="M0,-70 C-8,-80 -18,-72 -14,-62 C-10,-54 0,-46 0,-46 C0,-46 10,-54 14,-62 C18,-72 8,-80 0,-70 Z" />
          <path d="M0,70 C-8,80 -18,72 -14,62 C-10,54 0,46 0,46 C0,46 10,54 14,62 C18,72 8,80 0,70 Z" />
          <path d="M-70,0 C-80,-8 -72,-18 -62,-14 C-54,-10 -46,0 -46,0 C-46,0 -54,10 -62,14 C-72,18 -80,8 -70,0 Z" />
          <path d="M70,0 C80,-8 72,-18 62,-14 C54,-10 46,0 46,0 C46,0 54,10 62,14 C72,18 80,8 70,0 Z" />
          {/* curls at diagonals */}
          <path d="M32,-32 Q46,-40 52,-52 Q42,-46 34,-38 Q30,-34 32,-32 Z" />
          <path d="M-32,-32 Q-46,-40 -52,-52 Q-42,-46 -34,-38 Q-30,-34 -32,-32 Z" />
          <path d="M32,32 Q46,40 52,52 Q42,46 34,38 Q30,34 32,32 Z" />
          <path d="M-32,32 Q-46,40 -52,52 Q-42,46 -34,38 Q-30,34 -32,32 Z" />
          {/* scattered dots */}
          <g fill="currentColor" stroke="none">
            <circle cx="0" cy="-100" r="1.4" />
            <circle cx="0" cy="100" r="1.4" />
            <circle cx="-100" cy="0" r="1.4" />
            <circle cx="100" cy="0" r="1.4" />
            <circle cx="70" cy="70" r="1" />
            <circle cx="-70" cy="70" r="1" />
            <circle cx="70" cy="-70" r="1" />
            <circle cx="-70" cy="-70" r="1" />
            <circle cx="0" cy="0" r="2.5" />
          </g>
        </g>
      </svg>

      {/* Stage layer: instruments + tanbou + dancers */}
      <svg
        className="scene-stage"
        viewBox="0 0 400 500"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* --- Instrument silhouettes on the far back of the stage --- */}
        <g className="stage-instruments" fill="currentColor">
          {/* LEFT: Trumpet, angled */}
          <g transform="translate(30, 260) rotate(-8)">
            <rect x="0" y="10" width="70" height="6" rx="2" />
            <rect x="0" y="16" width="70" height="4" />
            <path d="M70,8 L96,4 L100,26 L70,22 Z" />
            <circle cx="20" cy="6" r="3" />
            <circle cx="30" cy="6" r="3" />
            <circle cx="40" cy="6" r="3" />
          </g>

          {/* RIGHT: Electric guitar (strat-ish body) */}
          <g transform="translate(280, 240) rotate(15)">
            {/* neck */}
            <rect x="0" y="10" width="70" height="6" />
            {/* headstock */}
            <path d="M0,8 L-14,4 L-14,22 L0,18 Z" />
            {/* body */}
            <path d="M70,4 Q94,4 100,20 Q104,40 92,50 Q78,54 66,44 Q68,32 62,28 Q68,20 70,4 Z" />
            {/* pickups */}
            <rect x="76" y="20" width="10" height="12" fill="rgba(0,0,0,0.5)" />
          </g>

          {/* Keyboard tucked far back-right */}
          <g transform="translate(238, 300)" opacity="0.85">
            <rect x="0" y="0" width="80" height="6" />
            <rect x="0" y="6" width="80" height="4" fill="rgba(255,255,255,0.15)" />
            {/* legs */}
            <rect x="4" y="10" width="3" height="28" />
            <rect x="73" y="10" width="3" height="28" />
          </g>

          {/* --- Three tanbou (Haitian hand drums) --- */}
          {/* Tallest center-back */}
          <g transform="translate(180, 245)">
            {/* body: trapezoidal, wider at top */}
            <path d="M0,10 L40,10 L36,110 L4,110 Z" />
            {/* head */}
            <ellipse cx="20" cy="10" rx="20" ry="5" fill="rgba(255,220,150,0.35)" />
            {/* rope tuning wraps */}
            <line x1="2" y1="30" x2="38" y2="30" stroke="rgba(255,202,58,0.35)" strokeWidth="1" />
            <line x1="3" y1="50" x2="37" y2="50" stroke="rgba(255,202,58,0.3)" strokeWidth="1" />
            <line x1="4" y1="70" x2="36" y2="70" stroke="rgba(255,202,58,0.25)" strokeWidth="1" />
            <line x1="5" y1="90" x2="35" y2="90" stroke="rgba(255,202,58,0.2)" strokeWidth="1" />
          </g>
          {/* Medium tanbou */}
          <g transform="translate(140, 275)">
            <path d="M0,8 L34,8 L31,90 L3,90 Z" />
            <ellipse cx="17" cy="8" rx="17" ry="4" fill="rgba(255,220,150,0.35)" />
            <line x1="2" y1="26" x2="32" y2="26" stroke="rgba(255,202,58,0.32)" strokeWidth="1" />
            <line x1="3" y1="46" x2="31" y2="46" stroke="rgba(255,202,58,0.28)" strokeWidth="1" />
            <line x1="4" y1="66" x2="30" y2="66" stroke="rgba(255,202,58,0.22)" strokeWidth="1" />
          </g>
          {/* Small tanbou */}
          <g transform="translate(224, 285)">
            <path d="M0,6 L28,6 L26,72 L2,72 Z" />
            <ellipse cx="14" cy="6" rx="14" ry="3" fill="rgba(255,220,150,0.35)" />
            <line x1="2" y1="22" x2="26" y2="22" stroke="rgba(255,202,58,0.3)" strokeWidth="1" />
            <line x1="3" y1="40" x2="25" y2="40" stroke="rgba(255,202,58,0.24)" strokeWidth="1" />
            <line x1="4" y1="58" x2="24" y2="58" stroke="rgba(255,202,58,0.18)" strokeWidth="1" />
          </g>
        </g>

        {/* --- The dancing couple, close-hold konpa pose --- */}
        <g className="stage-couple" fill="currentColor">
          {/* MAN — left figure */}
          <path d="M108,118 Q108,86 140,84 Q172,86 172,118 Q170,104 140,102 Q110,104 108,118 Z" />
          <ellipse cx="140" cy="130" rx="30" ry="34" />
          <rect x="132" y="160" width="16" height="14" />
          <path d="M100,178 Q100,172 116,172 L164,172 Q180,172 180,178 L176,236 L172,296 L168,376 L162,500 L118,500 L112,376 L108,296 L104,236 Z" />
          <path d="M178,204 Q224,200 264,214 Q280,220 282,232 Q282,244 268,242 Q244,236 218,228 Q194,224 176,226 Z" />
          <path d="M100,208 Q90,214 90,228 Q90,240 100,240 L112,236 L120,230 Z" />

          {/* WOMAN — right figure, dress flares */}
          <ellipse cx="240" cy="106" rx="12" ry="11" />
          <path d="M212,132 Q210,112 240,110 Q270,112 268,132 Q268,120 240,120 Q212,120 212,132 Z" />
          <ellipse cx="240" cy="150" rx="26" ry="30" />
          <rect x="233" y="176" width="14" height="12" />
          <path d="M212,196 Q212,188 224,188 L256,188 Q268,188 268,196 L264,232 L258,258 L222,258 L218,232 Z" />
          <path d="M218,256 L180,500 L300,500 L262,256 Z" />
          <path d="M214,198 Q198,192 178,190 L168,192 Q164,200 172,204 L194,208 L216,214 Z" />
        </g>

        {/* --- Corner palm leaves --- */}
        <g className="stage-palms" fill="currentColor" opacity="0.55">
          {/* Bottom-left palm frond */}
          <g transform="translate(0, 500)">
            <path d="M0,-60 Q10,-90 40,-100 Q30,-88 24,-72 Q40,-84 60,-88 Q44,-72 32,-58 Q52,-64 70,-60 Q46,-52 34,-40 Q52,-38 60,-30 Q40,-30 22,-24 Q26,-16 22,-6 Q12,-16 6,-30 Q-4,-24 -14,-24 Q-6,-36 0,-46 Z" />
          </g>
          {/* Bottom-right palm frond */}
          <g transform="translate(400, 500) scale(-1, 1)">
            <path d="M0,-58 Q12,-86 42,-96 Q30,-84 26,-70 Q42,-80 60,-84 Q46,-70 34,-56 Q52,-60 68,-56 Q46,-50 34,-38 Q50,-36 58,-28 Q40,-28 22,-22 Q26,-14 22,-4 Q12,-14 6,-28 Q-4,-22 -14,-22 Q-6,-34 0,-44 Z" />
          </g>
        </g>

        {/* --- Hibiscus flower accents --- */}
        <g className="stage-hibiscus">
          {/* Lower-left hibiscus */}
          <g transform="translate(38, 460)">
            <g fill="currentColor" opacity="0.65">
              <path d="M0,0 Q-14,-6 -16,-18 Q-12,-24 -4,-22 Q0,-14 0,0 Z" />
              <path d="M0,0 Q10,-10 20,-8 Q22,0 16,6 Q6,6 0,0 Z" />
              <path d="M0,0 Q6,10 2,20 Q-6,20 -8,12 Q-6,4 0,0 Z" />
              <path d="M0,0 Q-12,4 -18,-2 Q-16,-10 -8,-10 Q-2,-6 0,0 Z" />
              <path d="M0,0 Q8,4 12,14 Q6,18 -2,14 Q-2,6 0,0 Z" />
            </g>
            {/* stamen */}
            <line x1="0" y1="0" x2="6" y2="-14" stroke="#e0a92e" strokeWidth="1" />
            <circle cx="6" cy="-14" r="1.5" fill="#ffca3a" />
          </g>
        </g>

        {/* --- Warm floor pool of light --- */}
        <ellipse
          className="stage-floor"
          cx="200"
          cy="500"
          rx="180"
          ry="30"
          fill="url(#floor-glow)"
        />
        <defs>
          <radialGradient id="floor-glow" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="#ffca3a" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#ffca3a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffca3a" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <div className="scene-haze" />
    </div>
  );
}
