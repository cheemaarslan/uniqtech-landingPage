<script setup lang="ts">
import { contact, nav, services } from '~/data/landing'

const activeService = useActiveService()
const { openContact } = useContactModal()
const year = new Date().getFullYear()

function showService(id: string) {
  activeService.value = id
  goToSection('services')
}
</script>

<template>
  <footer class="bg-navy-950 text-white/75">
    <div class="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1.1fr] lg:px-8">
      <div>
        <img
          src="/images/logos/uniqtech-light.png"
          alt="UniqTech Global Solutions"
          width="1048"
          height="309"
          loading="lazy"
          class="h-14 w-auto"
        >
        <p class="mt-6 max-w-sm leading-relaxed">
          Intelligent transport, energy and waste solutions, delivered by UniqTech Global Solutions.
        </p>
        <div class="mt-6 flex items-center gap-3 text-sm">
          <span>In partnership with</span>
          <!-- White logo that turns to its brand colours on hover (smartgen.webp is the dark-background version) -->
          <a
            href="https://smartgentech.net/"
            target="_blank"
            rel="noopener"
            aria-label="SmartGen Technologies (opens in a new tab)"
            class="group -m-1.5 rounded-lg p-1.5 transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-uq-300"
          >
            <img
              src="/images/logos/smartgen.webp"
              alt="SmartGen Technologies"
              width="1024"
              height="307"
              loading="lazy"
              class="h-7 w-auto brightness-0 invert transition duration-300 group-hover:scale-105 group-hover:brightness-100 group-hover:invert-0 group-focus-visible:brightness-100 group-focus-visible:invert-0"
            >
          </a>
        </div>
      </div>

      <div>
        <h2 class="font-display text-base font-semibold text-white">
          Services
        </h2>
        <ul class="mt-4 space-y-2.5">
          <li
            v-for="service in services"
            :key="service.id"
          >
            <a
              href="#services"
              class="transition-colors hover:text-uq-300"
              @click.prevent="showService(service.id)"
            >{{ service.name }}</a>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="font-display text-base font-semibold text-white">
          Company
        </h2>
        <ul class="mt-4 space-y-2.5">
          <li
            v-for="item in nav"
            :key="item.to"
          >
            <a
              :href="item.to"
              class="transition-colors hover:text-uq-300"
            >{{ item.label }}</a>
          </li>
          <li>
            <a
              href="#contact"
              class="transition-colors hover:text-uq-300"
              @click.prevent="openContact()"
            >Contact</a>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="font-display text-base font-semibold text-white">
          Contact us
        </h2>
        <ul class="mt-4 space-y-3">
          <li class="flex items-start gap-3">
            <UIcon
              name="i-lucide-map-pin"
              class="mt-1 size-4 shrink-0 text-uq-300"
            />
            <address class="not-italic leading-relaxed">
              <span
                v-for="line in contact.addressLines"
                :key="line"
                class="block"
              >{{ line }}</span>
            </address>
          </li>
          <li class="flex items-center gap-3">
            <UIcon
              name="i-lucide-phone"
              class="size-4 shrink-0 text-uq-300"
            />
            <a
              :href="`tel:${contact.phone.replace(/\s/g, '')}`"
              class="transition-colors hover:text-uq-300"
              dir="ltr"
            >{{ contact.phone }}</a>
          </li>
          <li class="flex items-center gap-3">
            <UIcon
              name="i-lucide-mail"
              class="size-4 shrink-0 text-uq-300"
            />
            <a
              :href="`mailto:${contact.email}`"
              class="transition-colors hover:text-uq-300"
            >{{ contact.email }}</a>
          </li>
          <li class="flex items-center gap-3">
            <UIcon
              name="i-lucide-globe"
              class="size-4 shrink-0 text-uq-300"
            />
            <a
              :href="`https://${contact.website}`"
              target="_blank"
              rel="noopener"
              class="transition-colors hover:text-uq-300"
            >{{ contact.website }}</a>
          </li>
        </ul>
        <address
          lang="ar"
          dir="rtl"
          class="mt-5 border-t border-white/10 pt-4 font-arabic text-sm leading-relaxed not-italic text-white/60"
        >
          <span
            v-for="line in contact.addressLinesAr"
            :key="line"
            class="block"
          >{{ line }}</span>
        </address>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-white/55 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p>© {{ year }} {{ contact.legalName }}. All rights reserved.</p>
        <p
          lang="ar"
          dir="rtl"
          class="font-arabic"
        >
          {{ contact.legalNameAr }}
        </p>
      </div>
    </div>
  </footer>
</template>
