<script setup lang="ts">
import { process, processIntro } from '~/data/landing'

const { openContact } = useContactModal()

// Who leads each stage: UniqTech teal, SmartGen blue, or both
const leads = {
  uniqtech: { label: 'UniqTech', dots: ['bg-uq-400'] },
  smartgen: { label: 'SmartGen', dots: ['bg-sg'] },
  both: { label: 'UniqTech + SmartGen', dots: ['bg-uq-400', 'bg-sg'] }
}

// The timeline plays once when it scrolls into view.
// "ready" is only set in the browser, so without JavaScript everything stays visible.
const timeline = ref<HTMLElement>()
const ready = ref(false)
const visible = ref(false)

onMounted(() => {
  ready.value = true
  const observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      visible.value = true
      observer.disconnect()
    }
  }, { threshold: 0.25 })
  if (timeline.value) observer.observe(timeline.value)
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <section
    id="process"
    class="relative isolate overflow-hidden bg-navy-900 py-16 text-white sm:py-24"
    aria-labelledby="process-title"
  >
    <div
      class="absolute -bottom-48 -left-40 -z-10 size-[34rem] rounded-full bg-uq-500/10 blur-3xl"
      aria-hidden="true"
    />

    <div
      ref="timeline"
      class="timeline mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      :class="{ 'is-ready': ready, 'is-visible': visible }"
    >
      <div class="grid gap-6 lg:grid-cols-2 lg:gap-16">
        <h2
          id="process-title"
          class="heading-section"
        >
          {{ processIntro.title }}
        </h2>
        <p class="self-end text-lg leading-relaxed text-white/75">
          {{ processIntro.text }}
        </p>
      </div>

      <!-- A real sequence: a vertical timeline on small screens, a horizontal one on large screens -->
      <ol class="mt-16 lg:grid lg:grid-cols-5 lg:gap-x-8">
        <li
          v-for="(step, index) in process"
          :key="step.title"
          class="step group relative flex gap-5 pb-10 last:pb-0 lg:block lg:pb-0"
          :style="{ '--d': `${index * 0.35}s` }"
        >
          <span
            v-if="index < process.length - 1"
            class="connector absolute top-13 bottom-1 left-5.5 w-px bg-white/20 lg:top-5.5 lg:right-[-1.5rem] lg:bottom-auto lg:left-15 lg:h-px lg:w-auto"
            aria-hidden="true"
          />
          <span class="num relative flex size-11 shrink-0 items-center justify-center rounded-full bg-uq-500 font-display text-lg font-semibold ring-4 ring-navy-900 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_0_6px_rgb(0_156_152/0.3),0_0_24px_rgb(0_156_152/0.6)]">
            {{ index + 1 }}
          </span>

          <div class="body flex-1 lg:mt-6">
            <p class="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-white/85">
              <span class="flex -space-x-1">
                <span
                  v-for="dot in leads[step.lead].dots"
                  :key="dot"
                  class="size-2.5 rounded-full ring-2 ring-navy-900"
                  :class="dot"
                />
              </span>
              {{ leads[step.lead].label }}
            </p>
            <h3 class="mt-3 heading-card transition-colors duration-300 group-hover:text-uq-200">
              {{ step.title }}
            </h3>
            <p class="mt-1.5 leading-relaxed text-white/75">
              {{ step.text }}
            </p>
          </div>
        </li>
      </ol>

      <div
        class="cta mt-14 flex flex-col gap-5 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 sm:px-8 md:flex-row md:items-center md:justify-between"
        :style="{ '--d': `${process.length * 0.35 + 0.3}s` }"
      >
        <p class="heading-card">
          Start with a site assessment
        </p>
        <UButton
          size="xl"
          class="shrink-0 self-start rounded-full md:self-auto"
          @click="openContact()"
        >
          Book a site assessment
        </UButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hidden until the timeline scrolls into view (only once the browser is ready). */
.is-ready:not(.is-visible) .num,
.is-ready:not(.is-visible) .body,
.is-ready:not(.is-visible) .cta {
  opacity: 0;
}

.is-ready:not(.is-visible) .connector {
  transform: scaleY(0);
}

/* Entrance, step by step: the number pops, the text rises, then the line draws to the next step */
.is-visible .num {
  animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) var(--d) both;
}

.is-visible .body {
  animation: rise 0.55s ease-out calc(var(--d) + 0.1s) both;
}

.is-visible .connector {
  transform-origin: top;
  animation: draw-y 0.45s ease-in-out calc(var(--d) + 0.25s) both;
}

.is-visible .cta {
  animation: rise 0.6s ease-out var(--d) both;
}

/* A small light keeps travelling along each line, like data passing between stages */
.connector::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: var(--color-uq-300);
  box-shadow: 0 0 10px 2px rgb(102 217 211 / 0.7);
  opacity: 0;
  transform: translate(-50%, -50%);
}

.is-visible .connector::after {
  animation: travel-y 2.6s ease-in-out calc(var(--d) + 1.9s) infinite;
}

@media (min-width: 1024px) {
  .is-ready:not(.is-visible) .connector {
    transform: scaleX(0);
  }

  .is-visible .connector {
    transform-origin: left;
    animation-name: draw-x;
  }

  .connector::after {
    left: 0;
    top: 50%;
  }

  .is-visible .connector::after {
    animation-name: travel-x;
  }
}

@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0.4);
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

@keyframes draw-x {
  from {
    transform: scaleX(0);
  }
}

@keyframes draw-y {
  from {
    transform: scaleY(0);
  }
}

@keyframes travel-x {
  0% { left: 0; opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

@keyframes travel-y {
  0% { top: 0; opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
</style>
