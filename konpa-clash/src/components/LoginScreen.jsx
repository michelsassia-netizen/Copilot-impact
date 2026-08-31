// Screen: magic-link login (cream surface, matches design system).
// Copy per spec: "Antre pou kenbe pwen ou" + why-to-signin explainer.
// Guests can also skip and play — "Jwe kòm envite".

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { TanbouRays } from './TanbouRays.jsx';
import { BottomWave } from './BottomWave.jsx';
import { SponsorBand } from './SponsorBand.jsx';

export function LoginScreen({ onGuest }) {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [errMsg, setErrMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setState('sending');
    try {
      await signInWithEmail(email.trim());
      setState('sent');
    } catch (err) {
      setState('error');
      setErrMsg(err?.message || 'Yon erè rive. Reeseye.');
    }
  }

  return (
    <div className="app surface-light">
      <div className="login">
        <div className="login-hero">
          <TanbouRays />
        </div>

        <h1 className="login-title">Antre pou kenbe pwen ou</h1>
        <p className="login-sub">
          Konekte ak imèl ou pou sove <strong>win-streak</strong> ou,
          monte nan <strong>klasman an</strong>, e kolekte badj yo.
        </p>

        {state === 'sent' ? (
          <div className="login-sent">
            <div className="login-emoji" aria-hidden="true">✉️</div>
            <p className="login-sent-title">Tcheke imèl ou</p>
            <p className="login-note">
              Nou voye yon lyen sikret bay <strong>{email}</strong>. Klike li pou konekte.
            </p>
            <button
              className="cta cta-secondary"
              type="button"
              onClick={() => { setState('idle'); setEmail(''); }}
            >
              Sèvi ak yon lòt imèl
            </button>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="imèl@ou.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="login-input"
              disabled={state === 'sending'}
              aria-label="Adrès imèl"
            />
            {state === 'error' && <p className="login-error">{errMsg}</p>}
            <button
              className="cta cta-primary"
              type="submit"
              disabled={state === 'sending' || !email}
            >
              {state === 'sending' ? 'Voye lyen…' : 'Voye lyen sikret'}
            </button>
          </form>
        )}

        <div className="login-divider"><span>oswa</span></div>

        <button className="cta cta-secondary" onClick={onGuest} type="button">
          Jwe kòm envite
        </button>
        <p className="login-guest-note">
          Kòm envite ou kapab jwe, men pwen ak streak ou p'ap sove.
        </p>
      </div>
      <BottomWave />
      <SponsorBand />
    </div>
  );
}
