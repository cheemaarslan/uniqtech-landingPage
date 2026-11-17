<script setup lang="ts">
import { contact, services } from '~/data/landing'

// One modal for the whole site, opened with useContactModal().openContact()
const { open, service } = useContactModal()

const serviceName = computed(() => services.find(s => s.id === service.value)?.name)
const title = computed(() => serviceName.value ? `Discuss ${serviceName.value}` : 'Request a consultation')
const description = 'Share what you need and where. A project lead will reply within one working day.'

// Short reassurance points beside the form (from the partnership and process sections)
const points = [
  { icon: 'i-lucide-clock', text: 'A reply within one working day' },
  { icon: 'i-lucide-users', text: 'One point of contact for all five services' },
  { icon: 'i-lucide-map-pin', text: 'A site assessment before any proposal' }
]

// A fresh form each time the modal opens, so a previous "Enquiry sent" doesn't linger
const formKey = ref(0)
watch(open, (isOpen) => {
  if (isOpen) formKey.value++
})
</script>

<template>
  <!-- title and description label the dialog for screen readers; the visible copy repeats them -->
  <UModal
    v-model:open="open"
    :title="title"
    :description="description"
    :ui="{ content: 'sm:max-w-4xl rounded-3xl' }"
  >
    <template #content="{ close }">
      <div class="grid min-h-0 flex-1 md:grid-cols-[0.8fr_1.2fr]">
        <!-- Side panel: photo and a few facts (hidden on small screens to keep the form first) -->
        <aside class="hidden overflow-hidden bg-navy-950 text-white md:flex md:flex-col">
          <!-- Photo on top, copy underneath on solid navy, so the copy never covers the people.
               Two engineers talking through a plan on site (Pexels License, pexels.com/photo/8961032). -->
          <div class="relative min-h-40 flex-1">
            <img
              src="/images/contact-engineers-site.webp"
              alt=""
              width="800"
              height="1420"
              loading="lazy"
              class="absolute inset-0 size-full object-cover object-bottom"
            >
            <div class="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-navy-950" />
          </div>

          <div class="relative px-8 pt-2 pb-8">
            <p class="text-xs font-semibold tracking-[0.2em] text-uq-300 uppercase">
              UniqTech Global Solutions
            </p>
            <p class="mt-3 heading-card">
              One team, from survey to go-live
            </p>

            <ul class="mt-6 space-y-3">
              <li
                v-for="point in points"
                :key="point.text"
                class="flex items-start gap-3 text-sm text-white/85"
              >
                <UIcon
                  :name="point.icon"
                  class="mt-0.5 size-4 shrink-0 text-uq-300"
                />
                {{ point.text }}
              </li>
            </ul>

            <div
              v-if="contact.email || contact.phone"
              class="mt-8 space-y-2 border-t border-white/15 pt-5 text-sm"
            >
              <a
                v-if="contact.email"
                :href="`mailto:${contact.email}`"
                class="flex items-center gap-2.5 text-white/85 transition-colors hover:text-uq-200"
              >
                <UIcon
                  name="i-lucide-mail"
                  class="size-4 text-uq-300"
                />
                {{ contact.email }}
              </a>
              <a
                v-if="contact.phone"
                :href="`tel:${contact.phone.replace(/\s/g, '')}`"
                class="flex items-center gap-2.5 text-white/85 transition-colors hover:text-uq-200"
              >
                <UIcon
                  name="i-lucide-phone"
                  class="size-4 text-uq-300"
                />
                {{ contact.phone }}
              </a>
            </div>
          </div>
        </aside>

        <!-- Form -->
        <div class="relative min-h-0 overflow-y-auto p-6 sm:p-8">
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            aria-label="Close"
            class="absolute top-4 right-4 rounded-full"
            @click="close()"
          />
          <div
            class="pr-10"
            aria-hidden="true"
          >
            <p class="heading-panel text-navy-900">
              {{ title }}
            </p>
            <p class="mt-2 text-navy-800/75">
              {{ description }}
            </p>
          </div>
          <ContactForm
            :key="formKey"
            :service="service"
            class="mt-6"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
