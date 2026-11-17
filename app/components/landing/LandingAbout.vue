<script setup lang="ts">
import { about } from '~/data/landing'

const statements = [
  { title: 'Our mission', text: about.mission },
  { title: 'Our vision', text: about.vision }
]
</script>

<template>
  <!-- Stats + mission and vision. Rendered inside the Partnership section, so no section wrapper or padding here. -->
  <div>
    <!-- Key figures -->
    <dl class="grid grid-cols-2 gap-y-8 rounded-3xl border border-navy-800/10 bg-paper px-4 py-8 sm:px-6 lg:grid-cols-4 lg:py-9">
      <div
        v-for="(stat, i) in about.stats"
        :key="stat.label"
        class="flex flex-col items-center justify-center px-3 text-center"
        :class="[
          i % 2 === 1 ? 'border-l border-navy-800/10' : '',
          i === 2 ? 'border-navy-800/10 lg:border-l' : ''
        ]"
      >
        <dt class="order-2 mt-2 text-sm leading-snug text-navy-800/70 sm:text-base">
          {{ stat.label }}
        </dt>
        <dd
          class="order-1 font-display font-semibold text-uq-700"
          :class="stat.value.length > 4 ? 'text-2xl leading-tight sm:text-3xl' : 'text-4xl sm:text-5xl'"
        >
          {{ stat.value }}
        </dd>
      </div>
    </dl>

    <!-- Mission and vision -->
    <div class="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-16">
      <div
        v-for="item in statements"
        :key="item.title"
      >
        <span
          class="block h-1 w-12 rounded-full bg-uq-500"
          aria-hidden="true"
        />
        <h3 class="mt-4 heading-panel text-navy-900">
          {{ item.title }}
        </h3>
        <p class="mt-3 max-w-lg text-lg leading-relaxed text-navy-800/80">
          {{ item.text }}
        </p>
      </div>
    </div>
  </div>
</template>
