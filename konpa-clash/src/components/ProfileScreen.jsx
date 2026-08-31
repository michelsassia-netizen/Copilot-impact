// Screen: Profile (PROFIL) — dark navy card with avatar, username,
// level title, XP bar, PWEN / KOUWÒN / POZISYON stat strip, and a badges
// grid. When guest, shows a big "Konekte pou sove pwen ou" CTA.

import { useStats } from '../hooks/useStats.js';
import { levelFromXp, BADGE_META } from '../data/levels.js';
import { SponsorBand } from './SponsorBand.jsx';

export function ProfileScreen({ user, isGuest, onSignIn, onSignOut, refreshKey }) {
  const { stats, profile, badges, loading } = useStats({ user, isGuest, refreshKey });
  const lvl = levelFromXp(stats.xp);
  const winRate = stats.matches_played > 0
    ? Math.round((stats.wins / stats.matches_played) * 100)
    : 0;

  return (
    <div className="app surface-light with-tabbar">
      <div className="profile">
        <div className="profile-card">
          <div className="profile-top">
            <div className="profile-avatar" aria-hidden="true">
              {(profile?.username?.[0] || 'W').toUpperCase()}
            </div>
            <div className="profile-id">
              <div className="profile-name">
                {profile?.username || 'Envite'} <span className="profile-flag">🇭🇹</span>
              </div>
              <div className="profile-level">Nivo {lvl.level} · {lvl.title}</div>
            </div>
          </div>

          <div className="xp-bar">
            <div
              className="xp-bar-fill"
              style={{ width: `${Math.round((lvl.into / lvl.span) * 100)}%` }}
            />
          </div>
          <div className="xp-label">{lvl.label}</div>

          <div className="profile-stats">
            <div className="profile-stat">
              <div className="profile-stat-val">{stats.coins.toLocaleString()}</div>
              <div className="profile-stat-label">Pwen</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-val">{stats.wins}</div>
              <div className="profile-stat-label">Kouwòn</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-val">
                {stats.wins > 0 ? '—' : '—'}
              </div>
              <div className="profile-stat-label">Pozisyon</div>
            </div>
          </div>
        </div>

        <div className="profile-secondary">
          <div className="profile-secondary-tile">
            <div className="profile-secondary-val">🔥 {stats.win_streak}</div>
            <div className="profile-secondary-label">Streak aktyèl</div>
          </div>
          <div className="profile-secondary-tile">
            <div className="profile-secondary-val">🏅 {stats.best_win_streak}</div>
            <div className="profile-secondary-label">Meyè streak</div>
          </div>
          <div className="profile-secondary-tile">
            <div className="profile-secondary-val">{stats.matches_played}</div>
            <div className="profile-secondary-label">Match jwe</div>
          </div>
          <div className="profile-secondary-tile">
            <div className="profile-secondary-val">{winRate}%</div>
            <div className="profile-secondary-label">Pousantaj gen</div>
          </div>
        </div>

        <h3 className="profile-section-title">Badj</h3>
        <div className="badges-grid">
          {Object.keys(BADGE_META).map((k) => {
            const has = badges.includes(k);
            const meta = BADGE_META[k];
            return (
              <div key={k} className={`badge${has ? ' earned' : ''}`}>
                <span className="badge-emoji">{meta.emoji}</span>
                <span className="badge-label">{meta.label}</span>
              </div>
            );
          })}
        </div>

        {isGuest && (
          <div className="guest-cta">
            <p className="guest-cta-title">Pwen ou p'ap sove kounye a.</p>
            <p className="guest-cta-body">
              Konekte pou kenbe streak, badj, e pozisyon w nan klasman an.
            </p>
            <button className="cta cta-primary" onClick={onSignIn} type="button">
              Konekte kounye a
            </button>
          </div>
        )}

        {!isGuest && user && (
          <button className="cta cta-secondary profile-signout" onClick={onSignOut} type="button">
            Deconekte
          </button>
        )}

        {loading && <div className="profile-loading">Chaje…</div>}
      </div>
      <SponsorBand />
    </div>
  );
}
