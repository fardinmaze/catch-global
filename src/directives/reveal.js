// v-reveal: fades an element up when it scrolls into view.
// Optional value sets a stagger delay in ms, e.g. v-reveal="120".
const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
      )
    : null

export default {
  mounted(el, binding) {
    el.setAttribute('data-reveal', '')
    if (binding.value) el.style.setProperty('--delay', `${binding.value}ms`)
    if (observer) observer.observe(el)
    else el.classList.add('is-visible')
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
