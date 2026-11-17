<script setup lang="ts">
// TEMPORARY preview page: four ways to highlight Smart Waste Management.
// Delete this page and the unused components in components/waste/ once an option is chosen.
useHead({
  title: 'Smart Waste highlight options (preview)',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const options = [
  { id: 'option-1', title: 'Option 1: Interactive route demo', text: 'Visitors press "Plan collection route" and watch the truck route skip the bins that are not full. Press "Try another day" for new fill levels.' },
  { id: 'option-2', title: 'Option 2: Live bin fill gauges', text: 'The three bins fill up as they scroll into view. The hazardous bin reaches 95% and raises an alert. Press "Replay" to watch again.' },
  { id: 'option-3', title: 'Option 3: Before and after comparison', text: 'A calm side-by-side table: a fixed collection round compared with Smart Bins. No animation.' },
  { id: 'option-4', title: 'Option 4: Announcement bar and moving the section up', text: 'A teal bar at the very top of every page (shown below), and the current Smart Waste section moves to directly under the hero.' }
]
</script>

<template>
  <div class="bg-paper pb-24">
    <div class="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-semibold text-navy-900 sm:text-5xl">
        Smart Waste highlight options
      </h1>
      <p class="mt-4 max-w-2xl text-lg text-navy-800/80">
        Four ways to make Smart Waste Management stand out. Try each one, then tell me which option number you want on the landing page.
        You can also combine them, for example option 1 with option 4.
      </p>
      <nav
        aria-label="Options"
        class="mt-6 flex flex-wrap gap-2"
      >
        <a
          v-for="option in options"
          :key="option.id"
          :href="`#${option.id}`"
          class="rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-800 ring-1 ring-navy-800/15 hover:ring-uq-500"
        >{{ option.title.split(':')[0] }}</a>
      </nav>
    </div>

    <section
      v-for="(option, index) in options"
      :id="option.id"
      :key="option.id"
      class="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div class="mb-6 border-l-4 border-uq-500 pl-4">
        <h2 class="text-2xl font-semibold text-navy-900">
          {{ option.title }}
        </h2>
        <p class="mt-1 max-w-3xl text-navy-800/75">
          {{ option.text }}
        </p>
      </div>

      <WasteRouteDemo v-if="index === 0" />
      <WasteFillGauges v-else-if="index === 1" />
      <div
        v-else-if="index === 2"
        class="rounded-3xl bg-white p-5 ring-1 ring-navy-800/10 sm:p-10"
      >
        <WasteBeforeAfter />
      </div>
      <div
        v-else
        class="overflow-hidden rounded-3xl bg-white ring-1 ring-navy-800/10"
      >
        <WasteAnnouncementBar />
        <div class="grid gap-3 p-6 text-sm sm:p-8">
          <p class="rounded-xl bg-paper px-4 py-3 text-navy-800/70">
            Header
          </p>
          <p class="rounded-xl bg-navy-900 px-4 py-6 text-white/80">
            Hero
          </p>
          <p class="rounded-xl bg-uq-950 px-4 py-6 font-medium text-white">
            Smart Waste section (the current design), moved up to here
          </p>
          <p class="rounded-xl bg-paper px-4 py-3 text-navy-800/70">
            Services, Partnership, How a project runs, Projects, Contact
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
