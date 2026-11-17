<script setup lang="ts">
import { heroSlides, services, type HeroSlide } from '~/data/landing'

const activeService = useActiveService()
const { openContact } = useContactModal()

function showService(id: string) {
  activeService.value = id
  goToSection('services')
}

// The slide's second button: the intro goes to the services panel, Smart Waste to its
// own spotlight section, and other services open their tab in the services panel.
function explore(slide: HeroSlide) {
  if (!slide.serviceId) goToSection('services')
  else if (slide.serviceId === 'waste') goToSection('smart-waste')
  else showService(slide.serviceId)
}

function exploreHref(slide: HeroSlide) {
  return slide.serviceId === 'waste' ? '#smart-waste' : '#services'
}

// --- Slider: an intro slide, then one per service; the service strip doubles as tabs ---
const SLIDE_MS = 5000

const current = ref(0)
// 0..1, how far the active slide is through its time on screen; drives the progress bars
const progress = ref(0)
const hoverPaused = ref(false)
const userPaused = ref(false)
const autoplay = ref(false)
const paused = computed(() => hoverPaused.value || userPaused.value)
const activeServiceId = computed(() => heroSlides[current.value]?.serviceId)

function goTo(index: number) {
  current.value = (index + heroSlides.length) % heroSlides.length
  progress.value = 0
}

function showSlideFor(serviceId: string) {
  const index = heroSlides.findIndex(slide => slide.serviceId === serviceId)
  if (index !== -1) goTo(index)
}

let frame = 0
let last = 0

function tick(now: number) {
  // Cap the step so a tab coming back from the background doesn't skip slides
  const step = last ? Math.min(now - last, 100) : 0
  last = now
  if (!paused.value) {
    progress.value += step / SLIDE_MS
    if (progress.value >= 1) goTo(current.value + 1)
  }
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  // Visitors who ask for reduced motion get a still hero; dots and cards still switch slides
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  autoplay.value = true
  frame = requestAnimationFrame(tick)
})

onBeforeUnmount(() => cancelAnimationFrame(frame))

const progressWidth = computed(() => autoplay.value ? `${Math.min(progress.value, 1) * 100}%` : '100%')
</script>

<template>
  <section
    class="relative isolate overflow-hidden bg-navy-900 text-white"
    aria-labelledby="hero-title"
    aria-roledescription="carousel"
  >
    <!-- Real photos (sources in data/landing.ts); they cross-fade with a slow zoom -->
    <img
      v-for="(slide, i) in heroSlides"
      :key="slide.image"
      :src="slide.image"
      alt=""
      :width="slide.width"
      :height="slide.height"
      :fetchpriority="i === 0 ? 'high' : 'low'"
      class="hero-img absolute inset-0 -z-20 size-full object-cover object-center transition-opacity duration-1000"
      :class="i === current ? 'is-active opacity-100' : 'opacity-0'"
    >
    <div class="absolute inset-0 -z-10 bg-linear-to-b from-black/65 via-black/45 to-black/75" />
    <!-- Soft shade behind the centred copy, so it stays readable over bright photos -->
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,rgb(0_0_0/0.5),transparent)]" />

    <div class="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
      <!-- All slides share one grid cell, so the hero keeps the height of the tallest slide -->
      <div
        class="grid"
        @mouseenter="hoverPaused = true"
        @mouseleave="hoverPaused = false"
        @focusin="hoverPaused = true"
        @focusout="hoverPaused = false"
      >
        <div
          v-for="(slide, i) in heroSlides"
          :key="slide.image"
          class="slide col-start-1 row-start-1 mx-auto self-center text-center"
          :class="[{ 'is-active': i === current }, slide.layout === 'minimal' ? 'max-w-4xl' : 'max-w-3xl']"
          :inert="i !== current || undefined"
          role="group"
          aria-roledescription="slide"
          :aria-label="`${i + 1} of ${heroSlides.length}: ${slide.label}`"
        >
          <!-- Label -->
          <p
            v-if="slide.layout === 'centered' && !slide.serviceId"
            class="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/15 backdrop-blur sm:gap-x-2.5 sm:px-4 sm:text-[0.95rem]"
          >
            <span class="font-semibold text-white">UniqTech Global Solutions</span>
            <span
              class="inline-flex size-5 items-center justify-center rounded-full border border-uq-400 text-uq-300"
              aria-label="in partnership with"
            >
              <UIcon
                name="i-lucide-plus"
                class="size-3"
              />
            </span>
            <span class="font-semibold text-uq-300">SmartGen Technologies</span>
          </p>
          <p
            v-else-if="slide.layout === 'centered'"
            class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white ring-1 ring-white/15 backdrop-blur sm:text-sm"
          >
            <UIcon
              name="i-lucide-sparkles"
              class="size-4 text-uq-300"
            />
            {{ slide.label }}
          </p>
          <p
            v-else-if="slide.layout === 'accent'"
            class="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.2em] text-uq-300 uppercase"
          >
            <span class="hidden h-px w-8 bg-uq-400/60 sm:block" />
            {{ slide.label }}
            <span class="hidden h-px w-8 bg-uq-400/60 sm:block" />
          </p>
          <p
            v-else
            class="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase"
          >
            {{ slide.label }}
          </p>

          <!-- Heading: the intro's is the page's h1 -->
          <component
            :is="i === 0 ? 'h1' : 'h2'"
            :id="i === 0 ? 'hero-title' : undefined"
            class="mt-6 heading-hero text-balance"
          >
            <template v-if="slide.layout === 'minimal'">
              {{ slide.title }}<br>
              <span class="text-uq-300">{{ slide.titleAccent }}</span>
            </template>
            <template v-else-if="slide.titleAccent">
              {{ slide.title }}
              <span class="text-uq-300 underline decoration-uq-400 decoration-[3px] underline-offset-[0.2em]">{{ slide.titleAccent }}</span>
            </template>
            <template v-else>
              {{ slide.title }}
            </template>
          </component>

          <!-- Supporting line -->
          <p
            v-if="slide.keywords"
            class="mt-7 text-xs font-medium tracking-[0.08em] text-white/75 uppercase sm:text-base sm:tracking-[0.18em]"
          >
            {{ slide.keywords.join(' · ') }}
          </p>
          <p
            v-else
            class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-white/85 sm:text-lg"
          >
            {{ slide.text }}
          </p>

          <!-- Buttons -->
          <div
            class="mt-8 flex flex-wrap items-center justify-center"
            :class="slide.layout === 'minimal' ? 'gap-x-6 gap-y-3' : 'gap-3'"
          >
            <UButton
              size="xl"
              class="rounded-full"
              @click="openContact(slide.serviceId)"
            >
              Request a consultation
            </UButton>
            <a
              v-if="slide.layout === 'minimal'"
              :href="exploreHref(slide)"
              class="inline-flex items-center gap-1.5 font-medium text-white hover:text-uq-200"
              @click.prevent="explore(slide)"
            >
              {{ slide.cta }}
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4"
              />
            </a>
            <UButton
              v-else
              :href="exploreHref(slide)"
              size="xl"
              color="neutral"
              variant="outline"
              :trailing-icon="slide.serviceId ? 'i-lucide-arrow-right' : undefined"
              class="rounded-full bg-transparent text-white ring-white/40 hover:bg-white/10"
              @click.prevent="explore(slide)"
            >
              {{ slide.cta }}
            </UButton>
          </div>
        </div>
      </div>

      <!-- Slide controls: progress dots and a pause button -->
      <div class="mt-10 flex h-7 items-center justify-center gap-2 lg:mt-12">
        <button
          v-for="(slide, i) in heroSlides"
          :key="slide.image"
          type="button"
          class="relative h-1.5 overflow-hidden rounded-full transition-all duration-300"
          :class="i === current ? 'w-12 bg-white/45' : 'w-6 bg-white/25 hover:bg-white/40'"
          :aria-label="`Show slide ${i + 1}: ${slide.label}`"
          :aria-current="i === current ? 'true' : undefined"
          @click="goTo(i)"
        >
          <span
            v-if="i === current"
            class="absolute inset-y-0 left-0 rounded-full bg-uq-400"
            :style="{ width: progressWidth }"
          />
        </button>
        <button
          v-if="autoplay"
          type="button"
          class="ml-2 inline-flex size-7 items-center justify-center rounded-full text-white/70 ring-1 ring-white/25 transition-colors hover:bg-white/10 hover:text-white"
          :aria-label="userPaused ? 'Play slideshow' : 'Pause slideshow'"
          @click="userPaused = !userPaused"
        >
          <UIcon
            :name="userPaused ? 'i-lucide-play' : 'i-lucide-pause'"
            class="size-3.5"
          />
        </button>
      </div>

      <!-- Service cards: they double as slide tabs, and the active one is highlighted -->
      <ul
        class="mt-8 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:mt-10 lg:grid-cols-5"
        aria-label="Our services"
        @mouseenter="hoverPaused = true"
        @mouseleave="hoverPaused = false"
      >
        <li
          v-for="service in services"
          :key="service.id"
        >
          <button
            type="button"
            class="group relative flex h-full w-full items-start gap-3 p-5 text-left backdrop-blur transition-colors duration-500"
            :class="service.id === activeServiceId ? 'bg-uq-600/90' : 'bg-navy-900/80 hover:bg-navy-800'"
            :aria-pressed="service.id === activeServiceId"
            @click="showSlideFor(service.id)"
          >
            <span
              v-if="service.id === activeServiceId"
              class="absolute top-0 left-0 h-0.5 bg-white"
              :style="{ width: progressWidth }"
            />
            <UIcon
              :name="service.icon"
              class="mt-0.5 size-5 shrink-0 transition-colors duration-500"
              :class="service.id === activeServiceId ? 'text-white' : 'text-uq-300'"
            />
            <span>
              <span
                class="block text-[0.95rem] leading-snug font-medium text-white"
                :class="{ 'group-hover:text-uq-100': service.id !== activeServiceId }"
              >{{ service.name }}</span>
              <span
                v-if="service.featured"
                class="mt-1 block text-sm transition-colors duration-500"
                :class="service.id === activeServiceId ? 'text-uq-100' : 'text-uq-300'"
              >Featured solution</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* The active slide's copy rises in, one line after another. */
.slide {
  pointer-events: none;
}

.slide.is-active {
  pointer-events: auto;
}

.slide > * {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.slide.is-active > * {
  opacity: 1;
  animation: rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.slide.is-active > :nth-child(2) { animation-delay: 0.08s; }
.slide.is-active > :nth-child(3) { animation-delay: 0.16s; }
.slide.is-active > :nth-child(4) { animation-delay: 0.24s; }

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}

/* The active photo eases out of a slight zoom while it is on screen. */
.hero-img.is-active {
  animation: settle 7s ease-out both;
}

@keyframes settle {
  from {
    transform: scale(1.08);
  }
}

@media (prefers-reduced-motion: reduce) {
  .slide.is-active > *,
  .hero-img.is-active {
    animation: none;
  }
}
</style>
