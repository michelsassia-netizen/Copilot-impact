// Circular 15s countdown with an animated equalizer bar row beneath.
// The parent controls the seconds; this component just renders and calls
// onExpire once when seconds reaches 0. Ticking is done by the parent so
// power-ups (Tan siplemantè +15s) can extend it cleanly.

const R = 28;
const C = 2 * Math.PI * R;

export function Timer({ seconds, total = 15 }) {
  const clamped = Math.max(0, Math.min(seconds, total));
  const dashOffset = C * (1 - clamped / total);

  return (
    <div className="timer-wrap">
      <div className="timer" role="timer" aria-live="polite">
        <svg viewBox="0 0 66 66">
          <circle className="track" cx="33" cy="33" r={R} fill="none" strokeWidth="5" />
          <circle
            className="prog"
            cx="33"
            cy="33"
            r={R}
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className="timer-num">{clamped}s</div>
      </div>
      <div className="equalizer" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bar" />
        ))}
      </div>
    </div>
  );
}
