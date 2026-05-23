# Morgan Brown's Blog

A modern, high-performance static blog powered by **Astro**, **Tailwind CSS**, and **GitHub Actions**.

This project has been completely modernized from the legacy Nuxt 2 & Travis CI codebase into a single-repository static setup designed for outstanding performance, ease of use, and premium SEO.

---

## Key Features

- **Unified Architecture (Single Repository):** All blog posts have been consolidated directly into the codebase under `src/content/posts/`. No more split-repository maintenance!
- **Premium SEO Performance:**
  - **Google Structured Data (JSON-LD):** Automatically injects clean, compliant Schema.org `BlogPosting` structured metadata on every post page, maximizing search engine snippet richness.
  - **SEO-Friendly Clean Slugs:** Replaced legacy, opaque git blob SHA hashes with human-readable, descriptive URL slugs (e.g., `/posts/un-cyanogenmoding-a-motorola-droid/`).
  - **Zero-Broken-Links Redirects:** Dynamically compiles fallback HTML redirects at `/posts/[legacy-git-sha]/` that instantly point users to the new clean slugs, preserving all historical backlinks.
  - **Smart Custom Sitemap:** Built-in compiler hook that dynamically generates `sitemap.xml` upon every build, filtering out redirection routes so crawlers only index pristine canonical paths.
- **Modern Developer Experience:**
  - Fast compiler powered by **Astro** & **Vite**.
  - Typography-rich layout styled with **Tailwind CSS** & `@tailwindcss/typography`.
  - Compile-time schema type safety using Astro's **Content Collections** (`src/content/config.js`).
- **Fully Automated Deployment:** Built-in GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys your site directly to **GitHub Pages** securely on every push to `master`.

---

## Directory Structure

```text
├── .github/workflows/deploy.yml  # Automated GitHub Actions Pages deployment
├── public/
│   ├── CNAME                     # Custom domain (blog.mhgbrown.is)
│   └── favicon.png               # Site favicon
├── src/
│   ├── content/
│   │   ├── config.js             # Content Collections frontmatter schemas
│   │   └── posts/                # Unified markdown blog posts
│   ├── layouts/
│   │   └── Layout.astro          # HTML document layout, SEO headers, & JSON-LD
│   ├── pages/
│   │   ├── index.astro           # Home page list of active/archived posts
│   │   └── posts/[slug].astro    # Dynamic slug rendering & SHA compatibility redirects
│   └── utils/
│       └── blogUtils.js          # Slugifiers, SHA-to-filename mappings, & helpers
├── astro.config.mjs              # Astro integrations & lightweight sitemap generator
├── tailwind.config.mjs           # Tailwind CSS configuration
└── tsconfig.json                 # Type resolution & module compiler config
```

---

## Development Setup

Ensure you are using Node.js version **24+** (configured in `.node-version`).

### Install Dependencies

```bash
npm install
```

### Run Local Development Server

Launches a hot-reloading development server at [http://localhost:4321/](http://localhost:4321/).

```bash
npm run dev
```

### Create a Production Build

Compiles a optimized static build of the site inside the `dist/` directory, including automatic sitemap generation.

```bash
npm run build
```

### Preview the Static Build

Runs a local web server to inspect the static production build compiled inside `dist/`.

```bash
npm run preview
```
