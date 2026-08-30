import { useState, useMemo } from 'react';
import { VERIFIED_QUESTIONS, shuffleQuestions } from './data/questions.js';
import { pickOpponent, rollOpponentScore } from './data/opponents.js';
import { MatchScreen } from './components/MatchScreen.jsx';
import { ResultScreen } from './components/ResultScreen.jsx';
import { Scene } from './components/Scene.jsx';

function newMatch() {
  return {
    questions: shuffleQuestions(VERIFIED_QUESTIONS),
    opponent: pickOpponent(),
    opponentScore: rollOpponentScore(VERIFIED_QUESTIONS.length),
    currentIndex: 0,
    results: [], // array of booleans, one per answered question
  };
}

export default function App() {
  const [match, setMatch] = useState(() => newMatch());

  const total = match.questions.length;
  const done = match.results.length >= total;
  const playerScore = useMemo(
    () => match.results.filter(Boolean).length,
    [match.results]
  );

  function handleAnswered(isRight) {
    setMatch((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex + 1,
      results: [...prev.results, isRight],
    }));
  }

  function handleReplay() {
    setMatch(newMatch());
  }

  return (
    <>
      <Scene />
      <div className="app">
        <header className="header">
        <div className="brand">
          KONPA <span className="brand-flag">🇭🇹</span> CLASH
        </div>
        <div className="brand-sub">Match trivia · 6 kesyon · yon sèl gayan</div>
      </header>

        {!done ? (
          <MatchScreen
            questions={match.questions}
            currentIndex={match.currentIndex}
            results={match.results}
            onAnswered={handleAnswered}
            opponent={match.opponent}
          />
        ) : (
          <ResultScreen
            playerScore={playerScore}
            opponent={match.opponent}
            opponentScore={match.opponentScore}
            total={total}
            results={match.results}
            onReplay={handleReplay}
          />
        )}
      </div>
    </>
  );
}
