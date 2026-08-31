// Konpa Clash — Phase 3 wiring
// Adds bottom tab bar (AKÈY · LIDÈ · BOUTIK · PROFIL), the Profile screen,
// placeholder screens for later-phase tabs, and calls the complete_match
// RPC once a match finishes to award W/L/D + coins + XP + badges.

import { useState, useCallback } from 'react';
import { useAuth } from './hooks/useAuth.js';
import { buildMatchQuestions } from './data/questions.js';
import { pickOpponent, rollOpponentScore } from './data/opponents.js';
import { completeMatch } from './lib/game.js';
import { HomeScreen } from './components/HomeScreen.jsx';
import { QuestionScreen } from './components/QuestionScreen.jsx';
import { RewardScreen } from './components/RewardScreen.jsx';
import { ResultScreen } from './components/ResultScreen.jsx';
import { LoginScreen } from './components/LoginScreen.jsx';
import { ProfileScreen } from './components/ProfileScreen.jsx';
import { ComingSoonScreen } from './components/ComingSoonScreen.jsx';
import { TabBar } from './components/TabBar.jsx';

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
    settled: null, // stats after complete_match runs
  };
}

export default function App() {
  const { session, user, loading, enabled: supabaseEnabled, signOut } = useAuth();
  const [guestMode, setGuestMode] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem(GUEST_KEY) === '1'
  );

  const [tab, setTab] = useState('home'); // AKÈY tab by default
  const [phase, setPhase] = useState('home'); // 'home' | 'question' | 'reward' | 'result'
  const [match, setMatch] = useState(null);
  const [statsRefresh, setStatsRefresh] = useState(0);

  const startMatch = useCallback(() => {
    setMatch(newMatch());
    setTab('home');
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
        // Match is over — settle via complete_match, then show result
        const correctCount = prev.results.filter(Boolean).length;
        completeMatch({
          playerScore: correctCount,
          opponentScore: prev.opponentScore,
          correctCount,
          total: prev.questions.length,
          isGuest: !user,
        })
          .then((settled) => {
            setMatch((m) => (m ? { ...m, settled } : m));
            setStatsRefresh((n) => n + 1);
          })
          .catch((err) => {
            console.error('complete_match failed', err);
            setMatch((m) => (m ? { ...m, settled: { error: err.message } } : m));
          });
        setPhase('result');
        return prev;
      }
      setPhase('question');
      return { ...prev, index: nextIndex };
    });
  }, [user]);

  const handleReplay = useCallback(() => {
    setMatch(null);
    setPhase('home');
    setTab('home');
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

  if (loading) {
    return (
      <div className="app surface-light">
        <div className="splash-loading">
          <div className="splash-dot" />
        </div>
      </div>
    );
  }

  if (supabaseEnabled && !session && !guestMode) {
    return <LoginScreen onGuest={chooseGuest} />;
  }

  const isGuest = !session;

  // Mid-match views take over the whole screen — no tab bar visible
  if (phase === 'question' && match) {
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

  if (phase === 'reward' && match) {
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

  if (phase === 'result' && match) {
    const playerScore = match.results.filter(Boolean).length;
    return (
      <ResultScreen
        playerScore={playerScore}
        opponent={match.opponent}
        opponentScore={match.opponentScore}
        total={match.questions.length}
        results={match.results}
        totalPwen={match.totalPwen}
        settled={match.settled}
        onReplay={handleReplay}
      />
    );
  }

  // Tabbed views (home, lidè, boutik, profil)
  let content;
  if (tab === 'home') {
    content = (
      <HomeScreen
        onStart={startMatch}
        onAbout={handleAbout}
        user={user}
        isGuest={isGuest}
        onSignIn={goToLogin}
        onSignOut={handleSignOut}
      />
    );
  } else if (tab === 'lide') {
    content = (
      <ComingSoonScreen
        icon="🏆"
        title="LIDÈ"
        phase="Phase 4"
        blurb="Klasman Mondyal · Zanmi · Ayiti — ap vini pou ou wè kiyès ki chanpyon semèn nan."
      />
    );
  } else if (tab === 'boutik') {
    content = (
      <ComingSoonScreen
        icon="🛍️"
        title="BOUTIK"
        phase="Phase 6b"
        blurb="Pouwa (50-50, Sote Kesyon, Tan Siplemantè, Double Pwen), packs, ak aparans."
      />
    );
  } else if (tab === 'profil') {
    content = (
      <ProfileScreen
        user={user}
        isGuest={isGuest}
        onSignIn={goToLogin}
        onSignOut={handleSignOut}
        refreshKey={statsRefresh}
      />
    );
  }

  return (
    <>
      {content}
      <TabBar active={tab} onChange={setTab} />
    </>
  );
}
