<script setup>
import { services } from '../data/site'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  ids: { type: Array, default: null }, // limit to these service ids
})
const list = props.ids ? services.filter((s) => props.ids.includes(s.id)) : services
</script>

<template>
  <div class="grid" :class="{ 'grid--three': list.length === 3 }">
    <RouterLink
      v-for="(s, i) in list"
      :key="s.id"
      :to="`/services#${s.id}`"
      class="card"
      v-reveal="(i % 3) * 90"
    >
      <div class="card__head">
        <span class="card__icon"><AppIcon :name="s.icon" :size="26" /></span>
        <span class="card__go" aria-hidden="true"><AppIcon name="arrow-up-right" :size="20" /></span>
      </div>
      <h3>{{ s.title }}</h3>
      <p>{{ s.card }}</p>
    </RouterLink>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
}
.card {
  position: relative;
  background: var(--bg);
  padding: clamp(28px, 3vw, 40px);
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 300px;
  transition: background 0.5s var(--ease);
}
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 0% 0%, rgba(30, 95, 214, 0.28), transparent 60%);
  opacity: 0;
  transition: opacity 0.5s;
}
.card > * { position: relative; }
.card:hover { background: var(--bg-2); }
.card:hover::before { opacity: 1; }

.card__head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: auto; padding-bottom: 32px; }
.card__icon {
  width: 56px; height: 56px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: rgba(30, 95, 214, 0.16);
  color: var(--brand-bright);
  transition: background 0.4s, color 0.4s, transform 0.5s var(--ease);
}
.card:hover .card__icon { background: var(--gold); color: var(--ink); transform: rotate(-8deg); }
.card__go {
  width: 40px; height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  color: var(--muted);
  transition: background 0.4s, color 0.4s, border-color 0.4s, transform 0.4s var(--ease);
}
.card:hover .card__go { background: var(--text); color: var(--ink); border-color: var(--text); transform: rotate(45deg); }
.card h3 { font-size: 24px; }
.card p { color: var(--muted); font-size: 15px; }

@media (max-width: 1000px) { .grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 640px) { .grid, .grid--three { grid-template-columns: 1fr; } .card { min-height: 0; } }
</style>
