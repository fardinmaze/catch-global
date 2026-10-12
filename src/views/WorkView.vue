<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
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

// Full portfolio (all projects, grouped by category). Loaded lazily so the
// ~60 KB data file isn't part of the first page load.
const API = 'https://api.catchbangladesh.com'
const PAGE = 24
const projects = ref([])
const pfCat = ref('all')
const shown = ref(PAGE)
onMounted(async () => { projects.value = (await import('../data/portfolio.json')).default })
const pfCats = computed(() => {
  const n = {}
  projects.value.forEach((p) => (n[p.k] = (n[p.k] || 0) + 1))
  return Object.entries(n).sort((a, b) => b[1] - a[1])
})
const pfList = computed(() => (pfCat.value === 'all' ? projects.value : projects.value.filter((p) => p.k === pfCat.value)))
const pfShown = computed(() => pfList.value.slice(0, shown.value))
function pickCat(c) { pfCat.value = c; shown.value = PAGE }
const thumb = (p) => (p.i ? API + p.i : p.y ? `https://img.youtube.com/vi/${p.y}/hqdefault.jpg` : '')
const href = (p) => (p.y ? `https://youtu.be/${p.y}` : p.p || (p.i ? API + p.i : ''))
const kind = (p) => (p.y ? 'Watch video' : p.p ? 'Open PDF' : 'View image')

const filter = ref('all')
const list = computed(() => (filter.value === 'all' ? work : work.filter((w) => w.tags.includes(filter.value))))

// ── Horizontal scroll showcase (Australian projects) ───────────────────────
// A tall wrapper holds a sticky stage; vertical scroll is mapped to a sideways
// slide of the card row, so the page "pins" while the cards pass by. The row
// transform is written straight to the DOM from a rAF-throttled scroll
// handler. On narrow screens, short viewports and for reduced-motion visitors
// it becomes a normal swipeable row (native horizontal scroll with snapping).
const STICKY = 100 // px from viewport top where the stage pins (header + gap)
const hs = ref(null)
const stageEl = ref(null)
const trackEl = ref(null)
const cardEls = []
const on = ref(false)
const dist = ref(0) // horizontal travel == extra vertical scroll
const stageH = ref(0)
const anchors = ref([])
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
let raf = 0

const palettes = [
  ['#1e5fd6', '#0b2a6b'],
  ['#0b2a6b', '#2a4fa0'],
  ['#143f99', '#f2b632'],
  ['#1e5fd6', '#5aa8ff'],
]
const tone = (i) => ({ '--c1': palettes[i % palettes.length][0], '--c2': palettes[i % palettes.length][1] })
const initials = (name) =>
  name.replace(/[^A-Za-z ]/g, '').split(' ').filter((w) => w.length > 2 || w === w.toUpperCase()).slice(0, 2).map((w) => w[0]).join('')

async function layout() {
  const roomy = matchMedia('(min-width: 861px)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches
  on.value = roomy
  await nextTick()
  if (roomy && stageEl.value && trackEl.value) {
    dist.value = Math.max(0, trackEl.value.scrollWidth - stageEl.value.clientWidth)
    stageH.value = stageEl.value.offsetHeight
    if (dist.value < 40 || stageH.value + STICKY + 24 > innerHeight) on.value = false
    const first = cardEls[0]?.offsetLeft || 0
    anchors.value = cardEls.slice(0, list.value.length).map((c) => clamp(c.offsetLeft - first, 0, dist.value))
  }
  await nextTick()
  update()
}

function update() {
  if (!trackEl.value) return
  if (!on.value || !hs.value) { trackEl.value.style.transform = ''; return }
  const p = clamp((STICKY - hs.value.getBoundingClientRect().top) / dist.value)
  trackEl.value.style.transform = `translate3d(${-p * dist.value}px, 0, 0)`
}
const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update() }) }
const onResize = () => layout()
onMounted(() => {
  layout()
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('resize', onResize)
})
onUnmounted(() => {
  removeEventListener('scroll', onScroll)
  removeEventListener('resize', onResize)
  cancelAnimationFrame(raf)
})
watch(filter, () => nextTick(layout))

// Full story opens in a native dialog (focus trap + Esc come for free).
const selected = ref(null)
const dlg = ref(null)
function openStory(w) {
  selected.value = w
  nextTick(() => dlg.value?.showModal())
}
const closeStory = () => dlg.value?.close()
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

        <div ref="hs" class="hs" :class="{ 'hs--on': on }" :style="on ? { height: stageH + dist + 'px' } : null">
          <!-- anchors for /our-work#slug links: each sits where its card is first in view -->
          <template v-if="on">
            <span v-for="(w, i) in list" :id="w.slug" :key="w.slug" class="hs__anchor" :style="{ top: (anchors[i] || 0) + 'px' }"></span>
          </template>
          <div ref="stageEl" class="hs__stage">
            <ol ref="trackEl" class="hs__track">
              <li
                v-for="(w, i) in list"
                :id="on ? null : w.slug"
                :key="w.slug"
                :ref="(el) => { if (el) cardEls[i] = el }"
                class="hcard"
                :style="tone(i)"
              >
                <span class="hcard__mono" aria-hidden="true">{{ initials(w.client) }}</span>
                <div class="hcard__top">
                  <p class="hcard__num">{{ String(i + 1).padStart(2, '0') }} / {{ String(list.length).padStart(2, '0') }}</p>
                  <p class="hcard__eyebrow">{{ w.eyebrow }}</p>
                  <h3>{{ w.client }}<span v-if="w.title"> — {{ w.title }}</span></h3>
                </div>
                <div class="hcard__panel">
                  <p>{{ w.card }}</p>
                  <button type="button" class="hcard__btn" @click="openStory(w)">
                    Read the story <AppIcon name="arrow-up-right" :size="16" />
                    <span class="sr-only">about {{ w.client }}</span>
                  </button>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <dialog ref="dlg" class="story" aria-labelledby="story-title" @close="selected = null" @click="$event.target === dlg && closeStory()">
          <div v-if="selected" class="story__body">
            <button type="button" class="story__close" aria-label="Close" @click="closeStory"><AppIcon name="close" :size="20" /></button>
            <p class="story__eyebrow">{{ selected.eyebrow }}</p>
            <h2 id="story-title">{{ selected.client }}<span v-if="selected.title"> — {{ selected.title }}</span></h2>
            <p v-for="(p, j) in selected.story" :key="j">{{ p }}</p>
            <h3>Services / deliverables</h3>
            <ul class="story__deliv">
              <li v-for="d in selected.deliverables" :key="d"><AppIcon name="check" :size="16" /> {{ d }}</li>
            </ul>
            <a v-for="l in selected.links" :key="l.href" :href="l.href" target="_blank" rel="noopener" class="link-arrow">
              {{ l.label }} <AppIcon name="external" :size="15" /><span class="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </dialog>

        <p class="also">Also working with <strong>SCIREX</strong>, a Nordic-inspired wellness business in the recovery and wellness sector.</p>
      </div>
    </section>

    <section id="portfolio" class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow" v-reveal>Full portfolio</p>
            <h2 class="h2" v-reveal="80">{{ projects.length || 382 }} projects, by category.</h2>
          </div>
          <p class="lead" v-reveal="160">Documentaries, campaigns, animation, publications, social content and technology work delivered across our wider team, grouped by category.</p>
        </div>

        <div class="filters" role="group" aria-label="Filter portfolio by category">
          <button class="filter" :class="{ 'is-active': pfCat === 'all' }" :aria-pressed="pfCat === 'all'" @click="pickCat('all')">All <span>{{ projects.length }}</span></button>
          <button
            v-for="[c, n] in pfCats"
            :key="c"
            class="filter"
            :class="{ 'is-active': pfCat === c }"
            :aria-pressed="pfCat === c"
            @click="pickCat(c)"
          >{{ c }} <span>{{ n }}</span></button>
        </div>

        <ul class="pf" aria-live="polite">
          <li v-for="p in pfShown" :key="p.t + p.d + (p.y || p.i || p.p)">
            <a :href="href(p)" target="_blank" rel="noopener" class="pf__card">
              <span class="pf__thumb">
                <img v-if="thumb(p)" :src="thumb(p)" :alt="p.t" loading="lazy" decoding="async" />
                <span v-else class="pf__ph">{{ p.k }}</span>
                <span v-if="p.y" class="pf__play" aria-hidden="true"><AppIcon name="arrow" :size="22" /></span>
              </span>
              <span class="pf__body">
                <span class="pf__cat">{{ p.k }}</span>
                <strong>{{ p.t }}</strong>
                <span v-if="p.c" class="pf__client">{{ p.c }}</span>
                <span class="pf__go">{{ kind(p) }} <AppIcon name="external" :size="14" /><span class="sr-only">(opens in a new tab)</span></span>
              </span>
            </a>
          </li>
        </ul>

        <div v-if="pfShown.length < pfList.length" class="pf__more">
          <button type="button" class="btn btn--ghost" @click="shown += PAGE">Show more <span class="pf__left">({{ pfList.length - pfShown.length }} left)</span></button>
        </div>
      </div>
    </section>

    <section class="section">
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

.filter span { opacity: 0.6; font-size: 12px; margin-left: 4px; }
.pf { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.pf__card { display: grid; height: 100%; grid-template-rows: auto 1fr; border-radius: var(--radius); border: 1px solid var(--line); background: var(--bg-2); overflow: hidden; transition: border-color 0.3s, transform 0.35s var(--ease), background 0.3s; }
.pf__card:hover { border-color: rgba(90, 168, 255, 0.45); background: var(--bg-3); transform: translateY(-3px); }
.pf__thumb { position: relative; aspect-ratio: 16 / 10; background: var(--brand-deep); overflow: hidden; display: block; }
.pf__thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s var(--ease); }
.pf__card:hover .pf__thumb img { transform: scale(1.04); }
.pf__ph { position: absolute; inset: 0; display: grid; place-items: center; padding: 16px; text-align: center; font-family: var(--font-display); color: rgba(255, 255, 255, 0.85); }
.pf__play { position: absolute; right: 10px; bottom: 10px; width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; background: var(--gold); color: var(--ink); }
.pf__body { display: grid; gap: 6px; padding: 16px 18px 18px; align-content: start; }
.pf__cat { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--brand-bright); }
.pf__body strong { font-family: var(--font-display); font-size: 16px; line-height: 1.3; font-weight: 600; }
.pf__client { font-size: 13px; color: var(--muted); }
.pf__go { margin-top: 4px; display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--gold); }
.pf__more { margin-top: 40px; display: flex; justify-content: center; }
.pf__left { color: var(--muted); margin-left: 6px; }
@media (max-width: 1180px) { .pf { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 860px) { .pf { grid-template-columns: repeat(2, 1fr); gap: 14px; } }
@media (max-width: 480px) { .pf { grid-template-columns: 1fr; } }

/* Horizontal showcase: pinned stage, row slides sideways with the scroll (see script). */
.hs { position: relative; }
.hs__stage {
  margin-inline: calc(50% - 50vw);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  padding-bottom: 20px;
}
.hs__track {
  list-style: none;
  margin: 0;
  padding: 0 max(var(--gutter), calc((100vw - var(--container)) / 2 + var(--gutter)));
  display: flex;
  gap: 24px;
  width: max-content;
  scroll-padding-inline: var(--gutter);
}
.hcard {
  position: relative;
  flex: none;
  width: clamp(290px, 30vw, 420px);
  height: clamp(440px, 68vh, 600px);
  padding: 26px;
  border-radius: 28px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  scroll-snap-align: start;
  scroll-margin-top: 110px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(120% 90% at 15% 10%, var(--c1), transparent 60%),
    radial-gradient(100% 90% at 90% 100%, var(--c2), transparent 60%),
    var(--bg-2);
}
.hcard__mono {
  position: absolute;
  right: -0.04em; bottom: 0.1em;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(150px, 16vw, 230px);
  letter-spacing: -0.06em;
  line-height: 1;
  color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}
.hcard__top { position: relative; display: grid; gap: 10px; }
.hcard__num { font-family: var(--font-display); font-size: 13px; letter-spacing: 0.06em; color: rgba(255, 255, 255, 0.7); }
.hcard__eyebrow { font-size: 11.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); }
.hcard h3 { font-size: clamp(26px, 2.5vw, 34px); line-height: 1.08; }
.hcard h3 span { color: rgba(255, 255, 255, 0.72); font-weight: 500; }
.hcard__panel {
  position: relative;
  display: grid;
  gap: 14px;
  padding: 18px 20px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(10, 14, 23, 0.55);
  backdrop-filter: blur(12px);
}
.hcard__panel p { font-size: 14.5px; line-height: 1.5; color: #d6dbe6; }
.hcard__btn {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  border: 0;
  background: var(--gold);
  color: var(--ink);
  font-weight: 600;
  font-size: 14px;
  transition: background 0.25s, transform 0.2s var(--ease);
}
.hcard__btn:hover { background: var(--gold-hover); }
.hcard__btn:active { transform: scale(0.97); }

.hs--on .hs__stage { position: sticky; top: 100px; overflow: hidden; scroll-snap-type: none; }
/* pinned mode: the first card starts 30% in from the left edge of the screen */
.hs--on .hs__track { will-change: transform; padding-left: 30vw; padding-right: var(--gutter); }
.hs__anchor { position: absolute; left: 0; width: 1px; height: 1px; pointer-events: none; }

.story {
  width: min(720px, calc(100vw - 32px));
  max-height: calc(100svh - 48px);
  padding: 0;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--bg-2);
  color: var(--text);
}
.story::backdrop { background: rgba(5, 8, 14, 0.72); backdrop-filter: blur(4px); }
.story__body { position: relative; display: grid; gap: 16px; padding: clamp(24px, 4vw, 40px); color: #c9d0dd; font-size: 16px; }
.story__close {
  position: absolute; top: 14px; right: 14px;
  width: 38px; height: 38px;
  border-radius: 50%;
  display: grid; place-items: center;
  background: none; border: 1px solid var(--line); color: var(--muted);
}
.story__close:hover { color: var(--text); border-color: rgba(255, 255, 255, 0.3); }
.story__eyebrow { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--brand-bright); padding-right: 44px; }
.story h2 { font-size: clamp(26px, 3vw, 36px); padding-right: 44px; }
.story h2 span { color: var(--muted); font-weight: 500; }
.story h3 { font-size: 16px; color: var(--text); margin-top: 4px; }
.story__deliv { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px 20px; font-size: 15px; }
.story__deliv li { display: flex; gap: 10px; align-items: flex-start; }
.story__deliv svg { color: var(--gold); flex: none; margin-top: 4px; }
@media (max-width: 560px) { .story__deliv { grid-template-columns: 1fr; } }

.also { margin-top: 24px; padding-top: 32px; border-top: 1px solid var(--line); color: var(--muted); }
.also strong { color: var(--text); }

.experience { display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; align-items: end; }
.experience__side { display: grid; gap: 20px; justify-items: start; }


@media (max-width: 860px) {
  .experience { grid-template-columns: 1fr; }
}
</style>
