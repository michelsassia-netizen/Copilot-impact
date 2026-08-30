// Konpa Clash — Phase 1 state machine
//   phase: 'home' | 'question' | 'reward' | 'result'
// - home:    HomeScreen (cream). Tap "Jwe kounye a" → starts a match
// - question: QuestionScreen (dark navy). Answer or timer runs out
// - reward:   RewardScreen (cream). BRAVO / Pa fwa sa a. Tap KONTINYE
// - result:   ResultScreen (cream). Head-to-head vs simulated opponent,
//             Rejwe restarts the match from home

import { useState } from 'react';
import { buildMatchQuestions } from './data/questions.js';
import { pickOpponent, rollOpponentScore } from './data/opponents.js';
import { HomeScreen } from './components/HomeScreen.jsx';
import { QuestionScreen } from './components/QuestionScreen.jsx';
import { RewardScreen } from './components/RewardScreen.jsx';
import { ResultScreen } from './components/ResultScreen.jsx';

const MATCH_LEN = 10;
const CORRECT_PWEN = 100;

function newMatch() {
  const qs = buildMatchQuestions(MATCH_LEN);
  return {
    questions: qs,
    opponent: pickOpponent(),
    opponentScore: rollOpponentScore(MATCH_LEN),
    index: 0,
    results: [],       // per-question booleans
    lastOutcome: null, // { correct, timedOut, skipped, pickedIndex }
    totalPwen: 0,
  };
}

export default function App() {
  const [phase, setPhase] = useState('home');
  const [match, setMatch] = useState(null);

  function startMatch() {
    setMatch(newMatch());
    setPhase('question');
  }

  function handleAnswered(outcome) {
    setMatch((prev) => {
      const earned = outcome.correct ? CORRECT_PWEN : 0;
      return {
        ...prev,
        results: [...prev.results, !!outcome.correct],
        lastOutcome: { ...outcome, earned },
        totalPwen: prev.totalPwen + earned,
      };
    });
    setPhase('reward');
  }

  function handleContinue() {
    setMatch((prev) => {
      const nextIndex = prev.index + 1;
      if (nextIndex >= prev.questions.length) {
        setPhase('result');
        return prev;
      }
      setPhase('question');
      return { ...prev, index: nextIndex };
    });
  }

  function handleReplay() {
    setMatch(null);
    setPhase('home');
  }

  function handleAbout() {
    // Placeholder — Phase 1 keeps this simple. A proper Aprann Plis screen
    // (game rules + Haitian music context) can slot in later.
    alert(
      'Konpa Clash\n\n' +
      "Yon jwèt trivia mizik ayisyen. 10 kesyon nan Kreyòl kont yon lòt jwè.\n\n" +
      "Ou monte klasman lè ou bat lòt moun. Konpa dirèk te kreye an 1955 pa Nemours Jean-Baptiste."
    );
  }

  if (phase === 'home' || !match) {
    return <HomeScreen onStart={startMatch} onAbout={handleAbout} />;
  }

  if (phase === 'question') {
    return (
      <QuestionScreen
        question={match.questions[match.index]}
        index={match.index}
        total={match.questions.length}
        coins={match.totalPwen}
        onAnswered={handleAnswered}
        onBack={handleReplay}
      />
    );
  }

  if (phase === 'reward') {
    const correctCount = match.results.filter(Boolean).length;
    const isLast = match.index + 1 >= match.questions.length;
    return (
      <RewardScreen
        correct={!!match.lastOutcome?.correct}
        timedOut={!!match.lastOutcome?.timedOut}
        skipped={!!match.lastOutcome?.skipped}
        question={match.questions[match.index]}
        earnedPwen={match.lastOutcome?.earned ?? 0}
        index={match.index}
        total={match.questions.length}
        correctCount={correctCount}
        totalPwen={match.totalPwen}
        onContinue={handleContinue}
        isLast={isLast}
      />
    );
  }

  // phase === 'result'
  const playerScore = match.results.filter(Boolean).length;
  return (
    <ResultScreen
      playerScore={playerScore}
      opponent={match.opponent}
      opponentScore={match.opponentScore}
      total={match.questions.length}
      results={match.results}
      totalPwen={match.totalPwen}
      onReplay={handleReplay}
    />
  );
}
