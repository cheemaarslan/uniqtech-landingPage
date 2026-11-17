<script setup lang="ts">
// Option 2: three smart bins whose fill levels rise when they scroll into view.
// The hazardous bin reaches "full" and raises an alert, like the real sensors do.

const bins = [
  { name: 'Organic', target: 35, color: '#2f9e44', icon: 'i-lucide-leaf' },
  { name: 'Recycling', target: 60, color: '#1c64d1', icon: 'i-lucide-recycle' },
  { name: 'Hazardous', target: 95, color: '#d63a2f', icon: 'i-lucide-biohazard' }
]

const root = ref<HTMLElement>()
const filled = ref(false)
const alerted = ref(false)
let alertTimer: ReturnType<typeof setTimeout> | undefined

function fill() {
  filled.value = true
  alertTimer = setTimeout(() => (alerted.value = true), 1700)
}

function replay() {
  clearTimeout(alertTimer)
  filled.value = false
  alerted.value = false
  requestAnimationFrame(() => requestAnimationFrame(fill))
}

onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      fill()
      observer.disconnect()
    }
  }, { threshold: 0.4 })
  if (root.value) observer.observe(root.value)
  onBeforeUnmount(() => {
    observer.disconnect()
    clearTimeout(alertTimer)
  })
})
</script>

<template>
  <div
    ref="root"
    class="grid gap-10 rounded-3xl bg-uq-950 p-6 text-white sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:items-center"
  >
    <div>
      <h3 class="heading-panel">
        Bins that tell you when they are full
      </h3>
      <p class="mt-4 text-lg leading-relaxed text-white/80">
        A sensor in every bin measures the waste level. When a bin is nearly full, the command centre gets an alert and the bin joins the next collection route.
      </p>
      <div class="mt-7 flex flex-wrap gap-3">
        <UButton
          size="xl"
          class="rounded-full"
        >
          Plan a smart waste pilot
        </UButton>
        <UButton
          size="xl"
          color="neutral"
          variant="outline"
          icon="i-lucide-rotate-ccw"
          class="rounded-full bg-transparent text-white ring-white/40 hover:bg-white/10"
          @click="replay"
        >
          Replay
        </UButton>
      </div>
    </div>

    <div>
      <ul class="grid grid-cols-3 gap-4 sm:gap-8">
        <li
          v-for="bin in bins"
          :key="bin.name"
          class="flex flex-col items-center"
        >
          <!-- Lid with sensor light -->
          <span
            class="relative h-4 w-[82%] rounded-t-xl"
            :style="{ background: bin.color }"
          >
            <span
              class="absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full"
              :class="filled && bin.target >= 90 ? 'animate-pulse bg-white' : 'bg-white/60'"
            />
          </span>
          <!-- Body: the fill rises from the bottom -->
          <span
            class="relative h-48 w-full overflow-hidden rounded-b-2xl border-4 sm:h-60"
            :style="{ borderColor: bin.color }"
          >
            <span
              class="absolute inset-x-0 bottom-0 transition-[height] duration-[1600ms] ease-out"
              :style="{ height: filled ? `${bin.target}%` : '0%', background: bin.color, opacity: 0.85 }"
            />
            <UIcon
              :name="bin.icon"
              class="absolute top-4 left-1/2 size-7 -translate-x-1/2 text-white"
            />
          </span>
          <span class="mt-3 font-display text-2xl font-semibold">{{ filled ? bin.target : 0 }}%</span>
          <span class="text-sm text-white/75">{{ bin.name }}</span>
        </li>
      </ul>

      <p
        class="mt-6 flex items-center gap-3 rounded-2xl bg-[#d63a2f]/20 px-4 py-3 text-sm ring-1 ring-[#d63a2f]/50 transition-opacity duration-500"
        :class="alerted ? 'opacity-100' : 'opacity-0'"
        role="status"
      >
        <UIcon
          name="i-lucide-bell-ring"
          class="size-5 shrink-0 text-[#ff8a80]"
        />
        <span><strong class="font-semibold">Hazardous bin is 95% full.</strong> Alert sent to the command centre and added to today's route.</span>
      </p>
    </div>
  </div>
</template>
