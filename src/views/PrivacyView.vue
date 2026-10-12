<script setup>
import { company } from '../data/site'
import LegalPage from '../components/LegalPage.vue'
</script>

<template>
  <LegalPage title="Privacy Policy">
    <p>{{ company.legalNameTitle }} (ABN {{ company.abn }}) (“Catch Global”, “we”, “us”) is committed to handling personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.</p>

    <h2>What we collect</h2>
    <p>When you submit a project enquiry through our website enquiry form, we collect the details you provide, which may include:</p>
    <ul>
      <li>your name, business or organisation, email address and phone number</li>
      <li>the service area you are interested in and a description of your requirement</li>
      <li>links to an existing website or system, desired timing, indicative budget and how you heard about us</li>
    </ul>

    <h2>How we use it</h2>
    <p>We use enquiry information to review your requirement, contact you, prepare a proposed scope and quotation, and manage our relationship with you. We do not sell your personal information.</p>

    <h2>Analytics and cookies</h2>
    <p>[To be completed once the analytics and tracking stack is confirmed — describe the tools used (e.g. Google Analytics 4), the data collected, cookies set and how visitors can opt out.]</p>

    <h2>Third-party service providers</h2>
    <p>[To be completed — list the providers that process enquiry data, such as email (Microsoft 365), form handling, hosting and any CRM, and where data is stored.]</p>

    <h2>Security and retention</h2>
    <p>We take reasonable steps to protect personal information from misuse, loss and unauthorised access, and keep it only for as long as needed for the purposes above or as required by law.</p>

    <h2>Access, correction and complaints</h2>
    <p>You can ask to access or correct the personal information we hold about you, or raise a privacy concern, by contacting us through our <RouterLink to="/contact">contact page</RouterLink>. If you are not satisfied with our response, you may contact the Office of the Australian Information Commissioner (oaic.gov.au).</p>

    <h2>Contact</h2>
    <p>{{ company.legalName }} · {{ company.locationLong }}</p>
  </LegalPage>
</template>
