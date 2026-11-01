# Ashaduzzaman Oli — Personal Portfolio

A futuristic, interactive portfolio for **Ashaduzzaman Oli**, Digital Project Manager & Web Development Professional.
Built with Next.js (App Router), React, TypeScript (strict), Tailwind CSS v4, Motion for React and Lucide.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm run start      # serve the production build
npm run check      # lint + typecheck + build
```

Requires Node 20.9+ (developed on Node 22).

## Editing content (no component changes needed)

All professional content lives in `src/data/`:

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, title, contact links, summary, hero copy, `showPhone` (phone is hidden by default) |
| `metrics.ts` | **Every number on the site** (11+, 400+, 2,300+, 1,700+). Change here only. |
| `experience.ts` | Roles, dates, highlights |
| `expertise.ts` | Project-management / web-development pillars, technical advantage, lifecycle |
| `technologies.ts` | Tool groups. Groups with `confirmed: false` are not rendered. Marketing areas. |
| `projects.ts` | Website references + case studies |
| `testimonials.ts` | Real, owner-approved review excerpts (`approved: true`). Empty = nothing shown. |

### Adding or enriching a project

Add or edit one entry in `src/data/projects.ts`. Only `slug`, `name`, `url`, `featured`, `hue` are required.
Optional fields (`category`, `industry`, `platform`, `overview`, `role`, `challenges`, `technologies`, `results`, `image`, …)
render automatically **only when present**, on the homepage card and on `/projects/[slug]`.
Once a project has case-study content, its card links to the case-study page instead of directly to the external site.
To use a real screenshot, put an optimised image in `public/images/projects/` and set `image` + `imageAlt`.

### Open items needing owner confirmation (marked `OWNER TO CONFIRM` in code)
- Whether to publish 2,500+ / 450+ instead of 2,300+ / 400+.
- Industry, platform, role and results for each referenced website (the reference sites could not be inspected during the build).
- Exact brand name for `op-int.com`.
- Project-management, digital-marketing and AI tools (hidden until confirmed).
- Digital marketing areas listed in `marketingAreas`.
- Real review excerpts, a professional portrait, project screenshots, and the final domain.

## Contact form
Intentionally not included: no fake form. Contact uses `mailto:`, LinkedIn and Fiverr.
To add a real form later, use a provider such as Formspree or Resend via a Next.js Route Handler, store keys in
Vercel environment variables (never in git), and add an `.env.example` entry.

## Deployment (Vercel)
1. Push this repository to GitHub (e.g. `ashaduzzaman-oli-portfolio`).
2. In Vercel: **Add New → Project →** import the repo (framework is auto-detected as Next.js).
3. Add the environment variable `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`). It drives canonical URLs, sitemap, robots and OG metadata.
4. Deploy. Later: **Settings → Domains** to attach a custom domain, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

## Structure
```
src/app            routes: /, /about, /projects/[slug], sitemap, robots, OG image, icon
src/components     layout/ sections/ ui/ motion/ visuals/
src/data           all editable content
src/lib, hooks     utilities, metadata, reduced-motion hook
```

Design notes: dark command-center visual language, bento compositions, original SVG visuals (no stock photos, no fake screenshots),
CSS-only hero entrance, pointer-lit cards, scroll-linked workflow, full `prefers-reduced-motion` support.
Three.js/GSAP were deliberately not added: the visuals are SVG/CSS and Motion covers all scroll/gesture needs.
