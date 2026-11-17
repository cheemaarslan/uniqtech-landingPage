<script setup lang="ts">
import { projects, services } from '~/data/landing'

const activeService = useActiveService()
const { openContact } = useContactModal()

const active = computed(() => services.find(s => s.id === activeService.value) ?? services[0]!)
const proof = computed(() => projects.find(p => p.service === active.value.id))

const tabRefs = ref<HTMLButtonElement[]>([])

// Arrow keys move between tabs (WAI-ARIA tabs pattern, automatic activation)
function onKeydown(event: KeyboardEvent, index: number) {
  const keys: Record<string, number> = {
    ArrowDown: index + 1,
    ArrowRight: index + 1,
    ArrowUp: index - 1,
    ArrowLeft: index - 1,
    Home: 0,
    End: services.length - 1
  }
  if (!(event.key in keys)) return
  event.preventDefault()
  const next = (keys[event.key]! + services.length) % services.length
  activeService.value = services[next]!.id
  tabRefs.value[next]?.focus()
}

function discuss() {
  openContact(active.value.id)
}
</script>

<template>
  <section
    id="services"
    class="bg-paper py-16 sm:py-24"
    aria-labelledby="services-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <h2
          id="services-title"
          class="heading-section text-navy-900"
        >
          Five services, one delivery team
        </h2>
        <p class="mt-4 text-lg leading-relaxed text-navy-800/80">
          Each service works on its own, and they share data when you run more than one. Choose a service to see what it covers.
        </p>
      </div>

      <div class="mt-12 overflow-hidden rounded-3xl border border-navy-800/10 bg-white lg:grid lg:grid-cols-[minmax(0,23rem)_1fr]">
        <!-- Service list. Every service is drawn as a card so it is clear they are all clickable;
             the selected one gets a teal outline and side bar rather than a heavy fill.
             Phones and tablets: all five side by side as compact icon tiles (no sideways scrolling).
             Desktop: a vertical list with full names and taglines. -->
        <div class="border-b border-navy-800/10 bg-paper/60 p-2 sm:p-3 lg:border-r lg:border-b-0">
          <div
            role="tablist"
            aria-label="Services"
            class="grid grid-cols-5 gap-1.5 sm:gap-2 lg:grid-cols-1"
          >
            <button
              v-for="(service, index) in services"
              :id="`tab-${service.id}`"
              :key="service.id"
              ref="tabRefs"
              type="button"
              role="tab"
              :aria-label="service.name"
              :aria-selected="service.id === active.id"
              :aria-controls="`panel-${service.id}`"
              :tabindex="service.id === active.id ? 0 : -1"
              class="group relative flex min-w-0 flex-col items-center gap-1.5 overflow-hidden rounded-xl border bg-white px-0.5 py-3 text-center text-navy-800 transition sm:rounded-2xl sm:py-4 lg:flex-row lg:items-start lg:gap-3 lg:p-4 lg:text-left"
              :class="service.id === active.id
                ? 'border-uq-500 shadow-md shadow-uq-500/10 ring-1 ring-uq-500'
                : 'border-navy-800/10 hover:border-uq-300 hover:shadow-sm'"
              @click="activeService = service.id"
              @keydown="onKeydown($event, index)"
            >
              <span
                class="absolute inset-y-0 left-0 hidden w-1 transition-colors lg:block"
                :class="service.id === active.id ? 'bg-uq-500' : 'bg-transparent'"
                aria-hidden="true"
              />
              <!-- Featured marker on the small tiles, where the "Featured" badge doesn't fit -->
              <span
                v-if="service.featured"
                class="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-uq-500 lg:hidden"
                aria-hidden="true"
              />
              <span
                class="flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors lg:mt-0.5"
                :class="service.id === active.id ? 'bg-uq-500 text-white' : 'bg-uq-50 text-uq-600 group-hover:bg-uq-100'"
              >
                <UIcon
                  :name="service.icon"
                  class="size-5"
                />
              </span>
              <span
                class="text-[0.6875rem] leading-tight font-medium text-navy-900 sm:text-xs lg:hidden"
                aria-hidden="true"
              >{{ service.shortName }}</span>
              <span
                class="hidden min-w-0 flex-1 lg:block"
                aria-hidden="true"
              >
                <span class="block font-display leading-snug font-medium text-navy-900">{{ service.name }}</span>
                <span
                  v-if="service.featured"
                  class="mt-1.5 inline-flex rounded-full bg-uq-100 px-2 py-0.5 text-xs font-semibold text-uq-700"
                >Featured</span>
                <span class="mt-1 hidden text-sm leading-snug text-navy-800/60 lg:block">{{ service.tagline }}</span>
              </span>
              <UIcon
                name="i-lucide-chevron-right"
                class="mt-2 hidden size-4 shrink-0 transition lg:block"
                :class="service.id === active.id ? 'text-uq-500' : 'text-navy-800/30 group-hover:translate-x-0.5 group-hover:text-uq-500'"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <!-- Selected service -->
        <Transition
          mode="out-in"
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-1"
          leave-active-class="transition duration-150 ease-in"
          leave-to-class="opacity-0"
        >
          <div
            :id="`panel-${active.id}`"
            :key="active.id"
            role="tabpanel"
            :aria-labelledby="`tab-${active.id}`"
            tabindex="0"
            class="p-5 sm:p-8 lg:p-10"
          >
            <img
              :src="active.image"
              :alt="active.imageAlt"
              width="1024"
              height="576"
              loading="lazy"
              class="aspect-[16/8] w-full rounded-2xl object-cover"
            >

            <h3 class="mt-8 heading-panel text-navy-900">
              {{ active.name }}
            </h3>
            <p class="mt-3 max-w-2xl text-lg leading-relaxed text-navy-800/80">
              {{ active.summary }}
            </p>

            <ul class="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              <li
                v-for="point in active.points"
                :key="point"
                class="flex items-start gap-3"
              >
                <UIcon
                  name="i-lucide-check"
                  class="mt-1 size-4.5 shrink-0 text-uq-500"
                />
                <span class="leading-relaxed">{{ point }}</span>
              </li>
            </ul>

            <div class="mt-9 flex flex-col gap-5 border-t border-navy-800/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p
                v-if="proof"
                class="text-sm text-navy-800/70"
              >
                Already running: <span class="font-medium text-navy-900">{{ proof.title }}</span>
              </p>
              <a
                v-else-if="active.featured"
                href="#smart-waste"
                class="inline-flex items-center gap-2 font-medium text-uq-600 underline-offset-4 hover:underline"
              >
                <UIcon
                  name="i-lucide-arrow-down"
                  class="size-4"
                />
                See how Smart Bins work
              </a>
              <span v-else />
              <UButton
                size="lg"
                class="shrink-0 self-start rounded-full sm:self-auto"
                @click="discuss"
              >
                Discuss this service
              </UButton>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>
