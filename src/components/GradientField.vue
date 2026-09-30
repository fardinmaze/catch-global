<script setup>
// Slow-drifting "aurora" gradient drawn on a low-res canvas and upscaled,
// so the blobs stay soft without a costly CSS blur. Pauses off-screen and
// renders a single still frame for prefers-reduced-motion.
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // [color, alpha, radius (fraction of the larger side), base x, base y]
  blobs: {
    type: Array,
    default: () => [
      ['#1e5fd6', 0.55, 0.4, 0.7, 0.4],
      ['#0b2a6b', 0.7, 0.42, 0.35, 0.55],
      ['#5aa8ff', 0.22, 0.26, 0.55, 0.3],
      ['#f2b632', 0.12, 0.24, 0.85, 0.7],
    ],
  },
  speed: { type: Number, default: 1 },
  drift: { type: Number, default: 0.18 }, // how far blobs wander (fraction of size)
})

const canvas = ref(null)
let ctx, raf, io, ro
let visible = true
let w = 0
let h = 0
const SCALE = 0.25 // draw at quarter resolution; CSS scales it up smoothly

// Per-blob random phases/frequencies so the motion never looks looped.
const seeds = props.blobs.map(() => ({
  px: Math.random() * Math.PI * 2,
  py: Math.random() * Math.PI * 2,
  fx: 0.6 + Math.random() * 0.5,
  fy: 0.5 + Math.random() * 0.5,
  pr: Math.random() * Math.PI * 2,
}))

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}
const rgb = props.blobs.map((b) => hexToRgb(b[0]))

function resize() {
  const r = canvas.value.getBoundingClientRect()
  w = Math.max(1, Math.round(r.width * SCALE))
  h = Math.max(1, Math.round(r.height * SCALE))
  canvas.value.width = w
  canvas.value.height = h
}

function draw(time) {
  const t = (time / 1000) * 0.12 * props.speed
  const size = Math.max(w, h)
  ctx.globalCompositeOperation = 'source-over'
  ctx.clearRect(0, 0, w, h)
  ctx.globalCompositeOperation = 'screen'

  props.blobs.forEach(([, alpha, radius, bx, by], i) => {
    const s = seeds[i]
    const x = (bx + Math.sin(t * s.fx + s.px) * props.drift) * w
    const y = (by + Math.cos(t * s.fy + s.py) * props.drift) * h
    const r = radius * size * (1 + Math.sin(t * 0.8 + s.pr) * 0.15)
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, `rgba(${rgb[i]}, ${alpha})`)
    g.addColorStop(0.5, `rgba(${rgb[i]}, ${alpha * 0.35})`)
    g.addColorStop(1, `rgba(${rgb[i]}, 0)`)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
  })
}

function loop(time) {
  if (visible) draw(time)
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resize()
  ro = new ResizeObserver(() => {
    resize()
    draw(performance.now())
  })
  ro.observe(canvas.value)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    draw(0)
    return
  }
  io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  io.observe(canvas.value)
  raf = requestAnimationFrame(loop)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  io?.disconnect()
  ro?.disconnect()
})
</script>

<template>
  <canvas ref="canvas" class="gradient-field" aria-hidden="true"></canvas>
</template>

<style scoped>
.gradient-field {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}
</style>
