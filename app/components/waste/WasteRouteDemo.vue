<script setup lang="ts">
// Option 1: interactive, illustrative demo of Smart Bins planning a collection route.
// Bins sit on a street grid; the truck route uses street corners (Manhattan legs).

interface Point { x: number, y: number }
interface Bin extends Point { id: number, fill: number }

const FULL = 75
const depot: Point = { x: 50, y: 330 }
const positions: Point[] = [
  { x: 170, y: 50 }, { x: 410, y: 50 }, { x: 290, y: 150 }, { x: 530, y: 150 },
  { x: 170, y: 250 }, { x: 410, y: 250 }, { x: 290, y: 330 }, { x: 530, y: 330 }
]
const streetsX = [50, 170, 290, 410, 530]
const streetsY = [50, 150, 250, 330]

const bins = ref<Bin[]>(positions.map((p, i) => ({ ...p, id: i + 1, fill: [92, 30, 88, 15, 40, 95, 55, 80][i]! })))
const planned = ref(false)
const day = ref(1)

const fullBins = computed(() => bins.value.filter(b => b.fill >= FULL))

const distance = (a: Point, b: Point) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)

// Nearest-neighbour round from the depot and back
function route(stops: Point[]) {
  const left = [...stops]
  const order: Point[] = [depot]
  let current = depot
  while (left.length) {
    left.sort((a, b) => distance(current, a) - distance(current, b))
    current = left.shift()!
    order.push(current)
  }
  order.push(depot)
  return order
}

function toPath(points: Point[]) {
  return points.reduce((d, p, i) => {
    if (i === 0) return `M${p.x} ${p.y}`
    const prev = points[i - 1]!
    return `${d} L${p.x} ${prev.y} L${p.x} ${p.y}`
  }, '')
}

const length = (points: Point[]) => points.slice(1).reduce((sum, p, i) => sum + distance(points[i]!, p), 0)

const fixedRoute = computed(() => route(bins.value))
const smartRoute = computed(() => route(fullBins.value))
const saving = computed(() => Math.round((1 - length(smartRoute.value) / length(fixedRoute.value)) * 100))

function colour(fill: number) {
  if (fill >= FULL) return '#d63a2f'
  if (fill >= 40) return '#e8a33d'
  return '#2f9e44'
}

function plan() {
  planned.value = true
}

// A new day: fill levels change, and at least two bins are full
function nextDay() {
  planned.value = false
  day.value++
  const fills = positions.map(() => 5 + Math.floor(Math.random() * 95))
  const fullCount = fills.filter(f => f >= FULL).length
  for (let i = fullCount; i < 2; i++) fills[Math.floor(Math.random() * fills.length)] = 80 + Math.floor(Math.random() * 19)
  bins.value = bins.value.map((b, i) => ({ ...b, fill: fills[i]! }))
}
</script>

<template>
  <div class="grid gap-8 rounded-3xl bg-white p-5 ring-1 ring-navy-800/10 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
    <div>
      <svg
        viewBox="0 0 580 380"
        class="w-full rounded-2xl bg-paper"
        role="img"
        :aria-label="planned ? `Smart route collecting ${fullBins.length} full bins` : `Fixed round visiting all ${bins.length} bins`"
      >
        <!-- Streets -->
        <g
          stroke="#dde5e9"
          stroke-width="14"
          stroke-linecap="round"
        >
          <line
            v-for="x in streetsX"
            :key="`x${x}`"
            :x1="x"
            :x2="x"
            y1="50"
            y2="330"
          />
          <line
            v-for="y in streetsY"
            :key="`y${y}`"
            :y1="y"
            :y2="y"
            x1="50"
            x2="530"
          />
        </g>

        <!-- Today's fixed round: every bin -->
        <path
          :d="toPath(fixedRoute)"
          fill="none"
          stroke="#8a9bab"
          stroke-width="3"
          stroke-dasharray="7 7"
          stroke-linejoin="round"
          class="transition-opacity duration-500"
          :opacity="planned ? 0.25 : 1"
        />

        <!-- Smart route: only the full bins -->
        <path
          :key="day"
          :d="toPath(smartRoute)"
          fill="none"
          stroke="#009c98"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
          pathLength="1"
          stroke-dasharray="1"
          :stroke-dashoffset="planned ? 0 : 1"
          class="transition-[stroke-dashoffset] duration-[1600ms] ease-in-out"
        />

        <!-- Depot -->
        <g :transform="`translate(${depot.x} ${depot.y})`">
          <rect
            x="-26"
            y="-15"
            width="52"
            height="30"
            rx="8"
            fill="#132b47"
          />
          <text
            text-anchor="middle"
            y="5"
            fill="#fff"
            font-size="12"
            font-weight="600"
          >Depot</text>
        </g>

        <!-- Bins -->
        <g
          v-for="bin in bins"
          :key="bin.id"
          :transform="`translate(${bin.x} ${bin.y})`"
          class="transition-opacity duration-500"
          :opacity="planned && bin.fill < FULL ? 0.4 : 1"
        >
          <circle
            r="19"
            :fill="colour(bin.fill)"
            stroke="#fff"
            stroke-width="3"
          />
          <text
            text-anchor="middle"
            y="4"
            fill="#fff"
            font-size="11"
            font-weight="700"
          >{{ bin.fill }}%</text>
        </g>
      </svg>

      <ul class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-navy-800/80">
        <li class="flex items-center gap-2">
          <span class="size-3 rounded-full bg-[#d63a2f]" />Full, needs collecting
        </li>
        <li class="flex items-center gap-2">
          <span class="size-3 rounded-full bg-[#e8a33d]" />Half full
        </li>
        <li class="flex items-center gap-2">
          <span class="size-3 rounded-full bg-[#2f9e44]" />Low
        </li>
        <li class="flex items-center gap-2">
          <span class="w-5 border-t-2 border-dashed border-[#8a9bab]" />Fixed round
        </li>
        <li class="flex items-center gap-2">
          <span class="w-5 border-t-4 border-uq-500" />Smart route
        </li>
      </ul>
    </div>

    <div>
      <h3 class="heading-panel text-navy-900">
        See Smart Bins plan a route
      </h3>
      <p class="mt-3 leading-relaxed text-navy-800/80">
        Each bin reports how full it is. Instead of visiting every bin, the truck goes only to the ones that need emptying.
      </p>

      <dl
        class="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-navy-800/10"
        aria-live="polite"
      >
        <div class="bg-paper p-4">
          <dt class="text-sm text-navy-800/70">
            Bins to collect
          </dt>
          <dd class="mt-1 font-display text-2xl font-semibold text-navy-900">
            {{ fullBins.length }} of {{ bins.length }}
          </dd>
        </div>
        <div class="bg-paper p-4">
          <dt class="text-sm text-navy-800/70">
            Stops
          </dt>
          <dd class="mt-1 font-display text-2xl font-semibold text-navy-900">
            {{ planned ? fullBins.length : bins.length }}
            <span class="text-base font-normal text-navy-800/60">{{ planned ? `instead of ${bins.length}` : 'on the fixed round' }}</span>
          </dd>
        </div>
        <div class="col-span-2 bg-paper p-4">
          <dt class="text-sm text-navy-800/70">
            Driving distance
          </dt>
          <dd class="mt-1 font-display text-2xl font-semibold text-navy-900">
            <template v-if="planned">
              {{ saving }}% shorter <span class="text-base font-normal text-navy-800/60">than the fixed round</span>
            </template>
            <template v-else>
              Fixed round, every bin
            </template>
          </dd>
        </div>
      </dl>

      <div class="mt-6 flex flex-wrap gap-3">
        <UButton
          v-if="!planned"
          size="lg"
          icon="i-lucide-route"
          class="rounded-full"
          @click="plan"
        >
          Plan collection route
        </UButton>
        <UButton
          v-else
          size="lg"
          icon="i-lucide-calendar-sync"
          class="rounded-full"
          @click="nextDay"
        >
          Try another day
        </UButton>
      </div>
      <p class="mt-4 text-sm text-navy-800/60">
        Illustrative demo. Real savings depend on your area, bins and fleet.
      </p>
    </div>
  </div>
</template>
