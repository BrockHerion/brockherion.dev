import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      external: ['svgo']
    }
  },
  integrations: [react(), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), mdx({
    extendMarkdownConfig: false,
  }), sitemap()],
	site: "https://brockherion.dev",
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    }
  }
});