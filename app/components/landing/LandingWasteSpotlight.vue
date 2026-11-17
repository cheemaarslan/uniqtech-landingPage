<script setup lang="ts">
import { wasteSpotlight as spot } from '~/data/landing'

const { openContact } = useContactModal()

function planPilot() {
  openContact('waste')
}

// The three waste streams, in the colours of the bins themselves
const streams = [
  { label: 'Organic', color: 'bg-[#2f9e44]' },
  { label: 'Recycling', color: 'bg-[#1c64d1]' },
  { label: 'Hazardous', color: 'bg-[#d63a2f]' }
]
</script>

<template>
  <section
    id="smart-waste"
    class="relative isolate overflow-hidden bg-uq-950 py-16 text-white sm:py-24"
    aria-labelledby="waste-title"
  >
    <!-- Soft teal glow so this section reads as the highlighted one -->
    <div
      class="absolute -top-40 -right-40 -z-10 size-[36rem] rounded-full bg-uq-500/20 blur-3xl"
      aria-hidden="true"
    />

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <p class="inline-flex items-center gap-2 rounded-full bg-uq-500/20 px-3.5 py-1.5 text-sm font-medium text-uq-200 ring-1 ring-uq-400/40">
            <UIcon
              name="i-lucide-recycle"
              class="size-4"
            />
            Featured solution: Smart Waste Management
          </p>
          <h2
            id="waste-title"
            class="mt-6 heading-section"
          >
            {{ spot.title }}
          </h2>
        </div>
        <div class="self-end">
          <p class="text-lg leading-relaxed text-white/80">
            {{ spot.intro }}
          </p>
          <ul
            class="mt-6 flex flex-wrap gap-2"
            aria-label="Where it is used"
          >
            <li
              v-for="place in spot.places"
              :key="place"
              class="rounded-full border border-white/20 px-3.5 py-1.5 text-sm text-white/85"
            >
              {{ place }}
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14">
        <img
          :src="spot.image"
          :alt="spot.imageAlt"
          width="1600"
          height="893"
          loading="lazy"
          class="aspect-video w-full rounded-3xl object-cover ring-1 ring-white/10"
        >

        <div>
          <h3 class="heading-panel">
            How it works
          </h3>
          <!-- A real sequence: each stage hands its data to the next -->
          <ol class="mt-6">
            <li
              v-for="(step, index) in spot.steps"
              :key="step.title"
              class="relative flex gap-4 pb-7 last:pb-0"
            >
              <span
                v-if="index < spot.steps.length - 1"
                class="absolute top-11 bottom-0 left-[1.375rem] w-px bg-uq-400/40"
                aria-hidden="true"
              />
              <span class="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-uq-500 text-white">
                <UIcon
                  :name="step.icon"
                  class="size-5"
                />
              </span>
              <div class="pt-1">
                <p class="heading-item">
                  <span class="sr-only">Step {{ index + 1 }}: </span>{{ step.title }}
                </p>
                <p class="mt-0.5 leading-relaxed text-white/75">
                  {{ step.text }}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <ul class="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="item in spot.capabilities"
          :key="item.title"
          class="border-t border-white/15 pt-6"
        >
          <UIcon
            :name="item.icon"
            class="size-6 text-uq-300"
          />
          <h3 class="mt-3 heading-item">
            {{ item.title }}
          </h3>
          <p class="mt-1.5 leading-relaxed text-white/75">
            {{ item.text }}
          </p>
          <ul
            v-if="item.icon === 'i-lucide-recycle'"
            class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/80"
            aria-label="Waste streams"
          >
            <li
              v-for="stream in streams"
              :key="stream.label"
              class="flex items-center gap-1.5"
            >
              <span
                class="size-2.5 rounded-full"
                :class="stream.color"
                aria-hidden="true"
              />
              {{ stream.label }}
            </li>
          </ul>
        </li>
      </ul>

      <div class="mt-16 flex flex-col gap-6 rounded-3xl bg-uq-500/15 p-6 ring-1 ring-uq-400/30 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="heading-card">
            {{ spot.pilot.title }}
          </p>
          <p class="mt-1 text-white/80">
            {{ spot.pilot.text }}
          </p>
        </div>
        <UButton
          size="xl"
          class="shrink-0 self-start rounded-full md:self-auto"
          @click="planPilot"
        >
          Plan a smart waste pilot
        </UButton>
      </div>
    </div>
  </section>
</template>
