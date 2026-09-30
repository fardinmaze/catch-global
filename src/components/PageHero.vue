<script setup>
// Inner-page hero. Pages pass their own visual through the `aside` slot and a
// gradient mood (`blobs` + `glow` position) so every hero looks different
// while keeping the same frame.
import { useSlots, computed } from 'vue'
import GradientField from './GradientField.vue'

const props = defineProps({
  eyebrow: String,
  title: { type: String, required: true },
  body: String,
  blobs: Array,
  glow: { type: String, default: '65% 35%' }, // where the gradient is centred
  tone: { type: String, default: 'dark' },     // 'dark' | 'deep'
})
const slots = useSlots()
const split = computed(() => !!slots.aside)
const maskStyle = computed(() => ({
  maskImage: `radial-gradient(ellipse 75% 75% at ${props.glow}, #000 25%, transparent 100%)`,
  WebkitMaskImage: `radial-gradient(ellipse 75% 75% at ${props.glow}, #000 25%, transparent 100%)`,
}))
</script>

<template>
  <section class="page-hero" :class="[`page-hero--${tone}`, { 'page-hero--split': split }]">
    <div class="page-hero__aurora" :style="maskStyle">
      <GradientField v-if="blobs" :blobs="blobs" :drift="0.16" :speed="0.8" />
      <GradientField v-else :drift="0.14" :speed="0.8" />
    </div>
    <div class="container page-hero__grid">
      <div class="page-hero__copy">
        <p v-if="eyebrow" class="eyebrow" v-reveal>{{ eyebrow }}</p>
        <h1 v-reveal="80">{{ title }}</h1>
        <p v-if="body" class="lead" v-reveal="160">{{ body }}</p>
        <slot />
      </div>
      <div v-if="split" class="page-hero__aside" v-reveal="200">
        <slot name="aside" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: calc(100px + clamp(56px, 8vw, 110px)) 0 clamp(64px, 8vw, 110px);
  border-bottom: 1px solid var(--line);
}
.page-hero--deep { background: linear-gradient(180deg, #0b1430 0%, var(--bg) 100%); }
.page-hero__aurora { position: absolute; inset: 0; z-index: -1; }
.page-hero__grid { display: grid; gap: clamp(40px, 6vw, 88px); align-items: center; }
.page-hero--split .page-hero__grid { grid-template-columns: 1.05fr 0.95fr; }
.page-hero h1 {
  font-size: clamp(38px, 6vw, 80px);
  line-height: 1.02;
  letter-spacing: -0.035em;
  max-width: 18ch;
}
.page-hero--split h1 { font-size: clamp(36px, 4.8vw, 66px); }
.page-hero .lead { margin-top: 28px; }

@media (max-width: 960px) {
  .page-hero--split .page-hero__grid { grid-template-columns: 1fr; }
}
</style>
