import { reactive } from 'vue'

// Shared open/closed state so any page can launch the enquiry assistant.
export const assistant = reactive({ open: false })
export const openAssistant = () => (assistant.open = true)
