<script setup>
// Floating "Send an enquiry" button. Opens a panel with the same enquiry form as
// /contact; submissions go to the enquiry inbox (see src/lib/enquiry.js).
import { assistant } from '../lib/assistant'
import { company } from '../data/site'
import EnquiryForm from './EnquiryForm.vue'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <div class="assistant">
    <Transition name="pop">
      <section v-if="assistant.open" class="assistant__panel" role="dialog" aria-labelledby="assistant-title">
        <header class="assistant__head">
          <span class="assistant__avatar"><AppIcon name="mail" :size="18" /></span>
          <div>
            <h2 id="assistant-title">Send an enquiry</h2>
            <p>Goes to {{ company.email }}</p>
          </div>
          <button class="assistant__icon-btn" aria-label="Close enquiry form" @click="assistant.open = false"><AppIcon name="close" :size="18" /></button>
        </header>
        <div class="assistant__body">
          <EnquiryForm compact />
        </div>
      </section>
    </Transition>

    <button
      class="assistant__launcher"
      :class="{ 'is-open': assistant.open }"
      :aria-expanded="assistant.open"
      @click="assistant.open = !assistant.open"
    >
      <AppIcon :name="assistant.open ? 'close' : 'mail'" :size="20" />
      <span>{{ assistant.open ? 'Close' : 'Send an enquiry' }}</span>
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
  width: min(440px, calc(100vw - 40px));
  height: min(680px, calc(100svh - 120px));
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
.assistant__head > div { flex: 1; min-width: 0; }
.assistant__head h2 { font-size: 16px; letter-spacing: 0; }
.assistant__head p { font-size: 12px; color: var(--muted); overflow-wrap: anywhere; }
.assistant__avatar { width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; background: var(--gold); color: var(--ink); flex: none; }
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
.assistant__body { flex: 1; overflow-y: auto; padding: 18px; }

.pop-enter-active, .pop-leave-active { transition: opacity 0.3s, transform 0.35s var(--ease); transform-origin: bottom right; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateY(12px) scale(0.96); }

@media (max-width: 560px) {
  .assistant { right: 12px; bottom: 12px; }
  .assistant__launcher span { display: none; }
  .assistant__launcher { width: 56px; height: 56px; padding: 0; justify-content: center; }
  .assistant__panel { width: calc(100vw - 24px); height: calc(100svh - 100px); }
}
</style>
