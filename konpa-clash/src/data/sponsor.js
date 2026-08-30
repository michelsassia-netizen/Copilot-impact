// Sponsor of the Day. Placeholder shape now — later, this will be fetched
// from the DB (Phase 2+) and rotate daily. Keep the shape stable so the UI
// doesn't have to change when real sponsors slot in.

export const SPONSOR_OF_DAY = {
  brand: 'MAK OU',           // brand short-name; falls back to a placeholder
  tagline: 'Espas pou patnè jodi a',
  href: null,                // optional link to sponsor site
  isPlaceholder: true,       // shows the "your-brand-here" styling
};
