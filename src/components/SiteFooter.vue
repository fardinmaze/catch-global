<script setup>
import { company, nav, services } from '../data/site'
import BrandLogo from './BrandLogo.vue'

const links = nav.filter((n) => n.to !== '/')
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <BrandLogo size="large" />
          <p><strong>Catch Global</strong> — {{ company.tagline }}</p>
          <p class="footer__veteran">
            <img src="/brand/veteran-badge-white-h96.webp" width="61" height="64" alt="" />
            <span>{{ company.veteranOwned }}</span>
          </p>
        </div>

        <div class="footer__col">
          <h2>Company</h2>
          <RouterLink v-for="n in links" :key="n.to" :to="n.to">{{ n.label }}</RouterLink>
        </div>
        <div class="footer__col">
          <h2>Services</h2>
          <RouterLink v-for="s in services" :key="s.id" :to="`/services#${s.id}`">{{ s.title }}</RouterLink>
        </div>
        <div class="footer__col">
          <h2>Contact</h2>
          <span>{{ company.locationLong }}</span>
          <a v-if="company.emailConfirmed" :href="`mailto:${company.email}`">{{ company.email }}</a>
          <a v-if="company.phone" :href="`tel:${company.phone.replace(/\s/g, '')}`">{{ company.phone }}</a>
          <RouterLink to="/contact" class="link-arrow">Get a Quote →</RouterLink>
        </div>
      </div>

      <p class="footer__legal">
        {{ company.legalName }} &nbsp;|&nbsp; ABN {{ company.abn }} &nbsp;|&nbsp; ACN {{ company.acn }} &nbsp;|&nbsp; {{ company.locality }}
      </p>

      <div class="footer__bottom">
        <span>© 2026 {{ company.legalNameTitle }}. All rights reserved.</span>
        <nav aria-label="Legal">
          <RouterLink to="/privacy">Privacy Policy</RouterLink>
          <RouterLink to="/terms">Terms &amp; Conditions</RouterLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: #070a11; padding-top: clamp(64px, 8vw, 110px); border-top: 1px solid var(--line); }
.footer__top { display: grid; grid-template-columns: 1.5fr 1fr 1.4fr 1.3fr; gap: 40px; }
.footer__brand { display: grid; gap: 24px; align-content: start; justify-items: start; }
.footer__brand p { color: var(--muted); max-width: 38ch; font-size: 15px; }
.footer__brand strong { color: var(--text); font-weight: 600; }
.footer__brand .footer__veteran {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--text);
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.footer__veteran img { width: 61px; height: 64px; flex: none; }
.footer__col { display: grid; gap: 12px; align-content: start; font-size: 15px; }
.footer__col h2 {
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 500;
  margin-bottom: 8px;
}
.footer__col span { color: var(--muted); }
.footer__col a:not(.link-arrow) { justify-self: start; transition: color 0.3s; }
.footer__col a:not(.link-arrow):hover { color: var(--gold); }
.footer__col .link-arrow { justify-self: start; margin-top: 6px; }

.footer__legal {
  margin-top: clamp(48px, 6vw, 80px);
  padding-top: 24px;
  border-top: 1px solid var(--line);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--muted);
}
.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px 24px;
  padding: 20px 0 32px;
  color: var(--muted);
  font-size: 14px;
}
.footer__bottom nav { display: flex; gap: 24px; }
.footer__bottom a { transition: color 0.3s; }
.footer__bottom a:hover { color: var(--text); }

@media (max-width: 960px) { .footer__top { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px) { .footer__top { grid-template-columns: 1fr; } }
</style>
