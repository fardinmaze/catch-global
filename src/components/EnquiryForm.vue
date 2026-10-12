<script setup>
import { reactive, ref } from 'vue'
import { enquiry, company } from '../data/site'
import { submitEnquiry } from '../lib/enquiry'
import AppIcon from './AppIcon.vue'

defineProps({ compact: Boolean })

const blank = () => ({
  name: '', organisation: '', email: '', phone: '', service: '', need: '',
  existing: '', timing: '', budget: '', source: '', consent: false, website: '',
})
const form = reactive(blank())
const state = ref('idle') // idle | sending | done | error
const via = ref('')

async function submit() {
  if (form.website) return // honeypot: bots fill hidden fields
  state.value = 'sending'
  try {
    const { consent, website, ...data } = form
    via.value = await submitEnquiry({ ...data, channel: 'Website form' })
    state.value = 'done'
  } catch {
    state.value = 'error'
  }
}
function reset() {
  Object.assign(form, blank())
  state.value = 'idle'
}
</script>

<template>
  <div class="enquiry" :class="{ 'enquiry--compact': compact }">
    <div v-if="state === 'done'" class="enquiry__done" role="status">
      <span class="enquiry__tick"><AppIcon name="check" :size="28" /></span>
      <h2>{{ enquiry.confirmTitle }}</h2>
      <p>{{ enquiry.confirmBody }}</p>
      <p v-if="via === 'mailto'" class="enquiry__note">Your email app has opened with the enquiry filled in. Please press send there to complete it.</p>
      <p v-if="company.emailConfirmed" class="enquiry__note">Anything to add? Email <a :href="`mailto:${company.email}`">{{ company.email }}</a>.</p>
      <button type="button" class="btn btn--ghost btn--sm" @click="reset">Send another enquiry</button>
    </div>

    <form v-else class="form" novalidate @submit.prevent="($event.target.reportValidity() && submit())">
      <div class="form__row">
        <label><span class="lbl">Name <span class="req">*</span></span><input v-model.trim="form.name" required autocomplete="name" /></label>
        <label><span class="lbl">Business / organisation <span class="req">*</span></span><input v-model.trim="form.organisation" required autocomplete="organization" /></label>
      </div>
      <div class="form__row">
        <label><span class="lbl">Email <span class="req">*</span></span><input v-model.trim="form.email" type="email" required autocomplete="email" /></label>
        <label><span class="lbl">Phone <span class="opt">optional</span></span><input v-model.trim="form.phone" type="tel" autocomplete="tel" /></label>
      </div>
      <label><span class="lbl">Service area <span class="req">*</span></span>
        <select v-model="form.service" required>
          <option value="" disabled>Select a service area</option>
          <option v-for="s in enquiry.serviceAreas" :key="s">{{ s }}</option>
        </select>
      </label>
      <label><span class="lbl">What do you need? <span class="req">*</span></span>
        <textarea v-model.trim="form.need" rows="5" required placeholder="The problem, the result you want, and anything we should know."></textarea>
      </label>
      <label><span class="lbl">Existing website / system <span class="opt">optional</span></span>
        <input v-model.trim="form.existing" type="url" inputmode="url" placeholder="https://" />
      </label>
      <div class="form__row">
        <label><span class="lbl">Desired timing <span class="opt">optional</span></span>
          <select v-model="form.timing">
            <option value="">Select timing</option>
            <option v-for="t in enquiry.timings" :key="t">{{ t }}</option>
          </select>
        </label>
        <label><span class="lbl">Indicative budget <span class="opt">optional</span></span>
          <select v-model="form.budget">
            <option value="">Select a range</option>
            <option v-for="b in enquiry.budgets" :key="b">{{ b }}</option>
          </select>
        </label>
      </div>
      <label><span class="lbl">How did you hear about us? <span class="opt">optional</span></span>
        <select v-model="form.source">
          <option value="">Select an option</option>
          <option v-for="s in enquiry.sources" :key="s">{{ s }}</option>
        </select>
      </label>
      <!-- honeypot -->
      <label class="hp" aria-hidden="true">Website<input v-model="form.website" tabindex="-1" autocomplete="off" /></label>

      <label class="check">
        <input v-model="form.consent" type="checkbox" required />
        <span>I agree to Catch Global collecting and using these details to respond to my enquiry, as described in the <RouterLink to="/privacy" target="_blank">Privacy Policy</RouterLink>. <span class="req">*</span></span>
      </label>

      <p v-if="state === 'error'" class="form__error" role="alert">Something went wrong sending your enquiry. Please try again in a moment.</p>

      <button type="submit" class="btn btn--primary" :disabled="state === 'sending'">
        {{ state === 'sending' ? 'Sending…' : enquiry.button }} <AppIcon name="send" :size="18" />
      </button>
    </form>
  </div>
</template>

<style scoped>
.form, .enquiry__done {
  background: rgba(17, 24, 39, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: clamp(24px, 3.5vw, 44px);
  display: grid;
  gap: 18px;
  align-content: start;
}
.form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.form label:not(.check) { display: grid; gap: 8px; font-size: 14px; color: #c3cbdb; }
.req { color: var(--gold); }
.opt { color: var(--muted); font-size: 12px; margin-left: 4px; }
.form input:not([type='checkbox']), .form select, .form textarea {
  font: inherit;
  font-size: 16px;
  color: var(--text);
  background: var(--bg);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-sm);
  padding: 13px 16px;
  width: 100%;
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
}
.form input:hover, .form select:hover, .form textarea:hover { border-color: rgba(255, 255, 255, 0.28); }
.form input:focus, .form select:focus, .form textarea:focus {
  outline: none;
  border-color: var(--brand-bright);
  box-shadow: 0 0 0 3px rgba(90, 168, 255, 0.2);
}
.form input:user-invalid, .form select:user-invalid, .form textarea:user-invalid { border-color: #ff7a7a; }
.form textarea { resize: vertical; }
.form select option { background: var(--bg-2); }

.check { display: flex; gap: 12px; align-items: flex-start; font-size: 14px; color: #c3cbdb; }
.check input { width: 20px; height: 20px; margin-top: 1px; accent-color: var(--gold); flex: none; }
.check a { color: var(--gold); text-decoration: underline; text-underline-offset: 3px; }
.hp { position: absolute; left: -9999px; }
.form__error { color: #ff9a9a; font-size: 14px; }
.form .btn { justify-self: start; }

.enquiry__done { justify-items: start; gap: 16px; }
.enquiry__tick {
  width: 56px; height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--gold);
  color: var(--ink);
}
.enquiry__done h2 { font-size: clamp(26px, 3vw, 34px); }
.enquiry__done p { color: var(--muted); max-width: 52ch; }
.enquiry__note { font-size: 14px; color: var(--brand-bright) !important; }
.enquiry__note a { text-decoration: underline; text-underline-offset: 3px; }

/* Inside the floating panel: no card chrome, single column, id-safe spacing */
.enquiry--compact .form, .enquiry--compact .enquiry__done { background: none; backdrop-filter: none; border: 0; padding: 0; gap: 14px; }
.enquiry--compact .form__row { grid-template-columns: 1fr; gap: 14px; }

@media (max-width: 560px) { .form__row { grid-template-columns: 1fr; } }
</style>
