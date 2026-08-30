# Konpa Clash — Phase 1

Haitian music trivia game. Match-based: 6 verified questions per round vs. a
simulated opponent. Phase 1 is local-state only — no login, no database.

## Run it locally

1. Install [Node.js](https://nodejs.org/) (LTS, version 20 or newer).
2. From this folder:
   ```
   npm install
   npm run dev
   ```
3. Open the URL printed in the terminal (usually `http://localhost:5173/`).

## What's in Phase 1

- Mobile-first (max width 440px), Haitian visual system (indigo night, gold hero,
  beadwork frame, tap-tap woven stripe, gold star field, dancefloor glow).
- 6 verified questions in Kreyòl, hardcoded from the spec.
- Tap to answer → green (right) / red (wrong) → auto-advance.
- Result screen: your score, simulated opponent's score, head-to-head verdict,
  emoji grid, post-match title, Rejwe (play again) button.

## Not in Phase 1 (coming later)

Login, database, leaderboard, real opponents, async challenge, live match, admin
tools. See `CLAUDE-CODE-BUILD-PROMPT` for the full phase plan.
