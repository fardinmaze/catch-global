# Catch Global – website

Public website for **Catch Global Pty Ltd** (ABN 19 702 264 122), built from the final content handover in
`docs/Catch_Global_Website_Content_Build_Pack_FINAL_WITH_OFFICIAL_LOGO.docx` (30 Sep 2026).

- **Stack:** Vue 3 + Vite + vue-router, plain CSS tokens (`src/styles/main.css`)
- **Pages:** `/` · `/about` · `/services` · `/technology` · `/our-work` · `/team` · `/contact` · `/privacy` · `/terms`
- **Brand:** Catch Global logo (green C + gold globe, supplied 12 Oct 2026; original in `docs/brand/catch-global-logo-new-original.png`), trimmed and exported to `public/brand/`; favicons, social card and touch icon are regenerated from it. Black wordmark, so it always sits on white (navbar, footer plate). The page palette is still royal blue `#1e5fd6` + gold `#f2b632`
- **Veteran-owned badge:** the slim top bar above the nav and the footer both show “Veteran-Owned Australian Business”. Original artwork is in `docs/brand/veteran-owned-business-logo-original.jpeg`. Transparent exports are in `public/brand/veteran-badge-*.webp` (white for dark surfaces, ink for light ones). The bar scrolls away, so only the 84px nav docks (`--topbar-h` in `main.css`)
- **Content:** all copy lives in `src/data/site.js`, taken from the pack. Internal notes and anything marked “permission required” are left out.

## Run

```bash
npm install
npm run dev      # http://localhost:5180
npm run build
```

The site uses HTML5 history routing, so the host must rewrite unknown paths to `index.html`
(Netlify `_redirects`, Vercel rewrites, Apache/Nginx fallback).

## Enquiries

- The **Get a Quote form** (`/contact`) and the **Send an enquiry** panel (floating button, every page, same form) both call `src/lib/enquiry.js`.
- Set `VITE_ENQUIRY_ENDPOINT` (a form service, CRM webhook or API) in `.env` to POST enquiries as JSON.
  Without it, submissions fall back to opening a pre-filled email to `company.email` (**info@catchglobal.com.au**, confirmed by the client 1 Oct 2026).
- There is no chatbot: the floating button just opens the same enquiry form in a panel.

## Button states

Defined once in `main.css` for every variant (`btn--primary`, `btn--ghost`, `btn--brand`, `btn--dark`):
default → hover (colour fill sweeps in, arrow nudges, lift/shadow) → active (pressed scale) → focus-visible (gold ring) → disabled.

## Needs input before public launch

| Item | Where |
|---|---|
| Approved business phone (hidden while empty) | `company.phone` |
| Enquiry endpoint / CRM | `VITE_ENQUIRY_ENDPOINT` |
| Privacy Policy + Terms: drafts with bracketed gaps (analytics, processors). Legal review required | `src/views/PrivacyView.vue`, `TermsView.vue` |
| Live domain, then add sitemap + absolute OG/schema URLs | `index.html`, `public/robots.txt` |
| Approved project images (covers are typographic placeholders) | `WorkCard.vue` |
| Product cover art is in (`public/products/`, originals in `docs/brand/project-covers/`); screenshots can be added later | `ProductCard.vue` |
| Team: photos shown for Leadership & Operations only (7, in `public/team/`; originals in `docs/team-photos/`). Technology and Creative use initials cards by request. Bios for Mustakim Hasan, Md Rakibul Islam (CBO), MD Siam Mahmud and MD Fardin Mazumder are placeholders: confirm wording | `data/site.js` → `team` |
| Client logos (names only for now: permission needed) | `ClientStrip.vue` |
| Fully Promoted SEO figures: held until client approval | `data/site.js` → `work` |
| Budget and timing ranges in the form are placeholders: confirm with management | `data/site.js` → `enquiry` |

## Full portfolio (Our Work)

- `src/data/portfolio.json` holds all 382 projects from catchbangladesh.com (fetched 12 Oct 2026; raw copy with CSV in `docs/portfolio-catchbangladesh/`). The Our Work page loads it lazily and groups it by category.
- Thumbnails, PDFs and videos are linked from `api.catchbangladesh.com` and YouTube rather than copied into this repo, so they depend on that site staying up.
