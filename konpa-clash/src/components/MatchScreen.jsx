import { ProgressPips } from './ProgressPips.jsx';
import { QuestionCard } from './QuestionCard.jsx';

export function MatchScreen({ questions, currentIndex, results, onAnswered, opponent }) {
  const question = questions[currentIndex];

  return (
    <div className="card">
      <ProgressPips total={questions.length} currentIndex={currentIndex} results={results} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-label)',
          fontSize: 12,
          color: 'var(--muted)',
          marginBottom: 6,
          letterSpacing: 1,
        }}
      >
        <span>KESYON {currentIndex + 1} / {questions.length}</span>
        <span>KONT: {opponent.name} {opponent.country}</span>
      </div>

      <div className="weave" />

      <QuestionCard question={question} onAnswered={onAnswered} />
    </div>
  );
}
