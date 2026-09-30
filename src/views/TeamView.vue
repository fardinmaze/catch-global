<script setup>
import { ref, computed } from 'vue'
import { team } from '../data/site'
import PageHero from '../components/PageHero.vue'
import PersonCard from '../components/PersonCard.vue'
import CtaBand from '../components/CtaBand.vue'

const heroBlobs = [
  ['#1e5fd6', 0.5, 0.45, 0.78, 0.45],
  ['#f2b632', 0.14, 0.3, 0.9, 0.9],
  ['#0b2a6b', 0.7, 0.5, 0.3, 0.2],
]
const tab = ref('all')
const blurbs = {
  leadership: 'Client onboarding, project scoping and delivery coordination.',
  technology: 'Software, platforms, mobile apps and AI product work.',
  creative: 'Brand direction, visual production, film and design.',
}
function show(id) {
  tab.value = id
  document.getElementById('team-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
const groups = computed(() => (tab.value === 'all' ? team.groups : team.groups.filter((g) => g.id === tab.value)))
</script>

<template>
  <div>
    <PageHero eyebrow="Team" :title="team.title" :body="team.body" :blobs="heroBlobs" glow="75% 50%" tone="deep">
      <template #aside>
        <ul class="disciplines">
          <li v-for="g in team.groups" :key="g.id">
            <button type="button" class="discipline" :class="`discipline--${g.id}`" @click="show(g.id)">
              <strong>{{ g.people.length }}</strong>
              <span class="discipline__label">{{ g.label }}</span>
              <span class="discipline__text">{{ blurbs[g.id] }}</span>
              <span class="discipline__go" aria-hidden="true">→</span>
            </button>
          </li>
        </ul>
      </template>
    </PageHero>

    <section class="section">
      <div class="container">
        <div id="team-list" class="tabs" role="group" aria-label="Filter team">
          <button class="tab" :class="{ 'is-active': tab === 'all' }" :aria-pressed="tab === 'all'" @click="tab = 'all'">Everyone</button>
          <button
            v-for="g in team.groups"
            :key="g.id"
            class="tab"
            :class="{ 'is-active': tab === g.id }"
            :aria-pressed="tab === g.id"
            @click="tab = g.id"
          >{{ g.label }}</button>
        </div>

        <div v-for="g in groups" :key="g.id" class="group">
          <h2 class="group__title">{{ g.label }} <span>{{ g.people.length }}</span></h2>
          <div class="grid">
            <PersonCard v-for="p in g.people" :key="p.name" :person="p" />
          </div>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.disciplines { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.discipline {
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  column-gap: 22px;
  align-items: center;
  padding: 22px 24px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(17, 24, 39, 0.6);
  backdrop-filter: blur(10px);
  color: var(--text);
  text-align: left;
  transition: background 0.35s, border-color 0.35s, transform 0.35s var(--ease);
}
.discipline:hover { background: rgba(30, 95, 214, 0.35); border-color: rgba(90, 168, 255, 0.5); transform: translateX(-6px); }
.discipline:active { transform: translateX(-6px) scale(0.99); }
.discipline strong {
  grid-row: span 2;
  font-family: var(--font-display);
  font-size: clamp(44px, 4.5vw, 60px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
  min-width: 1.2ch;
}
.discipline--leadership strong { color: var(--gold); }
.discipline--technology strong { color: var(--brand-bright); }
.discipline__label { font-family: var(--font-display); font-weight: 600; font-size: 19px; }
.discipline__text { grid-column: 2; color: var(--muted); font-size: 14px; }
.discipline__go { grid-row: 1 / span 2; grid-column: 3; font-size: 20px; color: var(--muted); transition: color 0.3s, transform 0.3s var(--ease); }
.discipline:hover .discipline__go { color: var(--gold); transform: translateX(4px); }
#team-list { scroll-margin-top: 110px; }

.tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: clamp(40px, 5vw, 64px); }
.tab {
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: none;
  color: var(--muted);
  font-size: 15px;
  transition: background 0.25s, border-color 0.25s, color 0.25s;
}
.tab:hover { color: var(--text); border-color: rgba(255, 255, 255, 0.3); background: rgba(255, 255, 255, 0.05); }
.tab.is-active { background: var(--text); border-color: var(--text); color: var(--ink); }
.tab:active { transform: scale(0.97); }

.group + .group { margin-top: clamp(56px, 7vw, 96px); }
.group__title {
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-size: clamp(24px, 2.6vw, 32px);
  padding-bottom: 20px;
  margin-bottom: 28px;
  border-bottom: 1px solid var(--line);
}
.group__title span { font-size: 15px; color: var(--muted); font-weight: 500; }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

@media (max-width: 1000px) { .grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 760px) { .grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px) { .grid { grid-template-columns: 1fr; gap: 12px; } }
</style>
