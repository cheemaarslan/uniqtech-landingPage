<script setup lang="ts">
import { partners, trustedPartners } from '~/data/landing'
</script>

<template>
  <section
    id="trusted-partners"
    class="relative overflow-hidden bg-paper py-16 sm:py-24"
    aria-labelledby="trusted-partners-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2
        id="trusted-partners-title"
        class="heading-section text-navy-900"
      >
        Trusted Partners
      </h2>
      <span
        class="mt-4 block h-1 w-20 rounded-full bg-uq-500"
        aria-hidden="true"
      />

      <!-- The two lead partners -->
      <div class="mt-12 grid items-center rounded-3xl border border-navy-800/10 bg-white sm:grid-cols-2">
        <div class="flex items-center justify-center p-8 sm:p-10">
          <img
            :src="partners.uniqtech.logo"
            :alt="partners.uniqtech.name"
            loading="lazy"
            class="h-16 w-auto max-w-full object-contain sm:h-20"
          >
        </div>
        <div class="flex items-center justify-center border-t border-navy-800/10 p-8 sm:border-t-0 sm:border-l sm:p-10">
          <img
            :src="partners.smartgen.logo"
            :alt="partners.smartgen.name"
            loading="lazy"
            class="h-20 w-auto max-w-full object-contain sm:h-24"
          >
        </div>
      </div>

      <!-- Other partners: 2 per row on phones, 3 per row from tablets up.
           Every logo has a top border and the list is pulled up 1px under a clipping wrapper,
           so the first row's borders are hidden and a line shows only between rows. -->
      <div class="mt-6 overflow-hidden">
        <ul class="-mt-px grid grid-cols-2 sm:grid-cols-3">
          <li
            v-for="partner in trustedPartners"
            :key="partner.name"
            class="flex h-28 items-center justify-center border-t border-navy-800/10 px-5 sm:h-36 sm:px-8"
          >
            <img
              :src="partner.logo"
              :alt="partner.name"
              loading="lazy"
              class="max-h-14 w-auto max-w-full object-contain transition duration-300 hover:scale-105 sm:max-h-20"
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
