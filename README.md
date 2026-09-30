# Catch Global – website

Public website for **Catch Global Pty Ltd** (ABN 19 702 264 122), built from the final content handover in
`docs/Catch_Global_Website_Content_Build_Pack_FINAL_WITH_OFFICIAL_LOGO.docx` (30 Sep 2026).

- **Stack:** Vue 3 + Vite + vue-router, plain CSS tokens (`src/styles/main.css`)
- **Pages:** `/` · `/about` · `/services` · `/technology` · `/our-work` · `/team` · `/contact` · `/privacy` · `/terms`
- **Brand:** official logo (blue/gold globe) exported to `public/brand/`; favicons from the globe symbol. Accents royal blue `#1e5fd6` + gold `#f2b632`
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

- The **Get a Quote form** (`/contact`) and the **enquiry assistant** (floating button, every page) both call `src/lib/enquiry.js`.
- Set `VITE_ENQUIRY_ENDPOINT` (a form service, CRM webhook or API) in `.env` to POST enquiries as JSON.
  Without it, submissions fall back to opening a pre-filled email to `company.email`.
- The assistant is a **scripted** version of the pack’s chatbot script: it never quotes prices, dates or guarantees.
  An AI model can be put behind the same steps later once FAQs and routing are approved.

## Button states

Defined once in `main.css` for every variant (`btn--primary`, `btn--ghost`, `btn--brand`, `btn--dark`):
default → hover (colour fill sweeps in, arrow nudges, lift/shadow) → active (pressed scale) → focus-visible (gold ring) → disabled.

## Needs input before public launch

| Item | Where |
|---|---|
| Live enquiry inbox (pack suggests `enquiries@catchglobal.com.au`, **not yet confirmed**). Set `emailConfirmed: true` to show it publicly | `src/data/site.js` → `company` |
| Approved business phone (hidden while empty) | `company.phone` |
| Enquiry endpoint / CRM | `VITE_ENQUIRY_ENDPOINT` |
| Privacy Policy + Terms: drafts with bracketed gaps (analytics, processors). Legal review required | `src/views/PrivacyView.vue`, `TermsView.vue` |
| Live domain, then add sitemap + absolute OG/schema URLs | `index.html`, `public/robots.txt` |
| Approved project images (covers are typographic placeholders) | `WorkCard.vue` |
| Product screenshots/logos for SMICEE, NextCart, QuickCV | `ProductCard.vue` |
| Team headshots: 7 taken from catchbangladesh.com/career/team (`public/team/`); 9 still initials (Aktaruzzaman Rasel, Md Rakibul Islam, Rafid Rahman, DM Bikash, Tazkir Taher, Mahbub Elahi Rizvee, Rahat Howlader, Shamiul Islam, Bashar Billah). Mustakim Hassan + Samiur held until titles confirmed; Md Siam Mahmud held for title check | `data/site.js` → `team` (add `photo`) |
| Client logos (names only for now: permission needed) | `ClientStrip.vue` |
| Fully Promoted SEO figures: held until client approval | `data/site.js` → `work` |
| Budget and timing ranges in the form are placeholders: confirm with management | `data/site.js` → `enquiry` |
