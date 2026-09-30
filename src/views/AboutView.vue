<script setup>
import { about, company, process } from '../data/site'
import AppIcon from '../components/AppIcon.vue'
import PageHero from '../components/PageHero.vue'
import CtaBand from '../components/CtaBand.vue'

const heroBlobs = [
  ['#1e5fd6', 0.5, 0.45, 0.85, 0.5],
  ['#f2b632', 0.16, 0.3, 0.75, 0.85],
  ['#0b2a6b', 0.7, 0.5, 0.3, 0.2],
]

const details = [
  ['Legal name', company.legalName],
  ['ABN', company.abn],
  ['ACN', company.acn],
  ['Registered office locality', company.locality],
  ['Established Australian operations', company.since],
]
</script>

<template>
  <div>
    <PageHero eyebrow="About Catch Global" :title="about.title" :blobs="heroBlobs" glow="80% 55%" tone="deep">
      <template #aside>
        <ol class="timeline" aria-label="Milestones">
          <li v-for="(m, i) in about.timeline" :key="m.when" :class="{ 'is-now': i === about.timeline.length - 1 }">
            <span class="timeline__dot" aria-hidden="true"></span>
            <p class="timeline__when">{{ m.when }}</p>
            <p class="timeline__what">{{ m.what }}</p>
          </li>
        </ol>
      </template>
    </PageHero>

    <section class="section">
      <div class="container story">
        <div class="story__body">
          <p v-for="(p, i) in about.paragraphs" :key="i" :class="{ 'story__first': i === 0 }" v-reveal="i * 60">{{ p }}</p>
        </div>
        <aside class="facts" v-reveal="120">
          <dl>
            <div v-for="f in about.facts" :key="f.label" class="facts__row">
              <dt>{{ f.label }}</dt>
              <dd>{{ f.value }}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>

    <section class="section section--light">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow" v-reveal>How we work</p>
            <h2 class="h2" v-reveal="80">Each project starts with the requirement.</h2>
          </div>
          <p class="lead" v-reveal="160">You don’t need a technical brief to get started. We scope the work around the problem, then bring in the right mix of strategy, technology and creative specialists.</p>
        </div>
        <ol class="steps">
          <li v-for="(s, i) in process" :key="s.title" class="step" v-reveal="i * 100">
            <div class="step__top">
              <span class="step__icon"><AppIcon :name="s.icon" :size="24" /></span>
              <span class="step__n">Step {{ i + 1 }}</span>
            </div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="container company">
        <div>
          <p class="eyebrow" v-reveal>Company details</p>
          <h2 class="h2" v-reveal="80">Catch Global Pty Ltd</h2>
        </div>
        <dl class="company__table" v-reveal="120">
          <div v-for="[k, v] in details" :key="k"><dt>{{ k }}</dt><dd>{{ v }}</dd></div>
        </dl>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.timeline { list-style: none; margin: 0; padding: 0 0 0 8px; position: relative; display: grid; gap: 6px; }
.timeline::before {
  content: '';
  position: absolute;
  left: 15px; top: 12px; bottom: 12px;
  width: 2px;
  background: linear-gradient(180deg, var(--gold), rgba(90, 168, 255, 0.6) 60%, rgba(90, 168, 255, 0.1));
}
.timeline li {
  position: relative;
  padding: 14px 18px 14px 40px;
  border-radius: 14px;
  transition: background 0.3s;
}
.timeline li:hover { background: rgba(255, 255, 255, 0.04); }
.timeline__dot {
  position: absolute;
  left: 1px; top: 19px;
  width: 16px; height: 16px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--brand-bright);
}
.timeline li:first-child .timeline__dot { border-color: var(--gold); background: var(--gold); }
.is-now .timeline__dot { border-color: var(--gold); box-shadow: 0 0 0 6px rgba(242, 182, 50, 0.18); animation: pulse 2.4s ease-in-out infinite; }
@keyframes pulse { 50% { box-shadow: 0 0 0 11px rgba(242, 182, 50, 0); } }
.timeline__when { font-family: var(--font-display); font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); }
.timeline__what { margin-top: 4px; font-size: 17px; color: var(--text); }

.story { display: grid; grid-template-columns: 1.4fr 1fr; gap: clamp(40px, 7vw, 110px); align-items: start; }
.story__body { display: grid; gap: 24px; font-size: 18px; color: #c9d0dd; max-width: 64ch; }
.story__first { font-family: var(--font-display); font-size: clamp(22px, 2.2vw, 28px); line-height: 1.35; color: var(--text); letter-spacing: -0.01em; }
.facts { position: sticky; top: 120px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--bg-2); padding: 8px 28px; }
.facts dl { margin: 0; }
.facts__row { padding: 20px 0; border-bottom: 1px solid var(--line); display: grid; gap: 4px; }
.facts__row:last-child { border-bottom: 0; }
.facts dt { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.facts dd { margin: 0; font-family: var(--font-display); font-size: 19px; font-weight: 500; }

.steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.step {
  background: #fff;
  border: 1px solid var(--line-dark);
  border-radius: var(--radius);
  padding: 28px;
  display: grid;
  gap: 12px;
  align-content: start;
  transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease);
}
.step:hover { transform: translateY(-6px); box-shadow: 0 24px 48px -24px rgba(10, 14, 23, 0.3); }
.step__top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.step__icon { width: 52px; height: 52px; border-radius: 50%; display: grid; place-items: center; background: var(--ink); color: var(--gold); }
.step:nth-child(even) .step__icon { background: var(--brand); color: #fff; }
.step__n { font-family: var(--font-display); font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-muted); }
.step h3 { font-size: 24px; }
.step p { color: var(--ink-muted); font-size: 15px; }

.company { display: grid; grid-template-columns: 1fr 1.2fr; gap: 40px; align-items: start; }
.company__table { margin: 0; border-top: 1px solid var(--line); }
.company__table div { display: grid; grid-template-columns: 1fr 1.2fr; gap: 16px; padding: 18px 0; border-bottom: 1px solid var(--line); }
.company__table dt { color: var(--muted); }
.company__table dd { margin: 0; font-family: var(--font-display); font-weight: 500; }

@media (max-width: 1000px) { .steps { grid-template-columns: 1fr 1fr; } }
@media (max-width: 860px) {
  .story, .company { grid-template-columns: 1fr; }
  .facts { position: static; }
}
@media (max-width: 560px) {
  .steps { grid-template-columns: 1fr; }
  .company__table div { grid-template-columns: 1fr; gap: 2px; }
}
</style>
