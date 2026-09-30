<script setup>
import { company } from '../data/site'
import LegalPage from '../components/LegalPage.vue'
</script>

<template>
  <LegalPage title="Terms & Conditions">
    <p>These terms apply to your use of the Catch Global website, operated by {{ company.legalNameTitle }} (ABN {{ company.abn }}, ACN {{ company.acn }}). By using the site you agree to them.</p>

    <h2>Use of the website</h2>
    <p>You may use this website for lawful purposes only. You must not attempt to interfere with its operation, security or availability.</p>

    <h2>Information on this site</h2>
    <p>Content on this website is general information about our services and is not an offer or a quotation. Services, scope and pricing are confirmed only in a written proposal after we review your enquiry.</p>

    <h2>Case studies and results</h2>
    <p>Case studies describe work at a point in time. Any results shown are specific to that client and period, may vary, and do not guarantee future outcomes.</p>

    <h2>Intellectual property</h2>
    <p>Unless stated otherwise, the content, design and branding on this website belong to Catch Global or are used with permission. Client names and marks remain the property of their owners.</p>

    <h2>External links</h2>
    <p>This site links to third-party websites, including client and product sites. We are not responsible for their content or practices.</p>

    <h2>Limitation of liability</h2>
    <p>To the extent permitted by law, including the Australian Consumer Law, we are not liable for loss arising from use of this website or reliance on its general information.</p>

    <h2>Contact</h2>
    <p>Questions about these terms can be sent through our <RouterLink to="/contact">contact page</RouterLink>.</p>
    <p>{{ company.legalName }} · {{ company.locationLong }}</p>
  </LegalPage>
</template>
