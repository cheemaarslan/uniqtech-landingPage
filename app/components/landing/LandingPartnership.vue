<script setup lang="ts">
import { partners } from '~/data/landing'

const sides = [
  { ...partners.uniqtech, accent: 'bg-navy-800', dot: 'text-navy-800', logoClass: 'h-12' },
  // The SmartGen logo file has wide built-in padding, so it needs more height to match visually
  { ...partners.smartgen, accent: 'bg-sg', dot: 'text-sg', logoClass: 'h-16' }
]
</script>

<template>
  <section
    id="partnership"
    class="py-16 sm:py-24"
    aria-labelledby="partnership-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2
          id="partnership-title"
          class="heading-section text-navy-900"
        >
          Two companies, one point of contact
        </h2>
        <p class="mt-4 text-lg leading-relaxed text-navy-800/80">
          UniqTech leads on the ground. SmartGen builds the technology.
        </p>
      </div>

      <!-- Two separate cards with the "+" sitting in the gap between them -->
      <div class="mt-14 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
        <template
          v-for="(side, i) in sides"
          :key="side.name"
        >
          <!-- The join, centred between the two cards -->
          <div
            v-if="i === 1"
            class="flex items-center justify-center lg:px-6"
            aria-hidden="true"
          >
            <span class="flex size-12 items-center justify-center rounded-full bg-uq-500 text-white shadow-lg shadow-uq-500/25 ring-4 ring-uq-50">
              <UIcon
                name="i-lucide-plus"
                class="size-5"
              />
            </span>
          </div>

          <article class="relative overflow-hidden rounded-3xl border border-navy-800/10 bg-white p-8 shadow-sm sm:p-10">
            <span
              class="absolute inset-x-0 top-0 h-1"
              :class="side.accent"
              aria-hidden="true"
            />
            <!-- Fixed-height logo row so both cards line up -->
            <div class="flex h-16 items-center">
              <img
                :src="side.logo"
                :alt="side.name"
                loading="lazy"
                class="w-auto max-w-full object-contain"
                :class="side.logoClass"
              >
            </div>
            <h3 class="mt-6 heading-card text-navy-900">
              {{ side.role }}
            </h3>
            <ul class="mt-4 space-y-2.5">
              <li
                v-for="point in side.points"
                :key="point"
                class="flex items-center gap-2.5 text-navy-800/80"
              >
                <UIcon
                  name="i-lucide-check"
                  class="size-4 shrink-0"
                  :class="side.dot"
                />
                {{ point }}
              </li>
            </ul>
          </article>
        </template>
      </div>

      <!-- Key figures, mission and vision -->
      <LandingAbout class="mt-12" />
    </div>
  </section>
</template>
