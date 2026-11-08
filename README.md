# REAflix

A Netflix-style streaming app, rebuilt after **REA** scanned Netflix's public page (see `research/findings.md`).
Own brand, own code, and real **open movies** from the Blender Foundation (Creative Commons).

```
frontend/  (React 19 + Vite 7 + Tailwind 4)  ──JSON──▶  backend/  (Flask 3 + MongoDB 8)
     │                                                      │ signs short-lived video links
     └──────────── images & video (HTTP Range) ◀──────  media-server/  (Node 22 + Express 5)
```

## Run it
First time only: copy every `.env.example` to `.env` and put your own passwords and secrets in them
(the MongoDB password in `backend/.env` must match `database/.env`; `MEDIA_SIGNING_SECRET` must be the same in
`backend/.env` and `media-server/.env`), then install:
```bash
cd backend && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
cd media-server && npm install
cd frontend && npm install
```
Then (4 terminals):
```bash
docker compose up -d                                      # MongoDB 8 on 127.0.0.1:27018
cd backend && .venv/bin/python -m seed.seed && .venv/bin/python run.py   # API on :5001
cd media-server && npm start                              # media on :4000
cd frontend && npm run dev                                # web app on :5173
```
Each project has its own `.env` (copy from `.env.example`). MongoDB Compass:
`mongodb://reaflix_admin:<password in database/.env>@localhost:27018/?authSource=admin`, database `reaflix`.
Local demo account (test values only): `demo@reaflix.io` / `DemoPass#2026`.

**Admin dashboard** (`/admin`): sign in as `admin@reaflix.io`; the password is `ADMIN_PASSWORD` in `backend/.env`.
Change it there any time, then run `cd backend && .venv/bin/python -m seed.admin` to apply it.
`.venv/bin/python -m seed.sample_activity` adds 36 sample viewers (marked "Sample") so the charts have history.

## What's in it
- **Viewers:** "Who's watching?" profiles (up to 5, Kids profiles see All ages / 7+ only) · billboard with a muted
  trailer · Top 10 row · hover previews · details window (`?title=`) with More Like This · Continue Watching ·
  thumbs up/down and % match · My List per profile · New & Popular · search.
- **Player:** resumes where you stopped, saves your place every 10 s, auto-hiding controls, ±10 s, volume,
  full screen, keyboard (Space/K, ←/→, ↑/↓, M, F).
- **Admin:** live KPIs, plays per day and new members per day (hover or arrow keys for values, "View as table"),
  top titles this week · Titles: search, edit any title, choose the billboard and Top 10 order (positions swap)
  · Members: role (admin/member) and pause/restore access, 12 per page with the next page prefetched.
  The API checks the admin role on every call; an admin can't remove their own access.
  Screenshots: `research/app-screens/v2/`.

## Folders
- **frontend/src**: `pages/` (+ `pages/admin/`) · `layouts/` (public, app, admin) · `routes/` · `controllers/` (page logic hooks,
  + `controllers/admin/`) · `components/ui|media|title|player|profiles|landing|layout|forms|admin/` (reusable, e.g. one
  `DataTable`, one `ChartCard`) · `services/` (API calls) · `models/` (types) · `hooks/` · `utils/` · `config/` · `brand/` · `styles/`
- **backend/app**: `routes/` → `controllers/` → `services/` → `models/` · `schemas/` (validation) · `middleware/` · `utils/`
- **media-server/src**: `routes/` → `controllers/` → `services/` · `middlewares/` · `utils/` · `config/`

Rule kept everywhere: **no file over 100 lines** (the longest is 74), small reusable functions and components.

## Security
Argon2id passwords · JWT in an httpOnly, SameSite cookie (never readable by scripts) · JSON-only writes + CORS
allow-list (CSRF) · Pydantic validation, unknown fields rejected · slug allow-list (NoSQL-injection guard) ·
rate limits (sign-in 10/min) · profile ownership checked on every profile call · admin role read from the database
on every admin call · strict security headers + Helmet · signed, expiring video URLs (HMAC-SHA256) ·
path-traversal guard on media · secrets only in `.env` · MongoDB with its own user, bound to localhost.

## Speed
One aggregation per page (`$lookup`, **no N+1**) · indexes on every query · keyset pagination · server cache
(Flask-Caching) + HTTP `Cache-Control` · React Query cache, prefetch on hover · route code-splitting · lazy rows
(IntersectionObserver) and lazy, responsive images (`srcset`) · year-long immutable image caching + ETags ·
video streaming with HTTP Range (206).

## Credits
Films and posters: Blender Foundation / Blender Studio, via Wikimedia Commons, under CC BY 2.5/3.0/4.0 and
CC BY-SA 3.0 (Cosmos Laundromat). Each title's licence and source link are shown on its page.
