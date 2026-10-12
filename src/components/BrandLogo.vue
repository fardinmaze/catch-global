<script setup>
// Catch Global logo (green C + gold globe lockup, supplied 12 Oct 2026; original in
// docs/brand/catch-global-logo-new-original.png; trimmed exports in public/brand/). The wordmark is black, so it always sits on a light surface:
// the white navbar, or the white plate used in the footer.
defineProps({
  size: { type: String, default: 'header' }, // 'header' | 'large'
})
</script>

<template>
  <img
    v-if="size === 'header'"
    class="logo logo--header"
    src="/brand/logo-h112.webp"
    alt="Catch Global"
    width="308"
    height="112"
  />
  <span v-else class="logo-plate">
    <img
      class="logo logo--large"
      src="/brand/logo-h240.webp"
      alt="Catch Global"
      width="660"
      height="240"
      loading="lazy"
    />
  </span>
</template>

<style scoped>
.logo { width: auto; display: block; }
.logo--header { height: 36px; }
.logo--large { height: clamp(52px, 5vw, 64px); }
.logo-plate {
  display: inline-flex;
  padding: 16px 22px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 18px 40px -20px rgba(0, 0, 0, 0.6);
}

</style>
