import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.mhgbrown.is',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        // Exclude redirect paths which use the 40-character git SHA hashes
        const isShaRedirect = /\/posts\/[a-f0-9]{40}\/?$/.test(page);
        return !isShaRedirect;
      }
    }),
  ],
});
