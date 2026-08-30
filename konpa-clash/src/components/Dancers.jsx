// Silhouette of a couple in close-hold konpa dance pose.
// Rendered as a fixed background layer, backlit by a gold rim glow so they
// look like they're dancing under the ambient dancefloor light.
// Purely decorative — aria-hidden.

export function Dancers() {
  return (
    <div className="dancers-wrap" aria-hidden="true">
      {/* Warm floor pool under their feet */}
      <div className="floor-pool" />

      <svg
        className="dancers-svg"
        viewBox="0 0 400 500"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
        role="img"
        aria-hidden="true"
      >
        <g fill="currentColor">
          {/* MAN — left figure, close hold */}
          {/* short hair / afro cap */}
          <path d="M108,118 Q108,86 140,84 Q172,86 172,118 Q170,104 140,102 Q110,104 108,118 Z" />
          {/* head */}
          <ellipse cx="140" cy="130" rx="30" ry="34" />
          {/* neck */}
          <rect x="132" y="160" width="16" height="14" />
          {/* torso: broad shoulders, tapered waist */}
          <path d="M100,178 Q100,172 116,172 L164,172 Q180,172 180,178 L176,236 L172,296 L168,376 L162,500 L118,500 L112,376 L108,296 L104,236 Z" />
          {/* right arm across her back */}
          <path d="M178,204 Q224,200 264,214 Q280,220 282,232 Q282,244 268,242 Q244,236 218,228 Q194,224 176,226 Z" />
          {/* left hand at her waist */}
          <path d="M100,208 Q90,214 90,228 Q90,240 100,240 L112,236 L120,230 Z" />

          {/* WOMAN — right figure, dress flares */}
          {/* bun on top */}
          <ellipse cx="240" cy="106" rx="12" ry="11" />
          {/* hair volume around head */}
          <path d="M212,132 Q210,112 240,110 Q270,112 268,132 Q268,120 240,120 Q212,120 212,132 Z" />
          {/* head */}
          <ellipse cx="240" cy="150" rx="26" ry="30" />
          {/* neck */}
          <rect x="233" y="176" width="14" height="12" />
          {/* upper body, cinched at waist */}
          <path d="M212,196 Q212,188 224,188 L256,188 Q268,188 268,196 L264,232 L258,258 L222,258 L218,232 Z" />
          {/* flared dress that widens to the floor */}
          <path d="M218,256 L180,500 L300,500 L262,256 Z" />
          {/* arm draped over his shoulder */}
          <path d="M214,198 Q198,192 178,190 L168,192 Q164,200 172,204 L194,208 L216,214 Z" />
        </g>
      </svg>
    </div>
  );
}
