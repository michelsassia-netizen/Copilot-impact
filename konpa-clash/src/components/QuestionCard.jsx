import { useState, useEffect } from 'react';

const LETTERS = ['A', 'B', 'C', 'D'];

export function QuestionCard({ question, onAnswered }) {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setSelected(null);
    setLocked(false);
  }, [question.id]);

  function handlePick(index) {
    if (locked) return;
    const isRight = index === question.correctIndex;
    setSelected(index);
    setLocked(true);
    const delay = isRight ? 750 : 1250;
    setTimeout(() => {
      onAnswered(isRight);
    }, delay);
  }

  function classFor(index) {
    let cls = 'answer';
    if (!locked) return cls;
    if (index === question.correctIndex) cls += ' right';
    else if (index === selected) cls += ' wrong';
    else cls += ' dim';
    return cls;
  }

  return (
    <div>
      <span className="tag">
        <span className={`dot ${question.difficulty}`} />
        <span>{question.emoji} {question.category}</span>
      </span>

      <p className="question">{question.question}</p>
      <p className="hint">{question.hint}</p>

      <div className="answers">
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={classFor(i)}
            onClick={() => handlePick(i)}
            disabled={locked}
            type="button"
          >
            <span className="letter" aria-hidden="true">{LETTERS[i]}</span>
            <span>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
