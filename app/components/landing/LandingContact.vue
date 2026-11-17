<script setup lang="ts">
import { contact } from '~/data/landing'
</script>

<template>
  <section
    id="contact"
    class="bg-paper py-16 sm:py-24"
    aria-labelledby="contact-title"
  >
    <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:px-8">
      <div>
        <h2
          id="contact-title"
          class="heading-section text-navy-900"
        >
          Tell us about your project
        </h2>
        <p class="mt-4 max-w-md text-lg leading-relaxed text-navy-800/80">
          Share what you need and where. A project lead from UniqTech will reply within one working day to arrange a consultation.
        </p>

        <ul
          v-if="contact.email || contact.phone || contact.address"
          class="mt-10 space-y-4"
        >
          <li
            v-if="contact.email"
            class="flex items-center gap-3"
          >
            <UIcon
              name="i-lucide-mail"
              class="size-5 text-uq-500"
            />
            <a
              :href="`mailto:${contact.email}`"
              class="font-medium hover:text-uq-600"
            >{{ contact.email }}</a>
          </li>
          <li
            v-if="contact.phone"
            class="flex items-center gap-3"
          >
            <UIcon
              name="i-lucide-phone"
              class="size-5 text-uq-500"
            />
            <a
              :href="`tel:${contact.phone.replace(/\s/g, '')}`"
              class="font-medium hover:text-uq-600"
            >{{ contact.phone }}</a>
          </li>
          <li
            v-if="contact.address"
            class="flex items-start gap-3"
          >
            <UIcon
              name="i-lucide-map-pin"
              class="mt-0.5 size-5 text-uq-500"
            />
            <span>{{ contact.address }}</span>
          </li>
        </ul>
      </div>

      <div class="rounded-3xl bg-white p-6 sm:p-10">
        <!-- Same form as the contact modal -->
        <ContactForm />
      </div>
    </div>
  </section>
</template>
