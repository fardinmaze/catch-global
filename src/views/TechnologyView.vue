<script setup>
import { technology, products, teamExperience } from '../data/site'
import AppIcon from '../components/AppIcon.vue'
import PageHero from '../components/PageHero.vue'
import ServiceGrid from '../components/ServiceGrid.vue'
import ProductCard from '../components/ProductCard.vue'
import CtaBand from '../components/CtaBand.vue'
const heroBlobs = [
  ['#1e5fd6', 0.6, 0.45, 0.85, 0.35],
  ['#6a3fd8', 0.3, 0.35, 0.7, 0.8],
  ['#0b2a6b', 0.7, 0.5, 0.25, 0.4],
]
</script>

<template>
  <div>
    <PageHero eyebrow="Technology" :title="technology.title" :body="technology.body" :blobs="heroBlobs" glow="80% 40%" tone="deep">
      <template #aside>
        <div class="code" aria-hidden="true">
          <div class="code__bar"><span></span><span></span><span></span><em>project.scope</em></div>
          <pre class="code__body"><code><i>// every build starts with the requirement</i>
<b>const</b> project = <s>scope</s>({
  requirement: <u>'replace spreadsheets'</u>,
  users:       [<u>'staff'</u>, <u>'clients'</u>],
  approach:    <u>'custom web app'</u>,
  automate:    [<u>'approvals'</u>, <u>'reporting'</u>],
  ai:          { useCase: <u>'agreed'</u>, humanReview: <b>true</b> },
})

<b>await</b> project.<s>deliver</s>()<span class="code__caret"></span></code></pre>
        </div>
      </template>
    </PageHero>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow" v-reveal>Capability</p>
            <h2 class="h2" v-reveal="80">Software, automation and AI.</h2>
          </div>
          <p class="lead" v-reveal="160">We start with the business requirement, map the user and operational needs, then define the right technical approach.</p>
        </div>
        <ServiceGrid :ids="technology.capabilities" />
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow" v-reveal>Technology products</p>
            <h2 class="h2" v-reveal="80">Selected Technology Products</h2>
          </div>
          <p class="lead" v-reveal="160">Business automation, e-commerce operations and AI-assisted career tools developed within our wider technology ecosystem.</p>
        </div>
        <div class="products">
          <ProductCard v-for="(p, i) in products" :key="p.name" :product="p" detailed v-reveal="i * 100" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow" v-reveal>Selected team experience</p>
            <h2 class="h2" v-reveal="80">Platforms our team has built.</h2>
          </div>
          <p class="lead" v-reveal="160">{{ teamExperience.attribution }} These projects were delivered outside Catch Global’s Australian client portfolio.</p>
        </div>

        <div class="exp">
          <article v-for="(e, i) in teamExperience.items" :key="e.title" class="exp__card" v-reveal="i * 100">
            <p class="exp__org">{{ e.org }}</p>
            <h3>{{ e.title }}</h3>
            <p v-for="(p, j) in e.paragraphs" :key="j">{{ p }}</p>
            <p class="exp__attr"><AppIcon name="users" :size="16" /> {{ teamExperience.attribution }}</p>
          </article>
        </div>

        <div class="evidence" v-reveal>
          <h3>Capability these projects demonstrate</h3>
          <ul>
            <li v-for="c in teamExperience.evidence" :key="c"><AppIcon name="check" :size="16" /> {{ c }}</li>
          </ul>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.code {
  border-radius: 18px;
  border: 1px solid rgba(90, 168, 255, 0.28);
  background: rgba(8, 12, 22, 0.82);
  backdrop-filter: blur(10px);
  box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.03) inset;
  overflow: hidden;
  transform: perspective(1200px) rotateY(-6deg) rotateX(2deg);
  transition: transform 0.8s var(--ease);
}
.code:hover { transform: none; }
.code__bar { display: flex; align-items: center; gap: 8px; padding: 14px 18px; border-bottom: 1px solid var(--line); }
.code__bar span { width: 11px; height: 11px; border-radius: 50%; background: #2b3448; }
.code__bar span:first-child { background: var(--gold); }
.code__bar em { margin-left: 10px; font-style: normal; font-size: 13px; color: var(--muted); font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace; }
.code__body { margin: 0; padding: 22px 24px 26px; font: 14px/1.75 ui-monospace, 'SFMono-Regular', Consolas, monospace; color: #c9d4ea; overflow-x: auto; }
.code__body i { font-style: normal; color: #5f6b85; }
.code__body b { font-weight: 400; color: #ff9f6b; }
.code__body s { text-decoration: none; color: var(--brand-bright); }
.code__body u { text-decoration: none; color: var(--gold); }
.code__caret { display: inline-block; width: 8px; height: 17px; margin-left: 3px; vertical-align: -3px; background: var(--gold); animation: blink 1.1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }
@media (max-width: 960px) { .code { transform: none; } }
@media (max-width: 560px) { .code__body { font-size: 12.5px; padding: 18px; } }

.products { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.exp { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.exp__card {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: clamp(28px, 3vw, 40px);
  display: grid;
  gap: 14px;
  align-content: start;
  background: var(--bg-2);
}
.exp__org { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--brand-bright); }
.exp__card h3 { font-size: clamp(24px, 2.4vw, 30px); }
.exp__card p { color: #c3cbdb; font-size: 15px; }
.exp__attr { display: flex; align-items: center; gap: 8px; margin-top: 8px; padding-top: 16px; border-top: 1px solid var(--line); color: var(--muted) !important; font-size: 13px !important; font-style: italic; }
.evidence { margin-top: 40px; padding: 28px 32px; border-radius: var(--radius); border: 1px dashed rgba(255, 255, 255, 0.18); }
.evidence h3 { font-size: 18px; margin-bottom: 18px; }
.evidence ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px 24px; }
.evidence li { display: flex; gap: 10px; align-items: flex-start; color: #c3cbdb; font-size: 15px; }
.evidence svg { color: var(--gold); flex: none; margin-top: 4px; }

@media (max-width: 1000px) { .products { grid-template-columns: 1fr 1fr; } .evidence ul { grid-template-columns: 1fr 1fr; } }
@media (max-width: 760px) { .products, .exp, .evidence ul { grid-template-columns: 1fr; } }
</style>
