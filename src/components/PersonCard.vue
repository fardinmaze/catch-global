<script setup>
// Team card. Headshots haven't been supplied yet, so every card uses the same
// initials avatar (the pack asks for consistent crops — no mixing of styles).
import { computed } from 'vue'

const props = defineProps({
  person: { type: Object, required: true },
  compact: Boolean,
})

const initials = computed(() => {
  const words = props.person.name.replace(/\./g, ' ').split(/\s+/).filter(Boolean)
  const sig = words.filter((w) => !/^md$/i.test(w))
  const pick = sig.length >= 2 ? [sig[0], sig[sig.length - 1]] : words.slice(0, 2)
  return pick.map((w) => w[0].toUpperCase()).join('')
})
</script>

<template>
  <article class="person" :class="{ 'person--compact': compact }">
    <img v-if="person.photo" class="person__photo" :src="person.photo" :alt="person.name" loading="lazy" />
    <div v-else class="person__photo person__photo--initials" aria-hidden="true">{{ initials }}</div>
    <div class="person__body">
      <h3>{{ person.name }}</h3>
      <p class="person__role">{{ person.role }}</p>
      <p v-if="!compact" class="person__bio">{{ person.bio }}</p>
    </div>
  </article>
</template>

<style scoped>
.person {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 20px;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background: var(--bg-2);
  transition: border-color 0.4s, background 0.4s;
}
.person:hover { border-color: rgba(90, 168, 255, 0.35); background: var(--bg-3); }
.person__photo {
  width: 100%;
  aspect-ratio: 1;
  border-radius: calc(var(--radius) - 6px);
  object-fit: cover;
}
.person__photo--initials {
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(40px, 5vw, 56px);
  letter-spacing: -0.03em;
  color: rgba(255, 255, 255, 0.9);
  background:
    radial-gradient(90% 90% at 20% 15%, rgba(90, 168, 255, 0.55), transparent 60%),
    radial-gradient(90% 90% at 90% 100%, rgba(242, 182, 50, 0.28), transparent 60%),
    var(--brand-deep);
}
.person--compact .person__photo--initials { font-size: 40px; }
.person__body { display: grid; gap: 6px; }
.person h3 { font-size: 19px; letter-spacing: -0.01em; }
.person__role { color: var(--gold); font-size: 14px; font-weight: 500; }
.person__bio { color: var(--muted); font-size: 14px; }

@media (max-width: 560px) {
  .person { flex-direction: row; align-items: center; gap: 16px; padding: 14px; }
  .person__photo { width: 76px; flex: none; border-radius: 14px; }
  .person__photo--initials, .person--compact .person__photo--initials { font-size: 24px; }
}
</style>
