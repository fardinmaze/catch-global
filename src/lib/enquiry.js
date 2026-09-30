import { company } from '../data/site'

// Sends a project enquiry.
// - If VITE_ENQUIRY_ENDPOINT is set (e.g. a form service, CRM webhook or the
//   company's own API), the enquiry is POSTed there as JSON.
// - Otherwise it falls back to opening a pre-filled email to the enquiry inbox,
//   so the form still works before a backend exists.
// Returns 'sent' or 'mailto'.
const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT

const LABELS = {
  name: 'Name',
  organisation: 'Business / organisation',
  email: 'Email',
  phone: 'Phone',
  service: 'Service area',
  need: 'What do you need?',
  existing: 'Existing website / system',
  timing: 'Desired timing',
  budget: 'Indicative budget',
  source: 'How did you hear about us?',
  channel: 'Submitted via',
}

export function summarise(data) {
  return Object.entries(LABELS)
    .filter(([key]) => data[key])
    .map(([key, label]) => `${label}: ${data[key]}`)
    .join('\n')
}

export async function submitEnquiry(data) {
  const payload = { ...data, submittedAt: new Date().toISOString(), page: location.pathname }

  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`Enquiry endpoint responded ${res.status}`)
    return 'sent'
  }

  const subject = `Project enquiry — ${data.organisation || data.name}`
  window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summarise(data))}`
  return 'mailto'
}
