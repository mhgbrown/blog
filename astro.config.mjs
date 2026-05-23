import { defineConfig } from 'astro/config';
import fs from 'fs';

// Custom lightweight sitemap integration
function customSitemap() {
  return {
    name: 'custom-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const hostname = 'https://blog.mhgbrown.is/';

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        // Add index page
        xml += `  <url>\n    <loc>${hostname}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

        // Add blog post pages (filtering out 40-character git SHA redirects)
        pages.forEach((page) => {
          const pathname = page.pathname;
          if (pathname === '' || pathname === 'index.html') return;

          // Exclude redirect paths which use 40-character SHA hashes
          const isShaRedirect = /[a-f0-9]{40}\/?$/.test(pathname);
          if (isShaRedirect) return;

          const cleanPath = pathname.endsWith('/') ? pathname : pathname + '/';
          xml += `  <url>\n    <loc>${new URL(cleanPath, hostname).href}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
        });

        xml += `</urlset>\n`;

        // Write standard sitemap.xml and sitemap-index.xml to build folder
        fs.writeFileSync(new URL('sitemap.xml', dir), xml, 'utf-8');
        fs.writeFileSync(new URL('sitemap-index.xml', dir), xml, 'utf-8');
        console.log('✓ Custom sitemap.xml and sitemap-index.xml generated successfully!');
      }
    }
  };
}

export default defineConfig({
  site: 'https://blog.mhgbrown.is',
  integrations: [
    customSitemap(),
  ],
});
