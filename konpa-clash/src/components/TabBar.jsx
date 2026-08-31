// Bottom tab bar — AKÈY · LIDÈ · BOUTIK · PROFIL
// LIDÈ (Phase 4) and BOUTIK (Phase 6b) show placeholder screens for now.

const TABS = [
  { key: 'home',    label: 'Akèy',   icon: '🏠' },
  { key: 'lide',    label: 'Lidè',   icon: '🏆' },
  { key: 'boutik',  label: 'Boutik', icon: '🛍️' },
  { key: 'profil',  label: 'Profil', icon: '👤' },
];

export function TabBar({ active, onChange }) {
  return (
    <nav className="tabbar" role="navigation" aria-label="Navigasyon prensipal">
      {TABS.map((t) => (
        <button
          key={t.key}
          className={`tab${active === t.key ? ' active' : ''}`}
          onClick={() => onChange(t.key)}
          type="button"
        >
          <span className="tab-icon" aria-hidden="true">{t.icon}</span>
          <span className="tab-label">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
