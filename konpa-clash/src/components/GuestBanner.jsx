// Slim banner shown to guest players nudging them to sign in.
// "Konekte pou sove streak ou." per spec.

export function GuestBanner({ onSignIn }) {
  return (
    <div className="guest-banner" role="status">
      <span className="guest-banner-msg">
        Konekte pou sove streak ou.
      </span>
      <button className="guest-banner-btn" onClick={onSignIn} type="button">
        Konekte
      </button>
    </div>
  );
}
