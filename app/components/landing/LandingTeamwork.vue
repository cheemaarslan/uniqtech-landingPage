<script setup lang="ts">
import { teamwork } from '~/data/landing'
</script>

<template>
  <!-- Dark band so it reads as its own section between the light Trusted Partners and Contact sections -->
  <section
    id="teamwork"
    class="relative isolate overflow-hidden bg-navy-900 py-16 text-white sm:py-24"
    aria-labelledby="teamwork-title"
  >
    <div
      class="absolute -top-40 -right-40 -z-10 size-[32rem] rounded-full bg-uq-500/15 blur-3xl"
      aria-hidden="true"
    />

    <div class="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.35fr] lg:gap-16 lg:px-8">
      <div>
        <h2
          id="teamwork-title"
          class="heading-section"
        >
          {{ teamwork.title }}
        </h2>
        <p class="mt-4 text-lg leading-relaxed text-white/75">
          {{ teamwork.text }}
        </p>

        <ul class="mt-10 space-y-6">
          <li
            v-for="point in teamwork.points"
            :key="point.title"
            class="flex items-start gap-4"
          >
            <span class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-uq-300 ring-1 ring-white/10">
              <UIcon
                :name="point.icon"
                class="size-5"
              />
            </span>
            <div>
              <h3 class="heading-item text-white">
                {{ point.title }}
              </h3>
              <p class="mt-1 leading-relaxed text-white/65">
                {{ point.text }}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Photo card, styled like the one on the SmartGen homepage -->
      <figure class="rounded-3xl bg-navy-800 p-2.5 shadow-2xl shadow-black/30 ring-1 ring-white/10">
        <img
          :src="teamwork.image"
          :alt="teamwork.imageAlt"
          loading="lazy"
          decoding="async"
          width="2560"
          height="1440"
          class="aspect-video w-full rounded-2xl object-cover"
        >
        <figcaption class="flex items-center gap-4 px-4 py-5 sm:px-6">
          <span class="text-sm font-medium text-uq-300">01</span>
          <span class="flex-1">
            <strong class="block font-semibold text-white">{{ teamwork.caption.title }}</strong>
            <small class="mt-1 block text-sm text-white/65">{{ teamwork.caption.text }}</small>
          </span>
          <span
            class="size-2 rounded-full bg-uq-300"
            aria-hidden="true"
          />
        </figcaption>
      </figure>
    </div>
  </section>
</template>
