<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import EnquiryAssistant from './components/EnquiryAssistant.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
  <EnquiryAssistant />
</template>

<style>
.skip-link {
  position: absolute;
  left: 16px; top: -60px;
  z-index: 200;
  padding: 10px 16px;
  border-radius: 8px;
  background: var(--gold);
  color: var(--ink);
  font-weight: 600;
  transition: top 0.2s;
}
.skip-link:focus { top: 16px; }
.page-enter-active, .page-leave-active { transition: opacity 0.3s var(--ease); }
.page-enter-from, .page-leave-to { opacity: 0; }
</style>
