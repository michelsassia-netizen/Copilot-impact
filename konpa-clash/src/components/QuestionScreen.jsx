// Screen B — Question screen (dark navy)
// Back chevron + KESYON index + gold coin pill on top.
// Segmented progress bar. Category (red). Question (Fraunces).
// A-D answers with gold-hairline borders + circular letter badges.
// Three power-up buttons. Circular 15s countdown with equalizer bars.

import { useState, useEffect, useRef, useMemo } from 'react';
import { PowerUps } from './PowerUps.jsx';
import { Timer } from './Timer.jsx';

const LETTERS = ['A', 'B', 'C', 'D'];
const QUESTION_TIME = 15;

export function QuestionScreen({
  question,
  index,
  total,
  coins,
  onAnswered,
  onBack,
}) {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [seconds, setSeconds] = useState(QUESTION_TIME);
  const [used, setUsed] = useState({}); // per-match, persists across questions via parent later
  const [hidden, setHidden] = useState([]); // 50/50 removes two wrongs
  const tick = useRef(null);

  // Reset per-question state when the question changes
  useEffect(() => {
    setSelected(null);
    setLocked(false);
    setSeconds(QUESTION_TIME);
    setHidden([]);
  }, [question.id]);

  // Countdown
  useEffect(() => {
    if (locked) return;
    tick.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(tick.current);
          handleTimeout();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tick.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id, locked]);

  function handleTimeout() {
    setLocked(true);
    setTimeout(() => onAnswered({ correct: false, timedOut: true, pickedIndex: null }), 900);
  }

  function handlePick(i) {
    if (locked || hidden.includes(i)) return;
    const isRight = i === question.correctIndex;
    setSelected(i);
    setLocked(true);
    clearInterval(tick.current);
    setTimeout(() => onAnswered({ correct: isRight, pickedIndex: i, timedOut: false }), 900);
  }

  function usePower(key) {
    if (locked || used[key]) return;
    setUsed((u) => ({ ...u, [key]: true }));
    if (key === '5050') {
      // hide two wrong options
      const wrongs = [0, 1, 2, 3].filter((i) => i !== question.correctIndex);
      const pick2 = [wrongs[0], wrongs[1]];
      setHidden(pick2);
    } else if (key === 'skip') {
      setLocked(true);
      clearInterval(tick.current);
      setTimeout(() => onAnswered({ correct: false, skipped: true, pickedIndex: null }), 300);
    } else if (key === 'addTime') {
      setSeconds((s) => Math.min(s + 15, QUESTION_TIME * 2));
    }
  }

  function classFor(i) {
    if (hidden.includes(i)) return 'answer dim';
    if (!locked) return 'answer';
    if (i === question.correctIndex) return 'answer right';
    if (i === selected) return 'answer wrong';
    return 'answer dim';
  }

  const segments = useMemo(() => {
    return Array.from({ length: total }).map((_, i) => {
      if (i < index) return 'done';
      if (i === index) return 'current';
      return '';
    });
  }, [index, total]);

  return (
    <div className="app surface-dark">
      <div className="question-screen">
        <div className="q-topbar">
          <button className="q-back" onClick={onBack} type="button" aria-label="Retounen">
            ‹
          </button>
          <div className="q-index">Kesyon {index + 1} / {total}</div>
          <div className="coin-pill" aria-label={`${coins} Pwen`}>
            {coins.toLocaleString()}
          </div>
        </div>

        <div className="segmented" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={index}>
          {segments.map((s, i) => (
            <span key={i} className={`seg ${s}`} />
          ))}
        </div>

        <div className="q-category">🎵 {question.category}</div>
        <p className="q-text">{question.question}</p>
        {question.hint && <p className="q-hint">{question.hint}</p>}

        <div className="answers">
          {question.options.map((opt, i) => (
            <button
              key={i}
              className={classFor(i)}
              onClick={() => handlePick(i)}
              disabled={locked || hidden.includes(i)}
              type="button"
            >
              <span className="letter" aria-hidden="true">{LETTERS[i]}</span>
              <span>{opt}</span>
            </button>
          ))}
        </div>

        <PowerUps used={used} onUse={usePower} disabled={locked} />

        <Timer seconds={seconds} total={QUESTION_TIME} />
      </div>
    </div>
  );
}
