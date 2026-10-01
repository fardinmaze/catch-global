<script setup>
defineProps({
  title: { type: String, required: true },
  updated: { type: String, default: '30 September 2026' },
})
</script>

<template>
  <section class="legal">
    <div class="container legal__inner">
      <p class="eyebrow">Legal</p>
      <h1>{{ title }}</h1>
      <p class="legal__meta">Last updated {{ updated }}</p>
      <div class="legal__draft" role="note">
        Draft for review — this page must be checked and approved by Catch Global before the site collects enquiries publicly.
      </div>
      <div class="legal__body"><slot /></div>
    </div>
  </section>
</template>

<style scoped>
.legal { padding: calc(88px + var(--topbar-h) + clamp(56px, 7vw, 100px)) 0 clamp(80px, 10vw, 140px); }
.legal__inner { max-width: 820px; }
.legal h1 { font-size: clamp(36px, 5vw, 60px); letter-spacing: -0.03em; }
.legal__meta { margin-top: 16px; color: var(--muted); }
.legal__draft {
  margin-top: 28px;
  padding: 16px 20px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(242, 182, 50, 0.45);
  background: rgba(242, 182, 50, 0.08);
  color: #f5d58a;
  font-size: 14px;
}
.legal__body { margin-top: 40px; display: grid; gap: 16px; color: #c9d0dd; }
.legal__body :deep(h2) { font-size: 24px; margin-top: 24px; color: var(--text); }
.legal__body :deep(ul) { margin: 0; padding-left: 20px; display: grid; gap: 8px; }
.legal__body :deep(a) { color: var(--gold); text-decoration: underline; text-underline-offset: 3px; }
</style>
