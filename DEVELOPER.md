# Morgan Brown's Blog — Human Developer Guidelines

Welcome to the development documentation for Morgan Brown's Blog. This document serves as a guide for human developers on how this project is architected, how to run it locally, and how to maintain its high standard of performance, accessibility, and SEO superiority.

---

## 1. Project Philosophy & Core Pillars

This blog is built on the belief that personal websites should be extremely fast, accessible, lightweight, and maintainable. To support this philosophy, the codebase adheres to three core architectural pillars:

1. **Zero-Dependency Vanilla CSS:**
   We do not use Tailwind CSS, PostCSS, Sass, or CSS-in-JS. All styling is written in highly optimized, native CSS. This keeps the design uniform and eliminates CSS parsing overhead.
2. **Centralized Theming (Strict Consistency):**
   All colors, borders, and backgrounds use native CSS variables declared under `:root` and `@media (prefers-color-scheme: dark)` in `src/layouts/Layout.astro`. Never hardcode color values in layout components or pages.
3. **Compile-Time Static Optimization:**
   The site is 100% static. Features like excerpt parsing, legacy routing redirects, and sitemap generation are resolved entirely at build time. We use zero client-side JavaScript or hydration.

---

## 2. Directory Structure

Here is how the project is organized:

```text
nuxt-ghpages-blog/
├── .github/workflows/deploy.yml  # Direct GitHub Pages deployment workflow
├── public/
│   ├── CNAME                     # Custom domain (blog.mhgbrown.is)
│   └── favicon.png               # Site favicon
├── src/
│   ├── content/
│   │   ├── config.js             # Content Collections frontmatter validation schema
│   │   └── posts/                # Markdown blog posts
│   ├── layouts/
│   │   └── Layout.astro          # Global HTML wrapper, SEO/meta tags, JSON-LD, & global CSS
│   ├── pages/
│   │   ├── index.astro           # Homepage displaying active and archived posts
│   │   └── posts/[slug].astro    # Dynamic page rendering posts and legacy SHA redirects
│   └── utils/
│       └── blogUtils.js          # Strictly DRY helpers (slugification, SHA mapping, etc.)
├── astro.config.mjs              # Astro configuration & lightweight custom sitemap generator
├── package.json                  # Highly optimized dependency tree
└── tsconfig.json                 # Clean TypeScript compilation config
```

---

## 3. Key Technical Implementations

### A. Dual-Role Dynamic Routing (`src/pages/posts/[slug].astro`)
To support clean URLs without breaking older backlinks, our dynamic page file handles two routes simultaneously using Astro's `getStaticPaths()`:
1. **Canonical Route:** `/posts/[slug]/` — Renders the actual post content.
2. **Legacy Redirect Route:** `/posts/[sha]/` — Renders an instant HTML-level `<meta http-equiv="refresh">` redirect that forwards traffic to the canonical slug page.

The layout dynamically matches the route type, serving `canonicalUrl` tags for SEO-friendly pages and ensuring crawlers understand the redirect structure.

### B. Lightweight Custom Sitemap Integration (`astro.config.mjs`)
Rather than pulling in heavy npm packages for sitemap building, a custom integration hook is implemented directly inside `astro.config.mjs`.
* **Execution:** Runs automatically at the end of the build step (`astro:build:done`).
* **Filtering:** It scans all compiled pages and dynamically filters out any paths containing 40-character legacy Git SHAs. Only pristine canonical pages are added to `sitemap.xml` and `sitemap-index.xml`.

### C. Compile-Time Excerpt Parsing
For preview snippets and Open Graph/LD-JSON meta descriptions, Astro parses the raw Markdown body at compile time:
* It reads the first consecutive lines of text.
* Cleans up markdown-specific characters (bracketed links, stars, backticks).
* Normalizes whitespace and truncates to `157` characters.
This guarantees high-quality, automated SEO summaries without manual effort or runtime libraries.

---

## 4. Coding & Quality Standards

When modifying the codebase, please respect these rules:

* **Semantic HTML First:** Use `<article>` for blog posts, `<main>` for content structures, `<header>`, and `<footer>`. Do not wrap components in redundant `<div>` layers.
* **Accessibility (a11y):** Ensure screen readers can navigate links and elements easily. Use the `.sr-only` utility class for visually hidden labels.
* **Keep Code DRY:** All URL computation and slugification must flow through `src/utils/blogUtils.js`. Do not write inline regex patterns or slugifiers.
* **Zero Client Runtime Overhead:** Keep external packages minimal. Let Astro compile all Markdown and JSON-LD statically.

---

## 5. Development Workflows

### Run the Development Server
```bash
npm run dev
```

### Create a New Blog Post
To maintain metadata consistency, run the creation script which automatically calculates timestamps and formats frontmatter:
```bash
npm run post "Your Post Title Here"
```

### Adding a Legacy Mapping
If you import historic posts, locate the `shaMapping` object in `src/utils/blogUtils.js` and add the mapping:
```javascript
"timestamp-Post-Title.md": "40-character-legacy-git-sha"
```

### Building and Verifying the Build
Always run a full local build to test TypeScript compilation, static site rendering, and custom sitemap generation before pushing to production:
```bash
npm run build
```
The site compiles into the `dist/` directory, which is automatically picked up and deployed to GitHub Pages by the GitHub Actions workflow on a push to `master`.
