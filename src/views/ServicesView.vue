<script setup>
import { ref, computed } from 'vue'
import { services, servicesIntro, serviceTerms } from '../data/site'
import AppIcon from '../components/AppIcon.vue'
import PageHero from '../components/PageHero.vue'
import CtaBand from '../components/CtaBand.vue'

// Service finder: search across the category titles, their items and the
// pack's search terms; matching categories stay visible, others dim.
const heroBlobs = [
  ['#1e5fd6', 0.55, 0.45, 0.8, 0.45],
  ['#5aa8ff', 0.25, 0.3, 0.6, 0.8],
  ['#0b2a6b', 0.7, 0.5, 0.2, 0.3],
]

const query = ref('')
const q = computed(() => query.value.trim().toLowerCase())
const matches = computed(() => {
  if (!q.value) return null
  return new Set(
    services
      .filter((s) =>
        [s.title, s.headline, ...s.items].some((t) => t.toLowerCase().includes(q.value)) ||
        serviceTerms.some(([term, id]) => id === s.id && term.toLowerCase().includes(q.value)),
      )
      .map((s) => s.id),
  )
})
const visibleTerms = computed(() =>
  q.value ? serviceTerms.filter(([t]) => t.toLowerCase().includes(q.value)) : serviceTerms,
)
const titleOf = (id) => services.find((s) => s.id === id).title
</script>

<template>
  <div>
    <PageHero eyebrow="Services" :title="servicesIntro.title" :body="servicesIntro.body" :blobs="heroBlobs" glow="75% 60%">
      <template #aside>
        <nav class="index" aria-label="Service areas">
          <RouterLink v-for="(sv, i) in services" :key="sv.id" :to="`/services#${sv.id}`" class="index__tile">
            <span class="index__num">0{{ i + 1 }}</span>
            <span class="index__icon"><AppIcon :name="sv.icon" :size="22" /></span>
            <span class="index__title">{{ sv.title }}</span>
          </RouterLink>
        </nav>
      </template>
    </PageHero>

    <section class="finder">
      <div class="container">
        <div class="finder__box">
          <label class="finder__search">
            <AppIcon name="search" :size="20" />
            <span class="sr-only">Find a service</span>
            <input v-model="query" type="search" placeholder="Find a service — e.g. local SEO, CRM, live streaming" />
          </label>
          <div class="finder__terms">
            <RouterLink
              v-for="[term, id] in visibleTerms"
              :key="term"
              :to="`/services#${id}`"
              class="term"
              :title="titleOf(id)"
            >{{ term }}</RouterLink>
            <p v-if="!visibleTerms.length && matches && !matches.size" class="finder__none">
              No exact match — <RouterLink to="/contact">tell us what you need</RouterLink> and we’ll point you to the right capability.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section list">
      <div class="container">
        <article
          v-for="(s, i) in services"
          :id="s.id"
          :key="s.id"
          class="service"
          :class="{ 'is-dim': matches && !matches.has(s.id) }"
        >
          <div class="service__label">
            <span class="service__num">0{{ i + 1 }}</span>
            <span class="service__icon"><AppIcon :name="s.icon" :size="28" /></span>
            <h2>{{ s.title }}</h2>
          </div>
          <div class="service__body">
            <p class="service__headline">{{ s.headline }}</p>
            <ul class="service__items">
              <li v-for="item in s.items" :key="item">{{ item }}</li>
            </ul>
            <div class="service__who">
              <strong>Who it’s for</strong>
              <p>{{ s.who }}</p>
            </div>
            <div class="service__ctas">
              <RouterLink to="/contact" class="btn btn--primary btn--sm">Get a Quote <AppIcon name="arrow" :size="16" /></RouterLink>
              <RouterLink to="/contact" class="btn btn--ghost btn--sm">Discuss Your Project</RouterLink>
            </div>
          </div>
        </article>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.index { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.index__tile {
  position: relative;
  display: grid;
  gap: 14px;
  align-content: space-between;
  min-height: 132px;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(17, 24, 39, 0.6);
  backdrop-filter: blur(10px);
  transition: background 0.35s, border-color 0.35s, transform 0.35s var(--ease);
}
.index__tile:nth-child(3n + 2) { transform: translateY(18px); }
.index__tile:hover { background: var(--brand); border-color: var(--brand); transform: translateY(-4px); }
.index__tile:nth-child(3n + 2):hover { transform: translateY(12px); }
.index__num { position: absolute; top: 16px; right: 18px; font-family: var(--font-display); font-size: 12px; color: var(--muted); transition: color 0.3s; }
.index__icon { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; background: rgba(90, 168, 255, 0.15); color: var(--brand-bright); transition: background 0.3s, color 0.3s; }
.index__title { font-family: var(--font-display); font-weight: 600; font-size: 16px; line-height: 1.2; }
.index__tile:hover .index__icon { background: var(--gold); color: var(--ink); }
.index__tile:hover .index__num { color: rgba(255, 255, 255, 0.8); }
@media (max-width: 960px) { .index { grid-template-columns: repeat(3, 1fr); } .index__tile:nth-child(3n + 2) { transform: none; } }
@media (max-width: 560px) { .index { grid-template-columns: 1fr 1fr; } .index__tile { min-height: 110px; } }

.finder {
  position: sticky;
  top: calc(var(--header-h) - 1px);
  z-index: 40;
  background: rgba(10, 14, 23, 0.94);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
}
.finder__box {
  padding: 12px 0;
  display: grid;
  grid-template-columns: minmax(240px, 340px) 1fr;
  gap: 14px;
  align-items: center;
}
.finder__search {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  background: var(--bg-2);
  color: var(--muted);
  transition: border-color 0.25s, box-shadow 0.25s;
}
.finder__search:focus-within { border-color: var(--brand-bright); box-shadow: 0 0 0 3px rgba(90, 168, 255, 0.2); }
.finder__search input { flex: 1; min-width: 0; min-height: 44px; border: 0; background: none; color: var(--text); font: inherit; font-size: 16px; }
.finder__search input:focus { outline: none; }
.finder__terms {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  mask-image: linear-gradient(90deg, #000 90%, transparent);
}
.finder__terms::-webkit-scrollbar { display: none; }
.term {
  flex: none;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  font-size: 14px;
  color: #c3cbdb;
  transition: background 0.25s, border-color 0.25s, color 0.25s;
}
.term:hover { background: var(--brand); border-color: var(--brand); color: #fff; }
.finder__none { color: var(--muted); font-size: 14px; }
.finder__none a { color: var(--gold); text-decoration: underline; }

.service {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: clamp(32px, 6vw, 96px);
  padding: clamp(48px, 6vw, 80px) 0;
  border-bottom: 1px solid var(--line);
  scroll-margin-top: 160px;
  transition: opacity 0.4s;
}
.service:first-child { padding-top: 0; }
.service.is-dim { opacity: 0.25; }
.service__label { position: sticky; top: calc(var(--header-h) + 100px); align-self: start; display: grid; gap: 18px; justify-items: start; }
.service__num { font-family: var(--font-display); color: var(--muted); font-size: 14px; }
.service__icon { width: 60px; height: 60px; border-radius: 18px; display: grid; place-items: center; background: rgba(30, 95, 214, 0.16); color: var(--brand-bright); }
.service__label h2 { font-size: clamp(28px, 3.2vw, 40px); }
.service__body { display: grid; gap: 28px; }
.service__headline { font-family: var(--font-display); font-size: clamp(22px, 2.2vw, 28px); line-height: 1.3; letter-spacing: -0.01em; }
.service__items { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.service__items li { padding: 8px 14px; border-radius: 999px; background: var(--bg-2); border: 1px solid var(--line); font-size: 14px; color: #c9d0dd; }
.service__who { padding: 20px 24px; border-left: 3px solid var(--gold); background: rgba(242, 182, 50, 0.06); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.service__who strong { display: block; font-family: var(--font-display); font-weight: 600; margin-bottom: 6px; }
.service__who p { color: var(--muted); }
.service__ctas { display: flex; flex-wrap: wrap; gap: 10px; }

@media (max-width: 860px) {
  .finder__box { grid-template-columns: 1fr; gap: 10px; padding: 10px 0; }
  .service { grid-template-columns: 1fr; }
  .service__label { position: static; }
}
</style>
