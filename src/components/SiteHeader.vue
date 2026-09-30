<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { nav } from '../data/site'
import BrandLogo from './BrandLogo.vue'
import AppIcon from './AppIcon.vue'

const route = useRoute()
const scrolled = ref(false)
const open = ref(false)

const onScroll = () => (scrolled.value = window.scrollY > 24)
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

watch(open, (v) => document.body.style.setProperty('overflow', v ? 'hidden' : ''))
watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled, 'is-open': open }">
    <!-- Floating light bar: the official logo (navy/blue/gold) needs a light
         surface to read properly, so the nav sits on its own pale "plate". -->
    <div class="container">
      <div class="header__bar">
        <RouterLink to="/" class="header__logo" aria-label="Catch Global home"><BrandLogo /></RouterLink>

        <nav class="header__nav" aria-label="Primary">
          <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="header__link">{{ item.label }}</RouterLink>
        </nav>

        <RouterLink to="/contact" class="btn btn--primary btn--sm header__cta">Get a Quote <AppIcon name="arrow" :size="18" /></RouterLink>

        <button
          class="header__toggle"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'close' : 'menu'" />
        </button>
      </div>
    </div>

    <Transition name="drawer">
      <nav v-if="open" id="mobile-nav" class="drawer" aria-label="Mobile">
        <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="drawer__link">{{ item.label }}</RouterLink>
        <RouterLink to="/contact" class="btn btn--primary">Get a Quote <AppIcon name="arrow" :size="18" /></RouterLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  padding: 10px 0;
  border-bottom: 1px solid transparent;
  transition: background-color 0.4s, border-color 0.4s;
}
/* Once scrolled, the band behind the floating bar turns solid so page content
   never shows through around it (and sticky sub-bars can dock beneath it).
   Geometry never changes (10 + 64 + 10 = 84px = --header-h); only colour animates. */
.header.is-scrolled {
  background: rgba(10, 14, 23, 0.94);
  backdrop-filter: blur(14px);
  border-color: var(--line);
}

.header__bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 64px;
  padding: 0 10px 0 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(16px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.8) inset,
    0 18px 40px -18px rgba(0, 0, 0, 0.55);
  transition: background-color 0.4s, box-shadow 0.4s;
}
.header.is-scrolled .header__bar {
  background: #fff;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8) inset, 0 20px 44px -16px rgba(0, 0, 0, 0.7);
}

.header__logo { display: flex; align-items: center; flex: none; }
.header__logo :deep(.logo--header) { height: 54px; }

.header__nav { display: flex; gap: 2px; }

/* Nav link states: default · hover · active page · focus */
.header__link {
  position: relative;
  padding: 9px 14px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 500;
  color: #4a5366;
  transition: color 0.25s, background 0.25s;
}
.header__link:hover { color: var(--ink); background: rgba(10, 14, 23, 0.06); }
.header__link.router-link-exact-active { color: #fff; background: var(--brand-deep); }
.header__link:focus-visible { outline-color: var(--brand); }

.header__cta { flex: none; }

.header__toggle {
  display: none;
  width: 48px; height: 48px;
  border-radius: 50%;
  place-items: center;
  background: var(--ink);
  color: #fff;
  border: 0;
  transition: background 0.3s, transform 0.2s var(--ease);
}
.header__toggle:hover { background: var(--brand); }
.header__toggle:active { transform: scale(0.95); }

.drawer {
  position: fixed;
  inset: 0;
  z-index: 1;
  background: var(--bg);
  padding: 112px var(--gutter) 32px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}
.drawer__link {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 600;
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  transition: color 0.3s;
}
.drawer__link:hover, .drawer__link.router-link-exact-active { color: var(--text); }
.drawer__link.router-link-exact-active::after { content: ' •'; color: var(--gold); }
.drawer .btn { margin-top: 24px; align-self: flex-start; }
.drawer-enter-active, .drawer-leave-active { transition: opacity 0.35s, transform 0.35s var(--ease); }
.drawer-enter-from, .drawer-leave-to { opacity: 0; transform: translateY(-12px); }

@media (max-width: 1140px) {
  .header__nav, .header__cta { display: none; }
  .header__toggle { display: grid; }
}
@media (max-width: 600px) {
  .header__bar { padding: 0 8px 0 14px; }
  .header__logo :deep(.logo--header) { height: 50px; }
}
</style>
