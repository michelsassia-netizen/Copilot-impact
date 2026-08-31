// Decorative confetti scatter along the top of the reward screen.

const PIECES = [
  { x: 10, y: 30, r: -22, w: 8,  h: 12, c: '#e8b74a' },
  { x: 25, y: 60, r: 15,  w: 6,  h: 10, c: '#b0202f' },
  { x: 42, y: 20, r: -8,  w: 10, h: 6,  c: '#12235e' },
  { x: 58, y: 80, r: 30,  w: 8,  h: 10, c: '#e8b74a' },
  { x: 74, y: 40, r: -30, w: 6,  h: 8,  c: '#b0202f' },
  { x: 88, y: 90, r: 12,  w: 10, h: 8,  c: '#e8b74a' },
  { x: 18, y: 130, r: 20, w: 6, h: 6, c: '#12235e' },
  { x: 82, y: 150, r: -18, w: 8, h: 6, c: '#e8b74a' },
  { x: 8,  y: 175, r: 6,  w: 6, h: 10, c: '#b0202f' },
  { x: 92, y: 210, r: -10, w: 10, h: 4, c: '#e8b74a' },
  { x: 50, y: 200, r: 25, w: 6, h: 6, c: '#12235e' },
  { x: 35, y: 240, r: -6, w: 8, h: 6, c: '#b0202f' },
];

export function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 100 260" preserveAspectRatio="none">
        {PIECES.map((p, i) => (
          <rect
            key={i}
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            rx="1"
            fill={p.c}
            transform={`rotate(${p.r} ${p.x + p.w / 2} ${p.y + p.h / 2})`}
            opacity="0.9"
          />
        ))}
      </svg>
    </div>
  );
}
