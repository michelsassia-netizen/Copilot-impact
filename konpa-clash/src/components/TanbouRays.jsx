// Gold tanbou (Haitian hand drum) with radiating rays above.
// Sits above the KONPA CLASH wordmark on the home screen.

export function TanbouRays() {
  return (
    <svg
      className="tanbou-rays"
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Rays */}
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="48" y1="6" x2="48" y2="18" />
        <line x1="30" y1="10" x2="34" y2="20" />
        <line x1="66" y1="10" x2="62" y2="20" />
        <line x1="16" y1="20" x2="24" y2="26" />
        <line x1="80" y1="20" x2="72" y2="26" />
        <line x1="10" y1="36" x2="20" y2="38" />
        <line x1="86" y1="36" x2="76" y2="38" />
      </g>
      {/* Tanbou top head */}
      <ellipse cx="48" cy="42" rx="22" ry="6" fill="currentColor" opacity="0.85" />
      {/* Tanbou body */}
      <path
        d="M 26,42 L 30,90 L 66,90 L 70,42 Z"
        fill="currentColor"
      />
      {/* Rope tuning wraps */}
      <g stroke="rgba(15, 27, 61, 0.6)" strokeWidth="0.8">
        <line x1="28" y1="56" x2="68" y2="56" />
        <line x1="29" y1="68" x2="67" y2="68" />
        <line x1="30" y1="80" x2="66" y2="80" />
      </g>
    </svg>
  );
}
