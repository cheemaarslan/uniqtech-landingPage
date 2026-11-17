<script setup lang="ts">
import { contact } from '~/data/landing'

// ---- SEO and share previews (Google, WhatsApp, LinkedIn, Facebook, X) ----
const title = 'UniqTech × SmartGen | Smart City Solutions in Oman'
const description = 'UniqTech Global Solutions and SmartGen Technologies deliver intelligent transport, smart energy, smart waste, fleet management and software solutions in Oman.'

// Share apps need absolute URLs. Prefer the configured live address, else the address this page was requested on.
const { siteUrl } = useRuntimeConfig().public
const origin = (siteUrl || useRequestURL().origin).replace(/\/+$/, '')
const route = useRoute()
const pageUrl = computed(() => `${origin}${route.path}`)
const ogImage = `${origin}/og-image.jpg` // 1200×630, logo on white

useSeoMeta({
  title,
  description,
  ogType: 'website',
  ogSiteName: 'UniqTech Global Solutions',
  ogLocale: 'en_US',
  ogUrl: pageUrl,
  ogTitle: title,
  ogDescription: description,
  ogImage,
  ogImageSecureUrl: ogImage,
  ogImageType: 'image/jpeg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'UniqTech Global Solutions logo',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
  twitterImageAlt: 'UniqTech Global Solutions logo',
  robots: 'index, follow'
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [{
    // Organization details for Google (name, logo, contact, address)
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': contact.legalName,
      'alternateName': contact.legalNameAr,
      'url': `${origin}/`,
      'logo': `${origin}/images/logos/uniqtech.png`,
      'email': contact.email,
      'telephone': contact.phone.replace(/\s/g, ''),
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Al-Seeb, Muscat',
        'postOfficeBoxNumber': '139',
        'postalCode': '121',
        'addressCountry': 'OM'
      }
    })
  }]
})
</script>

<template>
  <UApp>
    <SiteHeader />
    <main>
      <NuxtPage />
    </main>
    <SiteFooter />
    <ContactModal />
  </UApp>
</template>
