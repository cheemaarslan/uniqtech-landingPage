// All landing page copy lives here. Components only lay it out.
// Copy marked "TODO: confirm" is a placeholder written from SmartGen's public material and needs sign-off from UniqTech.

export interface Service {
  id: string
  // Highlighted in the hero links and services panel, with its own spotlight section
  featured?: boolean
  name: string
  // Short line shown in the service list
  tagline: string
  summary: string
  points: string[]
  image: string
  imageAlt: string
  icon: string
}

export const services: Service[] = [
  {
    id: 'transport',
    name: 'Intelligent Transport Management System',
    tagline: 'Monitoring, enforcement and tolling from one control centre',
    summary: 'Cameras, sensors and tolling lanes report into a single control centre, so your team sees traffic as it happens and acts on incidents in minutes, not hours.',
    points: [
      'Live traffic monitoring and incident alerts',
      'AI speed and traffic enforcement cameras with ANPR',
      'Cashless electronic tolling with RFID vehicle identification',
      'Control-centre dashboards and compliance reporting'
    ],
    image: '/images/service-transport.webp',
    imageAlt: 'Highway interchange with live traffic data overlays',
    icon: 'i-lucide-traffic-cone'
  },
  {
    id: 'energy',
    name: 'Smart Energy Solutions',
    tagline: 'Solar, battery storage and EV charging that manage themselves',
    summary: 'Solar generation and lithium-ion storage keep sites powered on and off the grid, with remote monitoring that shows output, battery health and faults in real time.',
    points: [
      'Solar parks and rooftop arrays with inverters and MPPT controllers',
      'Lithium-ion battery packs and smart powerwalls',
      'Off-grid power for remote and roadside equipment',
      'AC and DC EV chargers from 22 kW to 420 kW'
    ],
    image: '/images/service-energy.webp',
    imageAlt: 'Engineer inspecting a solar installation',
    icon: 'i-lucide-sun'
  },
  {
    id: 'waste',
    featured: true,
    name: 'Smart Waste Management Systems',
    tagline: 'Smart bins that report when they are full',
    // Copy from SmartGen's Smart Bins solution page (smartgentech.net)
    summary: 'SmartGen Smart Bins combine IoT sensors, GPS and AI to monitor waste levels in real time, so collection follows actual need instead of a fixed timetable.',
    points: [
      'IoT fill-level sensors with instant alerts',
      'Every bin on a live GIS map',
      'AI-planned collection routes',
      'Organic, recycling and hazardous streams kept separate'
    ],
    image: '/images/waste-command-centre.webp',
    imageAlt: 'Connected smart bins for organic, recycling and hazardous waste beside a waste management truck, linked by satellite to an AI command centre',
    icon: 'i-lucide-trash-2'
  },
  {
    id: 'fleet',
    name: 'Fleet Management Solutions',
    tagline: 'Vehicle tracking, driver safety and fuel control',
    summary: 'GPS tracking and in-vehicle cameras show where every vehicle is and how it is driven, helping operators cut fuel costs and prevent accidents before they happen.',
    points: [
      'Real-time GPS tracking and route optimisation',
      'Driver fatigue and behaviour monitoring cameras',
      'In-vehicle monitoring with instant safety alerts',
      'Fuel, maintenance and utilisation reports'
    ],
    image: '/images/service-fleet.webp',
    imageAlt: 'Fleet operations dashboard tracking vehicles on a map',
    icon: 'i-lucide-truck'
  },
  {
    id: 'software',
    name: 'Software Solutions',
    tagline: 'Dashboards and analytics that connect every system',
    summary: 'Our software brings data from traffic, energy, waste and fleet systems into clear dashboards, so decision makers can plan with evidence rather than estimates.',
    points: [
      'Real-time data analytics and custom dashboards',
      'Traffic management software',
      'Urban planning and resource modelling tools',
      'Secure cloud hosting and system integration'
    ],
    image: '/images/service-software.webp',
    imageAlt: 'Analytics dashboard showing city performance data',
    icon: 'i-lucide-layout-dashboard'
  }
]

// Smart Waste spotlight section. Copy from SmartGen's Smart Bins solution page.
export const wasteSpotlight = {
  title: 'Smarter bins. Cleaner cities.',
  intro: 'Smart Bins tell your teams which bins need emptying and plan the route to reach them. Trucks stop driving past half-empty bins, and full ones get collected before they overflow.',
  image: '/images/waste-smart-city.webp',
  imageAlt: 'Solar-powered smart bins for organic, recycling and hazardous waste, connected to a route dashboard that guides collection trucks',
  // A real sequence: each stage passes information to the next
  steps: [
    { icon: 'i-lucide-gauge', title: 'Detect', text: 'IoT sensors measure how full each bin is.' },
    { icon: 'i-lucide-lock', title: 'Transmit', text: 'An encrypted signal reaches the platform.' },
    { icon: 'i-lucide-brain-circuit', title: 'Plan', text: 'AI plans the most efficient collection routes.' },
    { icon: 'i-lucide-truck', title: 'Collect', text: 'Vehicles collect and keep each waste stream apart.' }
  ],
  capabilities: [
    { icon: 'i-lucide-gauge', title: 'Fill-level monitoring', text: 'Real-time bin levels, with instant alerts for full bins.' },
    { icon: 'i-lucide-map-pin', title: 'GPS bin tracking', text: 'Every bin on a live map, with status by area.' },
    { icon: 'i-lucide-layout-dashboard', title: 'AI command centre', text: 'Fill levels, alerts, fleet status and collection progress in one view.' },
    { icon: 'i-lucide-route', title: 'Route optimisation', text: 'Fewer unnecessary trips, less fuel and lower collection costs.' },
    { icon: 'i-lucide-recycle', title: 'Waste segregation', text: 'Colour-coded bins for organic, recyclable and hazardous waste.' },
    { icon: 'i-lucide-clipboard-check', title: 'Collection verification', text: 'An automatic record that each collection was done.' }
  ],
  places: ['Smart cities and public spaces', 'Residential communities', 'Commercial areas', 'Municipal waste services'],
  pilot: {
    title: 'Start with a pilot area',
    text: 'We test coverage, connectivity and workflows in one area before a wider rollout.'
  }
}

export const partners = {
  uniqtech: {
    name: 'UniqTech Global Solutions',
    logo: '/images/logos/uniqtech.png',
    // TODO: confirm UniqTech's role with the client
    role: 'Your local partner',
    points: [
      'Single point of contact',
      'Site coordination and installation',
      'Support in Arabic and English'
    ]
  },
  smartgen: {
    name: 'SmartGen Technologies',
    // Full-colour logo for light backgrounds (smartgen.webp has a white "GEN" for dark ones)
    logo: '/images/logos/smartgen-color.webp',
    role: 'Technology and engineering',
    points: [
      'Smart hardware and software',
      'Custom production',
      'Proven on roads and power sites'
    ]
  }
}

// How a project runs. A real sequence, so it is numbered on the page.
// lead: who leads the stage (shown as a small chip). Keep each text to one short line.
export const processIntro = {
  title: 'From first site visit to long-term support',
  text: 'UniqTech leads on the ground. SmartGen engineers the technology.'
}

export const process: { title: string, text: string, lead: 'uniqtech' | 'smartgen' | 'both' }[] = [
  { title: 'Assess', text: 'We survey your sites and existing systems.', lead: 'uniqtech' },
  { title: 'Design', text: 'SmartGen selects the hardware and software.', lead: 'smartgen' },
  { title: 'Pilot', text: 'We prove it in one area first.', lead: 'both' },
  { title: 'Deploy', text: 'We install, connect and train your team.', lead: 'both' },
  { title: 'Support', text: 'We maintain, monitor and grow with you.', lead: 'uniqtech' }
]

// SmartGen projects, from smartgentech.net case studies.
export const projects = [
  { title: 'Smart Traffic Management System', service: 'transport', image: '/images/project-traffic-oman.webp', text: 'Monitoring, detection and reporting for vehicle safety across the energy sector.' },
  { title: 'Electronic toll collection', service: 'transport', image: '/images/project-etoll-kyrgyzstan.webp', text: 'Cashless toll lanes with automatic vehicle identification for the national road network.' },
  { title: 'Off-grid smart powerwall', service: 'energy', image: '/images/project-powerwall-uae.webp', text: 'Solar, cabinets, cold-metal battery packs and cloud monitoring for off-grid sites.' },
  { title: 'Solar park', service: 'energy', image: '/images/project-solar-iraq.webp', text: 'Inverters, lithium-ion battery cabinets, MPPT controllers and cloud infrastructure.' }
]

// Stats band + mission and vision, shown under the Partnership section.
// TODO: confirm with the client. These are SmartGen's figures, and "4 core pillars"
// may read oddly next to the 5 services on this page.
export const about = {
  stats: [
    { value: '15+', label: 'Years of experience' },
    { value: 'Served Globally', label: 'Dubai Headquarters' },
    { value: '50+', label: 'Products in 6 categories' },
    { value: '4', label: 'Core pillars' }
  ],
  mission: 'Reliable, innovative and scalable technology that creates safer, more efficient and more sustainable communities.',
  vision: 'A leading smart infrastructure partner, enabling smarter cities and a cleaner, more connected future.'
}

// Team work section. Photo copied from the SmartGenTech staging homepage.
// TODO: confirm the copy with the client
export const teamwork = {
  title: 'One team, on site',
  text: 'Our engineers work side by side with your people, from the first survey to the day the system goes live.',
  image: '/images/team-field.webp',
  imageAlt: 'The UniqTech and SmartGen team together at a toll facility',
  caption: { title: 'Our team in the field', text: 'Working together, on site' },
  points: [
    { icon: 'i-lucide-users', title: 'Joint project team', text: 'UniqTech and SmartGen staff on every deployment.' },
    { icon: 'i-lucide-hard-hat', title: 'Hands-on installation', text: 'We install, test and commission on site.' },
    { icon: 'i-lucide-graduation-cap', title: 'Training for your staff', text: 'Your team learns to run the system before handover.' }
  ]
}

// Trusted partners strip. Logos copied from the SmartGenTech staging site.
export const trustedPartners = [
  { name: 'Oman Energy Association', logo: '/images/partners/opal.webp' },
  { name: 'Logistics Sector Skills Unit', logo: '/images/partners/ola.webp' },
  { name: 'GreenBatt', logo: '/images/partners/greenbatt.webp' },
  { name: 'Factual', logo: '/images/partners/factual.webp' },
  { name: 'Vitronic', logo: '/images/partners/vitronic.webp' },
  { name: 'Bitlogicx', logo: '/images/partners/bitlogicx.webp' },
  { name: 'Cleovici', logo: '/images/partners/cleovici.webp' },
  { name: 'PSI Algebra', logo: '/images/partners/algebra.webp' }
]

// Contact details, from the UniqTech letterhead. Empty values are hidden on the page.
export const contact = {
  email: 'info@uniqtech.om',
  phone: '+968 9228 2124',
  address: 'Al-Seeb, Muscat, Oman · P.O. Box 139, P.C. 121',
  website: 'uniqtech.om',
  // Footer details, from the UniqTech letterhead
  legalName: 'UniqTech Global Solutions LLC',
  legalNameAr: 'الحلول التقنية المتميزة العالمية ش م م',
  addressLines: ['Al-Seeb, Muscat, Oman', 'P.O. Box 139  |  P.C. 121'],
  addressLinesAr: ['السيب، مسقط، عمان', 'ص.ب. 139، الرمز البريدي 121']
}

export const nav = [
  { label: 'Services', to: '#services' },
  { label: 'Smart Waste', to: '#smart-waste' },
  { label: 'Partnership', to: '#partnership' },
  { label: 'How we work', to: '#process' },
  { label: 'Projects', to: '#projects' }
]

// Hero slider: a partnership intro, then one slide per service. While a service slide shows,
// its card in the hero's service strip is highlighted. Layouts alternate so neighbours differ:
//   centered: pill badge, heading, text, two buttons
//   accent:   small label with rules, heading with a teal underlined ending, text, two buttons
//   minimal:  small label, very large two-line heading, a keyword line, two buttons
// Photos are real Unsplash photos (Unsplash License, free for commercial use):
//   interchange:  unsplash.com/photos/bQRSKQN5osY (right edge cropped to drop a developer's sign)
//   highway:      unsplash.com/photos/sTOQG-SAFqY
//   solar:        unsplash.com/photos/Ss73u_UKr3U
//   smart waste:  SmartGen's own artwork (images/SmartBins/0e219919-….png), converted to WebP
//   trucks:       unsplash.com/photos/P0bVatS8Jdw
//   control room: unsplash.com/photos/TtMKq3lJm-U
// TODO: confirm the copy of the service slides with the client
export interface HeroSlide {
  // Ties the slide to a service card; the intro slide has none
  serviceId?: string
  layout: 'centered' | 'accent' | 'minimal'
  image: string
  width: number
  height: number
  label: string
  title: string
  titleAccent?: string
  text?: string
  keywords?: string[]
  cta: string
}

export const heroSlides: HeroSlide[] = [
  {
    layout: 'centered',
    image: '/images/hero-dubai-interchange-night.webp',
    width: 2000,
    height: 1544,
    label: 'Partnership',
    title: 'Transport, energy and waste solutions that work as one',
    text: 'Smart traffic, energy, waste and fleet systems for authorities and operators, delivered by one team.',
    cta: 'Explore our services'
  },
  {
    serviceId: 'transport',
    layout: 'accent',
    image: '/images/hero-dubai-highway-night.webp',
    width: 2000,
    height: 1333,
    label: 'Intelligent Transport Management System',
    title: 'See traffic live,',
    titleAccent: 'act in minutes',
    text: 'Cameras, sensors and tolling lanes report into one control centre, so your team responds to incidents in minutes, not hours.',
    cta: 'Explore transport'
  },
  {
    serviceId: 'energy',
    layout: 'minimal',
    image: '/images/hero-solar-desert.webp',
    width: 1600,
    height: 900,
    label: 'Smart Energy Solutions',
    title: 'Clean power,',
    titleAccent: 'always on.',
    keywords: ['Solar parks', 'Battery storage', 'Off-grid power', 'EV charging'],
    cta: 'Explore smart energy'
  },
  {
    serviceId: 'waste',
    layout: 'centered',
    image: '/images/hero-waste-smartgen.webp',
    width: 1672,
    height: 941,
    label: 'Featured solution: Smart Waste Management',
    title: 'Smart bins that report when they are full',
    text: 'IoT sensors, GPS and AI monitor waste levels in real time, so collection follows actual need instead of a fixed timetable.',
    cta: 'See smart waste'
  },
  {
    serviceId: 'fleet',
    layout: 'accent',
    image: '/images/hero-fleet-trucks.webp',
    width: 1920,
    height: 1280,
    label: 'Fleet Management Solutions',
    title: 'Every vehicle tracked,',
    titleAccent: 'every driver safer',
    text: 'GPS tracking and in-vehicle cameras help operators cut fuel costs and prevent accidents before they happen.',
    cta: 'Explore fleet management'
  },
  {
    serviceId: 'software',
    layout: 'minimal',
    image: '/images/hero-software-control-room.webp',
    width: 1920,
    height: 1440,
    // Left fifth of the original cropped out: its screens show Cyrillic text
    label: 'Software Solutions',
    title: 'Every system,',
    titleAccent: 'one dashboard.',
    keywords: ['Traffic', 'Energy', 'Waste', 'Fleet'],
    cta: 'Explore software'
  }
]
