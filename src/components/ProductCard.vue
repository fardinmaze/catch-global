<script setup>
import AppIcon from './AppIcon.vue'
import GradientField from './GradientField.vue'

defineProps({
  product: { type: Object, required: true },
  detailed: Boolean, // show feature list
})
</script>

<template>
  <article class="product">
    <div class="product__art">
      <GradientField :blobs="product.blobs" :drift="0.2" :speed="1.2" />
      <span class="product__name">{{ product.name }}</span>
    </div>
    <div class="product__body">
      <p class="product__tag">{{ product.tag }}</p>
      <h3>{{ product.name }}<span v-if="product.suffix"> – {{ product.suffix }}</span></h3>
      <p>{{ product.text }}</p>
      <ul v-if="detailed">
        <li v-for="f in product.features" :key="f"><AppIcon name="check" :size="16" /> {{ f }}</li>
      </ul>
      <a :href="product.href" target="_blank" rel="noopener" class="btn btn--ghost btn--sm">
        {{ product.cta }} <AppIcon name="external" :size="16" />
        <span class="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  </article>
</template>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-2);
  transition: border-color 0.4s, transform 0.5s var(--ease);
}
.product:hover { border-color: rgba(90, 168, 255, 0.4); transform: translateY(-4px); }
.product__art {
  position: relative;
  isolation: isolate;
  aspect-ratio: 16 / 9;
  display: grid;
  place-items: center;
  background: #0d1424;
}
.product__name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(36px, 4vw, 52px);
  letter-spacing: -0.03em;
  color: rgba(255, 255, 255, 0.92);
}
.product__body { padding: 28px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.product__tag { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--brand-bright); }
.product h3 { font-size: 24px; }
.product h3 span { color: var(--muted); font-weight: 500; }
.product p { color: var(--muted); font-size: 15px; }
.product ul { list-style: none; margin: 4px 0 0; padding: 0; display: grid; gap: 8px; font-size: 15px; }
.product li { display: flex; gap: 10px; align-items: center; }
.product li svg { color: var(--gold); flex: none; }
.product .btn { margin-top: auto; align-self: flex-start; }
.product__body > p + .btn, .product ul + .btn { margin-top: 16px; }
</style>
