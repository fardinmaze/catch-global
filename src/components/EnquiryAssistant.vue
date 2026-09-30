<script setup>
// First-launch enquiry assistant, following the pack's chatbot script (section 10).
// It is a guided, scripted flow: it explains options and collects details, and
// never produces prices, delivery dates or guarantees. An AI model can later sit
// behind the same steps once approved FAQs and routing are in place.
import { ref, reactive, computed, nextTick, watch } from 'vue'
import { enquiry } from '../data/site'
import { submitEnquiry } from '../lib/enquiry'
import { assistant } from '../lib/assistant'
import AppIcon from './AppIcon.vue'

const choices = [
  ['Build a website, app or software', 'Technology & Software'],
  ['Improve a business process', 'Automation'],
  ['SEO / digital marketing', 'SEO & Digital Growth'],
  ['Brand, content or design', 'Brand & Creative'],
  ['Event, video or live stream', 'Media & Event Documentation'],
  ['Something else', 'Not sure'],
]

const GREETING = 'Hi, I’m the Catch Global enquiry assistant. I can help you find the right service or collect the details for a project enquiry. What are you looking for today?'

const data = reactive({})
const messages = ref([])
const step = ref('service')
const input = ref('')
const consent = ref(false)
const error = ref('')
const sending = ref(false)
const log = ref(null)
const field = ref(null)

function say(text, from = 'bot') {
  messages.value.push({ from, text })
  nextTick(() => log.value?.scrollTo({ top: log.value.scrollHeight, behavior: 'smooth' }))
}

function start() {
  Object.keys(data).forEach((k) => delete data[k])
  messages.value = []
  consent.value = false
  error.value = ''
  step.value = 'service'
  say(GREETING)
}
start()

const prompts = {
  need: 'What would you like this project to achieve?',
  existing: 'Is there anything we should look at — a current website, system, social page or brief? Paste a link, or skip.',
  timing: 'What timing are you working toward?',
  budget: 'Do you have an indicative budget range? This is optional.',
  name: 'Thanks. What’s your name?',
  organisation: 'And the business or organisation?',
  email: 'What’s the best email to reach you?',
  phone: 'A phone number is optional — add one, or skip.',
}
const order = ['service', 'need', 'existing', 'timing', 'budget', 'name', 'organisation', 'email', 'phone', 'confirm']

function next() {
  const i = order.indexOf(step.value)
  step.value = order[i + 1]
  if (step.value === 'confirm') {
    say('Here’s a summary of your enquiry. Please check it before I send it to the team.')
  } else {
    say(prompts[step.value])
    nextTick(() => field.value?.focus())
  }
}

function choose(label, value, key = step.value) {
  say(label, 'user')
  data[key] = value
  next()
}

function skip() {
  say('Skip', 'user')
  next()
}

const isText = computed(() => ['need', 'existing', 'name', 'organisation', 'email', 'phone'].includes(step.value))
const optional = computed(() => ['existing', 'phone'].includes(step.value))

function send() {
  const value = input.value.trim()
  error.value = ''
  if (!value) return
  if (step.value === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error.value = 'That doesn’t look like an email address — please check it.'
    return
  }
  say(value, 'user')
  data[step.value] = value
  input.value = ''
  next()
}

const summary = computed(() => [
  ['Service area', data.service],
  ['What you need', data.need],
  ['Existing website / system', data.existing],
  ['Timing', data.timing],
  ['Indicative budget', data.budget],
  ['Name', data.name],
  ['Organisation', data.organisation],
  ['Email', data.email],
  ['Phone', data.phone],
].filter(([, v]) => v))

async function confirm() {
  if (!consent.value) {
    error.value = 'Please confirm you agree to the Privacy Policy so we can respond.'
    return
  }
  error.value = ''
  sending.value = true
  try {
    const via = await submitEnquiry({ ...data, channel: 'Enquiry assistant' })
    step.value = 'done'
    say(`${enquiry.confirmTitle} ${enquiry.confirmBody}`)
    if (via === 'mailto') say('Your email app has opened with these details — please press send there to complete the enquiry.')
  } catch {
    error.value = 'Sorry, the enquiry could not be sent. Please try again, or use the form on the Contact page.'
  } finally {
    sending.value = false
  }
}

watch(() => assistant.open, (open) => {
  if (open) nextTick(() => document.querySelector('.assistant__panel button, .assistant__panel input')?.focus())
})
function onKey(e) {
  if (e.key === 'Escape') assistant.open = false
}
</script>

<template>
  <div class="assistant" @keydown="onKey">
    <Transition name="pop">
      <section
        v-if="assistant.open"
        class="assistant__panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby="assistant-title"
      >
        <header class="assistant__head">
          <span class="assistant__avatar"><AppIcon name="chat" :size="18" /></span>
          <div>
            <h2 id="assistant-title">Enquiry assistant</h2>
            <p>Usually takes 2 minutes</p>
          </div>
          <button class="assistant__icon-btn" aria-label="Start over" title="Start over" @click="start"><AppIcon name="refresh" :size="16" /></button>
          <button class="assistant__icon-btn" aria-label="Close assistant" @click="assistant.open = false"><AppIcon name="close" :size="18" /></button>
        </header>

        <div ref="log" class="assistant__log" aria-live="polite">
          <p v-for="(m, i) in messages" :key="i" class="msg" :class="`msg--${m.from}`">{{ m.text }}</p>

          <dl v-if="step === 'confirm' || step === 'done'" class="assistant__summary">
            <template v-for="[k, v] in summary" :key="k"><dt>{{ k }}</dt><dd>{{ v }}</dd></template>
          </dl>
        </div>

        <footer class="assistant__input">
          <div v-if="step === 'service'" class="chips">
            <button v-for="[label, value] in choices" :key="label" class="chip" @click="choose(label, value)">{{ label }}</button>
          </div>

          <div v-else-if="step === 'timing'" class="chips">
            <button v-for="t in enquiry.timings" :key="t" class="chip" @click="choose(t, t)">{{ t }}</button>
          </div>

          <div v-else-if="step === 'budget'" class="chips">
            <button v-for="b in enquiry.budgets" :key="b" class="chip" @click="choose(b, b)">{{ b }}</button>
            <button class="chip chip--ghost" @click="skip">Skip</button>
          </div>

          <form v-else-if="isText" class="assistant__form" @submit.prevent="send">
            <label class="sr-only" for="assistant-field">Your answer</label>
            <textarea
              v-if="step === 'need'"
              id="assistant-field"
              ref="field"
              v-model="input"
              rows="2"
              placeholder="Type your answer…"
              @keydown.enter.exact.prevent="send"
            ></textarea>
            <input
              v-else
              id="assistant-field"
              ref="field"
              v-model="input"
              :type="step === 'email' ? 'email' : step === 'existing' ? 'url' : step === 'phone' ? 'tel' : 'text'"
              :autocomplete="{ name: 'name', organisation: 'organization', email: 'email', phone: 'tel' }[step] || 'off'"
              placeholder="Type your answer…"
            />
            <button type="submit" class="assistant__send" aria-label="Send" :disabled="!input.trim()"><AppIcon name="send" :size="18" /></button>
            <button v-if="optional" type="button" class="chip chip--ghost" @click="skip">Skip</button>
          </form>

          <div v-else-if="step === 'confirm'" class="assistant__confirm">
            <label class="check">
              <input v-model="consent" type="checkbox" />
              <span>I agree to my details being used to respond to this enquiry (<RouterLink to="/privacy">Privacy Policy</RouterLink>).</span>
            </label>
            <div class="assistant__actions">
              <button class="btn btn--primary btn--sm" :disabled="sending" @click="confirm">{{ sending ? 'Sending…' : 'Send enquiry' }}</button>
              <button class="btn btn--ghost btn--sm" @click="start">Start over</button>
            </div>
          </div>

          <div v-else-if="step === 'done'" class="assistant__actions">
            <button class="btn btn--ghost btn--sm" @click="start">New enquiry</button>
          </div>

          <p v-if="error" class="assistant__error" role="alert">{{ error }}</p>
          <p class="assistant__guard">Our team reviews every enquiry. The assistant doesn’t provide prices, delivery dates or guarantees.</p>
        </footer>
      </section>
    </Transition>

    <button
      class="assistant__launcher"
      :class="{ 'is-open': assistant.open }"
      :aria-expanded="assistant.open"
      @click="assistant.open = !assistant.open"
    >
      <AppIcon :name="assistant.open ? 'close' : 'chat'" :size="20" />
      <span>{{ assistant.open ? 'Close' : 'Enquiry assistant' }}</span>
    </button>
  </div>
</template>

<style scoped>
.assistant { position: fixed; right: 20px; bottom: 20px; z-index: 120; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }

.assistant__launcher {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 22px 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(90, 168, 255, 0.45);
  background: var(--brand);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 500;
  box-shadow: 0 16px 40px -12px rgba(30, 95, 214, 0.8);
  transition: background 0.3s, transform 0.25s var(--ease), box-shadow 0.3s;
}
.assistant__launcher:hover { background: var(--brand-deep); transform: translateY(-2px); box-shadow: 0 20px 44px -12px rgba(30, 95, 214, 0.95); }
.assistant__launcher:active { transform: scale(0.97); }
.assistant__launcher.is-open { background: var(--bg-3); border-color: var(--line); box-shadow: none; }

.assistant__panel {
  width: min(400px, calc(100vw - 40px));
  height: min(620px, calc(100svh - 120px));
  display: flex;
  flex-direction: column;
  background: #0e1422;
  border: 1px solid rgba(90, 168, 255, 0.25);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.7);
}
.assistant__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 16px 16px 18px;
  border-bottom: 1px solid var(--line);
  background: linear-gradient(135deg, rgba(30, 95, 214, 0.35), transparent 70%);
}
.assistant__head > div { flex: 1; }
.assistant__head h2 { font-size: 16px; letter-spacing: 0; }
.assistant__head p { font-size: 12px; color: var(--muted); }
.assistant__avatar { width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; background: var(--gold); color: var(--ink); }
.assistant__icon-btn {
  width: 34px; height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: none;
  border: 1px solid transparent;
  color: var(--muted);
  transition: background 0.25s, color 0.25s, border-color 0.25s;
}
.assistant__icon-btn:hover { background: rgba(255, 255, 255, 0.08); color: var(--text); border-color: var(--line); }

.assistant__log { flex: 1; overflow-y: auto; padding: 18px; display: flex; flex-direction: column; gap: 10px; }
.msg { max-width: 86%; padding: 11px 14px; border-radius: 16px; font-size: 14px; line-height: 1.5; white-space: pre-line; }
.msg--bot { background: var(--bg-3); border-bottom-left-radius: 4px; align-self: flex-start; }
.msg--user { background: var(--brand); color: #fff; border-bottom-right-radius: 4px; align-self: flex-end; }

.assistant__summary {
  margin: 4px 0 0;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 14px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 14px;
  font-size: 13px;
}
.assistant__summary dt { color: var(--muted); }
.assistant__summary dd { margin: 0; word-break: break-word; }

.assistant__input { padding: 14px 16px 12px; border-top: 1px solid var(--line); display: grid; gap: 10px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  padding: 9px 14px;
  border-radius: 999px;
  border: 1px solid rgba(90, 168, 255, 0.4);
  background: rgba(30, 95, 214, 0.12);
  color: var(--text);
  font-size: 13px;
  transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.2s var(--ease);
}
.chip:hover { background: var(--brand); border-color: var(--brand); }
.chip:active { transform: scale(0.96); }
.chip--ghost { background: none; border-color: var(--line); color: var(--muted); }
.chip--ghost:hover { background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.3); color: var(--text); }

.assistant__form { display: flex; gap: 8px; align-items: flex-end; }
.assistant__form input, .assistant__form textarea {
  flex: 1;
  min-width: 0;
  font: inherit;
  font-size: 15px;
  color: var(--text);
  background: var(--bg);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  padding: 11px 14px;
  resize: none;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.assistant__form input:focus, .assistant__form textarea:focus { outline: none; border-color: var(--brand-bright); box-shadow: 0 0 0 3px rgba(90, 168, 255, 0.2); }
.assistant__send {
  width: 44px; height: 44px;
  flex: none;
  border-radius: 50%;
  border: 0;
  display: grid;
  place-items: center;
  background: var(--gold);
  color: var(--ink);
  transition: background 0.25s, transform 0.2s var(--ease), opacity 0.25s;
}
.assistant__send:hover { background: var(--gold-hover); }
.assistant__send:active { transform: scale(0.94); }
.assistant__send:disabled { opacity: 0.4; cursor: not-allowed; }

.assistant__confirm { display: grid; gap: 12px; }
.check { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: #c3cbdb; }
.check input { width: 18px; height: 18px; accent-color: var(--gold); flex: none; margin-top: 1px; }
.check a { color: var(--gold); text-decoration: underline; }
.assistant__actions { display: flex; gap: 8px; flex-wrap: wrap; }
.assistant__error { color: #ff9a9a; font-size: 13px; }
.assistant__guard { font-size: 11px; color: var(--muted); line-height: 1.4; }

.pop-enter-active, .pop-leave-active { transition: opacity 0.3s, transform 0.35s var(--ease); transform-origin: bottom right; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateY(12px) scale(0.96); }

@media (max-width: 560px) {
  .assistant { right: 12px; bottom: 12px; }
  .assistant__launcher span { display: none; }
  .assistant__launcher { width: 56px; height: 56px; padding: 0; justify-content: center; }
  .assistant__panel { width: calc(100vw - 24px); height: calc(100svh - 100px); }
}
</style>
