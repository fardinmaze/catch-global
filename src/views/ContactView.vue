<script setup>
import { company, enquiry } from '../data/site'
import { openAssistant } from '../lib/assistant'
import AppIcon from '../components/AppIcon.vue'
import GradientField from '../components/GradientField.vue'
import EnquiryForm from '../components/EnquiryForm.vue'

const softBlobs = [
  ['#1e5fd6', 0.45, 0.5, 0.15, 0.35],
  ['#0b2a6b', 0.6, 0.5, 0.8, 0.3],
  ['#f2b632', 0.1, 0.3, 0.5, 0.9],
]
</script>

<template>
  <section class="contact">
    <GradientField :blobs="softBlobs" :speed="0.7" />
    <div class="container contact__grid">
      <div class="contact__info">
        <p class="eyebrow" v-reveal>Get a Quote</p>
        <h1 v-reveal="80">{{ enquiry.title }}</h1>
        <p class="lead" v-reveal="160">{{ enquiry.body }}</p>

        <div class="assist" v-reveal="220">
          <span class="assist__icon"><AppIcon name="chat" :size="22" /></span>
          <div>
            <strong>Prefer a guided chat?</strong>
            <p>The enquiry assistant asks a few quick questions and sends your details to the team.</p>
          </div>
          <button type="button" class="btn btn--brand btn--sm" @click="openAssistant">Start chat</button>
        </div>

        <ul class="contact__list" v-reveal="280">
          <li><AppIcon name="pin" /><span><strong>Location</strong>{{ company.locationLong }}</span></li>
          <li v-if="company.emailConfirmed"><AppIcon name="mail" /><a :href="`mailto:${company.email}`">{{ company.email }}</a></li>
          <li v-if="company.phone"><AppIcon name="phone" /><a :href="`tel:${company.phone.replace(/\s/g, '')}`">{{ company.phone }}</a></li>
          <li><AppIcon name="building" /><span><strong>{{ company.legalName }}</strong>ABN {{ company.abn }} · ACN {{ company.acn }}</span></li>
        </ul>
      </div>

      <div v-reveal="120">
        <EnquiryForm />
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: calc(88px + clamp(56px, 7vw, 100px)) 0 clamp(80px, 10vw, 140px);
}
.contact__grid { display: grid; grid-template-columns: 1fr 1.15fr; gap: clamp(40px, 6vw, 96px); align-items: start; }
.contact__info { display: grid; gap: 24px; align-content: start; }
.contact h1 { font-size: clamp(36px, 4.6vw, 60px); line-height: 1.04; letter-spacing: -0.03em; }

.assist {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px 16px;
  align-items: start;
  padding: 20px;
  border-radius: var(--radius);
  border: 1px solid rgba(90, 168, 255, 0.3);
  background: rgba(30, 95, 214, 0.1);
}
.assist__icon { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: var(--gold); color: var(--ink); }
.assist strong { font-family: var(--font-display); }
.assist p { color: var(--muted); font-size: 14px; margin-top: 4px; }
.assist .btn { grid-column: 2; justify-self: start; }

.contact__list { list-style: none; margin: 8px 0 0; padding: 0; display: grid; gap: 18px; }
.contact__list li { display: flex; gap: 14px; align-items: flex-start; color: var(--muted); }
.contact__list svg { color: var(--gold); flex: none; margin-top: 2px; }
.contact__list strong { display: block; color: var(--text); font-weight: 500; }
.contact__list a { transition: color 0.3s; }
.contact__list a:hover { color: var(--text); }

@media (max-width: 900px) { .contact__grid { grid-template-columns: 1fr; } }
</style>
