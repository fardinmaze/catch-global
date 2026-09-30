<script setup>
import AppIcon from '../components/AppIcon.vue'
import PageHero from '../components/PageHero.vue'
</script>

<template>
  <PageHero eyebrow="404" title="This page couldn’t be found." body="The link may be out of date, or the page may have moved.">
    <div class="actions">
      <RouterLink to="/" class="btn btn--primary">Back to home <AppIcon name="arrow" :size="18" /></RouterLink>
      <RouterLink to="/contact" class="btn btn--ghost">Get a Quote</RouterLink>
    </div>
  </PageHero>
</template>

<style scoped>
.actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 36px; }
</style>
