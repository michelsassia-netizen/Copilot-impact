// Konpa Clash — Phase 2 wiring
// Auth flow (magic link via Supabase) is the outer shell; the game state
// machine (home/question/reward/result) runs inside once we know whether
// the player is signed-in, guest, or Supabase isn't configured yet.

import { useState, useCallback } from 'react';
import { useAuth } from './hooks/useAuth.js';
import { buildMatchQuestions } from './data/questions.js';
import { pickOpponent, rollOpponentScore } from './data/opponents.js';
import { HomeScreen } from './components/HomeScreen.jsx';
import { QuestionScreen } from './components/QuestionScreen.jsx';
import { RewardScreen } from './components/RewardScreen.jsx';
import { ResultScreen } from './components/ResultScreen.jsx';
import { LoginScreen } from './components/LoginScreen.jsx';

const MATCH_LEN = 10;
const CORRECT_PWEN = 100;
const GUEST_KEY = 'konpa_clash_guest';

function newMatch() {
  const qs = buildMatchQuestions(MATCH_LEN);
  return {
    questions: qs,
    opponent: pickOpponent(),
    opponentScore: rollOpponentScore(MATCH_LEN),
    index: 0,
    results: [],
    lastOutcome: null,
    totalPwen: 0,
  };
}

export default function App() {
  const { session, user, loading, enabled: supabaseEnabled, signOut } = useAuth();
  const [guestMode, setGuestMode] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem(GUEST_KEY) === '1'
  );

  const [phase, setPhase] = useState('home'); // 'home' | 'question' | 'reward' | 'result'
  const [match, setMatch] = useState(null);

  const startMatch = useCallback(() => {
    setMatch(newMatch());
    setPhase('question');
  }, []);

  const handleAnswered = useCallback((outcome) => {
    setMatch((prev) => {
      if (!prev) return prev;
      const earned = outcome.correct ? CORRECT_PWEN : 0;
      return {
        ...prev,
        results: [...prev.results, !!outcome.correct],
        lastOutcome: { ...outcome, earned },
        totalPwen: prev.totalPwen + earned,
      };
    });
    setPhase('reward');
  }, []);

  const handleContinue = useCallback(() => {
    setMatch((prev) => {
      if (!prev) return prev;
      const nextIndex = prev.index + 1;
      if (nextIndex >= prev.questions.length) {
        setPhase('result');
        return prev;
      }
      setPhase('question');
      return { ...prev, index: nextIndex };
    });
  }, []);

  const handleReplay = useCallback(() => {
    setMatch(null);
    setPhase('home');
  }, []);

  const goToLogin = useCallback(() => {
    localStorage.removeItem(GUEST_KEY);
    setGuestMode(false);
    handleReplay();
  }, [handleReplay]);

  const chooseGuest = useCallback(() => {
    localStorage.setItem(GUEST_KEY, '1');
    setGuestMode(true);
  }, []);

  const handleSignOut = useCallback(async () => {
    await signOut();
    localStorage.removeItem(GUEST_KEY);
    setGuestMode(false);
    handleReplay();
  }, [signOut, handleReplay]);

  const handleAbout = useCallback(() => {
    alert(
      'Konpa Clash\n\n' +
      "Yon jwèt trivia mizik ayisyen. 10 kesyon nan Kreyòl kont yon lòt jwè.\n\n" +
      "Ou monte klasman lè ou bat lòt moun. Konpa dirèk te kreye an 1955 pa Nemours Jean-Baptiste."
    );
  }, []);

  // While the auth check is resolving, show a tiny cream splash so
  // logged-in users don't briefly see the login screen.
  if (loading) {
    return (
      <div className="app surface-light">
        <div className="splash-loading">
          <div className="splash-dot" />
        </div>
      </div>
    );
  }

  // Supabase is configured AND user is not signed in AND has not chosen guest.
  if (supabaseEnabled && !session && !guestMode) {
    return <LoginScreen onGuest={chooseGuest} />;
  }

  const isGuest = !session;

  if (phase === 'home' || !match) {
    return (
      <HomeScreen
        onStart={startMatch}
        onAbout={handleAbout}
        user={user}
        isGuest={isGuest}
        onSignIn={goToLogin}
        onSignOut={handleSignOut}
      />
    );
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
