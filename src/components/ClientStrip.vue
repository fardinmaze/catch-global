<script setup>
// Client names in the pack's recommended order. Text only: logos may be
// swapped in per client once permission is confirmed.
import { clients } from '../data/site'
const loop = [...clients, ...clients]
</script>

<template>
  <div class="clients">
    <p class="sr-only">Clients: {{ clients.join(', ') }}</p>
    <div class="clients__track" aria-hidden="true">
      <div class="clients__row">
        <span v-for="(c, i) in loop" :key="i" class="clients__item">{{ c }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clients { border-block: 1px solid var(--line); padding-block: 28px; }
.clients__track {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.clients__row { display: flex; width: max-content; animation: marquee 45s linear infinite; }
.clients__track:hover .clients__row { animation-play-state: paused; }
.clients__item {
  display: inline-flex;
  align-items: center;
  gap: 40px;
  padding-right: 40px;
  font-family: var(--font-display);
  font-size: clamp(20px, 2.2vw, 28px);
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--muted);
  white-space: nowrap;
  transition: color 0.3s;
}
.clients__item:hover { color: var(--text); }
.clients__item::after { content: ''; width: 8px; height: 8px; border-radius: 50%; background: var(--gold); }
@keyframes marquee { to { transform: translateX(-50%); } }
</style>
