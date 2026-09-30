<script setup>
// Portfolio card. No approved project imagery has been supplied yet, so each
// card carries a typographic cover over a brand gradient; swap `cover` in when
// approved stills arrive.
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  item: { type: Object, required: true },
  index: { type: Number, default: 0 },
})

const palettes = [
  ['#1e5fd6', '#0b2a6b'],
  ['#0b2a6b', '#2a4fa0'],
  ['#143f99', '#f2b632'],
  ['#1e5fd6', '#5aa8ff'],
]
const style = computed(() => {
  const [a, b] = palettes[props.index % palettes.length]
  return { '--c1': a, '--c2': b }
})
const initials = computed(() =>
  props.item.client
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .filter((w) => w.length > 2 || w === w.toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join(''),
)
</script>

<template>
  <RouterLink :to="`/our-work#${item.slug}`" class="work-card" :style="style">
    <div class="work-card__cover" aria-hidden="true">
      <span class="work-card__mono">{{ initials }}</span>
      <span class="work-card__go"><AppIcon name="arrow-up-right" :size="20" /></span>
    </div>
    <p class="work-card__eyebrow">{{ item.eyebrow }}</p>
    <h3>{{ item.client }}<span v-if="item.title"> — {{ item.title }}</span></h3>
    <p class="work-card__text">{{ item.card }}</p>
  </RouterLink>
</template>

<style scoped>
.work-card { display: flex; flex-direction: column; gap: 10px; }
.work-card__cover {
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: 12px;
  background:
    radial-gradient(120% 90% at 15% 10%, var(--c1), transparent 60%),
    radial-gradient(100% 90% at 90% 100%, var(--c2), transparent 60%),
    var(--bg-2);
  background-size: 140% 140%;
  background-position: 0% 0%;
  transition: background-position 1.2s var(--ease);
}
.work-card:hover .work-card__cover { background-position: 100% 100%; }
.work-card__mono {
  position: absolute;
  left: 20px; bottom: -0.12em;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(96px, 14vw, 200px);
  letter-spacing: -0.06em;
  line-height: 1;
  color: rgba(255, 255, 255, 0.16);
  transition: color 0.6s var(--ease), transform 0.8s var(--ease);
}
.work-card:hover .work-card__mono { color: rgba(255, 255, 255, 0.3); transform: translateY(-6px); }
.work-card__go {
  position: absolute;
  top: 16px; right: 16px;
  width: 46px; height: 46px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--gold);
  color: var(--ink);
  transform: scale(0.6);
  opacity: 0;
  transition: transform 0.5s var(--ease), opacity 0.4s;
}
.work-card:hover .work-card__go { transform: none; opacity: 1; }
.work-card__eyebrow {
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brand-bright);
}
.work-card h3 { font-size: 22px; transition: color 0.3s; }
.work-card:hover h3 { color: var(--gold); }
.work-card h3 span { color: var(--muted); font-weight: 500; }
.work-card__text { color: var(--muted); font-size: 15px; }
</style>
