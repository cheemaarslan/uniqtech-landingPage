<script setup lang="ts">
import { nav } from '~/data/landing'

const open = ref(false)
const { openContact } = useContactModal()

// Close the mobile menu after choosing a section
function navigate() {
  open.value = false
}

function contactFromMenu() {
  open.value = false
  openContact()
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-navy-800/10 bg-white/95 backdrop-blur">
    <div class="mx-auto flex h-(--header-height) max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
      <NuxtLink
        to="/"
        class="flex shrink-0 items-center"
        aria-label="UniqTech Global Solutions, home"
      >
        <img
          src="/images/logos/uniqtech.png"
          alt="UniqTech Global Solutions"
          width="1048"
          height="309"
          class="h-10 w-auto sm:h-11"
        >
      </NuxtLink>

      <nav
        aria-label="Main"
        class="hidden items-center gap-8 lg:flex"
      >
        <a
          v-for="item in nav"
          :key="item.to"
          :href="item.to"
          class="text-[0.95rem] font-medium text-navy-800 transition-colors hover:text-uq-500"
        >{{ item.label }}</a>
      </nav>

      <div class="flex items-center gap-2">
        <UButton
          size="lg"
          class="hidden rounded-full sm:inline-flex"
          @click="openContact()"
        >
          Request a consultation
        </UButton>
        <UButton
          :icon="open ? 'i-lucide-x' : 'i-lucide-menu'"
          color="neutral"
          variant="ghost"
          size="lg"
          class="lg:hidden"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open = !open"
        />
      </div>
    </div>

    <nav
      v-show="open"
      id="mobile-menu"
      aria-label="Main"
      class="border-t border-navy-800/10 bg-white px-4 pt-2 pb-6 lg:hidden"
    >
      <a
        v-for="item in nav"
        :key="item.to"
        :href="item.to"
        class="block border-b border-navy-800/10 py-3.5 font-medium text-navy-800"
        @click="navigate"
      >{{ item.label }}</a>
      <UButton
        size="lg"
        block
        class="mt-5 rounded-full"
        @click="contactFromMenu"
      >
        Request a consultation
      </UButton>
    </nav>
  </header>
</template>
