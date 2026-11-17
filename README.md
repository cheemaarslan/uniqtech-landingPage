# UniqTech × SmartGen landing page

A landing page for the partnership between UniqTech Global Solutions and SmartGen Technologies. It covers five services:
Intelligent Transport Management System, Smart Energy Solutions, Smart Waste Management Systems, Fleet Management Solutions
and Software Solutions.

It is built with Nuxt 4, Nuxt UI 4 and Tailwind CSS 4, the same stack as the SmartGenTech site.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build in .output
npm run generate   # static build in .output/public (the contact form works here too, it posts to Web3Forms)
```

## Where things are

| Path | What it holds |
|---|---|
| `app/data/landing.ts` | All page copy: services, partners, process, projects, contact details |
| `app/components/landing/` | One component per page section |
| `app/components/SiteHeader.vue`, `SiteFooter.vue` | Header and footer |
| `app/assets/css/main.css` | Brand colours (navy, teal `uq` scale, SmartGen blue) and fonts |
| `app/components/ContactForm.vue` | Contact form. Posts to Web3Forms, which emails `info@uniqtech.om` (key in `nuxt.config.ts`) |
| `public/images/` | Images (copied from the SmartGenTech site) and both logos |

## Still to do

- Confirm the copy marked `TODO: confirm` in `app/data/landing.ts` with UniqTech.
