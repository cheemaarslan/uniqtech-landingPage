<script setup lang="ts">
import { projects } from '~/data/landing'

const [featured, ...rest] = projects
</script>

<template>
  <section
    id="projects"
    class="py-16 sm:py-24"
    aria-labelledby="projects-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <h2
          id="projects-title"
          class="heading-section text-navy-900"
        >
          Already running across the region
        </h2>
        <p class="mt-4 text-lg leading-relaxed text-navy-800/80">
          SmartGen technology is in daily use on roads, toll networks and power sites. These are some of the projects behind it.
        </p>
      </div>

      <div class="mt-12 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
        <!-- Lead project, larger -->
        <article v-if="featured">
          <img
            :src="featured.image"
            :alt="featured.title"
            loading="lazy"
            width="1024"
            height="576"
            class="aspect-[16/10] w-full rounded-3xl object-cover"
          >
          <h3 class="mt-5 heading-panel text-navy-900">
            {{ featured.title }}
          </h3>
          <p class="mt-2 max-w-xl leading-relaxed text-navy-800/80">
            {{ featured.text }}
          </p>
        </article>

        <!-- The rest as a compact list -->
        <ul class="divide-y divide-navy-800/10 border-y border-navy-800/10">
          <li
            v-for="project in rest"
            :key="project.title"
            class="flex gap-5 py-6"
          >
            <img
              :src="project.image"
              :alt="project.title"
              loading="lazy"
              width="1024"
              height="576"
              class="aspect-[4/3] w-32 shrink-0 rounded-2xl object-cover sm:w-40"
            >
            <div class="self-center">
              <h3 class="heading-item text-navy-900">
                {{ project.title }}
              </h3>
              <p class="mt-1 leading-relaxed text-navy-800/75">
                {{ project.text }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
