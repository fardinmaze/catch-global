import { createRouter, createWebHistory } from 'vue-router'
import { seo } from './data/site'

const routes = [
  { path: '/', name: 'home', component: () => import('./views/HomeView.vue') },
  { path: '/about', name: 'about', component: () => import('./views/AboutView.vue') },
  { path: '/services', name: 'services', component: () => import('./views/ServicesView.vue') },
  { path: '/technology', name: 'technology', component: () => import('./views/TechnologyView.vue') },
  { path: '/our-work', name: 'work', component: () => import('./views/WorkView.vue') },
  { path: '/team', name: 'team', component: () => import('./views/TeamView.vue') },
  { path: '/contact', name: 'contact', component: () => import('./views/ContactView.vue') },
  { path: '/privacy', name: 'privacy', component: () => import('./views/PrivacyView.vue') },
  { path: '/terms', name: 'terms', component: () => import('./views/TermsView.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./views/NotFoundView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) {
      // Services has a sticky finder bar under the header, so it needs more offset.
      const top = to.path === '/services' ? 160 : 100
      // Wait for the page transition (and lazy view) before looking up the anchor.
      const delay = to.path === from.path ? 0 : 400
      return new Promise((resolve) =>
        setTimeout(() => resolve({ el: to.hash, top, behavior: 'smooth' }), delay),
      )
    }
    return { top: 0 }
  },
})

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/)
    el.setAttribute(key, name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

router.afterEach((to) => {
  const meta = seo[to.path] || { title: 'Page not found | Catch Global', description: seo['/'].description }
  document.title = meta.title
  setMeta('meta[name="description"]', 'content', meta.description)
  setMeta('meta[property="og:title"]', 'content', meta.title)
  setMeta('meta[property="og:description"]', 'content', meta.description)
})

export default router
