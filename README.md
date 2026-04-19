# aiva-rose

Author website for Aiva Rose — dark romance novelist. Deployable to Vercel, lives at **aiva-rose.com**.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- No database — email signups currently log-only, ready to wire in Mailchimp or ConvertKit

## Pages

- `/` — Homepage: hero, Bound Hearts series (5 books), author bio, newsletter signup
- `/bonus` — Bonus scene landing page (linked from inside the printed books at `aiva-rose.com/bonus`)
- `/api/subscribe` — POST endpoint for both signup forms

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
vercel
```

Or connect the repo in the Vercel dashboard. `vercel.json` sets the framework to Next.js.

Point the `aiva-rose.com` domain at the Vercel project.

## Wiring the email provider

The subscribe endpoint is at `app/api/subscribe/route.ts`. See the header comment in that file for Mailchimp and ConvertKit integration sketches. Add API keys as environment variables in Vercel; never commit them.

## Design

- Colours: `#0d0d1a` (ink), `#f0ede6` (parchment), `#c9a96e` (gold)
- Fonts: Playfair Display (serif headings) + Inter (sans body)
- Bonus page uses a slightly lighter, warmer background (`#1a1625`) for intimacy

## Notes for the author

- Amazon links on the homepage are placeholders (`#`) — replace in `app/page.tsx` with real ASINs when available
- Contact link in the footer points to `hello@aiva-rose.com`; set up the mailbox or change the link
