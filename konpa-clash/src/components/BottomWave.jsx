// Navy + red curved wave along the bottom edge of light surfaces.

export function BottomWave() {
  return (
    <svg
      className="bottom-wave"
      viewBox="0 0 440 40"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 0,20 C 80,0 160,40 220,20 C 280,0 360,40 440,20 L 440,40 L 0,40 Z"
        fill="#0f1b3d"
      />
      <path
        d="M 0,26 C 80,10 160,42 220,26 C 280,10 360,42 440,26 L 440,40 L 0,40 Z"
        fill="#b0202f"
        opacity="0.85"
      />
    </svg>
  );
}
