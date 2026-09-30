<script setup>
// Official Catch Global logo (supplied 30 Sep 2026). Resized exports only —
// the mark itself is unchanged.
defineProps({
  size: { type: String, default: 'header' }, // 'header' | 'large'
})
</script>

<template>
  <img
    v-if="size === 'header'"
    class="logo logo--header"
    src="/brand/catch-global-logo-176.webp"
    alt="Catch Global Pty Ltd"
    width="209"
    height="176"
  />
  <img
    v-else
    class="logo logo--large"
    src="/brand/catch-global-logo-480.webp"
    alt="Catch Global Pty Ltd"
    width="571"
    height="480"
    loading="lazy"
  />
</template>

<style scoped>
.logo { width: auto; }
.logo--header { height: 74px; }
.logo--large { height: clamp(120px, 14vw, 180px); }
@media (max-width: 600px) { .logo--header { height: 60px; } }
</style>
