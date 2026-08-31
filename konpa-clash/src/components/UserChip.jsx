// Small pill in the home header showing the signed-in user's initial,
// with a tap-to-sign-out affordance.

export function UserChip({ user, onSignOut }) {
  const email = user?.email || '';
  const initial = (email[0] || 'U').toUpperCase();
  const short = email.length > 22 ? email.slice(0, 20) + '…' : email;
  return (
    <button className="user-chip" onClick={onSignOut} type="button" title="Deconekte">
      <span className="user-chip-avatar" aria-hidden="true">{initial}</span>
      <span className="user-chip-email">{short}</span>
    </button>
  );
}
