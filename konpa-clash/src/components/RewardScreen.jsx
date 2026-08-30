// Screen C — Reward (light cream)
// Two versions: correct (BRAVO! +100 PWEN, gold coin, confetti)
// and wrong (Pa fwa sa a…, red coin, shows correct answer).
// Stats strip: KESYON x/N · BON n · PWEN TOTAL total.
// KONTINYE button → next question (or ends match).

import { Confetti } from './Confetti.jsx';
import { SponsorBand } from './SponsorBand.jsx';

export function RewardScreen({
  correct,
  timedOut,
  skipped,
  question,
  earnedPwen,
  index,
  total,
  correctCount,
  totalPwen,
  onContinue,
  isLast,
}) {
  const showConfetti = correct;

  let title, sub;
  if (correct) {
    title = 'BRAVO !';
    sub = 'Ou reponn kòrèk';
  } else if (skipped) {
    title = 'Sote';
    sub = 'Ou sote kesyon sa a';
  } else if (timedOut) {
    title = 'Tan an fini';
    sub = "Ou pa reponn a tan";
  } else {
    title = 'Pa fwa sa a…';
    sub = 'Bon repons lan te:';
  }

  return (
    <div className="app surface-light">
      {showConfetti && <Confetti />}
      <div className="reward">
        <h1 className={`reward-title${correct ? '' : ' wrong'}`}>{title}</h1>
        <div className="reward-sub">{sub}</div>

        {!correct && !skipped && !timedOut && (
          <div className="reward-correct-note">
            <strong>{question.options[question.correctIndex]}</strong>
          </div>
        )}

        <div className={`reward-coin${correct ? '' : ' wrong'}`}>
          <div className="reward-coin-num">
            {correct ? `+${earnedPwen}` : '+0'}
          </div>
          <div className="reward-coin-label">Pwen</div>
        </div>

        <div className="reward-stats">
          <div className="reward-stat">
            <div className="reward-stat-label">Kesyon</div>
            <div className="reward-stat-val">{index + 1}/{total}</div>
          </div>
          <div className="reward-stat">
            <div className="reward-stat-label">Bon</div>
            <div className="reward-stat-val">{correctCount}</div>
          </div>
          <div className="reward-stat">
            <div className="reward-stat-label">Pwen total</div>
            <div className="reward-stat-val">{totalPwen}</div>
          </div>
        </div>

        <button className="cta cta-primary reward-cta" onClick={onContinue} type="button">
          {isLast ? 'Wè rezilta a' : 'Kontinye'}
        </button>
      </div>
      <SponsorBand />
    </div>
  );
}
