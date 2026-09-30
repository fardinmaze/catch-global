<script setup>
import { ref, computed } from 'vue'
import { work, workFilters, home } from '../data/site'
import AppIcon from '../components/AppIcon.vue'
import PageHero from '../components/PageHero.vue'
import ClientStrip from '../components/ClientStrip.vue'
import CtaBand from '../components/CtaBand.vue'

const heroBlobs = [
  ['#f2b632', 0.22, 0.35, 0.8, 0.75],
  ['#1e5fd6', 0.55, 0.45, 0.65, 0.3],
  ['#0b2a6b', 0.7, 0.5, 0.2, 0.6],
]

const filter = ref('all')
const list = computed(() => (filter.value === 'all' ? work : work.filter((w) => w.tags.includes(filter.value))))
</script>

<template>
  <div>
    <PageHero eyebrow="Our Work" :title="home.work.title" :body="home.work.body" :blobs="heroBlobs" glow="70% 70%">
      <template #aside>
        <div class="ticker" aria-hidden="true">
          <div class="ticker__col">
            <RouterLink v-for="(w, i) in [...work, ...work]" :key="i" :to="`/our-work#${w.slug}`" class="ticker__item" tabindex="-1">
              <span class="ticker__tag">{{ w.eyebrow.split('•')[0] }}</span>
              <span class="ticker__name">{{ w.client }}</span>
            </RouterLink>
          </div>
        </div>
      </template>
    </PageHero>
    <ClientStrip />

    <section class="section">
      <div class="container">
        <div class="filters" role="group" aria-label="Filter work">
          <button
            v-for="f in workFilters"
            :key="f.id"
            class="filter"
            :class="{ 'is-active': filter === f.id }"
            :aria-pressed="filter === f.id"
            @click="filter = f.id"
          >{{ f.label }}</button>
        </div>

        <TransitionGroup name="list" tag="div" class="cases">
          <article v-for="(w, i) in list" :id="w.slug" :key="w.slug" class="case">
            <header class="case__head">
              <span class="case__num">{{ String(i + 1).padStart(2, '0') }}</span>
              <p class="case__eyebrow">{{ w.eyebrow }}</p>
              <h2>{{ w.client }}<span v-if="w.title"> — {{ w.title }}</span></h2>
              <p class="case__summary">{{ w.card }}</p>
              <a v-for="l in w.links" :key="l.href" :href="l.href" target="_blank" rel="noopener" class="link-arrow">
                {{ l.label }} <AppIcon name="external" :size="15" /><span class="sr-only">(opens in a new tab)</span>
              </a>
            </header>
            <div class="case__body">
              <p v-for="(p, j) in w.story" :key="j">{{ p }}</p>
              <div class="case__deliv">
                <h3>Services / deliverables</h3>
                <ul>
                  <li v-for="d in w.deliverables" :key="d"><AppIcon name="check" :size="16" /> {{ d }}</li>
                </ul>
              </div>
            </div>
          </article>
        </TransitionGroup>

        <p class="also">Also working with <strong>SCIREX</strong>, a Nordic-inspired wellness business in the recovery and wellness sector.</p>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container experience">
        <div>
          <p class="eyebrow" v-reveal>Selected team experience</p>
          <h2 class="h2" v-reveal="80">Technology platforms from our wider team.</h2>
        </div>
        <div class="experience__side" v-reveal="160">
          <p class="lead">Members of our wider delivery team have built public-information mobile apps and civic-technology platforms. That work sits outside our Australian client portfolio and is shown separately.</p>
          <RouterLink to="/technology" class="link-arrow">See technology experience <AppIcon name="arrow-up-right" :size="18" /></RouterLink>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.ticker {
  height: 440px;
  overflow: hidden;
  mask-image: linear-gradient(180deg, transparent, #000 18%, #000 82%, transparent);
}
.ticker__col { display: grid; gap: 10px; animation: rise 36s linear infinite; }
.ticker:hover .ticker__col { animation-play-state: paused; }
.ticker__item {
  display: grid;
  gap: 4px;
  padding: 18px 22px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 24, 39, 0.55);
  backdrop-filter: blur(8px);
  transition: background 0.3s, border-color 0.3s;
}
.ticker__item:nth-child(odd) { margin-left: 48px; }
.ticker__item:hover { background: var(--brand); border-color: var(--brand); }
.ticker__tag { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); }
.ticker__name { font-family: var(--font-display); font-size: clamp(20px, 2vw, 26px); font-weight: 600; letter-spacing: -0.01em; }
@keyframes rise { to { transform: translateY(calc(-50% - 5px)); } }
@media (max-width: 960px) { .ticker { height: 300px; } .ticker__item:nth-child(odd) { margin-left: 24px; } }

.filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: clamp(40px, 5vw, 64px); }
.filter {
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: none;
  color: var(--muted);
  font-size: 15px;
  transition: background 0.25s, border-color 0.25s, color 0.25s;
}
.filter:hover { color: var(--text); border-color: rgba(255, 255, 255, 0.3); background: rgba(255, 255, 255, 0.05); }
.filter.is-active { background: var(--text); border-color: var(--text); color: var(--ink); }
.filter:active { transform: scale(0.97); }

.cases { display: grid; }
.case {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: clamp(32px, 6vw, 96px);
  padding: clamp(40px, 5vw, 64px) 0;
  border-top: 1px solid var(--line);
}
.case__head { position: sticky; top: 120px; align-self: start; display: grid; gap: 14px; justify-items: start; }
.case__num { font-family: var(--font-display); color: var(--muted); font-size: 14px; }
.case__eyebrow { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--brand-bright); }
.case h2 { font-size: clamp(28px, 3.2vw, 40px); }
.case h2 span { color: var(--muted); font-weight: 500; }
.case__summary { color: var(--muted); }
.case__body { display: grid; gap: 18px; color: #c9d0dd; font-size: 17px; }
.case__deliv { margin-top: 12px; padding: 24px; border-radius: var(--radius); background: var(--bg-2); border: 1px solid var(--line); }
.case__deliv h3 { font-size: 16px; margin-bottom: 14px; color: var(--text); }
.case__deliv ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px 20px; font-size: 15px; }
.case__deliv li { display: flex; gap: 10px; align-items: flex-start; }
.case__deliv svg { color: var(--gold); flex: none; margin-top: 4px; }

.also { margin-top: 24px; padding-top: 32px; border-top: 1px solid var(--line); color: var(--muted); }
.also strong { color: var(--text); }

.experience { display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; align-items: end; }
.experience__side { display: grid; gap: 20px; justify-items: start; }

.list-enter-active, .list-leave-active { transition: opacity 0.35s, transform 0.35s var(--ease); }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(12px); }
.list-leave-active { position: absolute; visibility: hidden; }

@media (max-width: 860px) {
  .case, .experience { grid-template-columns: 1fr; }
  .case__head { position: static; }
}
@media (max-width: 560px) { .case__deliv ul { grid-template-columns: 1fr; } }
</style>
