<script setup>
// Closing "Get a Quote" call to action — used at the end of every main page.
import { cta, company } from '../data/site'
import AppIcon from './AppIcon.vue'
import GradientField from './GradientField.vue'

const blobs = [
  ['#1e5fd6', 0.75, 0.55, 0.2, 0.3],
  ['#0b2a6b', 0.8, 0.6, 0.75, 0.7],
  ['#f2b632', 0.3, 0.35, 0.9, 0.2],
]
</script>

<template>
  <section class="cta">
    <div class="container">
      <div class="cta__panel" v-reveal>
        <GradientField :blobs="blobs" :drift="0.22" />
        <div class="cta__copy">
          <h2>{{ cta.title }}</h2>
          <p>{{ cta.body }}</p>
          <p v-if="company.emailConfirmed" class="cta__email">
            <AppIcon name="mail" :size="18" />
            <span>Or email <a :href="`mailto:${company.email}`">{{ company.email }}</a></span>
          </p>
        </div>
        <div class="cta__actions">
          <RouterLink to="/contact" class="btn btn--primary btn--glow">{{ cta.button }} <AppIcon name="arrow" :size="18" /></RouterLink>
          <RouterLink to="/services" class="btn btn--ghost">Explore services</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta { padding-block: clamp(64px, 8vw, 110px); }
.cta__panel {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: calc(var(--radius) + 8px);
  border: 1px solid rgba(90, 168, 255, 0.25);
  background: var(--bg-2);
  padding: clamp(36px, 6vw, 80px);
  display: grid;
  grid-template-columns: 1.5fr auto;
  gap: 40px;
  align-items: end;
}
.cta__copy { display: grid; gap: 20px; }
.cta h2 { font-size: clamp(30px, 4vw, 52px); max-width: 20ch; }
.cta p { color: #c9d2e3; max-width: 56ch; font-size: 17px; }
.cta .cta__email { display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--muted); }
.cta__email svg { color: var(--gold); flex: none; }
.cta__email a { color: var(--text); text-decoration: underline; text-decoration-color: rgba(242, 182, 50, 0.6); text-underline-offset: 4px; transition: text-decoration-color 0.3s; }
.cta__email a:hover { text-decoration-color: var(--gold); }
.cta__actions { display: flex; flex-wrap: wrap; gap: 12px; }

@media (max-width: 860px) { .cta__panel { grid-template-columns: 1fr; } }
</style>
