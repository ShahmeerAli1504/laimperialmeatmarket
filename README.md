# La Imperial Meat Market & Taqueria

Bilingual (EN/ES) website for La Imperial Meat Market & Taqueria — Winnemucca, NV.
Two stores: 5184 E Winnemucca Blvd · 1200 S Bridge St.

**Stack:** Next.js 16 (App Router, TypeScript) · Tailwind CSS 4 · Supabase · Gmail SMTP (Nodemailer).
Deploy on Vercel (framework preset **Next.js**).

## Run it

```bash
npm install
cp .env.example .env.local   # fill in Gmail + Supabase keys
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Where things live

| Path | What |
| --- | --- |
| `app/page.tsx` | Home: departments, story, carnicería, butcher's guide, wild game, taquería, panadería, abarrotes, catering, locations |
| `app/menu/page.tsx` | Full taquería menu (`/menu`) |
| `app/contact/page.tsx` | Contact page with form, hours and FAQ (`/contact`) |
| `app/api/contact/route.ts` | Contact form API — saves to Supabase, emails the store through Gmail SMTP |
| `lib/data.ts` | Locations, hours, DoorDash/Instagram links, all menu items & prices (**edit here**) |
| `lib/es.ts` | Spanish text. English text is inline in the pages as `<T k="key">English</T>` |
| `lib/cuts.tsx` | Butcher's guide cut names, descriptions and options |
| `components/` | Header/footer/order bar, language switcher, menu cards, cut guide, contact form |
| `app/legacy.css` | The site's design (carried over unchanged from the HTML version) |
| `app/globals.css` | Tailwind setup |
| `supabase/migrations/` | Database schema |

## Tailwind

Tailwind runs **without Preflight** and with a **`tw:` prefix**, so it can never restyle the
existing design (the site uses class names like `outline`, `shadow` and `inset` that are also
Tailwind utility names). Write utilities as `tw:flex`, `tw:text-gold`, `tw:md:grid-cols-2`.
Brand colors are available as Tailwind colors: `ink`, `char`, `wood`, `gold`, `gold-hi`, `red`,
`cream`, `muted`, `dim`, `line`; fonts as `tw:font-display`, `tw:font-script`, `tw:font-body`.

## Contact form setup

1. **Supabase:** create a project, then run `supabase/migrations/0001_contact_messages.sql` in the
   SQL editor. Copy the project URL and the **service role** key (Project Settings → API) into
   `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`. Messages appear in the `contact_messages` table.
2. **Gmail SMTP:** on the sending Google account turn on 2-Step Verification, then create an
   **App Password** (Google Account → Security → App passwords). Set `GMAIL_USER` and
   `GMAIL_APP_PASSWORD`, and `CONTACT_TO_EMAIL` for where messages should go (defaults to `GMAIL_USER`).
3. Add the same variables in Vercel → Project → Settings → Environment Variables.

Until at least one of them is configured, the form tells customers to call the store instead
(nothing is lost silently). If only one is configured, the message is still accepted.

Built by Nexora Digital.
