# Phase 2 — Supabase setup (~15 minutes, no coding)

You'll create a free Supabase account, create a project, paste in the SQL
schema, and copy two keys into a `.env` file. That's it — the app already
knows how to use them.

## 1. Create a free Supabase account

Go to **https://supabase.com** and click **Start your project** (top-right).
Sign up with GitHub (fastest) or email + password. The free tier is fine — no
credit card required.

## 2. Create a new project

Click **New project**.

- **Name:** `konpa-clash`
- **Database password:** click the "Generate" button, then copy the
  password to your password manager. You almost never need it (the app uses
  a different key), but save it just in case.
- **Region:** pick one close to your audience. For US + Haiti diaspora,
  **East US (North Virginia)** is a good default. For Europe diaspora, pick
  **West EU (Ireland)**.
- **Pricing plan:** Free.

Click **Create new project**. It takes about 60 seconds to spin up.

## 3. Run the schema (copy-paste, one time)

Once the project is ready, in the left sidebar click **SQL Editor** →
**+ New query**.

Open the file `konpa-clash/supabase/schema.sql` from this repo, copy its
entire contents, paste into the query box, and click the green **Run**
button (bottom-right).

You should see **"Success. No rows returned"** — that means it worked.

If you re-run it later, it's safe: the SQL uses `IF NOT EXISTS` and
`ON CONFLICT` everywhere, so nothing gets duplicated.

## 4. Get your two keys

Left sidebar → **Project Settings** (gear icon at the bottom) → **API**.

Copy these two values:

- **Project URL** — looks like `https://abcdefghijk.supabase.co`
- **anon public** key (in the "Project API keys" section) — a long string
  starting with `eyJhbGciOi…`

The "anon" key is **safe to put in your web app** — it's designed to be
public. The other key ("service_role") is a secret; don't put that one
anywhere.

## 5. Paste keys into `.env`

In the `konpa-clash` folder, make a copy of the file `.env.example` and
rename it to **`.env`**.

Open `.env` in a text editor and paste your two values:

```
VITE_SUPABASE_URL=https://your-real-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...your-real-anon-key...
```

Save the file. That's it — the app will pick these up the next time it
starts.

## 6. Restart the dev server + test signup

In your terminal (in the `konpa-clash` folder):

```
npm run dev
```

Open `http://localhost:5173/` in your browser. You should now see a
**login screen** instead of the game.

- Type your email → click **Voye lyen sikret**.
- Check your inbox (and spam folder). You'll get an email from Supabase
  with a magic link.
- Click the link → the app opens back up and you're signed in.
- On the home screen, top-right, you'll see a **user chip** with your
  email initial. Tap it to sign out.

You can also click **"Jwe kòm envite"** to skip signup and play as a guest
(a small banner will remind you to sign in to save your streak).

## 7. Common gotchas

- **Email didn't arrive.** Check spam. If nothing after 5 minutes, in
  Supabase go to **Authentication → Users** — if your email is there, the
  send succeeded but the message got filtered. Try a different email
  address.
- **Magic link opens on a different device.** Supabase magic links only
  work in the same browser they were requested from (by default). Request
  from the browser you want to sign in on.
- **`.env` changes not picked up.** Vite reads `.env` at startup. Stop the
  dev server (`Ctrl + C` in the terminal) and re-run `npm run dev`.
- **Rate-limited emails.** Supabase's free tier throttles emails.
  Testing sign-in repeatedly may hit the limit. Wait a minute and retry.

## What's saved in Supabase right now

- **`profiles`** — one row per signed-up user (id, username, country)
- **`stats`** — one row per user, all zeros for now (Phase 3 wires wins,
  streak, coins, XP)
- **`questions`** — the 6 verified Kreyòl questions, seeded
- **`shop_items`** — the 4 power-ups, seeded

Everything else (matches, match_plays, badges, purchases, inventory,
daily_challenge) is empty tables ready for Phase 3+ to write into.

## Deploying (later)

When you eventually deploy to Vercel / Netlify, you'll set the same two
env vars in their dashboard. The `.env` file only matters on your own
computer.
