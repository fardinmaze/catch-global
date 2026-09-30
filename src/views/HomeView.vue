<script setup>
import { home, work, products, team } from '../data/site'
import AppIcon from '../components/AppIcon.vue'
import GradientField from '../components/GradientField.vue'
import ClientStrip from '../components/ClientStrip.vue'
import ServiceGrid from '../components/ServiceGrid.vue'
import WorkCard from '../components/WorkCard.vue'
import ProductCard from '../components/ProductCard.vue'
import PersonCard from '../components/PersonCard.vue'
import CtaBand from '../components/CtaBand.vue'

const featured = ['multicultural-mailer', 'fully-promoted-springfield', 'balanti', 'greater-springfield-rsl']
  .map((slug) => work.find((w) => w.slug === slug))
const leaders = team.groups[0].people
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="hero__aurora"><GradientField /></div>
      <div class="container hero__inner">
        <p class="eyebrow" v-reveal>Catch Global Pty Ltd</p>
        <h1 class="hero__title" v-reveal="80">{{ home.hero.title }}</h1>
        <div class="hero__bottom">
          <p class="lead" v-reveal="160">{{ home.hero.sub }}</p>
          <div class="hero__actions" v-reveal="240">
            <RouterLink to="/contact" class="btn btn--primary btn--glow">Get a Quote <AppIcon name="arrow" :size="18" /></RouterLink>
            <RouterLink to="/our-work" class="btn btn--ghost">Explore Our Work</RouterLink>
          </div>
        </div>
        <ul class="hero__support" v-reveal="320">
          <li v-for="s in home.hero.support" :key="s">{{ s }}</li>
        </ul>
      </div>
    </section>

    <ClientStrip />

    <!-- Intro -->
    <section class="section section--light">
      <div class="container intro">
        <div>
          <p class="eyebrow" v-reveal>Who we are</p>
          <h2 class="h2" v-reveal="80">{{ home.intro.title }}</h2>
        </div>
        <div class="intro__body">
          <p class="lead" v-reveal="120">{{ home.intro.body }}</p>
          <RouterLink to="/about" class="link-arrow" v-reveal="200">About Catch Global <AppIcon name="arrow-up-right" :size="18" /></RouterLink>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow" v-reveal>Services</p>
            <h2 class="h2" v-reveal="80">What we help with.</h2>
          </div>
          <div class="section-head__side" v-reveal="160">
            <p class="lead">Engage one service or combine several into a single project scope. Every project is quoted on the actual work required.</p>
            <RouterLink to="/services" class="link-arrow">All services <AppIcon name="arrow-up-right" :size="18" /></RouterLink>
          </div>
        </div>
        <ServiceGrid />
      </div>
    </section>

    <!-- Selected work -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow" v-reveal>Selected work</p>
            <h2 class="h2" v-reveal="80">{{ home.work.title }}</h2>
          </div>
          <div class="section-head__side" v-reveal="160">
            <p class="lead">{{ home.work.body }}</p>
            <RouterLink to="/our-work" class="link-arrow">View all work <AppIcon name="arrow-up-right" :size="18" /></RouterLink>
          </div>
        </div>
        <div class="work-grid">
          <WorkCard v-for="(w, i) in featured" :key="w.slug" :item="w" :index="i" v-reveal="(i % 2) * 100" />
        </div>
      </div>
    </section>

    <!-- Products -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow" v-reveal>Technology products</p>
            <h2 class="h2" v-reveal="80">{{ home.products.title }}</h2>
          </div>
          <div class="section-head__side" v-reveal="160">
            <p class="lead">{{ home.products.body }}</p>
            <RouterLink to="/technology" class="link-arrow">Technology capability <AppIcon name="arrow-up-right" :size="18" /></RouterLink>
          </div>
        </div>
        <div class="products">
          <ProductCard v-for="(p, i) in products" :key="p.name" :product="p" v-reveal="i * 100" />
        </div>
      </div>
    </section>

    <!-- Why -->
    <section class="section section--light">
      <div class="container why">
        <div class="why__intro">
          <p class="eyebrow" v-reveal>Why Catch Global</p>
          <h2 class="h2" v-reveal="80">One conversation, the right specialists.</h2>
          <RouterLink to="/contact" class="btn btn--dark" v-reveal="160">Get a Quote <AppIcon name="arrow" :size="18" /></RouterLink>
        </div>
        <ol class="why__list">
          <li v-for="(item, i) in home.why" :key="item.title" v-reveal="(i % 2) * 90">
            <span class="why__icon"><AppIcon :name="item.icon" :size="24" /></span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Team preview -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow" v-reveal>Team</p>
            <h2 class="h2" v-reveal="80">The people behind the work.</h2>
          </div>
          <div class="section-head__side" v-reveal="160">
            <p class="lead">Leadership and operations in Australia, with technology and creative specialists brought in according to each project’s scope.</p>
            <RouterLink to="/team" class="link-arrow">Meet the team <AppIcon name="arrow-up-right" :size="18" /></RouterLink>
          </div>
        </div>
        <div class="people">
          <PersonCard v-for="(p, i) in leaders" :key="p.name" :person="p" compact v-reveal="i * 80" />
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  padding: 150px 0 72px;
}
.hero__aurora {
  position: absolute;
  inset: -10% -10% 0;
  z-index: -1;
  mask-image: radial-gradient(ellipse 70% 60% at 60% 40%, #000 30%, transparent 100%);
}
.hero__title {
  font-size: clamp(44px, 7.4vw, 108px);
  line-height: 1;
  letter-spacing: -0.045em;
  max-width: 15ch;
  /* soft light-falloff fill, as on the reference headline */
  background: radial-gradient(90% 160% at 25% 15%, #fff 0%, rgba(255, 255, 255, 0.62) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
  margin-top: 44px;
}
.hero__actions { display: flex; flex-wrap: wrap; gap: 12px; }
.hero__support {
  list-style: none;
  margin: 64px 0 0;
  padding: 24px 0 0;
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  color: var(--muted);
  font-size: 15px;
}
.hero__support li { display: inline-flex; align-items: center; gap: 10px; }
.hero__support li::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: var(--gold); }

.intro { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(32px, 6vw, 96px); align-items: start; }
.intro__body { display: grid; gap: 28px; justify-items: start; padding-top: 44px; }

.section-head__side { display: grid; gap: 20px; justify-items: start; }

.work-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 48px 32px; }
.products { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.people { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

.why { display: grid; grid-template-columns: 0.9fr 1.3fr; gap: clamp(40px, 7vw, 110px); align-items: start; }
.why__intro { position: sticky; top: 120px; display: grid; gap: 28px; justify-items: start; }
.why__list { list-style: none; margin: 0; padding: 0; display: grid; }
.why__list li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  padding: 28px 0;
  border-bottom: 1px solid var(--line-dark);
}
.why__list li:first-child { padding-top: 0; }
.why__icon {
  width: 52px; height: 52px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--brand);
  color: #fff;
}
.why__list h3 { font-size: 22px; margin-bottom: 8px; }
.why__list p { color: var(--ink-muted); }

@media (max-width: 1000px) {
  .products { grid-template-columns: 1fr 1fr; }
  .people { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 860px) {
  .intro, .why { grid-template-columns: 1fr; }
  .intro__body { padding-top: 0; }
  .why__intro { position: static; }
  .work-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .products { grid-template-columns: 1fr; }
  .people { grid-template-columns: 1fr; gap: 12px; }
}
</style>
