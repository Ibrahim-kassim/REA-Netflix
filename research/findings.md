# What REA found on netflix.com (public page, 8 Nov 2026)

REA (`capture_browser_scenario`, fresh browser, no clicks, 1440×900) — evidence `ev_3e4d08964e07…`.

**Page structure** (from Netflix's own `data-uia` component names):
- `header`: logo, language picker, Sign In
- `nmhp-hero`: headline «Unlimited movies, TV shows, and more» + email form
- `nmhp-top-10`: «Trending Now», ranked items `top-10-element-1…10`
- `nmhp-full-value-props`: «More Reasons to Join», 4 cards
- `nmhp-faq`: accordion, 6 questions (`nmhp-faq-q-0…5`)
- `footer`: sign-up form + links

**Technology:** React app split into webpack chunks (`assets.nflxext.com/web/ffe/wp/*.js`), its own design-system
tokens (`--hcw--…` CSS variables), images from the Open Connect CDN (`*.nflxso.net`), OneTrust cookie banner,
reCAPTCHA Enterprise, telemetry to `logs.netflix.com`, and ad/analytics pixels (Google, The Trade Desk, Meta,
Snapchat, TikTok). 121 requests in the first 11 seconds.

**What REAflix copies:** the section structure and the patterns (ranked Top 10 row, value cards, FAQ accordion,
billboard + genre rows). **What it does not copy:** name, logo, text, images, films or code — all REAflix code is new.
Netflix's servers are private; REAflix's API and media server are our own design.
