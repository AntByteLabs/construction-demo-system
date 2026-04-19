# Antbytelabs Construction — Website + Admin CMS

A premium demo site for a fictional construction firm, with a full admin CMS built on Next.js, Prisma, and SQLite.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4**
- **Prisma 6** ORM with **SQLite**
- **Framer Motion** for animations
- **TipTap** rich-text editor for blog posts
- **Lucide** icons
- **Zod** + **react-hook-form** for validation

## Quick start

```bash
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

Visit:
- Public site: http://localhost:3000
- Admin console: http://localhost:3000/admin/login

## Admin credentials (demo)

- Email: `admin@antbytelabs.com`
- Password: `admin123`

## Scripts

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start Next.js dev server              |
| `npm run build`   | Production build                      |
| `npm run start`   | Start production server               |
| `npm run lint`    | Lint the project                      |
| `npm run db:seed` | Seed the SQLite DB with demo data     |
| `npm run db:reset`| Reset DB and re-apply migrations      |

## Project structure

```
prisma/
  schema.prisma         # DB schema
  seed.ts               # Demo data

src/
  app/
    (public)/           # Public website
      page.tsx          # Home
      about/            # About page
      services/         # Services list + detail
      projects/         # Portfolio list + detail
      team/             # Team page
      blog/             # Blog list + detail
      contact/          # Contact page
    admin/
      (auth)/           # Login + forgot-password (no shell)
      (console)/        # Authenticated admin pages
        page.tsx        # Dashboard
        services/       # Services CRUD
        team/           # Team CRUD
        projects/       # Projects CRUD
        blog/           # Blog CRUD (with TipTap)
        inquiries/      # Contact inbox
        media/          # Media library
        settings/       # Site settings
    api/
      contact/          # Public contact form POST
      admin/logout/     # Admin logout
    layout.tsx          # Root layout
    globals.css         # Tailwind + tokens
    not-found.tsx       # 404

  components/
    ui/                 # Shared primitives (Button, Placeholder, Counter, Logo...)
    public/             # Public site components (hero, sections, nav, footer)
    admin/              # Admin components (sidebar, tables, forms, editor)

  lib/
    prisma.ts           # Prisma client
    auth.ts             # Demo auth helpers
    utils.ts            # cn, slugify, formatDate, parseJSON

  middleware.ts         # Protects /admin routes
```

## Features

### Public site
- Home with parallax hero, stats counters, testimonials carousel, featured projects
- About with company story, mission/vision, values, 25-year timeline, team, certifications
- Services list + detail (dynamic from DB) with process steps and related services
- Projects list with category filter + search + animated grid
- Project detail with gallery, sidebar facts, and related projects
- Team page with role filter, search, and social links
- Blog with featured article, category filter, search, and TipTap-rendered content
- Contact form wired to `/api/contact` with inline success state

### Admin CMS
- Secure admin auth (middleware-protected)
- Dashboard with live stats, recent inquiries, latest posts & projects
- Services, Team, Projects, Blog CRUD with create/edit/delete
- TipTap rich-text editor for blog posts
- Inquiries inbox with read/unread, search, filter, CSV export
- Media library with category filter, upload modal, copy label
- Settings with company info, social links, SEO, and theme color pickers
- Every edit revalidates the affected public pages for instant reflection

### Design
- Custom Tailwind theme tokens (ink, amber, azure palette)
- Animated transitions via Framer Motion (parallax, scroll reveals, staggered grids)
- Branded SVG placeholders throughout (labeled by purpose, trivial to swap with real images)
- Mobile-first responsive design with sticky mobile nav and touch-optimized targets
- Custom serif (Playfair Display) for headlines, Inter for body
- Accessible focus states, reduced-motion friendly
