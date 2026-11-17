<script setup lang="ts">
// Option 3: a calm side-by-side of a fixed collection round versus Smart Bins.
// Each row compares the same aspect, so the eye can read straight across.
const rows = [
  { topic: 'Which bins', before: 'Every bin, every round, full or not', after: 'Only the bins that need emptying' },
  { topic: 'Full bins', before: 'Overflow between rounds', after: 'Alert before a bin overflows' },
  { topic: 'Routes', before: 'The same route every day', after: 'AI plans the shortest route each day' },
  { topic: 'Waste streams', before: 'Mixed waste in one bin', after: 'Organic, recycling and hazardous kept apart' },
  { topic: 'Proof of service', before: 'No record of what was collected', after: 'Every collection verified automatically' }
]
</script>

<template>
  <div>
    <div class="max-w-2xl">
      <h3 class="heading-panel text-navy-900">
        Same streets. Smarter collection.
      </h3>
      <p class="mt-4 text-lg leading-relaxed text-navy-800/80">
        What changes when your bins report their own fill levels.
      </p>
    </div>

    <div class="mt-10 overflow-hidden rounded-3xl ring-1 ring-navy-800/10">
      <!-- Column headings (desktop) -->
      <div class="hidden grid-cols-[12rem_1fr_1fr] md:grid">
        <span class="bg-white" />
        <p class="flex items-center gap-2 bg-[#eef1f3] px-6 py-5 heading-item text-navy-800/70">
          <UIcon
            name="i-lucide-calendar-clock"
            class="size-5"
          />
          Fixed timetable
        </p>
        <p class="flex items-center gap-2 bg-uq-500 px-6 py-5 heading-item text-white">
          <UIcon
            name="i-lucide-trash-2"
            class="size-5"
          />
          With Smart Bins
        </p>
      </div>

      <dl>
        <div
          v-for="row in rows"
          :key="row.topic"
          class="grid border-t border-navy-800/10 md:grid-cols-[12rem_1fr_1fr]"
        >
          <dt class="bg-white px-6 pt-5 font-semibold text-navy-900 md:py-5">
            {{ row.topic }}
          </dt>
          <dd class="flex items-start gap-3 bg-white px-6 py-3 text-navy-800/65 md:bg-[#f7f9fa] md:py-5">
            <UIcon
              name="i-lucide-x"
              class="mt-0.5 size-5 shrink-0 text-[#c0392b]"
            />
            <span><span class="sr-only">Fixed timetable: </span>{{ row.before }}</span>
          </dd>
          <dd class="flex items-start gap-3 bg-white px-6 pb-5 font-medium text-navy-900 md:bg-uq-50 md:py-5">
            <UIcon
              name="i-lucide-check"
              class="mt-0.5 size-5 shrink-0 text-uq-600"
            />
            <span><span class="sr-only">With Smart Bins: </span>{{ row.after }}</span>
          </dd>
        </div>
      </dl>
    </div>

    <UButton
      size="xl"
      class="mt-8 rounded-full"
    >
      Plan a smart waste pilot
    </UButton>
  </div>
</template>
